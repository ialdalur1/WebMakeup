String.prototype.getWidgetIdentifier = function(){
	function is_numeric(str){
		return (/^\d+$/).test(str);
	}

	var i;
	var stringinvertido = this.split("").reverse();
	var number = "";
	var flag = false;
	for(i=0;i<stringinvertido.length&&!flag;i++){
		if(is_numeric(stringinvertido[i])){
			number += stringinvertido[i];
		}
		else
		{
			flag=true;
		}
	}
	return number.split("").reverse().toString().replace(new RegExp(",", 'g'),"");
};

//Definición de la clase G2C
function G2C(data, name, widgets)
{
	this.fsmName = name;
	this.states = data.nodeDataArray;
	this.transitions = data.linkDataArray;
	this.widgets = widgets;
	this.FSMStateChangeSuffixVariable = "State";

	//Función de generación GoJS to ConstraintJS
	this.generate = function(){
		var output = "//Generated constraintjs\n";
		//Definición de estados y transiciones entre ellos
		output += this.generateStatesAndTransitions();
		//Definición de eventos según en el estado que nos encontremos
		output += this.generateActions();
		//Devolvemos el codigo javascript generado en formato string
		return output;
	};

	/*********************************
	 ****Carga de elementos del DOM****
	 *********************************/

	/*this.generateWidgetVariables = function()
	 {

	 }*/

	/*********************************
	 ********Definición del FSM********
	 *********************************/
	this.generateStatesAndTransitions = function()
	{
		//Creamos la FSM
		var output, index;
		output = "var "+this.fsmName+" = cjs.fsm()";

		//Por cada uno de los estados del diagrama generamos su javascript correspondiente
		for(index=0;index<this.states.length;index++){
			var key = this.states[index].key;
			var name = this.states[index].name;

			//Creamos el estado
			output += "\n\t.add_state('"+name+"')";

			//Por cada uno de los estados, indicamos la transición que tiene como origen ese estado
			output += this.generateTransitions(key);
		}
		output += ";\n";
		return output;
	};

	this.generateTransitions = function(stateKey)
	{
		var output = "", i;
		for(i=0; i<this.transitions.length ;i++){
			var transition = this.transitions[i];
			var from = transition.from;
			var to = transition.to;
			var event = transition.event;
			var widget = transition.widget;
			if(from === stateKey)
			{
				var toStateName = this.getStateName(to);//Obtenemos el nombre del estado al que debemos de ir
				output += "\n\t\t.add_transition(cjs.on('"+this.parseEvent(event)+"', "+this.fsmName+"Widgets["+this.getIndexWidget(widget.getWidgetIdentifier())+"]), '"+toStateName+"')";
			}
		}
		return output;
	};

	//This function pass from onClick -> click, onMouseover -> mouseover, etc.
	this.parseEvent = function(eventName){
		switch(eventName.toLowerCase()){
			case "onclick":
				return "click";
			case "onmouseenter":
				return "mouseenter";
			case "onmouseleave":
				return "mouseleave";
			case "ondoubleclick":
				return "dblclick";
		}
		return null;
	};

	this.getStateName = function(key)
	{
		var j, stateName=null;
		for(j=0;j<this.states.length;j++){
			if(key===this.states[j].key){
				stateName = this.states[j].name;
			}
		}
		return stateName;
	};

	/************************************
	 Definición de acciones en los estados
	 ************************************/
	this.generateActions = function()
	{
		var output = "";
		//Generamos una variable que va cambiando conforme cambie el estado del FSM
		output += this.generateFSMChangeVariable();
		//Generamos los eventos show/hide segun en que estado estemos
		output += this.generateDOMChangeCode();
		//Generamos la restricción CJS para cuando cambie el estado
		output += this.getFSMStateChangeConstraint();
		return output;
	};

	this.generateFSMChangeVariable = function()
	{
		var output = "var "+this.fsmName+this.FSMStateChangeSuffixVariable+" = cjs("+this.fsmName+", {\n", i;
		for(i=0; i<this.states.length;i++)
		{
			output += "\t'"+this.states[i].name+"':'"+this.states[i].name+"'";
			if(i!==this.states.length-1){
				output += ",\n";
			}
		}
		output += "\n\t}\n);\n";
		return output;
	};

	this.generateDOMChangeCode = function()
	{
		var output = this.fsmName+this.FSMStateChangeSuffixVariable+".DOMReload = function(){\n", i;
		output += "\tswitch(this.get())\n";
		output += "\t{\n";
		//Por cada uno de los casos deberemos de mostrar y ocultar los elementos del DOM
		for(i=0;i<this.states.length;i++)
		{
			output += "\t\tcase '"+this.states[i].name+"':";
			output += this.getActions(this.states[i].actions);
			output += "\n\t\tbreak;\n";
		}

		output += "\t}\n};";

		return output;
	};

	/*A widget posible states and its associated function for proccessing its css*/
	this.posibleStates = [
		{state:"enable", func:function(widgetReference, widgetNumber){
			/*
			* TODO if transparent div exists, remove it
			*/
			var returnable = "//Enable "+widgetReference;
			returnable += "\n\t\t\t"+widgetReference+".style.display = 'block';";
			returnable += "\n\t\t\t$('#WebMakeUpDeselectDiv"+widgetNumber+"').remove();";
			returnable += "\n\t\t\t"+widgetReference+".setAttribute('data-wmwidget-deselected','false');";
			return returnable;
		}},
		{state:"disable", func:function(widgetReference, widgetNumber){
			var returnable = "//Disable "+widgetReference;
			returnable += "\n\t\t\t"+widgetReference+".style.display = 'block';";
			/*
			* TODO generate a transparent div that captures all events
			* left : AugmentationWidgets[0].offsetLeft
			* right: AugmentationWidgets[0].offsetLeft+AugmentationWidgets[0].offsetWidth
			* top: AugmentationWidgets[0].offsetTop
			* bottom: AugmentationWidgets[0].offsetTop+AugmentationWidgets[0].offsetHeight
			*/
			//Delete deselect div if exists
			returnable += "\n\t\t\t$('#WebMakeUpDeselectDiv"+widgetNumber+"').remove();";
			//Create a div
			returnable += "\n\t\t\tvar iDiv = document.createElement('div');";
			returnable += "\n\t\t\tiDiv.id = 'WebMakeUpDeselectDiv"+widgetNumber+"';";
			returnable += "\n\t\t\tiDiv.className = 'WebMakeUpDeselectDiv'";
			returnable += "\n\t\t\tdocument.getElementsByTagName('body')[0].appendChild(iDiv);";
			//Set width and height
			returnable += "\n\t\t\t$(iDiv).css('width', $("+widgetReference+").width());";
			returnable += "\n\t\t\t$(iDiv).css('height', $("+widgetReference+").height());";
			//Set position
			returnable += "\n\t\t\tiDiv.style.position = 'absolute';";
			returnable += "\n\t\t\t$(iDiv).css('left', $("+widgetReference+").offset().left);";
			returnable += "\n\t\t\t$(iDiv).css('top', $("+widgetReference+").offset().top);";
			//Set deselect attribute for link with deselect css properties defined on style.css
			returnable += "\n\t\t\t"+widgetReference+".setAttribute('data-wmwidget-deselected','true');";
			return returnable;

		}},
		{state:"collapse", func:function(widgetReference, widgetNumber){
			var returnable = "//Collapse "+widgetReference;
			returnable += "\n\t\t\t"+widgetReference+".style.display = 'none';";
			returnable += "\n\t\t\t$('#WebMakeUpDeselectDiv"+widgetNumber+"').remove();";
			returnable += "\n\t\t\t"+widgetReference+".setAttribute('data-wmwidget-deselected','true');";
			return returnable;
		}}
	];

	this.getActions = function(actionsString)
	{
		var output = "", i, j;
		var actionsArray = DiagramUtils.stateActionsToArray(actionsString);
		for(i=0; i<actionsArray.length;i++){
			var actionType = actionsArray[i].action.toLowerCase();
			var actionWidget = actionsArray[i].widget;
			for(j=0;j<this.posibleStates.length;j++){
				if(this.posibleStates[j].state===actionType){
					output += "\n\t\t\t"+this.posibleStates[j].func(this.fsmName+"Widgets["+this.getIndexWidget(actionWidget.getWidgetIdentifier())+"]",
						this.getIndexWidget(actionWidget.getWidgetIdentifier()));
				}
			}
		}
		return output;
	};

	this.getFSMStateChangeConstraint = function()
	{
		return "\n"+this.fsmName+this.FSMStateChangeSuffixVariable+".onChange("+this.fsmName+this.FSMStateChangeSuffixVariable+".DOMReload);";
	};

	this.getIndexWidget = function(widgetId){
		var i;
		for(i=0;i<this.widgets.insert.length;i++){
			if (this.widgets.insert[i].id === widgetId) {
				return i;
			}
		}
	//	return widgetId;
	};
}