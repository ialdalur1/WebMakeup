//@ sourceURL=Orchestration2CJS.js
/**
 * Created by Haritz on 21/04/14.
 */

/**
 * Class for get Javascript CJS code from orchestration of the augmentation where are actor (which element click, dbclick,...) and reactor (is shown and hidden)
 * @param name augmentation name
 * @param orchestrations an array like: [{actor:"<widgetNumber>", action:"<click, dbclick or mouseover>" reactor:"<widgetNumber>"},...]
 * @constructor
 */
function O2C(name, orchestrations, widgets){
	"use strict";
	//Data model for generate the javascript code
	this.name = name;
	this.orchestrations = orchestrations;
	this.widgets = widgets;

	//GoJS model generator
	this.actions = {};
	this.actions.click = function(widget){
		return [{event: "onclick", from:0, to:-1, widget:widget}, {event: "onclick", from:-1, to:0, widget:widget}];
	};
	this.actions.dbClick = function(widget){
		return [{event: "ondoubleclick", from:0, to:-1, widget:widget}, {event: "ondoubleclick", from:-1, to:0, widget:widget}];
	};
	this.actions.mouseEnter = function(widget){
		return [{event: "onmouseenter", from:0, to:-1, widget:widget}, {event: "onmouseleave", from:-1, to:0, widget:widget}];
	};

	this.generate = function(){
		var i, output="";
		for(i=0;i<this.orchestrations.length;i++){//For every widget orchestration
			var orchestration = this.orchestrations[i];
			var data = {nodeDataArray:{}, linkDataArray:{}};
			data.nodeDataArray = [{actions: orchestration.initial+" "+orchestration.reactor, key:0, name:orchestration.initial}, {actions:this.getOppositeState(orchestration.initial)+" "+orchestration.reactor, key:-1, name:this.getOppositeState(orchestration.initial)}];
			data.linkDataArray = this.actions[orchestration.action](orchestration.actor);
			var g2c;
			//g2c = new G2C(data, this.name+i, this.widgets);
			g2c = new G2C(data, this.name, this.widgets);
			output += "\n";
			output += g2c.generate();
			output += "\n";
		}
		return output;
	};
	this.getOppositeState=function(state){
		return state=="enable"?"collapse":"enable";
	};
}