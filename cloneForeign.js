//@ sourceURL=cloneForeign.js

var script=$('<script type="text/javascript"></script>').attr({"id":"VISUALEVENTSCRIPT","path":chrome.extension.getURL("visualevent"),"src":chrome.extension.getURL("visualevent/js/VisualEvent_Loader.js")});
$('head').append(script);
var elem=$("div");

var opts = {
  lines: 13, // The number of lines to draw
  length: 23, // The length of each line
  width: 11, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
    
function onClickGenerate(dialog,elem,arrWidgets,wType){debugger;
	//$("body").css("cursor", "progress");
	var target = document.getElementsByClassName("ui-dialog");
	 setTimeout(function(){
    	var cloneName=document.getElementById("cloneName").value;
    var hayNombreRepetido=false;
    if(/\s/.test(cloneName)){alert("Spaces are forbidden in the name");}
    if(!(cloneName.length<16)){alert("The name is too long");}
    if(!(cloneName.indexOf(".")==-1)){alert("'.' character is forbidden");}
    if(!(cloneName.indexOf(",")==-1)){alert("',' character is forbidden");}
    if(cloneName=="Link" || cloneName=="Image" || cloneName=="Button" || cloneName=="link" || cloneName=="image" || cloneName=="button"){hayNombreRepetido=true; alert("This name is forbidden");}
    if(!(cloneName == null || cloneName.length == 0 || /\s/.test(cloneName)) && cloneName.length<16 && cloneName.indexOf(".")==-1 && cloneName.indexOf(",")==-1 && !hayNombreRepetido){//el . y , dan problemas al eliminarlos de la lista de widgets
    	var spinner = new Spinner(opts);
		spinner.spin(document.body);
		$('*[class=""]').removeAttr('class');
        var xpath=minimizeXPath(generateXPath(elem[0],document.documentElement,null,{showId:true,showClass:true}),document.documentElement).join("");       
        //var wType=elem.attr("data-events")!=null||elem.find("[data-events]").length>0?"iframe":"html";
        var loc=window.location.href;
        var position=elem.offset();        
        var width=elem.outerWidth();
        var height=elem.outerHeight();
        var win=$(window);
        var wwidth=win.width();
        var wheight=win.height();
        var isForm=(elem.prop("tagName")=="INPUT"||elem.find("input").size()>0)&&(elem.prop("tagName")=="FORM"||elem.parents("form").size()>0||elem.find("form").size()>0)?true:false;
        var cForm;
        if(isForm&&elem.prop("tagName")!="FORM"&&elem.find("form").size()==0){
            var node=elem.parents("form")[0];
            if(node!=null){
                if(node.getAttribute("action")!=node.action){node.setAttribute("action",node.action);}
                cForm=node.outerHTML;
            }
        }
        
        var html=flo.getStyledNode(elem[0]);
        var info={type:cloneName, pasos:null,html:html, widgetType:wType, url:loc, xpath:xpath,width:width,height:height,top:position.top,left:position.left,wwidth:wwidth,wheight:wheight,isForm:isForm,charset:document.characterSet};     
        if(cForm){
            info.completeForm=cForm;
        }
        var index=-1;
        $.grep(arrWidgets,function(elem,i){if(elem.type==cloneName){index=i;}});
        if(index==-1){
         arrWidgets[arrWidgets.length]=info;
        }else{
         arrWidgets[index]=mergeWidgets(arrWidgets[index],info);
        }
        if(info.widgetType=="iframe"){
        	insertarIframe(xpath, arrWidgets, spinner, dialog, cloneName);  
        }else{debugger;
        	guardarWidget(arrWidgets, spinner, dialog, cloneName);
        }
                         
    }},0);
}

function guardarWidget(arrWidgets, spinner, dialog, cloneName){
	chrome.storage.local.set({"widgets":arrWidgets},function (){
			spinner.stop();
			dialog.remove(); 
			introducirImagenWidgetCreado(cloneName);
			chrome.extension.sendMessage({operation:"WidgetCreated"});
	});
}

function introducirImagenWidgetCreado(cloneName){
	var j=document.createElement('div'); 
	j.className='wm_foreingnWidget';
	$('body').append(j);debugger;
	$(".wm_foreingnWidget").append("<h3 class='wm_imageForeignText'>"+cloneName+"</h3><span><img class='wm_imageForeign' src="+chrome.extension.getURL('images/piggybank.png')+"></span>");
	var ancho=(window.innerWidth/2)-(330/2);//la imagen del cerdo tiene un ancho de 330
	var alto=(window.innerHeight/2)-(382/2);//la imagen del cerdo tiene un alto de 382
	$(".wm_foreingnWidget").css("left",ancho+"px");
	$(".wm_foreingnWidget").css("top",alto+"px");
	var anchoTexto=(window.innerWidth/2)-($(".wm_imageForeignText").width()/2);
	var altoTexto=alto-50;//(window.innerHeight/2)-($(".wm_imageForeignText").height()/2)-80;
	$(".wm_imageForeignText").css("left",anchoTexto+"px");
	$(".wm_imageForeignText").css("top",altoTexto+"px");	
	$(".wm_imageForeign").fadeIn(3000, function(){
		$(".wm_imageForeign").fadeOut(3000, function(){
			$(".wm_imageForeign").remove();
		});
	});
	$(".wm_imageForeignText").fadeIn(3000, function(){
		$(".wm_imageForeignText").fadeOut(3000, function(){
			$(".wm_imageForeignText").remove();
		});
	});
}

function insertarIframe(xpath, arrWidgets, spinner, dialog, cloneName){
	var urlActual=document.URL;
//  res=$("<div>").css({width:225,height:225,overflow:"hidden"});
//  var iframe=$("<iframe>").attr({src:urlActual,scrolling:"no"}).css({width:225,height:225,top:-1,left:-1,border:"0px",overflow:"hidden",position:"relative"});
//  $('body').append(iframe);
  $.ajax({ //load form url
		    type: "GET",
		    url: urlActual,
		    success: function(data,status,xhr) {debugger;
		        var doc=document.implementation.createHTMLDocument();
		        doc.documentElement.innerHTML=data;
		        var base=doc.createElement("base");
		        base.href=urlActual;
		        doc.documentElement.firstElementChild.insertBefore(base, doc.documentElement.firstElementChild.firstElementChild);
		       
		      	var iframe=$("<iframe id='special_widget0'>");
		     	iframe.append(this);
		     	$(document.body).append(iframe);
		     	var iframeWin = iframe[0].contentWindow;
		     	 var iframeDocument = iframe[0].contentWindow.document;
		     	 iframeDocument.write(doc.documentElement.innerHTML);//readyState
		     //	 console.log(iframeDocument.readyState);
			        iframeDocument.close();
			        var nodeOriginal=document.evaluate(xpath,document,null, XPathResult.ANY_TYPE, null).iterateNext();
			        if(document.URL.indexOf("www.google")!=-1|| document.URL.indexOf("https://scholar.google.com")!=-1){
			        	var iframeToDelete=document.getElementById("special_widget0");
					    iframeToDelete.remove();
					    chrome.storage.local.set({"widgets":arrWidgets},function (){debugger;
			        	spinner.stop();
				        dialog.remove(); 
				         window.onbeforeunload=null;
				        chrome.extension.sendMessage({operation:"WidgetCreated"});
				         iframeWin.removeEventListener('load', function(){}, false);
			        });
			        }else{
			 // var nodeOriginal=iframeDocument.evaluate(xpath, iframeDocument.body, null, XPathResult.ANY_TYPE, null).iterateNext();
			 // evitarReload(iframeDocument,dialog,spinner, xpath, arrWidgets,nodeOriginal);
		     	iframeWin.addEventListener("load",function(e){debugger;
		     		  //si elemento es null puede ser xq el elemento se carga madiante js
		        var elemento=iframeDocument.evaluate(xpath, iframeDocument.body, null, XPathResult.ANY_TYPE, null).iterateNext();
		        if(elemento==null){
		        	enviarPasos(dialog, spinner, xpath, arrWidgets, null,cloneName);
		        }else{
		        	if(!primerElementoNoVisible(nodeOriginal)){
		        		var elementoVisible=cualEsVisible(nodeOriginal);
		        		enviarPasos(dialog, spinner, xpath, arrWidgets, elementoVisible,cloneName);
		        	}else{
		        	var iframeToDelete=document.getElementById("special_widget0");
				    iframeToDelete.remove();
				    chrome.storage.local.set({"widgets":arrWidgets},function (){debugger;
			        	spinner.stop();
				        dialog.remove(); 
				        introducirImagenWidgetCreado(cloneName);
				         window.onbeforeunload=null;
				        chrome.extension.sendMessage({operation:"WidgetCreated"});
				         iframeWin.removeEventListener('load', function(){}, false);
			        });
			        }
		        }
			 },true);
		         }
		    }
		    });		
}

function evitarReload(iframeDocument,dialog,spinner, xpath, arrWidgets,nodeOriginal,cloneName){debugger;
	window.onbeforeunload = function() {
		         	var reload=false;
		         	var elemento=iframeDocument.evaluate(xpath, iframeDocument.body, null, XPathResult.ANY_TYPE, null).iterateNext();
		        if(elemento==null){
		        	enviarPasos(dialog, spinner, xpath, arrWidgets, null,cloneName);
		        	reload=true;
		        }else{
		        	if(!primerElementoNoVisible(nodeOriginal)){
		        		var elementoVisible=cualEsVisible(nodeOriginal);
		        		enviarPasos(dialog, spinner, xpath, arrWidgets, elementoVisible,cloneName);
		        		reload=true;
		        	}else{
		        	var iframeToDelete=document.getElementById("special_widget0");
				    iframeToDelete.remove();
				    chrome.storage.local.set({"widgets":arrWidgets},function (){
			        	spinner.stop();
				        dialog.remove(); 
				        window.onbeforeunload=null;
				        iframeWin.removeEventListener('load', function(){}, false);
				        chrome.extension.sendMessage({operation:"WidgetCreated"}); 
			        });
			        }
		        }
		        if(reload){
		        	return "You should reload the page";
		        }else{
		        	return "Unsaved data might be lost if you leave now";
		        } 		
				};
}

function cualEsVisible(elemento){
	var visible=null;
	for(var i=0; i<elemento.children.length; i++){
		if($(elemento.children[i]).is(":visible")){
			visible=i;
		}
	}
	return visible;
}

function enviarPasos(dialog, spinner, xpath, arrWidgets, elementoVisible,cloneName){debugger;
	var pasos=new Array();
	chrome.extension.sendMessage({operation:"reload", xpath:xpath, pasos:pasos, widgets:arrWidgets, cloneName:cloneName, visible:elementoVisible, url:document.URL}); 
	spinner.stop();
	dialog.remove();
}

function primerElementoNoVisible(elemento){
	if(elemento.children[0]==undefined){
		return true;
	}
	var primerElemento=elemento.children[0];
	if($(primerElemento).is(":visible")){
		return true;
	}else{
		return false;
	}
}

function mergeWidgets(main,ne){
 var res;
 if(main.widgetType=="complex"){
  res=main;
 }else{
  res={type:main.type,widgetType:"complex",widgets:[main]};
 }

 if(ne.isForm){
  res.widgets.splice(0,0,ne);
 }else{
  res.widgets[res.widgets.length]=ne;  
 }

 return res;
}

function findNearest(includeLeft, includeRight, value, values) {
        var nearest = null;
        var diff = null;
        for (var i = 0; i < values.length; i++) {
            if ((includeLeft && values[i] <= value) || (includeRight && values[i] >= value)) {
                var newDiff = Math.abs(value - values[i]);
                if (diff == null || newDiff < diff) {
                    nearest = values[i];
                    diff = newDiff;
                }
            }
        }
        return nearest;
    }
	
function addBackground(elem){
    elem.addClass("wm_backgroundForeign");   
}
function restoreBackground(elem){
   elem.removeClass("wm_backgroundForeign");
}	

function cloneClick(ev){
    ev.preventDefault();
    ev.stopPropagation();
    removeActivateListeners();
   // var elem=$(ev.target);
    restoreBackground(elem); 
    elem.css({cursor: ""});
    if(isPosibleToMine()){     
    chrome.storage.local.get("widgets",function (obj){
    var arrWidgets=obj["widgets"]!=null?obj["widgets"]:[];
    var arrNames=$.map(arrWidgets,function(elem){return elem.type;});
    var dialog=$("<div id='dialog'></div>");

    $(document.body).append(dialog);
    dialog.load(chrome.extension.getURL("parts/cloneName.html"),function(){
    //$( "#widgetAdvanced" ).css("display","");        
    $( "#cloneName" ).autocomplete({minLength: 0, appendTo:dialog ,source:arrNames});    
    var wType;
    if(elem.attr("data-events")!=null||elem.find("[data-events]").length>0){
        wType="iframe";
    }else if((elem.tagName=="INPUT"||elem.find("input").length>0)&&!(elem.tagName=="FORM"||elem.parents("form").length>0)){
         wType="iframe";
    }else{
          wType="html";
    } 
    $(':radio[name="wmtype"][value="'+wType+'"]').prop('checked',true);
    dialog.dialog({
        resizable: false,
        modal: true,
        close: function( event, ui ){
			    event.stopPropagation();
                dialog.remove();
                deactivateClone();
		},
        buttons: {
            "Generate clone": function(e) {
       //     	$(document.body).css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
            	e.stopPropagation();
                onClickGenerate(dialog,elem,arrWidgets,wType);
                deactivateClone();    
            },
            Cancel: function(e) {
            	e.stopPropagation();
                dialog.remove();
                deactivateClone();
            }
        }
    });
    dialog.parent().zIndex(1000000000);
    $(".ui-widget-overlay").css({ "z-index": 10000000 });
    dialog.find("input").on('keypress', function(e) {
       if(e.keyCode==13){
    //   	$(document.body).css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
       		e.stopPropagation();
            onClickGenerate(dialog,elem,arrWidgets,wType); 
            deactivateClone();   
       }
    });
    });
    });
    }else{
         deactivateClone();
    }
}

function cloneMouseOver(eve) {
    eve.preventDefault();
    eve.stopPropagation();              
    elem=$(eve.target);
    if(isPosibleToMine()){
    	addBackground(elem); 
    	elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'}); 
    }    
}

function cloneMouseOut(eve) {
    eve.preventDefault();
    eve.stopPropagation();              
    //var elem=$(eve.target);
    restoreBackground(elem); 
    elem.css({cursor: ""});     
}

function activateKeys(e){
	if(e.keyCode==119){//w
		if(!contieneElementos(elem.parent())){
			if(!(elem.parent()[0]==document)){
				  restoreBackground(elem);
				  elem.css({cursor: ""});
				  elem=elem.parent();
				  if(elem[0].tagName=="TBODY"){
					    elem=elem.parent();
				  }
				  addBackground(elem);
				  elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'}); 
				  checkIfInViews(elem);
			}
		}
	}
	if(e.keyCode==115){//s
		if(!(elem.children()[0]==undefined)){
			   restoreBackground(elem);
			   elem.css({cursor: ""});
			   elem=elem.children()[0];
			   elem=$(elem);
			   addBackground(elem);
			   elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'}); 
			   checkIfInViews(elem);
		}
	}
	if(e.keyCode==97){//a
		if(!(elem.prev()[0]==undefined)){
			var pasoHechoA=false;
			var elemBorrarClassA=elem;
			var elemCambiadoA=false;
			while(!(elem.prev()[0]==undefined) && !pasoHechoA){
			    if(!(contieneElementos(elem.prev()))){
				   restoreBackground(elemBorrarClassA);
				   elem.css({cursor: ""});
				   elem=elem.prev();
				   pasoHechoA=true;
				   addBackground(elem);
				   elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'}); 
				   checkIfInViews(elem);
				 }
				 else{
				 	if(!elemCambiadoA){
			    		elemBorrarClassA=elem;
			    		elemCambiadoA=true;
			    	}
			    	elem=elem.prev();
				 }
			}
			if(!pasoHechoA){
			    elem=elemBorrarClassA;
			}
		}
	}
	if(e.keyCode==100){//d
		if(!(elem.next()[0]==undefined)){
			var pasoHechoD=false;
			var elemBorrarClassD=elem;
			var elemCambiadoD=false;
			while(!(elem.next()[0]==undefined) && !pasoHechoD){
				if(!(contieneElementos(elem.next()))){
				    restoreBackground(elemBorrarClassD);
				    elem.css({cursor: ""});
				    elem=elem.next();
				    pasoHechoD=true;
				    addBackground(elem);
				    elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'}); 
				    checkIfInViews(elem);
				  }
				  else{
				  	if(!elemCambiadoD){
			    		elemBorrarClassD=elem;
			    		elemCambiadoD=true;
			    	}
			    	elem=elem.next();
				  }
			}
			if(!pasoHechoD){
			    elem=elemBorrarClassD;
			}
		}
	}
	if(e.keyCode==32){//space
		cloneClick(e);
	}
}

function checkIfInViews(element){
    var offsetTop = element.offset().top - $(window).scrollTop();
    var offsetLeft = element.offset().left - $(window).scrollLeft();
    var moveTo={};
    if(offsetTop > window.innerHeight || (offsetTop + element.height())<0 ){
        moveTo.scrollTop=offsetTop;
    }
    if(offsetLeft > window.innerWidth || (offsetLeft + element.width())<0 ){
        moveTo.scrollLeft=offsetLeft;
    }
    if(moveTo.scrollTop!=null||moveTo.scrollLeft!=null){
    	reactivarWidgetizar();
        $('html,body').animate(moveTo, 1000, "swing", function(){
        	setTimeout(function(){widgetizar(element);},1);
        });
    }
} 

function contieneElementos(elem){
	 var flag=false;
	 var flug=false;
	for(var h=0; h<$("[data_wmwidget_id]").size(); h++){
		if(elem.closest("[data_wmwidget_id]")[0]==$("[data_wmwidget_id]")[h] || $.contains($("[data_wmwidget_id]")[h],elem[0])){
			flag=true;
		}
		if($.contains(elem[0],$("[data_wmwidget_id]")[h])){
			flug=true;
		}
	}
	return (flag || flug);
}

function isPosibleToMine(){
	var flag=false;
	var flug=false;
	if($("#extruderLeft")[0]!=undefined){
	var flog=$.contains($("#extruderBottom")[0],elem[0]);
	var flig=$.contains($("#extruderLeft")[0],elem[0]);
	var fleg=$('.wm_close')[0]==elem[0] || $('.wm_select')[0]==elem[0] || $('.wm_deselect')[0]==elem[0] || $('.wm_hide')[0]==elem[0] || $('.wm_undo')[0]==elem[0] || $('.wm_ventana')[0]==elem[0]|| $.contains($('.wm_close')[0],elem[0]) || $.contains($('.wm_select')[0],elem[0]) || $.contains($('.wm_deselect')[0],elem[0]) || $.contains($('.wm_hide')[0],elem[0]) || $.contains($('.wm_undo')[0],elem[0]) || $.contains($('.wm_ventana')[0],elem[0]);
		for(var h=0; h<$("[data_wmwidget_id]").size(); h++){
			if(elem.closest("[data_wmwidget_id]")[0]==$("[data_wmwidget_id]")[h] || $.contains($("[data_wmwidget_id]")[h],elem[0])){
				 flag=true;
			}
			if($.contains(elem[0],$("[data_wmwidget_id]")[h])){
				 flug=true;
			}
	}
}
else{
	var flog=false;
	var flig=false;
	var fleg=false;
}
	return (!flog && !flag && !fleg && !flig && !flug);
}

var CLONE_ACTIVATED=false;
var CLONE_ENABLED=false;

function activateClone(){
	if(CLONE_ACTIVATED)return;
	CLONE_ACTIVATED=true;
	$(document).click(cloneClick);
	$(document).mouseover(cloneMouseOver);
	$(document).mouseout(cloneMouseOut);
	$(document).keypress(activateKeys);	
}
function removeActivateListeners(){
	$(document).off("click",cloneClick);
	$(document).off("mouseover",cloneMouseOver);
	$(document).off("mouseout",cloneMouseOut);	
	$(document).off("keypress",activateKeys);
	$(".wm_backgroundForeign").removeClass("wm_backgroundForeign");		
	$(".wm_background").removeClass("wm_background");
}
function deactivateClone(){
	if(!CLONE_ACTIVATED)return;	
	CLONE_ACTIVATED=false;	
}
function onReceiveCloneMessage(request, sender, sendResponse) {debugger;
	  if(request.operation=="activateClone"){
	  	activateClone();
	  }
	   if(request.operation=="grabarPasos"){
	   	alert("CLICK ON THE ELEMENTS THAT ARE NECESSARY TO OBTAIN THE WIDGET");
	   	  observerObject = new MutationObserver(function(mutationRecordsList){
	   	  	$("click").off(document);
	   	  	setTimeout(function(){grabarPasos(request.xpath, request.pasos, request.widgets, request.visible, request.cloneName);}, 0);	
		  });
		  observeChange();
	  	grabarPasos(request.xpath, request.pasos, request.widgets, request.visible, request.cloneName);
	  }
}
function enableClone(){
	if(CLONE_ENABLED)return;
	CLONE_ENABLED=true;
	chrome.runtime.onMessage.addListener(onReceiveCloneMessage);
}
function disableClone(){
	if(!CLONE_ENABLED)return;	
	CLONE_ENABLED=false;
	chrome.runtime.onMessage.removeListener(onReceiveCloneMessage);
}
enableClone();
function onEditorEnable(request){debugger;
    if(request.operation=="activateEditor" && CLONE_ACTIVATED){
        removeActivateListeners();
        deactivateClone();
    }
    
}
chrome.runtime.onMessage.addListener(onEditorEnable);

function grabarPasos(xpathForeign, pasos, widgets, elementoVisible,cloneName){
	if(elementoVisible==null){
		gabrarPasosCroppedWebPage(xpathForeign, pasos, widgets,cloneName);
	}else{
		grabarPasosCroppedWidget(xpathForeign, pasos, widgets, elementoVisible,cloneName);
	}
}
function grabarPasosCroppedWidget(xpathForeign, pasos, widgets, elementoVisible,cloneName){
	var elemento=document.evaluate(xpathForeign, document.body, null, XPathResult.ANY_TYPE, null).iterateNext();
	var elementoVisibleActualmente=cualEsVisible(elemento);
	if(elemento!=null && elementoVisibleActualmente==elementoVisible){
		activadoListenerClick=false;
		  	observerObject.disconnect();
		  	$("click").off(document);
		  	widgets[widgets.length-1].pasos=pasos;
		  	 chrome.storage.local.set({"widgets":widgets}, function(){
		  	 	console.log("dentro");
		  	 	chrome.extension.sendMessage({operation:"WidgetCreated"}); 
		  	 	//alert("DONE!");
		  	 	introducirImagenWidgetCreado(cloneName);
		  	 });
	}else{
		if(!activadoListenerClick){
			activadoListenerClick=true;
			document.addEventListener("click",function(e){
				var existeEnPasos=false;
				for(var i=0; i<pasos.length; i++){
					if(pasos[i].elem==$(e.target)[0].outerHTML){
					  existeEnPasos=true;
					}
				}
				if(!existeEnPasos){
					var xpath=minimizeXPath(generateXPath(e.target,document,null,{showId:true}),document).join("");
					pasos.push({elem:$(e.target)[0].outerHTML, xpath:xpath});
					activadoListenerClick=false;
					$("click").off(document);
				}
			});
		}
	}
}
function gabrarPasosCroppedWebPage(xpathForeign, pasos, widgets,cloneName){
	var elemento=document.evaluate(xpathForeign, document.body, null, XPathResult.ANY_TYPE, null).iterateNext();
	if(elemento!=null){
		activadoListenerClick=false;
		  	observerObject.disconnect();
		  	$("click").off(document);
		  	widgets[widgets.length-1].pasos=pasos;
		  	 chrome.storage.local.set({"widgets":widgets}, function(){
		  	 	console.log("dentro");
		  	 	chrome.extension.sendMessage({operation:"WidgetCreated"});  
		  	 	//alert("DONE!");
		  	 	introducirImagenWidgetCreado(cloneName);
		  	 });
	}else{
		if(!activadoListenerClick){
			activadoListenerClick=true;
			document.addEventListener("click",function(e){
				var existeEnPasos=false;
				for(var i=0; i<pasos.length; i++){
					if(pasos[i].elem==$(e.target)[0].outerHTML){
					  existeEnPasos=true;
					}
				}
				if(!existeEnPasos){
					var xpath=minimizeXPath(generateXPath(e.target,document,null,{showId:true}),document).join("");
					pasos.push({elem:$(e.target)[0].outerHTML, xpath:xpath});
					activadoListenerClick=false;
					$("click").off(document);
				}
			});
		}
	}
}
var observerObject;
var activadoListenerClick=false;
function observeChange(){
  observerObject.observe(document.body, { 
    attributes: true,
   // attributeFilter: true,
    attributeOldValue: true,
    childList: true,
    characterData: true,
    subtree: true,
    characterDataOldValue: true
  });
}

