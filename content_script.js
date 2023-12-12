//@ sourceURL=content_script.js
//if(document.body.getAttribute("wm-initialized"))return;
//document.body.setAttribute("wm-initialized","true");

/*var numerodeWidget=0;
var numWidgetListToDelete=0;
var numeroTransiciones=0;
var posUltimoWidget=-1;
var savingExporting=false;
var isDragAndDroping=false;

if(typeof CLONE_ACTIVATED === "undefined" && typeof CLONE_ENABLED === "undefined"){
    CLONE_ACTIVATED=false;
    CLONE_ENABLED=false;
}

function onCloneEnable(request){
    if(request.operation=="activateClone"){
		$(".wm_background").removeClass("wm_background");
		$(".wm_backgroundForeign").removeClass("wm_backgroundForeign");			
    }   
}
chrome.runtime.onMessage.addListener(onCloneEnable);


var widgetList = new Array();
var widgetsInserted = new Array();*/
//$('body').append("<div id=\"extruderLeft\" class=\"{title:'Piggy Bank', url:'"+chrome.extension.getURL("parts/extruderLeft.html")+"'}\"></div>");
//$('body').append("<div id=\"extruderBottom\" class=\"{title:'Animation', url:'"+chrome.extension.getURL("parts/extruderBottom.html")+"'}\"></div>");
//$('body').append("<div id=\"iframeLeft\" class=\"{title:'iframeLeft', url:'"+chrome.extension.getURL("parts/iframeLeft.html")+"'}\"></div>");
/*$("#extruderLeft").buildMbExtruder({
          positionFixed:true,
          width:200, //originalmete estaba a 300
          sensibility:800,
          position:"left", // left, right, bottom
          extruderOpacity:1,
          flapDim:100,
          textOrientation:"tb", // or "tb" (top-bottom or bottom-top)
          onExtOpen:function(){
          },
          onExtContentLoad:function(){
          	$('body').off("click");
          //	$("body *").removeClass("wm_backgroundForeign");
          	widgetList.push({type:"Link", html:""});
          	widgetList.push({type:"Image", html:""});
          	widgetList.push({type:"Button", html:""});
          	var linkButton=$("<div><a id='link' href='link' onclick='return false'>Link</a></div>");
          	var imageButton=$("<div><a id='image' href='image' onclick='return false'>Image</a></div>");
          	var buttonButton=$("<div><a id='button' href='button' onclick='return false'>Button</a></div>");
          //	var clonButton=$('<button id="clone">Clone</button>');
          	var widgetizarButton=$('<button id="widgetizar">Widgetize</button>');
          	//var eliminarWidgetImage="<span class='wm_eliminar'><img src="+chrome.extension.getURL('images/eliminar.jpg')+"  height='20' width='20'></span>";
         // 	$("#buttonLeft").append(clonButton);
          	$("#buttonLeft").append(widgetizarButton);
          	$("#foreignClones").append(linkButton);
			$("#foreignClones").append(imageButton);
			$("#foreignClones").append(buttonButton);
			//$("#foreignClones a").after("<span class='wm_eliminar'><img src="+chrome.extension.getURL('images/eliminar.jpg')+"  height='20' width='20'></span>");
          	$("#nuevoAcordeon").accordion();
          	$("#primerAcordeon").accordion();
          	$("#buttonLeft button").button();
          	$("#buttonLeft button").css("width","100%");
          	$("#accordionLeft a").button();
          	$("#accordionLeft button").button();
          	$("#accordionLeft a").css("width","100%");
          	$("#accordionLeft div").css("height","");
          	$(document.body).append("<div class='wm_closeVentana'>");
          	$(".wm_closeVentana").append("<span class='w_close wm_close'>X</span>");
          	$(".wm_closeVentana").append("<span class='w_close wm_select'><img src="+chrome.extension.getURL('images/Select.png')+"  height='20' width='20'></span>");
          	$(".wm_closeVentana").append("<span class='w_close wm_deselect'><img src="+chrome.extension.getURL('images/Deselect.png')+"  height='20' width='20'></span>");
          	$(".wm_closeVentana").append("<span class='w_close wm_hide'><img src="+chrome.extension.getURL('images/Hide2.png')+"  height='20' width='20'></span>");
          	$(".wm_closeVentana").append("<span class='w_close wm_undo'><img src="+chrome.extension.getURL('images/undo.png')+"  height='20' width='20'></span>");
          	$(document.body).append("<div class='wm_sparkVentana'>");
          	$('.wm_sparkVentana').append("<span class='wm_spark wm_sparkclick'>onClick</span>");
          	$('.wm_sparkVentana').append("<span class='wm_spark wm_sparkdblclick'>onDoubleClick</span>");
          	$('.wm_sparkVentana').append("<span class='wm_spark wm_sparkmouseenter'>onMouseEnter</span>");
          	$('.wm_sparkVentana').append("<span class='wm_spark wm_sparkmouseleave'>onMouseLeave</span>");
          	$(".wm_closeVentana").append("<div class='wm_ventana'>");
          	$('.wm_ventana').append(" ");
          	$('.wm_ventana').attr("draggable","true");

       	
            chrome.storage.local.get("widgets",function (obj){
			 var tempWidgetList=obj["widgets"]!=null?obj["widgets"]:[];
			 var fClones=$("#foreignClones");
			 $(tempWidgetList).map(function(n, elem){
			 	fClones.append(createWidget(elem.type,elem.html));
			 });
			 widgetList=widgetList.concat(tempWidgetList);
          	 artivarEventos(); 
          	 comprobarCambioEstado();
          	 insertarForeignWidgetsInmediatamente();         			 
	        });
          	numeroTransiciones++;
          },
          onExtClose:function(){},
          hidePanelsOnClose:true,
          autoCloseTime:0, // 0=never
          slideTimer:300,
          accordionPanels: false 
      }).zIndex(1000000000);    
function createWidget(cloneName,html){
	var nButton=$("<div><a id='"+cloneName+"'href='#' class='foreignCloneToolButton' onclick='return false'>"+cloneName+"</a></div>");
	$(nButton).append("<div id='foreignCloneToolButtonDelete-"+numWidgetListToDelete+"' class='foreignCloneToolButtonDelete'><img src='"+chrome.extension.getURL('images/eliminar.png')+"' style='float:left;' onclick='return false;'></img></div>");
	numWidgetListToDelete++;
	$("a",nButton).button();
	//$("a",nButton).css({width:"100%"});
	$("a",nButton).attr("type_wmbutton_toinsert", "foreignClone");
	//$(html).attr("draggable","true");
	return nButton;  
};*/
/*$("#extruderBottom").buildMbExtruder({
          positionFixed:true,
          width:1200,
          sensibility:800,
          position:"bottom", // left, right, bottom
          extruderOpacity:1,
          flapDim:100,
          textOrientation:"bt", // or "tb" (top-bottom or bottom-top)
          onExtOpen:function(){},
          onExtContentLoad:function(){},
          onExtClose:function(){},
          hidePanelsOnClose:false,
          autoCloseTime:0, // 0=never
          slideTimer:300,
          accordionPanels: false,
	  closeOnExternalClick:false,
	  closeOnClick:false          
      });
      
$("#extruderBottom").openMbExtruder(false);
$("#extruderBottom").closeMbExtruder();*/
//$("#extruderLeft .content").css("background","white");



/*function evitarClicksIndeseados(){
	$('[data_wmwidget_id]').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			eliminarEventos();
			artivarEventos();
	});
}

function evitarClicksIndeseados2(){
	$('[data_wmwidget_id]').click(function(e){
			e.preventDefault();
			e.stopPropagation();
	});
}

function nombreCorrecto(cloneName){
	var valorCorrecto;
	if( cloneName == null || cloneName.length == 0 || /^\s+$/.test(cloneName) ){
		valorCorrecto=false;
	}
	else{
	     valorCorrecto=true;
	}
	return valorCorrecto;
}*/

/*function insertarForeignWidgetsInmediatamente(){
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
		if(request.operation=="WidgetAvailable"){
			chrome.storage.local.get("widgets",function (obj){
			var tempWidgetList=obj["widgets"]!=null?obj["widgets"]:[];
			var ultimoWidget=tempWidgetList[tempWidgetList.length-1];
			 var fClones=$("#foreignClones");
			 if(ultimoWidget.type!=widgetList[widgetList.length-1].type){//esto kiere decir q no se ha anadido ninguno nuevo
				 $(ultimoWidget).map(function(n, elem){
				 	fClones.append(createWidget(elem.type,elem.html));
				 });
			
				 widgetList=widgetList.concat(tempWidgetList[tempWidgetList.length-1]);
				 eliminarEventos();
				 artivarEventos(); 
			}
			else{
				for (var i=0; i<tempWidgetList.length; i++){
					if (tempWidgetList[i].widgetType=="complex"){
						for(var j=0; j<widgetList.length; j++){
							if(widgetList[j].type==tempWidgetList[i].type){
								widgetList[j]=tempWidgetList[i];
							}
						}
					}
				}
			}
			});
		}
	});
}

function deleteWidgetFromWidgetList(){
	var widgetToDelete;
	$('.foreignCloneToolButtonDelete').click(function(e){	
		eliminarEventos();
		e.preventDefault();
		e.stopPropagation();
		var elem=$(e.target);
		if(elem[0].id==""){
			elem=elem[0].parentNode;
		}
		else{
			elem=elem[0];
		}
		widgetToDelete=elem.id.getWidgetIdentifier();
		widgetToDelete=parseInt(widgetToDelete)+3;//hay que tener en cuenta q en widgetList los 3 primeros son link, image y button
		//var eliminado=widgetList.splice(widgetToDelete,1);
		$(elem).remove();
		$('#'+widgetList[widgetToDelete].type).remove();
		widgetList[widgetToDelete].type="";
		widgetList[widgetToDelete].xpath="";
		widgetList[widgetToDelete].widgetType="";
		widgetList[widgetToDelete].html="";
		widgetList[widgetToDelete].url="";
		chrome.storage.local.get("widgets",function (obj){
			 var tempWidgetList=obj["widgets"]!=null?obj["widgets"]:[];
			 var widgetAEliminar=widgetToDelete-3;
			 var deleted=tempWidgetList.splice(widgetAEliminar,1);
			 chrome.storage.local.set({"widgets":tempWidgetList});	
			 artivarEventos();
		      }); 
		});
//	});
}*/




/*function checkIfInView(element){
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

function reactivarWidgetizar(){
	$(document).off('click');
	$(document).off('keypress');
	$(document).off('mouseover');
	$(document).off('mouseout');
	$("#buttonLeft a").off('mousedown');
	$("#widgetizar").off('click');
	$("#clone").off('click');
	$("#extruderLeft").off('click');
}

function contieneElemento(elem){
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

function contieneRestoElementos(elem){
	var nodosPadre=$('html')[0]==elem[0] || $('body')[0]==elem[0];
	var flog=$.contains($("#extruderBottom")[0],elem[0]);
	var flig=$.contains($("#extruderLeft")[0],elem[0]);
	var fleg=$('.wm_close')[0]==elem[0] || $('.wm_select')[0]==elem[0] || $('.wm_deselect')[0]==elem[0] || $('.wm_hide')[0]==elem[0] || $('.wm_undo')[0]==elem[0] || $('.wm_ventana')[0]==elem[0] || $.contains($('.wm_close')[0],elem[0]) || $.contains($('.wm_select')[0],elem[0]) || $.contains($('.wm_deselect')[0],elem[0]) || $.contains($('.wm_hide')[0],elem[0]) || $.contains($('.wm_undo')[0],elem[0]) || $.contains($('.wm_ventana')[0],elem[0]);
	return (flog || flig || fleg || nodosPadre);		        	
}

function contieneElementoDragAnddrop(elem){
	 var flag=false;
	 var flug=false;
	for(var h=0; h<$("[data_wmwidget_id]").size(); h++){
		if($.contains($("[data_wmwidget_id]")[h],elem[0])){
			flag=true;
		}
		if($.contains(elem[0],$("[data_wmwidget_id]")[h])){
			flug=true;
		}
	}
	return (flag || flug);
}*/

/*function widgetizadoSpace(elem, ev){
	//NO ES EXACTAMENTE IGUAL QUE CUANDO HACES CLICK CON EL RATON
	var poderWidgetizar=true;
	var selection = window.getSelection();//para evitar widgetizar si se selecciona algo
					if(!CLONE_ACTIVATED &&!savingExporting && selection.isCollapsed && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
					if(poderWidgetizar){
					console.log("widgetizar clickDocument");						
			        	if(!contieneRestoElementos(elem) && !contieneElemento(elem)){
			        		widgetizeEtiquetar(elem);
                     	}
                      else{
                      	elem.css({background:elem.attr("viejoBackground")});
                      	eliminarEventos();
						artivarEventos();
                      }
                     }
                    }
}

function widgetizeEtiquetar(elem){
	var dialog=$("<div id='dialog'></div>");
	var algo2 = CanvasConstraints.getCurrentState();
			        	algo2.push({widget:"widgetized-"+numerodeWidget, action:"Enable"});
			        	CanvasConstraints.setCurrentState(algo2);
			        	var lista = DiagramConstraints.getWidgets();
			        	lista.push("widgetized-"+numerodeWidget);
			        	CanvasConstraints.setWidgets(lista);
						$('[class*=wm_selected]').removeClass("wm_selected");
						elem.closest("[data_wmwidget_id]").addClass("wm_selected");
						elem.attr("draggable","true");
						elem.attr("title","widgetized"+numerodeWidget);
						elem.attr("data_wmwidget_id", ""+numerodeWidget);
						elem.attr("data_wmwidget_foreignCloned_type", "false");
						elem.removeClass("wm_background");
						elem.css({cursor: ""});
						elem.addClass("resizable");
						//Al clonar, si el elemento tiene un ID habria problemas (no puede haber 2 elementos con el mismo ID) y habria q vaciar el original
						var copiaParaInsertar=elem.clone();
						copiaParaInsertar.attr("data_wmwidget_type", "widgetized");
						elem.attr("data_wmwidget_type", "original_widgetized");
						elem.after(copiaParaInsertar);
				//     var widgetizadoName=document.getElementById("cloneName").value;
						var listaEstados= new Array();
				//AQUI DEBO EXTRAER EL ESTADO EN EL QUE ESTA EL DTE
						listaEstados.push({estadoWidget: "enable", estadoDTE: "Initial"});
						widgetsInserted.push({type:"widgetized-"+numerodeWidget, html:elem, widget:"w_number"+numerodeWidget, estados:listaEstados});
						numerodeWidget++;
						dialog.remove(); 
					    eliminarEventos();
						artivarEventos();
}*/

