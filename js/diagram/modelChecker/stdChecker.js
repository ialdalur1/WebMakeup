//@ sourceURL=stdChecker.js

var STDChecker = function(model, widgets){
	this.states = model.nodeDataArray;
	this.transitions = model.linkDataArray;
	this.widgets = widgets;
	this.errors = null;
};

STDChecker.prototype.checkDiagram = function(){
	"use strict";
	this.errors = {log: [], logString: ""};
	//Check if a state haven't any inexistent widgets
	if(!this.statesWithoutMissingWidgets()){
		return {code:1, errorMessage: "State with inexistent widgets", errors: this.errors};
	}
	//Check if there is states with the same name
	if(this.statesWithSameName()){
		return {code:1, errorMessage: "States with same name", errors: this.errors};
	}
	//Check if all transitions are defined
	if(!this.transitionsDefined()){
		return {code:1, errorMessage: "Transitions undefined", errors: this.errors};
	}
	//Check if a transition is impossible (e.g: click on an hidden element)
	if(this.impossibleTransitions()){
		return {code:1, errorMessage: "Transitions with impossible widgets and event combination", errors: this.errors};
	}
	//Check that there is a widget in select state al least in one of the states of the STD
	if(this.alwaysHiddenOrDeselectedWidget()){
		return {code:1, errorMessage: "Every widget should be selected in one state at least", errors: this.errors};
	}
	//Check if a state or more are isolated from the initial state
	if(this.isolatedStates()){
		return {code:1, errorMessage: "There are isolated estates", errors: this.errors};
	}
	return {code:0};
};

//Return true if isn't any state with actions on inexistent widgets
STDChecker.prototype.statesWithoutMissingWidgets = function(){
	"use strict";
	var i, j;
	for(i=0;i<this.states.length;i++){
		var stateActionsArray = DiagramUtils.stateActionsToArray(this.states[i].actions);
		var stateWidgets = DiagramUtils.getWidgetsOfActionArray(stateActionsArray);
		for(j=0;j<stateWidgets.length;j++){
			if(!DiagramUtils.isInArray(stateWidgets[j], this.widgets, DiagramUtils.equalWidgets)){
				this.errors.log.push(this.states[i]);
				this.errors.logString += "Error on state "+this.states[i].name+" where widget "+stateWidgets[j]+" is not defined";
				return false;
			}
		}
	}
	return true;
};

//Return true if there are states with the same name
STDChecker.prototype.statesWithSameName = function(){
	"use strict";
	//Get the names of the states of the STD
	var names = [], i;
	for(i=0; i<this.states.length;i++){
		names.push(this.states[i].name);
	}
	//Look for states with the same name
	for(i=0;i<names.length;i++){
		if(DiagramUtils.isMultipleTimesInArray(names[i], names, DiagramUtils.equalStrings)){
			this.errors.log.push(names[i]);
			this.errors.logString += "State "+names[i]+" is duplicated";
			return true;
		}
	}
	return false;
};

//Return true if all transitions are defined
STDChecker.prototype.transitionsDefined = function(){
	"use strict";
	var i;
	for(i=0;i<this.transitions.length;i++){
		var transition = this.transitions[i];
		if(!transition.widget || !transition.event){
			this.errors.log.push(transition);
			this.errors.logString += "Transition from "+this.findNodeName(transition.from)+" to "+this.findNodeName(transition.to)+" undefined";
			return false;
		}
	}
	return true;
};

STDChecker.prototype.findNodeName = function(key){
	"use strict";
	var i;
	for(i=0;i<this.states.length;i++){
		if(this.states[i].key===key){
			return this.states[i].name;
		}
	}
};

//Return true if a transition is impossible or is bad defined (e.g: click on an hidden element)
STDChecker.prototype.impossibleTransitions = function(){
	"use strict";
	var i, j, k;
	for(i=0;i<this.transitions.length;i++){
		var transition = this.transitions[i];
		if(transition.event.toLowerCase()!=='onload'){
			for(j=0;j<this.states.length;j++){
				if(this.states[j].key===transition.from){
					var state = this.states[j];
					var actionsArray = DiagramUtils.stateActionsToArray(state.actions);
					for(k=0;k<actionsArray.length;k++){
						var action = actionsArray[k];
						if(action.action.toLowerCase()==='collapse'&&action.widget===transition.widget){
							this.errors.log.push(action);
							this.errors.log.push(state);
							this.errors.log.push(transition);
							this.errors.logString += "The transition from "+this.findNodeName(transition.from)+" to "+this.findNodeName(transition.to)+
								" is bad defined, because "+transition.event+" on widget "+transition.widget+
								" is impossible to do.";
							return true;
						}
					}
				}
			}
		}
	}
	return false;
};

STDChecker.prototype.alwaysHiddenOrDeselectedWidget = function(){
   widgetEnLista=0;
   //Array de widgets inicializado a false (suponemos q no hay widget en estado select)
   var numOfWidgets=this.widgets.length;
   var listOfWidgets=[];
   for(var j=0; j<numOfWidgets; j++){
   	listOfWidgets[j]=false;
   }

   for(var i=0; i<this.states.length; i++){
   	var estado=this.states[i].actions;
   	var punt = 0;
   	var posInicial=0;
   	var posFinal=0;
   	while(punt<estado.length){
   		if(estado[punt]==" "){
   			posFinal=punt-1;
   			if(estado.substring(posInicial, posFinal+1)=="Enable"){
   				//En el array de comprobacion en la pos del widget poner true
   				listOfWidgets[widgetEnLista]=true;
   			}
   		}
   		if(estado[punt]=='\n'){
   			posInicial=punt+1;
   			widgetEnLista++;
   		}
   		punt++;
   	}
   	widgetEnLista=0;
   	punt=0;
   }
   //Comprobamos que todos los widgets estan al menos una vez en estado select
   for (var k=0; k<listOfWidgets.length; k++){
   	if(listOfWidgets[k]==false){
   		this.errors.log.push(this.widgets[k]);
		this.errors.logString += "Error on widget "+this.widgets[k]+". It is never enable";
   		return true;
   	}
   }
   return false;
};

//Hay que comprobar que todos los estados tienen una transicion entrante
STDChecker.prototype.isolatedStates = function(){
	var states=this.states;
	var transitions=this.transitions;
	var listOfStates=[];
	for(var i=0; i<states.length; i++){
		listOfStates[i]={comunicado: false, key: states[i].key};
	}
	listOfStates[0].comunicado=true;//Estado Inicial true de inicio xq puede no tener transicion entrante
	for(var j=0; j<transitions.length; j++){
		for(var k=0; k<listOfStates.length; k++){
			if(listOfStates[k].key==transitions[j].to){
				listOfStates[k].comunicado=true;
			}
		}
	}
	//Comprobar que todos los estados han sido alcanzados
	for(var h=0; h<listOfStates.length; h++){
		if(listOfStates[h].comunicado==false){
			this.errors.log.push(this.states[h]);
			this.errors.logString += "Error on state "+this.states[h].name+". It is isolated";
			return true;
		}
	}
	return false;
};
