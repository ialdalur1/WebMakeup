//@ sourceURL=widgetsGenerator.js
var WG = function(name, widgets){
	this.augName = name;
	this.anchorsWidgets = widgets;
};

WG.prototype.generate = function(){
    "use strict";
	//Generate widgets mapping
	var output = "var "+this.augName+"Anchors = "+JSON.stringify(this.anchorsWidgets)+";\n";
	//Call augmentation run function
	output += "(new Augmentation("+this.augName+"Anchors)).run();";
	//Return output
	return output;
};