/*function widgetizar(anteriorElem){
    var elem=anteriorElem;
	var poderWidgetizar=true;
			console.log("widgetizar clickWidgetizar");
				$(document).click(function(ev){
					ev.preventDefault();
						ev.stopPropagation();
					var selection = window.getSelection();//para evitar widgetizar si se selecciona algo
					// se ha quitado el isDragAndDroping de este if xq si se hace drop en un iframe, no deja widgetizar un elemento despues
					if(!CLONE_ACTIVATED && $("#wm_dialog2")[0]==undefined &&!savingExporting && selection.isCollapsed && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
					if(poderWidgetizar){
					console.log("widgetizar clickDocument");						
			        	var elemento=$(ev.target);
			        	if(!contieneRestoElementos(elemento) && !contieneElemento(elemento)){
							 widgetizeEtiquetar(elem);
                      	}
                      else{
                      	elem.css({background:elem.attr("viejoBackground")});
                      	eliminarEventos();
						artivarEventos();
                      }
                     }
                    }
			        });
			        
			    $(document).keypress(function(e) {
			    	if(!CLONE_ACTIVATED &&!savingExporting && !isDragAndDroping && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
			    	if(e.keyCode==119){//w
			    		if(!contieneElemento(elem.parent())){
			    			//if(elem.parent()[0].tagName=="BODY"){debugger;}
				    		if(!(elem.parent()[0]==document) && !(elem.parent()[0].tagName=="BODY")){
								elem.removeClass("wm_background");
					    		elem=elem.parent();
					    		if(elem[0].tagName=="TBODY"){
					    			elem=elem.parent();
					    		}
						        elem.addClass("wm_background");
						        checkIfInView(elem);
						        elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
						     }
					     }
			    	}
			    	if(e.keyCode==115){//s
			    		if(!(elem.children()[0]==undefined)){
							elem.removeClass("wm_background");
				    		elem=elem.children()[0];
				    		elem=$(elem);
					        elem.addClass("wm_background");
					        checkIfInView(elem);
					        elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
					    }
			    	}
			    	if(e.keyCode==97){//a
			    		if(!(elem.prev()[0]==undefined)){//debugger;
			    			var pasoHechoA=false;
			    			var elemBorrarClassA=elem;
			    			var elemCambiadoA=false;
			    			while(!(elem.prev()[0]==undefined) && !pasoHechoA){
			    				if(!(contieneElemento(elem.prev()))){
			    					elemBorrarClassA.removeClass("wm_background");
			    					elem=elem.prev();
			    					pasoHechoA=true;
			    					elem.addClass("wm_background");
					       			checkIfInView(elem);
					        		elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
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
			    		if(!(elem.next()[0]==undefined)){//debugger;
			    			var pasoHechoD=false;
			    			var elemBorrarClassD=elem;
			    			var elemCambiadoD=false;
			    			while(!(elem.next()[0]==undefined) && !pasoHechoD){
			    				if(!(contieneElemento(elem.next()))){
			    					elemBorrarClassD.removeClass("wm_background");
			    					elem=elem.next();
			    					pasoHechoD=true;
			    					elem.addClass("wm_background");
					        		checkIfInView(elem);
					        		elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
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
						widgetizadoSpace(elem, e);
					}
			    	}
			    });
			      
			    $(document).mouseover(function(eve){
			    	if(!CLONE_ACTIVATED &&!savingExporting && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
			    	console.log("widgetizar mouseoverDocument");
			        eve.preventDefault();
			        eve.stopPropagation();   
					if(!$.contains($("#extruderLeft"),eve.target) && !$.contains($("[data_wmwidget_id]"),eve.target)){
			        elem=$(eve.target);
			        if(!contieneRestoElementos(elem) && !contieneElemento(elem)){
			        	poderWidgetizar=true;
			        elem.addClass("wm_background");
			        elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
			        }
			        else{
			        	poderWidgetizar=false;
			        }
			        }
			       }
			    });
			    
			    
			    $(document).mouseout(function(eve) {
			    	if(!CLONE_ACTIVATED &&!savingExporting && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
			    	console.log("widgetizar mouseleaveDocument");
			        eve.preventDefault();
			        eve.stopPropagation();
					if(!$.contains($("#extruderLeft"),eve.target) && !$.contains($("[data_wmwidget_id]"),eve.target)){							        
						elem.removeClass("wm_background");
						elem.css({cursor: ""});
			       		}
			       	}
			       	$("#extruderLeft .content").css("background","white");
			       	$("#extruderBottom .content").css("background","white");			        
			    });
			    
			    $("#buttonLeft a").mousedown(function(evento){
			    	if(!CLONE_ACTIVATED &&!savingExporting && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
			     	eliminarEventos();
					artivarEventos();
					}
			     });
			     $("#widgetizar").click(function(event){
			     	if(!CLONE_ACTIVATED &&!savingExporting && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
			     	eliminarEventos();
					artivarEventos();
					}
			     });
			     $("#clone").click(function(event){
			     	if(!CLONE_ACTIVATED &&!savingExporting && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
			     	eliminarEventos();
					artivarEventos();
					}
			     });
			     $("#extruderLeft").click(function(event){
			     	if(!CLONE_ACTIVATED &&!savingExporting && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
			     	var elem=$(event.target);
			     	elem.css({background:elem.attr("viejoBackground")});
			     	eliminarEventos();
					artivarEventos();
					}
			     });

}*/

/*function dragMoveOver(e, position, div1){
	e.preventDefault();
	e.stopPropagation();
	if(!$.contains($("#extruderLeft"),e.target)){
		var elem=$(e.target);			        
		var xInside=e.originalEvent.pageX-elem.offset().left;
		var middle=elem.outerWidth()/2;
		var actPosition=xInside<middle?"left":"right";
		if(position!=actPosition){
			 div1.remove();
			 var elem2=$(e.target);
			 var flog=$.contains($("#extruderBottom")[0],elem2[0]);
			 var flig=$.contains($("#extruderLeft")[0],elem2[0]);
			 if(!flog && !flig && !contieneElementoDragAnddrop(elem)){
			        	if(actPosition=="left"){
			        		div1.find("div").text("B");
			        		div1.css('color', 'white');
			        		elem.before(div1);
			        	}else{
			        		div1.find("div").text("A");
			        		div1.css('color', 'white');
			        		elem.after(div1);
			        	}
			   }
		 }
		 position=actPosition;
	 }
	 return position;
}

function dragMoveEnter(e){
	e.preventDefault();
	e.stopPropagation();
	var elem2=$(e.target);
	var flog=$.contains($("#extruderBottom")[0],elem2[0]);
	var flig=$.contains($("#extruderLeft")[0],elem2[0]);
	if(!$.contains($("#extruderLeft"),e.target) && !flog && !flig && !contieneElementoDragAnddrop(elem2)){
		var elem=$(e.target);
		var oldBackground=elem[0].style.background;
		if(oldBackground!=""){
			elem.attr("viejoBackground", oldBackground);
		}
			elem.css({background:"orange"});
	}
}

function dragMoveLeave(e, div1, position){
	if(!$.contains($("#extruderLeft"),e.target) || !contieneElementoDragAnddrop(e.target)){			        
		var elem=$(e.target);
		var viejoBackground=elem.attr("viejoBackground");
		if(viejoBackground!=null){
			elem.css({background:viejoBackground});
			elem.removeAttr("viejoBackground");
		}else{
			elem[0].style.background="";
		}
		div1.remove();
		position="uknown";
	}	
	return position;
}*/

/*function dragMoveDrop(e, div1, elementoClick, tipoMovimiento, elemento, position, elementoClonado){
	var elem=$(e.target);
          	 var flag=$.contains($("#extruderLeft")[0],elem[0]);
          	 var flog=$.contains($("#extruderBottom")[0],elem[0]);
          	 var nodosPadre=$('html')[0]==elem[0] || $('body')[0]==elem[0];
          	 if(nodosPadre){alert("It is impossible to insert the element here");}
          	 	 if(flag || flog || contieneElementoDragAnddrop(elem) && !nodosPadre){	
						var viejoBackground=elem.attr("viejoBackground");
							        if(viejoBackground!=null){
								        elem.css({background:viejoBackground});
								        elem.removeAttr("viejoBackground");
							        }else{
							        	elem[0].style.background="";
							        }
          	 	 	div1.remove();
          	       eliminarEventos();
				   artivarEventos();
		         }
		       else{
		    	e.preventDefault();
			    e.stopPropagation(); 
			    eliminarEventos();		        
			  var viejoBackground=elem.attr("viejoBackground");
							        if(viejoBackground!=null){
								        elem.css({background:viejoBackground});
								        elem.removeAttr("viejoBackground");
							        }else{
							        	elem[0].style.background="";
							        }
		      div1.remove();
		      if(tipoMovimiento=="move"){
		      	if(elem[0]!=elemento[0]){
			      	elemento.remove();
			      	if(position=="left"){
					  elem.before(elemento);
				 	 }
				 	 else{//} if(position=="right"){ 
					   elem.after(elemento);
				  	}
			  	}
				eliminarEventos();
				artivarEventos();
		      }
		      else{
		      if(elementoClick.id=="link"){
			    	insertarLink(elementoClick, position, elem);
		       }//if link
		       else if(elementoClick.id=="image"){
		         insertarImagen(elementoClick, position, elem);
		       }// if image
		       else if(elementoClick.id=="button"){
		         insertarButton(elementoClick, position, elem);
		        }//if button
		      else if(elementoClick!="link" && elementoClick!="image" && elementoClick!="button"){
		      	if(elementoClick.attributes.type_wmbutton_toinsert.textContent=="foreignClone"){
		          insertarClon(elementoClick, position, elem, elementoClonado, "foreign");
		         }
		         else{
		         	 insertarClon(elementoClick, position, elem, elementoClonado, "local");
		         }
		       }//if clone
		       }	
		    }
}*/

/*function dragAndDropForeignClones(){
	//debugger;
	 $("#foreignClones a").click(function(evento){
	 	eliminarEventos();
		artivarEventos();
	 });
	
	 $("#foreignClones a").mousedown(function(evento){
	 	console.log("drag&drop mousedownButtonleftA");
	 	if (CanvasConstraints.getSparks()==null){
	 	elementoClick=evento.currentTarget;
	 	var elementoClonado=evento.currentTarget.id;
	 	 var div1=$("<div style='position: relative !important; height:0px !important;width:0px !important; z-index:1000000 !important;'><div style='height:30px !important;width:30px !important;background:blue !important;display:block !important; position: absolute;'></div></div>");
            var position="uknown";
            
            $("#foreignClones a").mouseup(function(ev){
            	eliminarEventos();
				artivarEventos();
            });
            
			     $("#widgetizar").click(function(event){
			     	eliminarEventos();
					artivarEventos();
			     });
			     $("#clone").click(function(event){
			     	eliminarEventos();
					artivarEventos();
			     });
            
            $(document).on(
			    'dragover',
			    function(e) {
			    	console.log("drag&drop dragover");
			        position=dragMoveOver(e, position, div1);
			    }
			    
			);
            $(document).on(
			    'dragleave',
			    function(e) {
			    	console.log("drag&drop dragleave");
			        e.preventDefault();
			        e.stopPropagation(); 
			        isDragAndDroping=true;
			        if($("#extruderLeft").attr("isOpened")){
				        $("#extruderLeft").closeMbExtruder();
			        }
			        if($("#extruderBottom").attr("isOpened")){
				        $("#extruderBottom").closeMbExtruder();
			        }
			        autoCloseTime:10;
					position=dragMoveLeave(e, div1, position);	        
			    }
			);
			$(document).on(
			    'dragenter',
			    function(e) {
			    	console.log("drag&drop dragenter");
			        dragMoveEnter(e);
			    }
			);
          	$(document).on(
          	  "drop",
          	 function( e ) {
          	 	console.log("drag&drop drop");
          	 	$("#extruderLeft .content").css("background","white");
          	    dragMoveDrop(e, div1, elementoClick, "dragAndDrop", null, position, elementoClonado);
      		});
         }
      });
}

function move(){
	
	$(".wm_ventana").mousedown(function(evento){
		console.log("move mousedown");
	 	  var div1=$("<div style='position: relative !important; height:0px !important;width:0px !important; z-index:1000000 !important;'><div style='height:30px !important;width:30px !important;background:blue !important;display:block !important; position: absolute;'></div></div>");  var position="uknown";
            var elemento=$(".wm_selected");
          	var position="uknown";
            var clone=elemento.clone();
            console.log(clone.html());
            
            $(document).mouseup(function(ev){
            	console.log("move mouseup");
            	eliminarEventos();
				artivarEventos();
            });
            
            $(document).on(
			    'dragover',
			    function(e) {
			    	console.log("move dragover");
			        position=dragMoveOver(e, position, div1);
			    } 
			);
			
			$(document).on(
			    'dragenter',
			    function(e) {
			    	console.log("move dragenter");
			        dragMoveEnter(e);
			    }
			);
			
            $(document).on(
			    'dragleave',
			    function(e) {
			    	console.log("move dragleave");
			        e.preventDefault();
			        e.stopPropagation();
			        autoCloseTime:10;
			        desviarBotonesYSparks();
					position=dragMoveLeave(e, div1, position);			        
			    }
			);
          	$(document).on(
          	  "drop",
          	 function( e ) {
          	 	console.log("move drop");
          	 	dragMoveDrop(e, div1, null, "move", elemento, position, null);
      		});
	});
}*/

