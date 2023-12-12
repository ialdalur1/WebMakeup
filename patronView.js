//@ sourceURL=patronView.js

//var widgetPaletteModel;

PatronView=function(patronModel){
	this.patronModel=patronModel;
	this.createExtruderRight();
};

PatronView.patterns=[
	{id:"click2erase",model:"click2erase",image:"images/erasable.png"},
	{id:"click2alternate",model:"click2alternate",image:"images/choice.png"},
	{id:"and",model:"and",image:"images/and.png"},
	{id:"or",model:"or",image:"images/or.png"},
	{id:"zoomin",model:"zoomin",image:"images/gradually.png"},
	{id:"zoominDomino",model:"zoominDomino",image:"images/domino.png"}
];

$('body').append("<div id=\"extruderRight\" class=\"{title:'Pattern', url:'"+chrome.extension.getURL("parts/extruderRight.html")+"'}\"></div>");
$('body').append("<div id=\"iframeRight\" class=\"{title:'iframeRight', url:'"+chrome.extension.getURL("parts/iframeRight.html")+"'}\"></div>");

PatronView.prototype.createExtruderRight=function (){
	var obj=this;
$("#extruderRight").buildMbExtruder({
          positionFixed:true,
          width:200, //originalmete estaba a 300
          sensibility:800,
          position:"right", // left, right, bottom
          extruderOpacity:1,
          flapDim:100,
          textOrientation:"tb", // or "tb" (top-bottom or bottom-top)
          onExtOpen:function(){
          },
          onExtContentLoad:function(){
          	$("#extruderRight .content").css("background","white");
          	$( "#click2erase" ).button();
          	$( "#click2alternate" ).button();
          	$( "#and" ).button();
          	$( "#or" ).button();
          	$( "#zoomin" ).button();
          	$( "#zoominDomino" ).button();
          	obj.prepararPatrones();
          },
          onExtClose:function(){},
          hidePanelsOnClose:true,
          autoCloseTime:0, // 0=never
          slideTimer:300,
          accordionPanels: false 
      }).zIndex(1000000000); 
};

PatronView.prototype.prepararPatrones=function(){
	for(var i=0;i<PatronView.patterns.length;i++){
		var pattern=PatronView.patterns[i];
      	$("#"+pattern.id).append("<img src="+chrome.extension.getURL(pattern.image)+">");
		$("#"+pattern.id).click(this.crearListener(pattern.model));
		
	}
};
PatronView.prototype.crearListener=function(name){
	var obj=this;
	return function(e){
			obj.patronModel[name](e);	
		};	
	
};
