DiagramConstraints = {};
DiagramConstraints.currentState = cjs([]);
DiagramConstraints.sparks = cjs("inicio");
//DiagramConstraints.propagationSparks = cjs([]);
DiagramConstraints.previousSparks = null;
DiagramConstraints.currentSpark = cjs({});
DiagramConstraints.widgets = cjs([]);
DiagramConstraints.previousWidgets = [];

/*Current State Functions*/

DiagramConstraints.setCurrentState = function(state){
	//changedSelectionHandler();
	new DiagramModel().setActionsOnCurrentState(DiagramUtils.stateActionsToString(state));
	DiagramConstraints.currentState.set(state.slice(0));
};
DiagramConstraints.getCurrentStateCJS = function(){
	return DiagramConstraints.currentState;
};
DiagramConstraints.getCurrentState = function(){
     return DiagramConstraints.currentState.get();
};
DiagramConstraints.bindCurrentState = function(handler){
	DiagramConstraints.currentState.onChange(handler);
};

/*DiagramConstraints.currentState.onChange(function(){
    var actions;
    if(DiagramConstraints.currentState.get())
        actions = DiagramConstraints.currentState.get();//Like: [{widget: "W1", action:"Select"},{widget:"W2", action:"Deselect"}
    else
        return;
    var actionsText = "";
    for(var i=0; i<actions.length;i++)
        actionsText += actions[i].action+" "+actions[i].widget+"\n";
    actionsText = actionsText.substring(0, actionsText.length-1);
    console.log("DiagramConstraints -- Actions:")
    console.log(actionsText);
    var controller = new DiagramController();
    controller.setActions(actionsText);
});*/

/*Sparks functions*/
DiagramConstraints.setSparks = function(sparks){
	if(sparks){
		DiagramConstraints.sparks.set(sparks.slice(0));
	}
	else{
		DiagramConstraints.sparks.set(null);
		DiagramConstraints.previousSparks =  null;
		return;
	}
	//After handling sparks change event we store the new value,
	// that will be old value in the next sparks change handling
	if(!DiagramConstraints.previousSparks){
		DiagramConstraints.previousSparks = [];
	}
	DiagramConstraints.previousSparks.push(this.getSparks());
};
DiagramConstraints.getSparksCJS = function(){
	return DiagramConstraints.sparks;
};
DiagramConstraints.getSparks = function(){
	return DiagramConstraints.sparks.get();
};
DiagramConstraints.bindSparks = function(handler){
    DiagramConstraints.sparks.onChange(handler);
};
DiagramConstraints.getPreviousSparks = function(){
	if(!DiagramConstraints.previousSparks){
		return null;
	}
	if(DiagramConstraints.previousSparks.length>1){
    	return DiagramConstraints.previousSparks[DiagramConstraints.previousSparks.length-2];
	}
	return [];
};
/*DiagramConstraints.setPropagationSparks = function(sparks){
	DiagramConstraints.propagationSparks.set(sparks.slice(0));
};
DiagramConstraints.getPropagationSparks = function(){
	return DiagramConstraints.propagationSparks.get();
};*/
/*Current spark functions*/
DiagramConstraints.getCurrentSpark = function(){
	return DiagramConstraints.currentSpark.get();
};
DiagramConstraints.getCurrentSparkCJS = function(){
	return DiagramConstraints.currentSpark;
};
DiagramConstraints.setCurrentSpark = function(spark){
	//DiagramConstraints.currentSpark.set(null);
	DiagramConstraints.currentSpark.set( jQuery.extend({}, spark));
};
DiagramConstraints.bindCurrentSpark = function(handler){
	DiagramConstraints.currentSpark.onChange(handler);
};

/*Widgets functions*/

DiagramConstraints.setWidgets = function(widgets){
	DiagramConstraints.previousWidgets.push(widgets);
    DiagramConstraints.widgets.set(widgets.slice(0));
};
DiagramConstraints.getWidgetsCJS = function(){
    return DiagramConstraints.widgets;
};
DiagramConstraints.getWidgets = function(){
    return DiagramConstraints.widgets.get();
};
DiagramConstraints.bindWidgets = function(handler){
    DiagramConstraints.widgets.onChange(handler);
};
DiagramConstraints.getPreviousWigdets = function(){
	var returnable;
	if(DiagramConstraints.previousWidgets.length>1){
		returnable =  DiagramConstraints.previousWidgets[DiagramConstraints.previousWidgets.length-2];
	}
	else{
		returnable = [];
	}
	return returnable;
};