/*function desviarBotonesYSparks(){
	$('.wm_close').css('top', -1000); 
	$('.wm_close').css('left', -1000); 
	$('.wm_select').css('top', -1000); 
	$('.wm_select').css('left', -1000);
	$('.wm_deselect').css('top', -1000); 
	$('.wm_deselect').css('left', -1000);
	$('.wm_hide').css('top', -1000); 
	$('.wm_hide').css('left', -1000);
	$('.wm_undo').css('top', -1000); 
	$('.wm_undo').css('left', -1000);
	$('.wm_ventana').css('top', -1000); 
	$('.wm_ventana').css('left', -1000);
	$(".wm_sparkclick").css('top', -1000); 
	$(".wm_sparkclick").css('left', -1000);
	$(".wm_sparkdblclick").css('top', -1000); 
	$(".wm_sparkdblclick").css('left', -1000);
	$(".wm_sparkmouseenter").css('top', -1000); 
	$(".wm_sparkmouseenter").css('left', -1000);
	$(".wm_sparkmouseleave").css('top', -1000); 
	$(".wm_sparkmouseleave").css('left', -1000);
}

function incluirSparks(){
	$('[data_wmwidget_id]').hover(
				        	function(e) {
				        		if (CanvasConstraints.getSparks()!=null){
					        		var posestadoTransition=0;
					        		var introducirSparks=false;
					        		console.log("spark hover in");
					        		var estadoTransition=[];
					        		var elementoHover=$(e.target);
					        		$('[class*=wm_selected]').removeClass("wm_selected");
					        		elementoHover.closest("[data_wmwidget_id]").addClass("wm_selected");
					        		var widgetUltimo = extraerPoswidget();
					        		var currentState=CanvasConstraints.getCurrentState();
					        		for(var j=0; j<currentState.length; j++){
					        			if(currentState[j].widget.getWidgetIdentifier()==widgetUltimo){
					        				if(currentState[j].action=="Enable"){
					        					introducirSparks=true;
					        				}
					        			}
					        		}
					        		if(introducirSparks){
						        		if(elementoHover.closest("[data_wmwidget_id]").hasClass("wm_selected")){
						        		 	$(".wm_sparkclick").css('top', elementoHover.closest("[data_wmwidget_id]").offset().top); 
						        		 	$(".wm_sparkclick").css('left', elementoHover.closest("[data_wmwidget_id]").offset().left+elementoHover.width());//35 es el ancho de cada boton
						        		 	$(".wm_sparkdblclick").css('top', elementoHover.closest("[data_wmwidget_id]").offset().top+$(".wm_spark").height()+5); 
						        		 	$(".wm_sparkdblclick").css('left', elementoHover.closest("[data_wmwidget_id]").offset().left+elementoHover.width());
						        		 	$(".wm_sparkmouseenter").css('top', elementoHover.closest("[data_wmwidget_id]").offset().top+$(".wm_spark").height()+$(".wm_spark").height()+10); 
						        		 	$(".wm_sparkmouseenter").css('left', elementoHover.closest("[data_wmwidget_id]").offset().left+elementoHover.width());
						        		 	$(".wm_sparkmouseleave").css('top', elementoHover.closest("[data_wmwidget_id]").offset().top+$(".wm_spark").height()+$(".wm_spark").height()+$(".wm_spark").height()+15); 
						        		 	$(".wm_sparkmouseleave").css('left', elementoHover.closest("[data_wmwidget_id]").offset().left+elementoHover.width());
						        		 	console.log("offserHeight   "+elementoHover.closest("[data_wmwidget_id]").width());
						        		
						        		 	var sparks = CanvasConstraints.getSparks();
						        		 	for(var i=0; i<sparks.length; i++){
						        		 		if(sparks[i].widget==widgetsInserted[widgetUltimo].type){
						        		 			estadoTransition[posestadoTransition]={event: sparks[i].event, widget: sparks[i].widget};
						        		 			//estadoTransition[posestadoTransition].event=sparks[i].event;
						        		 			//estadoTransition[posestadoTransition].widget=sparks[i].widget;
						        		 			posestadoTransition++;
						        		 		} 
						        		 	}
						        		 	var currentSpark = CanvasConstraints.getCurrentSpark();
						        		 	$('.wm_sparkclick').css('border', "5px solid rgba(0,0,0,0.5)");
						        		 	$('.wm_sparkdblclick').css('border', "5px solid rgba(0,0,0,0.5)");
						        		 	$('.wm_sparkmouseenter').css('border', "5px solid rgba(0,0,0,0.5)");
						        		 	$('.wm_sparkmouseleave').css('border', "5px solid rgba(0,0,0,0.5)");
						        		 	$('.wm_sparkclick').css('opacity', "1.0");
						        		 	$('.wm_sparkdblclick').css('opacity', "1.0");
						        		 	$('.wm_sparkmouseenter').css('opacity', "1.0");
						        		 	$('.wm_sparkmouseleave').css('opacity', "1.0");
						        		// debugger;
						        		 	for(var j=0; j<estadoTransition.length; j++){
							        		 	if(estadoTransition[j].event=="onClick"){
							        		 		$('.wm_sparkclick').css('border', "5px solid rgba(0,191,255,0.5)");
							        		 		if(currentSpark.event!=estadoTransition[j].event && currentSpark.widget!=estadoTransition[j].widget){
							        		 			//$('.wm_sparkclick').css('opacity', "0.5");
							        		 			$('.wm_sparkdblclick').css('opacity', "0.5");
							        		 			$('.wm_sparkmouseenter').css('opacity', "0.5");
							        		 			$('.wm_sparkmouseleave').css('opacity', "0.5");
							        		 		}
							        		 	}
							        		 	
							        		 	else if(estadoTransition[j].event=="onDoubleClick"){
							        		 		$('.wm_sparkdblclick').css('border', "5px solid rgba(0,191,255,0.5)");
							        		 		if(currentSpark.event!=estadoTransition[j].event && currentSpark.widget!=estadoTransition[j].widget){
							        		 			$('.wm_sparkclick').css('opacity', "0.5");
							        		 		//	$('.wm_sparkdblclick').css('opacity', "0.5");
							        		 			$('.wm_sparkmouseenter').css('opacity', "0.5");
							        		 			$('.wm_sparkmouseleave').css('opacity', "0.5");
							        		 		}
							        		 	}
							        		 	
							        		 	else if(estadoTransition[j].event=="onMouseEnter"){
							        		 		$('.wm_sparkmouseenter').css('border', "5px solid rgba(0,191,255,0.5)");
							        		 		if(currentSpark.event!=estadoTransition[j].event && currentSpark.widget!=estadoTransition[j].widget){
								        		 		$('.wm_sparkclick').css('opacity', "0.5");
								        		 		$('.wm_sparkdblclick').css('opacity', "0.5");
								        		 	//	$('.wm_sparkmouseenter').css('opacity', "0.5");
								        		 		$('.wm_sparkmouseleave').css('opacity', "0.5");
								        		 	}
							        		 	}
							        		 	
							        		 	else if(estadoTransition[j].event=="onMouseLeave"){
							        		 		$('.wm_sparkmouseleave').css('border', "5px solid rgba(0,191,255,0.5)");
							        		 		if(currentSpark.event!=estadoTransition[j].event && currentSpark.widget!=estadoTransition[j].widget){
							        		 			$('.wm_sparkclick').css('opacity', "0.5");
							        		 			$('.wm_sparkdblclick').css('opacity', "0.5");
							        		 			$('.wm_sparkmouseenter').css('opacity', "0.5");
							        		 		//	$('.wm_sparkmouseleave').css('opacity', "0.5");
							        		 		}
							        		 	}
						        		 	
						        		 	}
								        	$(document).find('.wm_sparkclick').delay(0).fadeIn(0);
								        	$(document).find('.wm_sparkdblclick').delay(0).fadeIn(0);
								        	$(document).find('.wm_sparkmouseenter').delay(0).fadeIn(0);
								        	$(document).find('.wm_sparkmouseleave').delay(0).fadeIn(0);
								        } 
							        }
						        }  
						    },
						    function(e) {
						        $(document).find('.wm_sparkclick').delay(0).fadeOut(0);
						        $(document).find('.wm_sparkdblclick').delay(0).fadeOut(0);
						        $(document).find('.wm_sparkmouseenter').delay(0).fadeOut(0);
						        $(document).find('.wm_sparkmouseleave').delay(0).fadeOut(0);
						    });
					
						
	$('.wm_sparkVentana').hover(function(e) {
    	$(document).find('.wm_sparkclick').delay(0).fadeIn(0);
		$(document).find('.wm_sparkdblclick').delay(0).fadeIn(0);
		$(document).find('.wm_sparkmouseenter').delay(0).fadeIn(0);
		$(document).find('.wm_sparkmouseleave').delay(0).fadeIn(0);
    },
    function(e){
    	 $(document).find('.wm_sparkclick').delay(0).fadeOut(0);
		 $(document).find('.wm_sparkdblclick').delay(0).fadeOut(0);
		 $(document).find('.wm_sparkmouseenter').delay(0).fadeOut(0);
		 $(document).find('.wm_sparkmouseleave').delay(0).fadeOut(0);
    });    
}*/

/*function allSparks(spark){
	var estadoTransition=[];
		var posestadoTransition=0;
		var IsPossibleToClick = true;
		var posEnLista=posUltimoWidget;//extraerPoswidget();		        		 	
		var s=CanvasConstraints.getSparks();
		for(var i=0; i<s.length; i++){
				if(s[i].widget==widgetsInserted[posEnLista].type){
				        estadoTransition[posestadoTransition]=s[i].event;
				        posestadoTransition++;
				        if(spark=="click"){
					        if(s[i].event=="onClick"){
					        	IsPossibleToClick=false;
					        }
				        }
				         if(spark=="doubleClick"){
				         	if(s[i].event=="onDoubleClick"){
				        		IsPossibleToClick=false;
				       		 }
				         }
				         if(spark=="enter"){
				         	if(s[i].event=="onMouseEnter"){
				        		IsPossibleToClick=false;
				        	}
				         }
				         if(spark=="leave"){
				         	if(s[i].event=="onMouseLeave"){
				        		IsPossibleToClick=false;
				        	}
				         }
				 } 
		}
		
		if(spark=="click"){
			if(IsPossibleToClick && $('.wm_sparkclick').css('opacity')==1){
			var sparks = CanvasConstraints.getCurrentSpark();
				sparks = {};
				sparks.widget = widgetsInserted[posEnLista].type;
				sparks.event = "onClick";
		    CanvasConstraints.setCurrentSpark(sparks);
		 }
		}
		if(spark=="doubleClick"){
			 if(IsPossibleToClick && $('.wm_sparkdblclick').css('opacity')==1){
			var sparks = CanvasConstraints.getCurrentSpark();
				sparks = {};
				sparks.widget = widgetsInserted[posEnLista].type;
				sparks.event = "onDoubleClick";
		    CanvasConstraints.setCurrentSpark(sparks);
		   }
		}
		if(spark=="enter"){
			if(IsPossibleToClick && $('.wm_sparkmouseenter').css('opacity')==1){
			var sparks = CanvasConstraints.getCurrentSpark();
				sparks = {};
				sparks.widget = widgetsInserted[posEnLista].type;
				sparks.event = "onMouseEnter";
		    CanvasConstraints.setCurrentSpark(sparks);
		   }
		}
		if(spark=="leave"){
			if(IsPossibleToClick && $('.wm_sparkmouseleave').css('opacity')==1){
			var sparks = CanvasConstraints.getCurrentSpark();
				sparks = {};
				sparks.widget = widgetsInserted[posEnLista].type;
				sparks.event = "onMouseLeave";
		    CanvasConstraints.setCurrentSpark(sparks);
		   }
		}
		
		$(document).find('.wm_sparkclick').delay(0).fadeOut(0);
		$(document).find('.wm_sparkdblclick').delay(0).fadeOut(0);
		$(document).find('.wm_sparkmouseenter').delay(0).fadeOut(0);
		$(document).find('.wm_sparkmouseleave').delay(0).fadeOut(0);
		eliminarEventos();
		artivarEventos();
}

function clickEvent(){
	$('.wm_sparkclick').click(function(e){
		console.log("click clickevent");
		allSparks("click");
	});
}

function doubleClickEvent(){
	$('.wm_sparkdblclick').click(function(e){
		console.log("click doubleClickEvent");
		allSparks("doubleClick");
	});
}

function mouseEnterEvent(){
	$('.wm_sparkmouseenter').click(function(e){
		console.log("click mouseEnterEvent");
		allSparks("enter");
	});
}

function mouseLeaveEvent(){
	$('.wm_sparkmouseleave').click(function(e){
		console.log("click mouseleaveEvent");
		allSparks("leave");
	});
}*/

