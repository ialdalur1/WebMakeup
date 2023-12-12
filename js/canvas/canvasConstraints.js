//Defined Canvas which contains functions to work with the Canvas panel of the augmentation
//Input: a CJS variable with the values

CanvasConstraints = {};
//CanvasConstraints.currentState = cjs(function(){return DiagramConstraints.getCurrentStateCJS().get();});
CanvasConstraints.sparks = cjs(function(){return DiagramConstraints.getSparksCJS().get();});
CanvasConstraints.currentSpark = cjs(function(){return DiagramConstraints.getCurrentSpark();});
CanvasConstraints.widgets = cjs(function(){return DiagramConstraints.getWidgets();});

/*Current State Functions*/

CanvasConstraints.setCurrentState = function(state){
    DiagramConstraints.setCurrentState(state);
};
CanvasConstraints.getCurrentStateCJS = function(){
    return CanvasConstraints.currentState;
};
/*CanvasConstraints.getCurrentState = function(){
    return CanvasConstraints.currentState.get();
};*/
CanvasConstraints.bindCurrentState = function(handler){
    //CanvasConstraints.currentState.onChange(handler);
};

/*Sparks Functions*/

CanvasConstraints.setSparks = function(sparks){
    DiagramConstraints.setSparks(sparks);
};
CanvasConstraints.getSparksCJS = function(){
    return CanvasConstraints.sparks;
};
CanvasConstraints.getSparks = function(){
    return CanvasConstraints.sparks.get();
};
CanvasConstraints.bindSparks = function(handler){
    CanvasConstraints.sparks.onChange(handler);
};

/*Current spark functions*/
CanvasConstraints.getCurrentSpark = function(){
	return CanvasConstraints.currentSpark.get();
};
CanvasConstraints.getCurrentSparkCJS = function(){
	return CanvasConstraints.currentSpark;
};
CanvasConstraints.setCurrentSpark = function(spark){
	DiagramConstraints.setCurrentSpark(spark);
};
CanvasConstraints.bindCurrentSpark = function(handler){
	CanvasConstraints.currentSpark.onChange(handler);
};

/*Widgets Functions*/

CanvasConstraints.setWidgets = function(widgetList){
    DiagramConstraints.setWidgets(widgetList);
};
CanvasConstraints.getWidgetsCJS = function(){
    return CanvasConstraints.widgets;
};
CanvasConstraints.getWidgets = function(){
    return CanvasConstraints.widgets.get();
};
CanvasConstraints.bindWidgets = function(handler){
    return CanvasConstraints.widgets.onChange(handler);
};