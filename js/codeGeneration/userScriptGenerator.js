//@ sourceURL=userScriptGenerator.js
/*UserScriptGenerator (USG)*/

/*User script generator view*/

var UsgView = function(augmentationInfo){
	"use strict";
	this.augInfo = augmentationInfo;
	this.fileName = augmentationInfo.name;
	this.extensionName = augmentationInfo.name;
	this.extensionDescription = augmentationInfo.description?augmentationInfo.description:"";
    this.widgets = augmentationInfo.widgets.widgetList;
	this.extensionURI = [];
	this.extensionURICSS = [];
	if(augmentationInfo.uri){
        this.extensionURI.push(augmentationInfo.uri);
        this.extensionURICSS.push(augmentationInfo.uri.split("?")[0]);
    }
    //Get web pages that widgets access
    this.permissions = this.getWidgetsWebPermissions(this.widgets);
};

/**
 * Get web pages that widgets need to access to work
 * @param widgets
 * @returns {Array}
 */
UsgView.prototype.getWidgetsWebPermissions = function(widgets){
    "use strict";
    var webs = [],i;debugger;
    for(i=0;i<widgets.length;i++){
    	if(widgets[i]._type=="complexCloned"){
    		var url = widgets[i].locationPoint;
    		for(j=0; j<url.length; j++){
    			if(widgets[i].locationPoint[j].url){
	            	webs.push(widgets[i].locationPoint[j].url);
	        	}
    		} 
    	}else{
    		var url = widgets[i].locationPoint.url;
	        if(widgets[i].locationPoint.url){
	            webs.push(url);
	        }
    	}
    }
    return webs;
};

UsgView.prototype.getUserScript = function(code){
	"use strict";
	var blob = new Blob([code], { type: "text/plain" });
	return blob;
	//saveAs(blob, this.fileName+".js");
};

/**
 * Gets a string with the content of the file inside the chrome Extension
 * @param relative path of the file
 * @returns {String} content of the file
 */
UsgView.prototype.getFileString = function(filePath){
	"use strict";
	var data;
	$.ajax({
		url: chrome.extension.getURL(filePath),
		async: false,
		success: function(text){
			data = text;
		}
	});
	return data;
};


/**
 * Gets a base64 string with the content of the file inside the chrome Extension
 * @param filePath
 * @returns {*}
 */
UsgView.prototype.getFileBinary = function(filePath){
	"use strict";
	var data = null;
	$.ajax({
		url: chrome.extension.getURL(filePath),
		processData : false,
		async: false,
		success: function(binary64){
			data = binary64;
		}
	});
	return data;
};

/**
 * Returns a parsed ManifestJSON object with name, description, content script matches and permissions setted.
 * @param manifestString with string of JSON manifest template
 * @returns {String}
 */
UsgView.prototype.parseManifest = function(manifestString){
	"use strict";
	var manifestObj = JSON.parse(manifestString);
	manifestObj.name = this.extensionName;
	manifestObj.description = this.extensionDescription;
	manifestObj.content_scripts[0].matches = this.extensionURI;
	manifestObj.content_scripts[1].matches = this.extensionURICSS;
    manifestObj.permissions = this.permissions;
    this.permissions.push("storage");
	return JSON.stringify(manifestObj);
};


/**
 * Creates a compressed zip file with the packed Chrome extension
 * @param usCode webmakeup.js string content
 */
UsgView.prototype.saveExtension = function(usCode){
	"use strict";
	//Generate manifest
	var manifest = this.getFileString("generationLibraries/manifest.json");
	manifest = this.parseManifest(manifest);
	//Get user script file
	var userScriptCode = usCode;
	//Generate package
	var backgroundhtml, backgroundjs, cjs, icon, xpath, anchors, jquery, style, htmlclipper, animation, augmentation;
	var zip = new JSZip();
	zip.file("manifest.json", manifest);
	backgroundhtml = this.getFileString("generationLibraries/background.html");
	backgroundjs = this.getFileString("generationLibraries/background.js");
	cjs = this.getFileString("generationLibraries/cjs.js");
	style = this.getFileString("generationLibraries/style.css");
	anchors = this.getFileString("generationLibraries/anchors.js");
	icon = this.getFileString("generationLibraries/iconEncoded64.txt");
	xpath = this.getFileString("generationLibraries/xpath.js");
	jquery = this.getFileString("generationLibraries/jquery.js");
	htmlclipper = this.getFileString("generationLibraries/htmlclipper.js");
	animation = this.getFileString("generationLibraries/animation.js");
    augmentation = this.getFileString("generationLibraries/augmentation.js");
    zip.file("jquery.js", jquery);
	zip.file("htmlclipper.js", htmlclipper);
	zip.file("background.html", backgroundhtml);
	zip.file("background.js", backgroundjs);
	zip.file("style.css", style);
	zip.file("cjs.js", cjs);
	zip.file("anchors.js", anchors);
	zip.file("xpath.js", xpath);
	zip.file("animation.js", animation);
    zip.file("augmentation.js", augmentation);
	zip.file("icon.png", icon, {base64: true});
	zip.file("webmakeup.js", userScriptCode);
	var blob = zip.generate({type:"blob"});
	saveAs(blob, this.fileName+".zip");
};

/*User script generator model*/

var UsgModel = function(augmentationInfo){
	this.view = new UsgView(augmentationInfo);
	this.augInfo = augmentationInfo;
};

UsgModel.prototype.getName = function(){
	return this.augInfo.name.replace(/\s/g,'').replace(/[0-9]/g, '');
};
UsgModel.prototype.getStdModel = function(){
	return this.augInfo.stdModel;
};
UsgModel.prototype.getWidgets = function(){
	return this.augInfo.widgets;
};


/**
 * Generates the WebMakeUp.js file content with the data model
 */
UsgModel.prototype.generate = function(){
    var code="";
	var widgetGenerator = new WG(this.getName(), this.getWidgets());
	code += widgetGenerator.generate();
	this.view.saveExtension(code);
};

/*User script generator model*/

//One augmentation should have a STD model and the widgets with its properties like that:
//augmentationInfo = {augName: "", stdModel: jsonobj, widgets: widgetArray}
var UsgController = function(augmentationInfo){
	this.model = new UsgModel(augmentationInfo);
};

/**
 * Generate and package augmentation from data model
 */
UsgController.prototype.generateUserScript = function(){
	this.model.generate();
};