/*function ponerXenwidget(){
	$('[data_wmwidget_id]').hover(
				        	function(e) {
				        		if (CanvasConstraints.getSparks()==null){
				        		console.log("link hover in");
				        		var elementoHover=$(e.target);
				        		$('[class*=wm_selected]').removeClass("wm_selected");
				        		elementoHover.closest("[data_wmwidget_id]").addClass("wm_selected");
				        		var widget=extraerPoswidget();
				        		//HAY Q SABER EN QUE ESTADO ESTA EL DTE. AKI PONGO CERO XQ SOLO HAY ESTADO INICIAL
				        		var estadoWidget;//=widgetsInserted[widget].estados[0].estadoWidget;
				        		var currentState=CanvasConstraints.getCurrentState();
				        		for(var i=0; i<currentState.length; i++){
				        			if (currentState[i].widget==widgetsInserted[widget].type){
				        				estadoWidget=currentState[i].action;
				        			}
				        		}
				        		 if(elementoHover.closest("[data_wmwidget_id]").hasClass("wm_selected")){
				        		 	$('.wm_close').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
				        		 	$('.wm_close').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20); 
				        		 	$('.wm_select').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
				        		 	$('.wm_select').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+5);
				        		 	$('.wm_deselect').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
				        		 	$('.wm_deselect').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+10);
				        		 	$('.wm_hide').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
				        		 	$('.wm_hide').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+15);
				        		 	if(elementoHover.closest("[data_wmwidget_id]")[0].attributes.data_wmwidget_type!=undefined){//Los link, image y button q estan dentro de un div, dan error
					        		 	if(elementoHover.closest("[data_wmwidget_id]")[0].attributes.data_wmwidget_type.textContent=="widgetized"){				        		 	 
						        		 	$('.wm_undo').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
						        		 	$('.wm_undo').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+20);
						        		 	$('.wm_ventana').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-10); 
						        			$('.wm_ventana').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+30);
						        			if(($(".wm_close").width()*5)<$(".wm_selected").width()){
						        				$('.wm_ventana').css('width', $(".wm_selected").width()-($(".wm_close").width()*5));
						        				if($('.wm_ventana').width()<70){
						        					$('.wm_ventana').css('width', 70);
						        				}
						        			}else{
						        				$('.wm_ventana').css('width', 70);
						        			}
						        			$('.wm_ventana')[0].innerHTML="MOVE "+$('.wm_selected')[0].title;
						        		 }else{
						        		 	$('.wm_undo').css('top', -1000); 
					        		 		$('.wm_undo').css('left', -1000);
					        		 		$('.wm_ventana').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-10); 
						        			$('.wm_ventana').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+20);
						        			if(($(".wm_close").width()*4)<$(".wm_selected").width()){
						        				$('.wm_ventana').css('width', $(".wm_selected").width()-($(".wm_close").width()*4)+10);
						        				if($('.wm_ventana').width()<70){
						        					$('.wm_ventana').css('width', 70);
						        				}
						        			}else{
						        				$('.wm_ventana').css('width', 70);
						        			}
						        			$('.wm_ventana')[0].innerHTML="MOVE "+$('.wm_selected')[0].title;
						        		 }
					        		 }
				        		 	console.log(elementoHover.position() );
				        		 	if(estadoWidget=="Enable"){
				        		 		$('.wm_select').css('border', "5px solid rgba(0,191,255,0.5)");
				        		 		$('.wm_deselect').css('border', "5px solid rgba(0,0,0,0.5)");
				        		 		$('.wm_hide').css('border', "5px solid rgba(0,0,0,0.5)");
				        		 	}
				        		 	if(estadoWidget=="Disable"){
				        		 		$('.wm_select').css('border', "5px solid rgba(0,0,0,0.5)");
				        		 		$('.wm_deselect').css('border', "5px solid rgba(0,191,255,0.5)");
				        		 		$('.wm_hide').css('border', "5px solid rgba(0,0,0,0.5)");
				        		 	}
				        		 	if(estadoWidget=="Collapse"){
				        		 		$('.wm_select').css('border', "5px solid rgba(0,0,0,0.5)");
				        		 		$('.wm_deselect').css('border', "5px solid rgba(0,0,0,0.5)");
				        		 		$('.wm_hide').css('border', "5px solid rgba(0,191,255,0.5)");
				        		 	}
						        	$(document).find('.wm_close').delay(0).fadeIn(0);
						        	$(document).find('.wm_select').delay(0).fadeIn(0);
						        	$(document).find('.wm_deselect').delay(0).fadeIn(0);
						        	$(document).find('.wm_hide').delay(0).fadeIn(0);
						        	$(document).find('.wm_undo').delay(0).fadeIn(0);
						        	$(document).find('.wm_ventana').delay(0).fadeIn(0);
				        		 }
				        		 }   
						    },
						    function(e) {
						    	console.log("link hover out");
						        $(document).find('.wm_close').delay(0).fadeOut(0);
						        $(document).find('.wm_select').delay(0).fadeOut(0);
						        $(document).find('.wm_deselect').delay(0).fadeOut(0);
						        $(document).find('.wm_hide').delay(0).fadeOut(0);
						        $(document).find('.wm_undo').delay(0).fadeOut(0);
						        $(document).find('.wm_ventana').delay(0).fadeOut(0);
						    });

	$('.wm_closeVentana').hover(function(e) {
    	$(document).find('.wm_close').delay(0).fadeIn(0);
		$(document).find('.wm_select').delay(0).fadeIn(0);
		$(document).find('.wm_deselect').delay(0).fadeIn(0);
		$(document).find('.wm_hide').delay(0).fadeIn(0);
		$(document).find('.wm_undo').delay(0).fadeIn(0);
		$(document).find('.wm_ventana').delay(0).fadeIn(0);
    },
    function(e){
    	 $(document).find('.wm_close').delay(0).fadeOut(0);
		 $(document).find('.wm_select').delay(0).fadeOut(0);
		 $(document).find('.wm_deselect').delay(0).fadeOut(0);
		 $(document).find('.wm_hide').delay(0).fadeOut(0);
		 $(document).find('.wm_undo').delay(0).fadeOut(0);
		 $(document).find('.wm_ventana').delay(0).fadeOut(0);
    });
}

function selectWidget(){
	$('.wm_select').click(function(e){
		console.log("click select");
		var posEnLista=posUltimoWidget;//extraerPoswidget();
		$(".wm_selected").removeClass("wm_deselected");
		$(".wm_selected").removeClass("wm_hidden");
		var algo = CanvasConstraints.getCurrentState();
		for(var i=0; i<algo.length; i++){
			if(algo[i].widget.getWidgetIdentifier()==posEnLista){
				algo[i].action="Enable";
			}
		}
		CanvasConstraints.setCurrentState(algo);
		widgetsInserted[posEnLista].estados[0].estadoWidget="enable";
		 $(document).find('.wm_select').delay(0).fadeOut(0);
		 $(document).find('.wm_deselect').delay(0).fadeOut(0);
		 $(document).find('.wm_hide').delay(0).fadeOut(0);
	});
}

function deselectWidget(){
	$('.wm_deselect').click(function(e){
		console.log("click deselect");
		var posEnLista=posUltimoWidget;//extraerPoswidget();
		$(".wm_selected").removeClass("wm_hidden");
		$(".wm_selected").addClass("wm_deselected");
		var algo = CanvasConstraints.getCurrentState();
		for(var i=0; i<algo.length; i++){
			if(algo[i].widget.getWidgetIdentifier()==posEnLista){
				algo[i].action="Disable";
			}
		}
		CanvasConstraints.setCurrentState(algo);
		propagarEliminacionSparksDueToWidget();
		widgetsInserted[posEnLista].estados[0].estadoWidget="disable";
		 $(document).find('.wm_select').delay(0).fadeOut(0);
		 $(document).find('.wm_deselect').delay(0).fadeOut(0);
		 $(document).find('.wm_hide').delay(0).fadeOut(0);
	});
}

function hideWidget(){
	$('.wm_hide').click(function(e){
		console.log("click hide");
		var posEnLista=posUltimoWidget;//extraerPoswidget();
		$(".wm_selected").removeClass("wm_deselected");
		$(".wm_selected").addClass("wm_hidden");
		var algo = CanvasConstraints.getCurrentState();
		for(var i=0; i<algo.length; i++){
			if(algo[i].widget.getWidgetIdentifier()==posEnLista){
				algo[i].action="Collapse";
			}
		}
		CanvasConstraints.setCurrentState(algo);
		propagarEliminacionSparksDueToWidget();
		widgetsInserted[posEnLista].estados[0].estadoWidget="collapse";
		 $(document).find('.wm_select').delay(0).fadeOut(0);
		 $(document).find('.wm_deselect').delay(0).fadeOut(0);
		 $(document).find('.wm_hide').delay(0).fadeOut(0);
	});
}

function cerrarWidget(){
	$('.wm_close').click(
				 function(e){
				 	console.log("click close hover");
				 	var posEnLista=posUltimoWidget;//extraerPoswidget();
				 	var widgetBorrar;
					$(".wm_selected").removeClass("wm_deselected");
					$(".wm_selected").removeClass("wm_hidden");
					var listWidgets=CanvasConstraints.getWidgets();
					for(var i=0; i<listWidgets.length; i++){
						if(listWidgets[i]==widgetsInserted[posEnLista].type){
							widgetBorrar=i;
						}
					}
					listWidgets.splice(widgetBorrar,1);
					CanvasConstraints.setWidgets(listWidgets);
					propagarEliminacionSparksDueToWidget();
				 	widgetsInserted[posEnLista].type="";
				 	widgetsInserted[posEnLista].html="";
				 	widgetsInserted[posEnLista].widget="";
				 	desviarBotonesYSparks();
				 	eliminarEventos();
				    artivarEventos();
				    $('[class*=wm_selected]').remove();
			 });
}

function undoWidget(){
	$('.wm_undo').click(function(e){
		e.preventDefault();
			    e.stopPropagation(); 
					eliminarEventos();
				 	var posEnLista=extraerPoswidget();
				 	var widgetBorrar;
					$("[data_wmwidget_id="+posEnLista+"]").removeClass("wm_deselected");
					$("[data_wmwidget_id="+posEnLista+"]").removeClass("wm_hidden");
					var listWidgets=CanvasConstraints.getWidgets();
					for(var i=0; i<listWidgets.length; i++){
						if(listWidgets[i]==widgetsInserted[posEnLista].type){
							widgetBorrar=i;
						}
					}
					listWidgets.splice(widgetBorrar,1);
					CanvasConstraints.setWidgets(listWidgets);
					propagarEliminacionSparksDueToWidget();
					widgetsInserted[posEnLista].type="";
				 	widgetsInserted[posEnLista].html="";
				 	widgetsInserted[posEnLista].widget="";
				 	desviarBotonesYSparks();
				    var undoWidgets=$('[data_wmwidget_id='+posEnLista+']');
				    if(undoWidgets[0].attributes.data_wmwidget_type.textContent=="original_widgetized"){
				    	var undoWidgets2=undoWidgets[0];
				    	var widgetCopy=undoWidgets[1];
				    }
				    else{
				    	var undoWidgets2=undoWidgets[1];
				    	var widgetCopy=undoWidgets[0];
				    }
				    widgetCopy.remove();
				    undoWidgets2.removeAttribute("draggable");
				    undoWidgets2.removeAttribute("title");
				    undoWidgets2.removeAttribute("data_wmwidget_id");
				    undoWidgets2.removeAttribute("data_wmwidget_foreigncloned_type");
				    undoWidgets2.removeAttribute("data_wmwidget_type");
				    artivarEventos();
	});
}*/

/*function propagarEliminacionSparksDueToWidget(){
	DiagramModel.prototype.setSparkPropagationDueToWidget(posUltimoWidget);
}

function propagarEliminacionSparksDueToSparks(evento){
	DiagramModel.prototype.setSparkPropagationDueToSparks(posUltimoWidget, evento);
}

function comprobarCambioEstado(){
	CanvasConstraints.bindCurrentState(function(){
		var estadoWidget;
		var widget;
		var currentState=CanvasConstraints.getCurrentState();
			for(var i=0; i<currentState.length; i++){
				 // if (currentState[i].widget==widgetsInserted[widget].type){
				 	    widget=currentState[i].widget.getWidgetIdentifier();
				        estadoWidget=currentState[i].action;
						if(estadoWidget=="Enable"){
							$("[data_wmwidget_id="+widget+"]").removeClass("wm_deselected");
							$("[data_wmwidget_id="+widget+"]").removeClass("wm_hidden");
						}
						if(estadoWidget=="Disable"){
							//Primero los borro para evitar anadir wm_deselected de mas
							$("[data_wmwidget_id="+widget+"]").removeClass("wm_deselected");
							$("[data_wmwidget_id="+widget+"]").removeClass("wm_hidden");
							$("[data_wmwidget_id="+widget+"]").removeClass("wm_hidden");
							$("[data_wmwidget_id="+widget+"]").addClass("wm_deselected");
						}
						if(estadoWidget=="Collapse"){
							//Primero los borro para evitar anadir wm_hidden de mas
							$("[data_wmwidget_id="+widget+"]").removeClass("wm_deselected");
							$("[data_wmwidget_id="+widget+"]").removeClass("wm_hidden");
							$("[data_wmwidget_id="+widget+"]").removeClass("wm_deselected");
							$("[data_wmwidget_id="+widget+"]").addClass("wm_hidden");
						}
				//  }
			}
	});
} 

function extraerPoswidget(){
	                var i=0;
				 	var posEnLista=-1;
				 	var joke=document.getElementsByClassName('wm_selected');
				 	posEnLista=joke[0].attributes.data_wmwidget_id.textContent;
				 	posUltimoWidget=posEnLista;
				 	return posEnLista;
}*/

