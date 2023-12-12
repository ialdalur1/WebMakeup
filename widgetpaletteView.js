//@ sourceURL=widgetPaletteView.js

WidgetPaletteView=function(paletteModel){
	this.widgetPaletteModel=paletteModel;
	this.createExtruderLeft(this.widgetPaletteModel.widgetList, this.widgetPaletteModel.numWidgetListToDelete);
};

$('body').append("<div id=\"extruderLeft\" class=\"{title:'Piggy Bank', url:'"+chrome.extension.getURL("parts/extruderLeft.html")+"'}\"></div>");
$('body').append("<div id=\"iframeLeft\" class=\"{title:'iframeLeft', url:'"+chrome.extension.getURL("parts/iframeLeft.html")+"'}\"></div>");
$("#extruderLeft .content").css("background","white");

WidgetPaletteView.prototype.createExtruderLeft=function(widgetList, numWidgetListToDelete){
	var obj=this;
$("#extruderLeft").buildMbExtruder({
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
          	$('body').off("click");
          	widgetList.push({type:"Link", html:""});
          	widgetList.push({type:"Image", html:""});
          	widgetList.push({type:"Button", html:""});
          	widgetList.push({type:"RawHTML", html:""});
          	var linkButton=$("<div><a id='link' href='link' onclick='return false'>Link</a></div>");
          	var imageButton=$("<div><a id='image' href='image' onclick='return false'>Image</a></div>");
          	var buttonButton=$("<div><a id='button' href='button' onclick='return false'>Button</a></div>");
 			var htmlButton=$("<div><a id='rawhtml' href='rawhtml' onclick='return false'>HTML</a></div>");
          	$("#foreignClones").append(linkButton);
			$("#foreignClones").append(imageButton);
			$("#foreignClones").append(buttonButton);
			$("#foreignClones").append(htmlButton);
			$("#nuevoAcordeon").accordion();
          	$("#primerAcordeon").accordion();
          	$("#buttonLeft button").button();
          	$("#buttonLeft button").css("width","100%");
          	$("#accordionLeft a").button();
          	$("#accordionLeft button").button();
          	$("#accordionLeft a").css("width","100%");
          	$("#accordionLeft div").css("height","");
          	$(document.body).append("<div class='wm_closeVentana'>");
          	$(".wm_closeVentana").append("<span class='w_close wm_close' title='Close'>X</span>");
          	$(".wm_closeVentana").append("<span class='w_close wm_select' title='Hide'><img src="+chrome.extension.getURL('images/open_eye.png')+"  height='20' width='20'></span>");
          //	$(".wm_closeVentana").append("<span class='w_close wm_deselect'><img src="+chrome.extension.getURL('images/Deselect.png')+"  height='20' width='20'></span>");
          	$(".wm_closeVentana").append("<span class='w_close wm_hide' title='Show'><img src="+chrome.extension.getURL('images/close_eye.png')+"  height='20' width='20'></span>");
          	$(".wm_closeVentana").append("<span class='w_close wm_undo' title='Deswidgetize'><img src="+chrome.extension.getURL('images/undo.png')+"  height='20' width='20'></span>");
          	$(".wm_closeVentana").append("<span class='w_close wm_download' title='Download'><img src="+chrome.extension.getURL('images/download.png')+"  height='20' width='20'></span>");
         // 	$(document.body).append("<div class='wm_sparkVentana'>");
         // 	$('.wm_sparkVentana').append("<span class='wm_spark wm_sparkclick'>onClick</span>");
         // 	$('.wm_sparkVentana').append("<span class='wm_spark wm_sparkdblclick'>onDoubleClick</span>");
         // 	$('.wm_sparkVentana').append("<span class='wm_spark wm_sparkmouseenter'>onMouseEnter</span>");
         // 	$('.wm_sparkVentana').append("<span class='wm_spark wm_sparkmouseleave'>onMouseLeave</span>");
          	$(".wm_closeVentana").append("<div class='wm_ventana' title='Move'>");
          	$('.wm_ventana').append(" ");
          	$('.wm_ventana').attr("draggable","true");
          	$('.wm_ventana').addClass("wm_clickNormal");
          	obj.widgetPaletteModel.loadCloneWidgets();
          },
          onExtClose:function(){},
          hidePanelsOnClose:true,
          autoCloseTime:0, // 0=never
          slideTimer:300,
          accordionPanels: false 
      }).zIndex(1000000000); 
};