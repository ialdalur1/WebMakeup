//@ sourceURL=diagramUtils.js
var DiagramUtils = DiagramUtils || {};
DiagramUtils.stateActionsToString = function(stateArray){
    "use strict";
    var stateString = "", i;
    for(i=0; i<stateArray.length;i++)
    {
        stateString += stateArray[i].action+" "+stateArray[i].widget+"\n";
    }
    stateString = stateString.substring(0, stateString.length-1);//Delete last "\n"
    return stateString;
};
DiagramUtils.stateActionsToArray = function(stateString){
    "use strict";
    var stateArray = [], stateStringArray = stateString.split(/\s/), i, j;
    if(stateString===""){
        return stateArray;
    }
    for(i= 0, j=0; i<stateStringArray.length; i+=2, j++){
        stateArray[j] = {action:stateStringArray[i], widget:stateStringArray[i+1]};
    }
    return stateArray;
};
DiagramUtils.getModelNodes = function(){
	"use strict";
    return JSON.parse(myDiagram.model.toJson()).nodeDataArray;
};
DiagramUtils.getModelTransitions = function(){
	"use strict";
    return JSON.parse(myDiagram.model.toJson()).linkDataArray;
};
DiagramUtils.equalSparks = function(spark1, spark2){
	"use strict";
	return (spark1.widget===spark2.widget && spark1.event===spark2.event);
};
DiagramUtils.equalWidgets = function(widget1, widget2){
	"use strict";
	return widget1===widget2;
};
DiagramUtils.equalStrings = function(string1, string2){
	"use strict";
	return string1===string2;
};
DiagramUtils.whoIsDeletedElement = function(list1, list2, equalFunction){
	"use strict";
	var returnable=null, greaterList, lowerList, i;
	if(list1.length===list2.length){//No list changed
		returnable = null;
	}
	else{
		if(list1.length>list2.length){
			greaterList = list1;
			lowerList = list2;
		}
		else{
			greaterList = list2;
			lowerList = list1;
		}
		for(i=0;i<lowerList.length && returnable===null;i++){
			if(!equalFunction(lowerList[i], greaterList[i])){
				returnable = greaterList[i];
			}
		}
		if(returnable===null){
			returnable = greaterList[i];
		}
	}
	return returnable;
};

DiagramUtils.addNewAction = function(actions, action){
	"use strict";
	var actionsArray = DiagramUtils.stateActionsToArray(actions);
	actionsArray.push({widget:action.widget, action:action.action});
	return DiagramUtils.stateActionsToString(actionsArray);
};

DiagramUtils.isInArray = function(element, array, compareFunction){
	"use strict";
	var i;
	for(i=0; i<array.length; i++)
	{
		if(compareFunction(element, array[i])){
			return true;
		}
	}
	return false;
};

DiagramUtils.isMultipleTimesInArray = function(element, array, compareFunction){
	"use strict";
	var i, flag = false;
	for(i=0;i<array.length;i++){
		if(compareFunction(element, array[i])){
			if(flag){
				return true;
			}
			flag = true;
		}
	}
	return false;
};

DiagramUtils.getWidgetsOfActionArray = function(actionArray){
	"use strict";
	var i, widgets = [];
	for(i=0;i<actionArray.length;i++){
		widgets.push(actionArray[i].widget);
	}
	return widgets;
};