/*function insertar(tipo, position, elem, dialog, urlLink, urlLinkText, urlImage, urlButton){
						var algo2 = CanvasConstraints.getCurrentState();
						if(tipo=="link"){
			        		algo2.push({widget:urlLinkText+"Link-"+numerodeWidget, action:"Enable"});
			        	}
			        	if(tipo=="image"){
			        		algo2.push({widget:"Image-"+numerodeWidget, action:"Enable"});
			        	}
			        	if(tipo=="button"){
			        		algo2.push({widget:"Button-"+numerodeWidget, action:"Enable"});
			        	}
			        	CanvasConstraints.setCurrentState(algo2);
			        	var lista = DiagramConstraints.getWidgets();
			        	if(tipo=="link"){
			        		lista.push(urlLinkText+"Link-"+numerodeWidget);
			        	}
			        	if(tipo=="image"){
			        		lista.push("Image-"+numerodeWidget);
			        	}
			        	if(tipo=="button"){
			        		lista.push("Button-"+numerodeWidget);
			        	}
			        	DiagramConstraints.setWidgets(lista);
			        	var div=$("<div>");
				        if(position=="left"){
				        elem.before(div);
				       	insertAttributtes(tipo, div, urlLink, urlLinkText, urlImage, urlButton);
				        }
				        else{
				        elem.after(div);
				        insertAttributtes(tipo, div, urlLink, urlLinkText, urlImage, urlButton);
				        }		  
      		            var listaEstados= new Array();
						//AQUI DEBO EXTRAER EL ESTADO EN EL QUE ESTA EL DTE
						listaEstados.push({estadoWidget: "enable", estadoDTE: "Initial"});
						if(tipo=="link"){
				        	widgetsInserted.push({type:urlLinkText+"Link-"+numerodeWidget, html:elem, widget:"w_number"+numerodeWidget, estados:listaEstados});
				        }
				        if(tipo=="image"){
				        	 widgetsInserted.push({type:"Image-"+numerodeWidget, html:elem, widget:"w_number"+numerodeWidget, estados:listaEstados});
				        }
				        if(tipo=="button"){
			        		 widgetsInserted.push({type:"Button-"+numerodeWidget, html:elem, widget:"w_number"+numerodeWidget, estados:listaEstados});
			        	}
				        numerodeWidget++;
			            setTimeout(function(){isDragAndDroping=false;dialog.remove();artivarEventos();}, 500);
}

function insertAttributtes(tipo, div, urlLink, urlLinkText, urlImage, urlButton){
	if(tipo=="link"){
		div.append("<a href="+urlLink+">"+urlLinkText+"</a>");
	}
	if(tipo=="image"){
		 div.append("<img border='0' src="+urlImage+" alt='abc'>");
	}
	if(tipo=="button"){
		div.append("<button type='button'>"+urlButton+"</button>");	
	}
	div.attr("data_wmwidget_id", ""+numerodeWidget);
	div.attr("data_wmwidget_type", "cloned");
	if(tipo=="link"){
		div.attr("title", urlLinkText+"Link"+numerodeWidget);
	}
	if(tipo=="image"){
		div.attr("title", "Image"+numerodeWidget);
	}
	if(tipo=="button"){
		div.attr("title", "Button"+numerodeWidget);	
	}
	div.attr("data_wmwidget_foreignCloned_type", "false");
	div.addClass("resizable");
}

function learnRegExp(){
	return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(learnRegExp.arguments[0]);
}*/

/*function insertarLink(elementoClick, position, elem){
	eliminarEventos();
	var valorCorrecto=true;
	var valorCorrectoURL=true;
	var dialog=$("<div id='wm_dialog2'></div>");
			    $(document.body).append(dialog);
			    dialog.load(chrome.extension.getURL("parts/urlLink.html"),function(){
			    dialog.dialog({
			      resizable: false,
			      modal: true,
			      close: function( event, ui ){
			      	dialog.remove();
			        artivarEventos();
			        setTimeout(function(){isDragAndDroping=false;}, 500);
			      },
			      buttons: {
			        "Create link": function() {
			          var urlLink=document.getElementById("urlLink").value;
			          valorCorrectoURL=learnRegExp(urlLink);
					  var urlLinkText=document.getElementById("urlLinkText").value;
					  if(!valorCorrectoURL){alert("Illegal URL");}
					   if(/\s/.test(urlLinkText)){alert("Spaces are forbidden in the text");}
					  if( urlLinkText == null || urlLinkText.length == 0 || /\s/.test(urlLinkText) ){
						          	valorCorrecto=false;
						          }
					  else{
					  	valorCorrecto=true;
					  }
				 if(valorCorrecto && valorCorrectoURL){
					 	if(urlLink.substring(0,4)!="http"){
							urlLink="http://"+urlLink;
						}
					  insertar("link", position, elem, dialog, urlLink, urlLinkText, null, null);
				   }
			        },
			        Cancel: function() {
			        	dialog.remove();
			            artivarEventos();
			            setTimeout(function(){isDragAndDroping=false;}, 500);
			        }
			      }
			    });
			    dialog.parent().zIndex(999999999);
			    
		       dialog.find("input").on('keypress', function(e) {
						if(e.keyCode==13){
							var urlLink=document.getElementById("urlLink").value;
					          valorCorrectoURL=learnRegExp(urlLink);
							  var urlLinkText=document.getElementById("urlLinkText").value;
							  if(!valorCorrectoURL){alert("Illegal URL");}
							  if(/\s/.test(urlLinkText)){alert("Spaces are forbidden in the text");}
							  if( urlLinkText == null || urlLinkText.length == 0 || /\s/.test(urlLinkText) ){
								          	valorCorrecto=false;
								          }
							  else{
							  	valorCorrecto=true;
							  }
						   if(valorCorrecto && valorCorrectoURL){
							   	if(urlLink.substring(0,4)!="http"){
									urlLink="http://"+urlLink;
								}
							   insertar("link", position, elem, dialog, urlLink, urlLinkText, null, null);
							}
						}
				});
		   });
}

function checkURLImage(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function insertarImagen(elementoClick, position, elem){
	eliminarEventos();
		var dialog=$("<div id='wm_dialog2'></div>");
			  $(document.body).append(dialog);
		   	  dialog.load(chrome.extension.getURL("parts/urlImage.html"),function(){
			  dialog.dialog({
			      resizable: false,
			      modal: true,
			      close: function( event, ui ){
			      	dialog.remove();
			        artivarEventos();
			        setTimeout(function(){isDragAndDroping=false;}, 500);
			      },
			      buttons: {
			        "Create image": function() {
			          var urlImage=document.getElementById("urlImage").value;
			          var valorCorrecto=checkURLImage(urlImage);
			          if(!valorCorrecto){alert("Illegal image");}
			          if(valorCorrecto){
			           insertar("image", position, elem, dialog, null, null, urlImage, null);
				        }
			        },
			        Cancel: function() {
			        	dialog.remove();
			            artivarEventos();
			            setTimeout(function(){isDragAndDroping=false;}, 500);
			        }
			      }
			    });
			    dialog.parent().zIndex(999999999);
			 
               dialog.find("input").on('keypress', function(e) {
						if(e.keyCode==13){
							var urlImage=document.getElementById("urlImage").value;
					          var valorCorrecto=checkURLImage(urlImage);
					          if(!valorCorrecto){alert("Illegal image");}
					          if(valorCorrecto){
					          insertar("image", position, elem, dialog, null, null, urlImage, null);
							}
						}
				});
		   });
}

function insertarButton(elementoClick, position, elem){
	eliminarEventos();
			var dialog=$("<div id='wm_dialog2'></div>");
			  $(document.body).append(dialog);
		   	  dialog.load(chrome.extension.getURL("parts/urlButton.html"),function(){
			  dialog.dialog({
			      resizable: false,
			      modal: true,
			      close: function( event, ui ){
			      	dialog.remove();
			        artivarEventos();
			        setTimeout(function(){isDragAndDroping=false;}, 500);
			      },
			      buttons: {
			        "Create button": function() {
			          var urlButton=document.getElementById("urlButton").value;
			          var valorCorrecto;
			          if(/\s/.test(urlButton)){alert("Spaces are forbidden in the text");}
			          if( urlButton == null || urlButton.length == 0 || /\s/.test(urlButton) ){
						          	valorCorrecto=false;
						          }
					  else{
					  	valorCorrecto=true;
					  }
			          if(valorCorrecto){
			           insertar("button", position, elem, dialog, null, null, null, urlButton);
				        }
			        },
			        Cancel: function() {
			        	dialog.remove();
			            artivarEventos();
			            setTimeout(function(){isDragAndDroping=false;}, 500);
			        }
			      }
			    });
			    dialog.parent().zIndex(999999999);
			 
               dialog.find("input").on('keypress', function(e) {
						if(e.keyCode==13){ 
							var urlButton=document.getElementById("urlButton").value;
					         var valorCorrecto;
					          if(/\s/.test(urlButton)){alert("Spaces are forbidden in the text");}
					          if( urlButton == null || urlButton.length == 0 || /\s/.test(urlButton) ){
								          	valorCorrecto=false;
								          }
							  else{
							  	valorCorrecto=true;
							  }
					          if(valorCorrecto){
					          insertar("button", position, elem, dialog, null, null, null, urlButton);
							}
						}
				});
		   });
}

function insertarClon(elementoClick, position, elem, elementoClonado, procedencia){
		 var clone=buscarClone(elementoClick.id);
		     	    var nuevoWidget;
		        	if(procedencia=="local"){
		         		nuevoWidget=$(clone.html);
		         	}else{
		         		nuevoWidget=crearForeignClone(clone);
		         	}			
   	 				nuevoWidget.attr("data_wmwidget_id", ""+numerodeWidget);
   	 				
   	 				if(procedencia=="local"){
   	 					nuevoWidget.attr("data_wmwidget_type", "cloned");
   	 					nuevoWidget.attr("data_wmwidget_foreignCloned_type", "false");
   	 				}
   	 				else{
   	 					nuevoWidget.attr("data_wmwidget_type", "foreignCloned");
   	 					nuevoWidget.attr("data_wmwidget_foreignCloned_type", clone.widgetType);
   	 				}
   	 				nuevoWidget.attr("title", elementoClonado+"-"+numerodeWidget);	
	        		nuevoWidget.addClass("resizable");
		   	 		if(position=="left"){
				        elem.before(nuevoWidget);
				     }else{//} if(position=="right"){ //http://ayudawordpress.com/wp-content/uploads/2012/08/aprender-html.jpg
				        elem.after(nuevoWidget);
				        }
				        
				    var listaEstados= new Array();
					//AQUI DEBO EXTRAER EL ESTADO EN EL QUE ESTA EL DTE
					listaEstados.push({estadoWidget: "enable", estadoDTE: "Initial"});
					var algo2 = CanvasConstraints.getCurrentState();
		        	algo2.push({widget:elementoClonado+"-"+numerodeWidget, action:"Enable"});
		        	CanvasConstraints.setCurrentState(algo2);
		        	var lista = DiagramConstraints.getWidgets();
		        	lista.push(elementoClonado+"-"+numerodeWidget);
		        	DiagramConstraints.setWidgets(lista);
		   	 widgetsInserted.push({type:elementoClonado+"-"+numerodeWidget, html:clone.html, widget:"w_number"+numerodeWidget, estados:listaEstados});
		   	 numerodeWidget++;
		   	 isDragAndDroping=false;
		   	 eliminarEventos();
			  artivarEventos();
}*/
//http://www.merriampark.com/ld.htm, http://www.mgilleland.com/ld/ldjavascript.htm, Damerau���������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������Levenshtein distance (Wikipedia)
/*var levDist = function(s, t) {
    var d = []; //2d matrix
    var n = s.length;
    var m = t.length;
    if (n == 0) return m;
    if (m == 0) return n;
    for (var i = n; i >= 0; i--) d[i] = [];
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);
        for (var j = 1; j <= m; j++) {
            if (i == j && d[i][j] > 4) return n;
            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;
            if (b < mi) mi = b;
            if (c < mi) mi = c;
            d[i][j] = mi;
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    return d[n][m];
};
function genRegexp(selectedText,value){
 var res=null;
 
 var cleanedValue=value.replace(/(\n| )+/g," ").trim();
 var cleanedSelectedText=selectedText.replace(/(\n| )+/g," ").trim();

 var index=cleanedValue.indexOf(cleanedSelectedText);
 if(index>-1){
  var pre=cleanedValue.substr(0,index);
  if(pre.length>20){
   pre=pre.substr(pre.length-20);
  }
  var pos=cleanedValue.substr(index+cleanedSelectedText.length);
  if(pos.length>20){
   pos=pos.substr(0,20);  
  }
  var preExp=escapeRegExp(pre);
  var postExp=escapeRegExp(pos);
  res=(pre.length==0?"^":preExp)+"(.*)"+(pos.length==0?"$":postExp);
 }
 
 return res;
}
function escapeRegExp(str){
 return str.replace(/"/g,"\\\"").replace(/\^/g,"\\^").replace(/\$/g,"\\$").replace(/\(/g,"\\(").replace(/\)/g,"\\)");
}
var lastCopy;
function handleCopy(ev){
    var sel=ev.currentTarget.getSelection();
    console.log("copy");
    if(sel.rangeCount>0){
        lastCopy={node:sel.getRangeAt(0).commonAncestorContainer,iframe:ev.data};
    }    
}
function handlePaste(ev){
    var input=ev.target;
    if(input.tagName=="INPUT"){
        ev.clipboardData.items[0].getAsString(function(lastPasteText){
        if(lastCopy.node.textContent.trim().indexOf(lastPasteText.trim())>-1){
            var node=lastCopy.node.nodeType==Node.TEXT_NODE?lastCopy.node.parentNode:lastCopy.node;
            var id=node.getAttribute("data-wmwidget-nodeid")?node.getAttribute("data-wmwidget-nodeid"):new Date().getTime();
            node.setAttribute("data-wmwidget-nodeid",id);
            var ifr=lastCopy.iframe!=null?lastCopy.iframe:"";
            var pasteData={iframe:ifr,id:id};
            var regexp=genRegexp(lastPasteText,node.textContent);
            if(regexp!=null){
                pasteData.regexp=regexp;
            }
            input.setAttribute("data-wmwidget-extractFrom",JSON.stringify(pasteData));
        }
    });
   }   
}*/
/*$(window).bind({copy:handleCopy});
$("iframe").map(function(i,ifr){ 
    if(ifr.src==""){
        var win=$(ifr.contentWindow);
        win.bind("copy", i, handleCopy);
        ifr.setAttribute("data-wmwidget-iframe",i);
    }
});

function crearForeignClone(defClone){
    var res;
    if(defClone.widgetType=="html"||defClone.widgetType=="complex"){
        var idI=0;
        var html=defClone.widgetType=="html"?defClone.html:$.map(defClone.widgets,function(elem){return "<div id='ComplexWidget"+(idI++)+"' class='widgetContainer'>"+elem.html+"</div>";}).join("\n");
        res=$("<div>").css({overflow:"auto", display: "inline-block"});
        var shadow=res[0].webkitCreateShadowRoot();
        shadow.applyAuthorStyles = false;
        shadow.resetStyleInheritance = true;
        shadow.innerHTML="<style type='text/css'>\n.widgetContainer { position:relative; }\n.widgetContainer>*{ position:static !important; }\n</style>"+html;
        var objToDOM={};
        $.extend(true,objToDOM,defClone);
        defClone.widgetType=="html"? delete objToDOM.html:$(objToDOM.widgets).map(function(i,wid){delete wid.html;});
        res.attr("data-wmwidget-foreign",JSON.stringify(objToDOM));
    }else{
        res=$("<div>").css({width:defClone.width,height:defClone.height,overflow:"hidden"});
        var iframe=$("<iframe>").attr({src:defClone.url,scrolling:"no"}).css({width:defClone.wwidth,height:defClone.wheight,top:-1*defClone.top,left:-1*defClone.left,border:"0px",overflow:"hidden",position:"relative"});
        res.append(iframe);
        res.attr("data-wmwidget-foreign",JSON.stringify(defClone));
    }   
    return res;                     
}*/

/*function elementosSusceptiblesDeCambio(selected, shadow, hayCombo){
	var i=0;
	var indice=0;
	var devolver = new Array();
    var form=$("<div>");
	var elem=selected;
	var listaTemp = elem.getElementsByTagName("*");
	var listaTags=[];
	var listaTags2=[];
	var listaTagsTemp=[];
	var j=0;for(j=0;j<listaTemp.length;j++){listaTagsTemp[j]=listaTemp[j];}
	listaTagsTemp.push(elem);
	listaTags=listaTagsTemp.slice(0);
	listaTags2=listaTagsTemp.slice(0);

	var anadirLiAlFinal=false;
	anadirLiAlFinalTipo="";
	
	while(listaTags.length>i){
		if(listaTags[i].tagName=="LI"){
			anadirLiAlFinal=true;
			for(var t=0; t<listaTags[i].childNodes.length; t++){
				if(listaTags[i].childNodes[t].tagName!=null){
					anadirLiAlFinalTipo= listaTags[i].childNodes[t].tagName;
				}
			}
		}
		 var act=listaTags[i];  
		 var h=0;
		 for(h=0;h<act.childNodes.length;h++){
		 	var node=act.childNodes[h];
		 	if(node.nodeType==Node.TEXT_NODE){
		 		if(node.textContent.trim()!=""){
				 var linkButton=$('<br>Change text:<input id=valor'+indice+' type="text" name="FirstName" value="'+node.textContent+'">');
				 shadow.append(linkButton);
				 devolver.push({tipo:"text", elemento:node});
				 indice++;
			 }
			}}
			 if(listaTags[i].tagName=="IMG"){
			if(listaTags[i].src!=""){
				var linkButton=$('<br>Change image URL:<input id=valor'+indice+' type="text" name="FirstName" value="'+listaTags[i].src+'">');
					shadow.append(linkButton);
					devolver.push({tipo:"imagen", elemento:listaTags2[i]});
					indice++;
			}
		  }
		    if(listaTags[i].tagName=="A"){
			if(listaTags[i].href!="" && listaTags[i].textContent!=""){
			    var linkButton=$('<br>Change link URL:<input id=valor'+indice+' type="text" name="FirstName" value="'+listaTags[i].href+'">');	
					shadow.append(linkButton);
					devolver.push({tipo:"link", elemento:listaTags2[i]});
					indice++;
				}		
			}
		
			i++;
			}//Si es tipo Lista (li) le anadimos un elemento igual para anadir nuevos elementos a la lista
			if(anadirLiAlFinal){
				if(anadirLiAlFinalTipo=="IMG"){
					var linkButton=$('<br>ADD NEW ELEMENT <br>Change image URL:<input id=valor'+indice+' type="text" name="FirstName">');
					shadow.append(linkButton);
					devolver.push({tipo:"li", elemento:"imagen"});
					indice++;
				}
				if(anadirLiAlFinalTipo=="A"){
					var linkButton=$('<br>ADD NEW ELEMENT <br>Change link URL:<input id=valor'+indice+' type="text" name="FirstName">');	
					var linkButton2=$('<br>Change Text:<input id=valor'+(indice+1)+' type="text" name="FirstName">');
					shadow.append(linkButton);
					shadow.append(linkButton2);
					devolver.push({tipo:"li", elemento:"link"});
					devolver.push({tipo:"li", elemento:"text"});
					indice++;
					indice++;
				}
				else{//TEXT
					var linkButton=$('<br>ADD NEW ELEMENT <br>Change text:<input id=valor'+indice+' type="text" name="FirstName">');
				 	shadow.append(linkButton);
				 	devolver.push({tipo:"li", elemento:"text"});
				 	indice++;
				}
			}
			if(hayCombo){
				var combobox=$('<br><select><option value="hora">1hour</option><option value="dia">1day</option><option value="mes">1month</option><option value="nunca">Never</option></select>');
				shadow.append(combobox);
				devolver.push({tipo:"combobox", elemento:"combobox"});
				indice++;
			}
	return devolver;
}

function flip(){
	$(".wm_selected").dblclick(function(e){
	  if($(".wm_selected")[0].attributes.data_wmwidget_foreignCloned_type.textContent!="iframe"){
		e.preventDefault();
	    e.stopPropagation();
		var elementoHover=$(e.target);
		$('[class*=wm_selected]').removeClass("wm_selected");
		elementoHover.closest("[data_wmwidget_id]").addClass("wm_selected");
	    var selected=$(".wm_selected");
	    selected.attr("data_wmwidget_flip", "true");
	    eliminarEventos();
	    var flipped=false;
		selected.flip({
		direction:'tb',
		speed:'1000',
	    onBefore: function(){
			console.log('before starting the animation');
		},
		onAnimation: function(){
				console.log('in the middle of the animation');
		},
		onEnd: function(elAnt,elPost){
			    if(!flipped){
			    	flipped=true;
					console.log('when the animation has already ended');
					esviarBotonesYSparks();
					
					if($(".wm_selected")[0].attributes.data_wmwidget_foreignCloned_type.textContent=="html"){
						var lista=$(".wm_selected")[0].webkitShadowRoot;
						var restaurarWidget = $(selected[0].webkitShadowRoot.children);
						restaurarWidget.remove();
						var resultado=elementosSusceptiblesDeCambio(restaurarWidget[2], $(selected[0].webkitShadowRoot), true);
						flop(resultado, $(selected[0].webkitShadowRoot), selected, restaurarWidget, true);
					}
					else if($(".wm_selected")[0].attributes.data_wmwidget_foreignCloned_type.textContent!="complex"){
						var shadow = selected[0].webkitCreateShadowRoot();
						shadow.applyAuthorStyles = false;
						shadow.resetStyleInheritance = true;
						var resultado=elementosSusceptiblesDeCambio(selected[0], $(shadow), false);	
						var content=selected.contents();  
						flop(resultado, shadow, selected, content, false);
					}
					else{
                        selected[0].webkitShadowRoot.addEventListener("paste",handlePaste,true);					    
						var listaInputs = $(selected[0].webkitShadowRoot.getElementById("ComplexWidget0")).find("input[type=text],[type=search]");
						var restaurarWidget = $(selected[0].webkitShadowRoot.children);
						restaurarWidget.remove();
						var resultado=complexWidgetInsertInputs(listaInputs, $(selected[0].webkitShadowRoot));
						flopComplex(resultado, restaurarWidget, $(selected[0].webkitShadowRoot), selected[0]);
					}
				}
				
			}
		});
		}
		else{
			eliminarEventos();
	   		artivarEventos();
		}
	});
}

function flopComplex(resultado, restaurarWidget, shadow, widget){
	evitarClicksIndeseados2();
	 $(".wm_selected").dblclick(function(e){ 
	 	e.preventDefault();
		e.stopPropagation();
		 var elementoHover=$(e.target);
		$(".wm_selected").attr("data_wmwidget_flip", "false");
		widget.webkitShadowRoot.removeEventListener("paste",handlePaste,true);                        
        var extractFroms={};
        for(var i=0; i<resultado.length; i++){
            var elem=shadow[0].getElementById("valor"+i);
            var val=elem.value;
            resultado[i].elemento.value=val;
            var extractFrom=elem.getAttribute("data-wmwidget-extractfrom");
            if(extractFrom!=null){
             extractFroms[resultado[i].elemento.name]=JSON.parse(extractFrom);  
            }
        }
        widget.setAttribute("data-wmwidget-extractfroms",JSON.stringify(extractFroms));
		$('.wm_selected').revertFlip();
		setTimeout(function(){
			shadow[0].innerHTML="";
			try{
			shadow.append(restaurarWidget);
			}catch(ex){}
		    $('.wm_close').css('top', elementoHover.offset().top-20); 
			$('.wm_close').css('left', elementoHover.offset().left-20); 
			$('.wm_select').css('top', elementoHover.offset().top-20); 
			$('.wm_select').css('left', elementoHover.offset().left-20+35);
			$('.wm_deselect').css('top', elementoHover.offset().top-20); 
			$('.wm_deselect').css('left', elementoHover.offset().left-20+70);
			$('.wm_hide').css('top', elementoHover.offset().top-20); 
			$('.wm_hide').css('left', elementoHover.offset().left-20+105);
			$(".wm_sparkclick").css('top', elementoHover.offset().top); 
			$(".wm_sparkclick").css('left', elementoHover.offset().left+elementoHover.width());
			$(".wm_sparkdblclick").css('top', elementoHover.offset().top+22); 
			$(".wm_sparkdblclick").css('left', elementoHover.offset().left+elementoHover.width());
			$(".wm_sparkmouseenter").css('top', elementoHover.offset().top+44); 
			$(".wm_sparkmouseenter").css('left', elementoHover.offset().left+elementoHover.width());
			$(".wm_sparkmouseleave").css('top', elementoHover.offset().top+66); 
			$(".wm_sparkmouseleave").css('left', elementoHover.offset().left+elementoHover.width());
	        eliminarEventos();
	   		artivarEventos();},1000); 
	 });
}

function complexWidgetInsertInputs(listaInputs, panelFlop){
	var indice=0;
	var devolver = new Array();
	for(var i=0; i<listaInputs.length; i++){
		var linkButton=$('<br>Change '+listaInputs[i].name+':<input id=valor'+indice+' type="text" name="FirstName" value="'+listaInputs[i].value+'">');
		panelFlop.append(linkButton);
		devolver.push({tipo:"complex", elemento:listaInputs[i]});
		indice++;
	}
	return devolver;
}

function flop(resultadoString, shadow, selected, content, hayCombo){
	console.log("flop");
	var valorCorrecto=true;
	var hayCambiosDeValor=false;
	var introducirAlFinal=false;
	var pos = -1;
	var valorFinal2="";
	var valorFinal="";
	evitarClicksIndeseados2();
   $(".wm_selected").dblclick(function(e){ 
   		e.preventDefault();
		e.stopPropagation();
		$(".wm_selected").attr("data_wmwidget_flip", "false");
	    var elementoHover=$(e.target);
		var i=0;
		var contadorCombo=resultadoString.length;
		if(hayCombo){
			contadorCombo=contadorCombo-1;//si hay combo no de ver el getElement de valor xq no tiene
			shadow=shadow[0];
		}
		while(contadorCombo>i){
			var val=shadow.getElementById("valor"+i).value;

			if(resultadoString[i].elemento.textContent!=val){
				hayCambiosDeValor=true;
			}
			resultadoString[i].valor=val;
	//Comprueba q todos los datos introdocidos son correctos. Si nos es asi no deja hacer el flop
			if(resultadoString[i].tipo=="imagen"){
				if (!checkURLImage(val)){
					valorCorrecto=false;
				}
			}
			//debugger;
			if(resultadoString[i].tipo=="link"){
				if (!learnRegExp(val)){
					valorCorrecto=false;
				}
			}	
		//	debugger;		
			if(resultadoString[i].tipo=="linkText"){
				if (!nombreCorrecto(val)){
					valorCorrecto=false;
				}
			}
			if(resultadoString[i].tipo=="text"){
				if (!nombreCorrecto(val)){
					valorCorrecto=false;
				}
			}//Obtenemos los valores y la pos necesarios para incluir el nuevo elemento al li
			if(resultadoString[i].tipo=="li"){
				if(resultadoString[i].valor!=""){
					introducirAlFinal=true;
				}
				valorFinal2=val;
				if(pos==-1){
					pos = i;
					valorFinal=val;
				}
			}
			i++;
		}
		if(valorCorrecto){
			$('.wm_selected').revertFlip();
			if(hayCambiosDeValor){
				$('.wm_selected').attr("data_wmwidget_widgetized_updated", "true");
			}
			setTimeout(function(){

			if(hayCombo){
				selected[0].webkitShadowRoot.innerHTML="";
				for(var i=0;i<content.length;i++){
					selected[0].webkitShadowRoot.appendChild(content[i]);
				}
			}else{	
				shadow.innerHTML=$("<content>")[0].outerHTML;
				selected.empty();
				selected.append(content);
			}
			
			var i=0;
			while(resultadoString.length>i){
			//	debugger;
				var val=resultadoString[i].valor;
				if(resultadoString[i].tipo=="imagen"){
					resultadoString[i].elemento.src=val;
				}
				//debugger;
				if(resultadoString[i].tipo=="link"){
					resultadoString[i].elemento.href=val;
				}	
			//	debugger;		
				if(resultadoString[i].tipo=="linkText"){
					resultadoString[i].elemento.textContent=val;
				}
				if(resultadoString[i].tipo=="text"){
					if(learnRegExp(val)){
						if(val.substring(0,4)!="http"){
							val="http://"+val;
						}
						
						$(resultadoString[i].elemento).replaceWith("<a href='"+val+"'>"+val+"</a>");
						//resultadoString[i].elemento.append("<a href="+val+">"+val+"</a>");
					}
					else{
						resultadoString[i].elemento.textContent=val;
					}
				}
				i++;
			}//Anadimos el nuevo elemento al widget
			   if(introducirAlFinal){
		   	   	 if (resultadoString[pos].elemento=="link"){
		   	   	 	if(selected[0].tagName=="UL"){//Aqui quiero saber si el widget es solo un UL y anadir el nuevo al final
		   	   	 		var li=$("<li><a></a></li>");
		   	   	 		li.find("a").text(valorFinal2).attr("href",valorFinal);
		   	   	 		selected.append(li);
		   	   	 	}else{//Aqui si en el widget hay mas elementos q la lista para meter
		   	   	 		selected[0].getElementsByTagName("UL")[0].insertAdjacentHTML('beforeend',"<li><a href="+valorFinal+">"+valorFinal2+"</a></li>");
		   	   	 	}
		   	   	 }
		   	   	 if (resultadoString[pos].elemento=="text"){
		   	   	 	if(selected[0].tagName=="UL"){
		   	   	 		selected.append("<li><p>"+valorFinal+"</p></li>");
		   	   	 	}else{
		   	   	 		selected[0].getElementsByTagName("UL")[0].insertAdjacentHTML('beforeend',"<li><p>"+valorFinal+"</p></li>");
		   	   	 	}
		   	   	 }
		   	   	 if(resultadoString[pos].elemento=="image"){
		   	   	 	if(selected[0].tagName=="UL"){
		   	   	 		selected.append("<li><img border='0' src="+valorFinal+" alt='abc'></li>");
		   	   	 	}else{
		   	   	 		selected[0].getElementsByTagName("UL")[0].insertAdjacentHTML('beforeend',"<li><img border='0' src="+valorFinal+" alt='abc'></li>");
		   	   	 	}
		   	   	 }
		   	   } 
	        $('.wm_close').css('top', elementoHover.offset().top-20); 
			$('.wm_close').css('left', elementoHover.offset().left-20); 
			$('.wm_select').css('top', elementoHover.offset().top-20); 
			$('.wm_select').css('left', elementoHover.offset().left-20+35);
			$('.wm_deselect').css('top', elementoHover.offset().top-20); 
			$('.wm_deselect').css('left', elementoHover.offset().left-20+70);
			$('.wm_hide').css('top', elementoHover.offset().top-20); 
			$('.wm_hide').css('left', elementoHover.offset().left-20+105);
			$(".wm_sparkclick").css('top', elementoHover.offset().top); 
			$(".wm_sparkclick").css('left', elementoHover.offset().left+elementoHover.width());
			$(".wm_sparkdblclick").css('top', elementoHover.offset().top+22); 
			$(".wm_sparkdblclick").css('left', elementoHover.offset().left+elementoHover.width());
			$(".wm_sparkmouseenter").css('top', elementoHover.offset().top+44); 
			$(".wm_sparkmouseenter").css('left', elementoHover.offset().left+elementoHover.width());
			$(".wm_sparkmouseleave").css('top', elementoHover.offset().top+66); 
			$(".wm_sparkmouseleave").css('left', elementoHover.offset().left+elementoHover.width());
	        eliminarEventos();
	   		artivarEventos();},1000);  
   	   }
   	   else{
   	   	  eliminarEventos();
   	   	  flop(resultadoString, shadow, selected, content);
   	   }
	});
}*/

/*function buscarClone(idBoton){
	var i=0;
	var encontrado=false;
	var devolver="";
	while(widgetList[i]!=null && !encontrado){
		if(widgetList[i].type==idBoton){
			encontrado=true;
			devolver=widgetList[i];
			//alert(devolver);
		}
		i++;
	}
	return devolver;
}


function eliminarEventos(){
	//widgetizar
	$(document).off("click");
	$(document).off("mouseover");
	$(document).off("mouseleave");
	$(document).off("keypress");
	$("#widgetizar").off("click");
	$("#buttonLeft a").off("mousedown");
	$("#widgetizar").off("click");
	$("#clone").off("click");
	$("#extruderLeft").off("click");
	//drag&DropForeign
	$("#foreignClones a").off("click");
	$(document).off("dragover");
	$(document).off("dragenter");
	$(document).off("dragleave");
	$(document).off("drop");
	$("#foreignClones a").off("mousedown");
	$("#foreignClones a").off("mouseup");
	$("#foreignClones a").off("mousedown");
	$("#widgetizar").off("click");
	$("#clone").off("click");
	$("#extruderLeft").off("mouseup");
	//ponerXenwidget
	$('[data_wmwidget_id]').off('hover');
	$('.wm_select').off('hover');
	$('.wm_deselect').off('hover');
	$('.wm_hide').off('hover');
	$('.wm_close').off('hover');
	$('.wm_ventana').off('hover');
	//cerrarWidget
	$('.wm_close').off('click');
	//move
	$(document).off('dragover');
	$(document).off('dragleave');
	$(document).off('dragenter');
    $(document).off('drop');
    //$("[data_wmwidget_id]").off('click');
    $(document).off('mouseup');
	$(".wm_ventana").off("mousedown");
	//flip
	$("[data_wmwidget_id]").off("dblclick");
	//flop
	$("[data_wmwidget_id]").off("dblclick");
	//flopComplex
	$(".wm_selected").off("dblclick");
	//incluirSparks
	$('[data_wmwidget_id]').off("hover");
	$('.wm_sparkclick').off("hover");
	$('.wm_sparkdblclick').off("hover");
	$('.wm_sparkmouseenter').off("hover");
	$('.wm_sparkmouseleave').off("hover");
	//selectWidget
	$('.wm_select').off("click");
	//deselectWidget
	$('.wm_deselect').off("click");
	//hideWidget
	$('.wm_hide').off("click");
	//clickEvent();
	$('.wm_sparkclick').off("click");
	//doubleClickEvent();
	$('.wm_sparkdblclick').off("click");
	//mouseEnterEvent()
	$('.wm_sparkmouseenter').off("click");
	//mouseLeaveEvent();
	$('.wm_sparkmouseleave').off("click");
	//foreignClones
	//$("#wm_foreignButton").off("click");
	//clickCloneForeign()
	//$(document).off("click");
	//evitarClicksIndeseados
	$('[data_wmwidget_id]').off("click");
	//dragAndDropForeignClones();
	$("#foreignClones a").off("click");
	$("#foreignClones a").off("mousedown");
	$("#foreignClones a").off("mouseup");
	$("#foreignClones a").off("mousedown");
	$("#widgetizar").off("click");
	$("#clone").off("click");
	$(document).off("dragover");
	$(document).off("dragenter");
	$(document).off("dragleave");
	$(document).off("drop");
	//deleteWidgetFromWidgetList()
	$('.foreignCloneToolButtonDelete').off("click");
	//undoWidget()
	$('.wm_undo').off('click');
	//clickChangeState
	$(document).off('find');
	$(document).off('find');
	$(document).off('find');
	$(document).off('find');
	$(document).off('find');
	$(document).off('find');
	$(document).off('find');
	$(document).off('find');
	$(document).off('find');
}

function artivarEventos(){
	//   clickClone();
    //   dragAndDrop();
       dragAndDropForeignClones();
       widgetizar($("div"));
       move();
       ponerXenwidget();
       cerrarWidget();
       incluirSparks();
       selectWidget();
       deselectWidget();
       hideWidget();
       clickEvent();
       doubleClickEvent();
       mouseEnterEvent();
       mouseLeaveEvent();
       flip();
     //  foreignClones();
       evitarClicksIndeseados();
       deleteWidgetFromWidgetList();   
       undoWidget();
}*/

/*var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    queries = queryString.split("&");

    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
 
    return params;
};
function getKeys(obj, filter) {
    var name,
        result = [];

    for (name in obj) {
        if ((!filter || filter.test(name)) && obj.hasOwnProperty(name)) {
            result[result.length] = name;
        }
    }
    return result;
}
function arrayCompare (array,array2) {
    // if the other array is a falsy value, return
    if (!array||!array2)
        return false;

    // compare lengths - can save a lot of time
    if (array2.length != array.length)
        return false;

    for (var i = 0, l=array2.length; i < l; i++) {
        // Check if we have nested arrays
        if (array2[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!arrayCompare(array[i],array2[i]))
                return false;
        }
        else if (array2[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
function getNumberSameItemsInAsocArray (array,array2) {
    var res=0;
    if (!array||!array2)
        return res;
        
    var i=0;
    for (i in array) {
       if(array[i]==array2[i]){
        res++;
       }
    }
    return res;
};
function form2form(formA, formB) {
    $(':input[name]', formA).each(function() {
        $("[name='" + $(this).attr('name') +"']", formB).val($(this).val());
    });
};*/

/*function serializeWithEscape(form) {
        if (!form || form.nodeName !== "FORM") {
                return;
        }
        var i, j, q = [];
        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
                if (form.elements[i].name === "") {
                        continue;
                }
                switch (form.elements[i].nodeName) {
                case 'INPUT':
                        switch (form.elements[i].type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                        case 'button':
                        case 'reset':
                        case 'submit':
                                q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                                break;
                        case 'checkbox':
                        case 'radio':
                                if (form.elements[i].checked) {
                                        q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                                }                                               
                                break;
                        case 'file':
                                break;
                        }
                        break;                   
                case 'TEXTAREA':
                        q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                        break;
                case 'SELECT':
                        switch (form.elements[i].type) {
                        case 'select-one':
                                q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                                break;
                        case 'select-multiple':
                                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                        if (form.elements[i].options[j].selected) {
                                                q.push(form.elements[i].name + "=" + escape(form.elements[i].options[j].value));
                                        }
                                }
                                break;
                        }
                        break;
                case 'BUTTON':
                        switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                                q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                                break;
                        }
                        break;
                }
        }
        return q.join("&");
};
function addFunctionalityToComplex(node,defClone){
  var shadow=node.webkitShadowRoot;
  var divInputs=shadow.children[1];
  for (extract in defClone.extracts){
      var act=defClone.extracts[extract];
      var binded=false;
      var input=$("input[name='"+extract+"']",divInputs);
      if(act.node!=null){
          var nodeValue=act.node;
          if(act.regexp!=null){
            var matches=new RegExp(act.regexp).exec(nodeValue);
            if(matches!=null&&matches.length>1){
                nodeValue=matches[1];
                binded=true;
            }
          }         
          input.val(nodeValue);
      }
      input.attr("data-wmwidget-binded",binded);
  }  
  var form=$("form",divInputs);
  var copy=false;
  if(form.length==0&&defClone.widgets[0].completeForm!=null){
    var artForm=document.createElement("form");
    var mainContainer=divInputs.children[1];
    divInputs.replaceChild(artForm,mainContainer);
    artForm.appendChild(mainContainer);
    copy=true;
    form=$(defClone.widgets[0].completeForm);
    form2form($(artForm),form);
  }
  form=form[0];

  shadow.addEventListener("submit",function(ev){
    ev.preventDefault();
	ev.stopPropagation();
    if(copy){
        form2form($(artForm),form);   
    }
    handleFunctionalityOnSubmitComplex(form,defClone,shadow);
  },true);  
  handleFunctionalityOnSubmitComplex(form,defClone,shadow);
};*/

/*function handleFunctionalityOnSubmitComplex(form,defClone,shadow){
   var params;
   if(defClone.widgets[0].charset=="ISO-8859-1"){
       params=serializeWithEscape(form);       
   }else{
       params=$(form).serialize();
   }
   var url=form.action;
   if(form.method=="post"){url=url.split("?")[0];}
   $.ajax({ //load form url
    type: form.method,
    url: url,
    data: params,
    success: function(data,status,xhr) {
        var doc=document.implementation.createHTMLDocument();
        doc.documentElement.innerHTML=data;
        var base=doc.createElement("base");
        var loc=xhr.getResponseHeader("Location")!=null?xhr.getResponseHeader("Location"):form.action;
        base.href=loc; //Or Location
        doc.documentElement.firstElementChild.appendChild(base);
        var as=[];
        
        var hrefs=[];
        $("a",doc).each(function(i,a){ //extract urls from page result
            var href=a.href;
            if($.inArray(href,hrefs)==-1){
             as.push(a);
             hrefs.push(href);
            }
        });
        $(defClone.widgets.slice(1)).each(function(j,widget){ //for each part of complex
            var nodeNew=doc.evaluate(widget.xpath,doc,null, XPathResult.ANY_TYPE, null).iterateNext();  
            if(nodeNew!=null){ //Node found in result page
                refreshWidgetPart(j,shadow,data,loc,widget);        
            }else{ //Navigate through result page
                refreshWidgetFromFormResult(j,widget,doc,hrefs,as,shadow);
            }
        });
    }
    }); 
};
function refreshWidgetFromFormResult(j,widget,doc,hrefs,as,shadow){
    var anchor=document.createElement("a");
    anchor.href=widget.url;
    var url=anchor.pathname;//widget.url;
    var actDist=[];
    var urlSplit=url.split("/").slice(1);
    // Workout syntactic proximity
    $(hrefs).each(function(i,a){
        var anc=document.createElement("a");
        anc.href=a;
        actDist.push(levDist(anc.pathname,url)+1000*Math.abs(anc.pathname.split("/").slice(1).length-urlSplit.length));
    });
    $(hrefs).each(function(i,a){
        if(actDist[i]<1000){
            var anc=document.createElement("a");
            anc.href=a;
            var aSplit=anc.pathname.split("/").slice(1);
            var dis=0;
            for(var ind=0;ind<urlSplit.length;ind++){
             var tDis=levDist(aSplit[ind],urlSplit[ind]);
             dis=tDis==0?dis-100:dis+tDis;
            }
            
            var q1Params=parseQueryString(anchor.search.substr(1));
            var q2Params=parseQueryString(anc.search.substr(1));
            var q1ParamsKeys=getKeys(q1Params).sort();
            var q2ParamsKeys=getKeys(q2Params).sort();            
            if(anchor.pathname==anc.pathname){
             if(arrayCompare(q1ParamsKeys,q2ParamsKeys)){
               dis=dis-30-(10*getNumberSameItemsInAsocArray(q1Params,q2Params));
             }else if(q1ParamsKeys.length==q2ParamsKeys.length){
                dis=dis-20; 
             }else{
                dis=dis+5*Math.abs(q1ParamsKeys.length-q2ParamsKeys.length); 
             }
            }
            actDist[i]=dis;
        }
    });
    refreshWidgetFromForResultIfFine(0,as,actDist,j,shadow,widget,url);

};*/

/*function refreshWidgetFromForResultIfFine(intent,as,actDist,j,shadow,widget,url){
    var index=actDist.indexOf(Math.min.apply(Math,actDist)); //Take best ranked URL
    console.log("Most similar to : "+url+" is "+as[index]);

    $.ajax({ //Load URL 
        type: "GET",
        url: as[index],  
        success: function(data,status,xhr) {
            var doc=document.implementation.createHTMLDocument();
            doc.documentElement.innerHTML=data;
            var base=doc.createElement("base");
            var loc=xhr.getResponseHeader("Location")!=null?xhr.getResponseHeader("Location"):as[index];
            base.href=loc; //Or Location
            doc.documentElement.firstElementChild.appendChild(base);                                       
            
            var nodeNew=doc.evaluate(widget.xpath,doc,null, XPathResult.ANY_TYPE, null).iterateNext();  //Evaluate XPATH
            if(nodeNew!=null){
                refreshWidgetPart(j,shadow,data,loc,widget);
            }else if(intent<40){
                as.splice(index,1);
                actDist.splice(index,1);
                refreshWidgetFromForResultIfFine(intent+1,as,actDist,j,shadow,widget,url);
            }
        }                                     
    });
};
function refreshWidgetPart(j,shadow,data,loc,widget){
    var doc=document.implementation.createHTMLDocument();
    doc.documentElement.innerHTML=data;
    var base=doc.createElement("base");
    base.href=loc;
    doc.documentElement.firstElementChild.appendChild(base);
    var links=doc.querySelectorAll("link[rel=stylesheet]");
    var arr=[];var i=0;for(i=0;i<links.length;i++){arr[i]=links[i];}
    var callback=function(){refreshWidgetPart3(doc,j,shadow,widget);};
    refreshWidgetPart2(arr,j,shadow,widget,callback);                                      
};
function refreshWidgetPart2(links,j,shadow,widget,callback){
    if(links.length>0){
        var link=links[0];
        var restLink=links.slice(1);
        var callb=function(){refreshWidgetPart2(restLink,j,shadow,widget,callback);};
        resolveLinkCSS(link,callb);
    }else{
        callback();
    }                                         
};
function refreshWidgetPart3(doc,j,shadow,widget){
    var frame=document.createElement("iframe");
    frame.sandbox="allow-same-origin";
    document.body.appendChild(frame); 
    frame.style.display="none";frame.style.position="absolute";frame.style.border="0";frame.style.top="0";frame.style.left="0";
    frame.style.width=widget.wwidth+"px";frame.style.height=widget.wheight+"px";
    var destDocument = frame.contentDocument;
    var srcNode = doc.documentElement;
    var newNode = destDocument.importNode(srcNode, true);  
    destDocument.replaceChild(newNode, destDocument.documentElement);
    
    var nodeNew=destDocument.evaluate(widget.xpath,destDocument,null, XPathResult.ANY_TYPE, null).iterateNext();

    setTimeout(function(){
        var nHTML=flo.getStyledNode(nodeNew);
        var div=shadow.getElementById("ComplexWidget"+(j+1));
        div.innerHTML=nHTML;
        frame.parentNode.removeChild(frame);
    },500);
};*/

/*function getAnchors(){
 var docElement=document.documentElement;

 var nodesInserted=$("[data_wmwidget_type='cloned'],[data_wmwidget_type='widgetized'],[data_wmwidget_type='foreignCloned']").map(function(n,node){
   var range=document.createRange();
   range.selectNode(node);
   node.parentNode.removeChild(node);
   return{node:node,range:range};
 });
 
 var xpathsInserted=nodesInserted.map(function(n,elem){
   var node=elem.node;
   var range=elem.range;
   range.insertNode(node);   

   var place=node.nextSibling!=null?"before":"append";
   var type=node.getAttribute("data_wmwidget_type");
   var id=node.getAttribute("data_wmwidget_id");
   var title=node.getAttribute("title");
   var foreignClonedType=node.getAttribute("data_wmwidget_foreignCloned_type");
   var refNode=node.nextSibling!=null?node.nextSibling:node.parentNode;
   node.parentNode.removeChild(node);   
   var xpath=minimizeXPath(generateXPath(refNode,docElement,null,{showId:true}),docElement).join("");
   var res={place:place,xpath:xpath,type:type,id:id, title:title, foreignClonedType:foreignClonedType};
   console.log("GetAnchor inserted: "+id+" "+type+" "+ place+" "+xpath+" "+node.outerHTML);
   if(type=="cloned"||(type=="widgetized"&&node.getAttribute("data_wmwidget_widgetized_updated")=="true")){
    res.html=node.outerHTML;
   }else if(type=="foreignCloned"){
    var extra=JSON.parse(node.getAttribute("data-wmwidget-foreign"));
    if(extra.widgetType=="html"){
      var child=$(node.webkitShadowRoot.children);
      var d=child.first().detach();
      extra.html=node.webkitShadowRoot.innerHTML;
      node.webkitShadowRoot.insertBefore(d[0],node.webkitShadowRoot.firstElementChild);
    }else if(extra.widgetType=="complex"){
      var ind=0;
      $(node.webkitShadowRoot.children).map(function(i,div){if(div.className=="widgetContainer"){extra.widgets[ind].html=div.innerHTML;ind++;}});
      var extracts=node.getAttribute("data-wmwidget-extractfroms");
      if(extracts!=null){
          extracts=JSON.parse(extracts);
          extra.extracts=extracts;
          for(elem in extracts){
              var act=extracts[elem];
              var toStore=[];
              var refDoc=document;
              if(act.iframe!==""){
                    var ifr=$("[data-wmwidget-iframe="+act.iframe+"]")[0];
                    var xpath=minimizeXPath(generateXPath(ifr,refDoc.documentElement,null,{showId:true}),refDoc.documentElement).join("");
                    toStore[toStore.length]=xpath;
                    refDoc=ifr.contentDocument;
              }
              var data=$("[data-wmwidget-nodeid="+act.id+"]",refDoc)[0];
              var xpath=minimizeXPath(generateXPath(data,refDoc.documentElement,null,{showId:true}),refDoc.documentElement).join("");
              toStore[toStore.length]=xpath;
              act.xpaths=toStore;
          }
      }
    }
    res.extra=extra;   
   }   
   return res;
 });
 
 
 var nodesExisting=$("[data_wmwidget_type='original_widgetized']").map(function(n,node){
   var id=node.getAttribute("data_wmwidget_id");
   var type=node.getAttribute("data_wmwidget_type");
   var title=node.getAttribute("title");
   var foreignClonedType=node.getAttribute("data_wmwidget_foreignCloned_type");
   var xpath=minimizeXPath(generateXPath(node,docElement,null,{showId:true}),docElement).join("");
   console.log("GetAnchor Existing: "+id+" "+type+" "+xpath+" "+node.outerHTML);
   return {type:type,xpath:xpath,id:id, title:title, foreignClonedType:foreignClonedType};
 });
 $(nodesInserted.toArray().reverse()).map(function(n,elem){
  elem.range.insertNode(elem.node);
 });

 return {insert:xpathsInserted.toArray(),recover:nodesExisting.toArray()};
}*/


/*function resolveLinkCSS(link,callback){
    console.log("Resolving css: "+link.href);
    $.get(link.href).done(function(css){
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet){
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }       
        link.parentNode.replaceChild(style,link);
    }).always(function(){
        callback();
    });
};
function putNodesAnchors(config){
 var docElement=document.documentElement;
 var configOfExisting=$(config.recover);
 var configOfInserted=$(config.insert);
 var tempConfigForHtml={};
 configOfExisting.map(function(n,elem){
 if(node!=null){
	   var node=document.evaluate(elem.xpath, docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
	   node.setAttribute("data_wmwidget_type",elem.type);
	   node.setAttribute("data_wmwidget_id",elem.id);
	   node.setAttribute("data_wmwidget_foreignCloned_type",elem.foreignClonedType);
	   node.setAttribute("title",elem.title);
	   node.classList.add('resizable');
	   elem.node=node;
	   tempConfigForHtml[elem.id]=elem.node;
	   console.log("Anchoring existing: "+elem.type+" "+elem.xpath+" "+node.outerHTML);
   }
 });

 configOfInserted.map(function(n,elem){
   var node=document.evaluate(elem.xpath, docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
   elem.node=node; 
   if(elem.type=="foreignCloned"&&elem.extra.widgetType=="complex"){
       var extracts=elem.extra.extracts;
       if(extracts!=null){
          for(extract in extracts){
              var act=extracts[extract];
              var xpaths=act.xpaths;
              var xpath=xpaths[0];
              var node;
              var refDoc=document;
              if(xpaths.length==2){
                node=refDoc.evaluate(xpath, refDoc.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
                node.setAttribute("data-wmwidget-iframe",act.iframe);
                refDoc=node.contentDocument;
                xpath=xpaths[1];
              }
              node=refDoc.evaluate(xpath, refDoc.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
              var nodeValue="";
			  if(node!=null){
			  	node.setAttribute("data-wmwidget-nodeid",act.id);
				nodeValue=node.textContent.replace(/(\n| )+/g," ").trim();
			  }
              extracts[extract].node=nodeValue; 
          } 
       }
   }
 });

 configOfInserted.map(function(n,elem){
   var node=elem.node;
   var html;
   if(elem.type=="widgetized"){
    html=$(elem.html!=null?elem.html:tempConfigForHtml[elem.id].outerHTML) ;  
   }else if(elem.type=="cloned"){
    html=$(elem.html);       
   }else if(elem.type=="foreignCloned"){
    html=crearForeignClone(elem.extra);
    if(elem.extra.widgetType=="complex"){
      addFunctionalityToComplex(html[0],elem.extra);
    }
   }

   if(elem.place=="before"){
    node.parentNode.insertBefore(html[0],node);
   }else if(elem.place=="append"){
    node.appendChild(html[0]);
   }
   html[0].setAttribute("data_wmwidget_type",elem.type);
   html[0].setAttribute("data_wmwidget_id",elem.id);
   html[0].setAttribute("data_wmwidget_foreignCloned_type",elem.foreignClonedType);
   html[0].setAttribute("title",elem.title);
   html[0].classList.add('resizable');
   elem.node=html[0];
   console.log("Anchoring inserting: "+elem.place+" "+elem.xpath+" "+node.outerHTML);
 });

} */


/*Go through an String from last position to first. When found a no numeric character it return went through number*/
/*
* @ Object: "elem123"
* @ Returns: "123"
*
* @ Object: "elem1-234"
* @ Returns: "234
* */
/*String.prototype.getWidgetIdentifier = function(){
	function is_numeric(str){
		return /^\d+$/.test(str);
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
};*/

/*function getProjectName(f){
				var dialog=$("<div id='wm_dialog2'></div>");
			  $(document.body).append(dialog);
		   	  dialog.load(chrome.extension.getURL("parts/projectName.html"),function(){
			  dialog.dialog({
			      resizable: false,
			      modal: true,
			      buttons: {
			        "Accept": function() {
			          var projectName=document.getElementById("projectName").value;
			          var valorCorrecto;
			          if( projectName == null || projectName.length == 0 || /^\s+$/.test(projectName) ){
						          	valorCorrecto=false;
						          }
					  else{
					  	valorCorrecto=true;
					  }
					  if(valorCorrecto){
					  	dialog.remove();
				        eliminarEventos();
			            artivarEventos();
			            f(projectName);
					  }
			        },
			        Cancel: function() {
			        	dialog.remove();
			        	eliminarEventos();
			            artivarEventos();
			            var nada="";
			            f(nada);
			        }
			      }
			    });
			    dialog.parent().zIndex(999999999);
			    
			     dialog.find("input").on('keypress', function(e) {
						if(e.keyCode==13){
							var projectName=document.getElementById("projectName").value;
					          var valorCorrecto;
					          if( projectName == null || projectName.length == 0 || /^\s+$/.test(projectName) ){
								          	valorCorrecto=false;
								          }
							  else{
							  	valorCorrecto=true;
							  }
							  if(valorCorrecto){
							  	dialog.remove();
						        eliminarEventos();
					            artivarEventos();
					            f(projectName);
							  }
						}
					});
});


} */