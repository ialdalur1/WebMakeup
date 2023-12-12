//@ sourceURL=canvasmodel.js

var paletteModel;
var emitte;
var conditionList= new Array();
Canvasmodel=function(paletteModelo){
	this.numbers=1;
	this.numerodeWidget=0;
	this.posUltimoWidget=-1;
	this.savingExporting=false;
	this.isDragAndDroping=false;
	this.widgetsInserted = new Array();
	this.lastCopy;
	this.htmlCopy;
	this.inputConfig;
	this.outputConfig;
	this.container;
	this.inicializarFlechas();
	paletteModel=paletteModelo;
	this.handleCopyInicializacion();
	this.htmlCopyInicializacion();
	this.introducirHtmlEditor();
	emitte = new Jvent();
	this.addListeners();
	this.artivarEventos();
	this.checkProblems();
	return this;
};

Canvasmodel.prototype.checkProblems=function(){ //checkea listeners, Ajax y Javascript  
	var allNodes = document.body.getElementsByTagName("*");
	for(var i=0; i<allNodes.length; i++){
		var wType=null;
			if(allNodes[i].tagName!="SCRIPT"){
				if($(allNodes[i]).attr("data-events")!=null||$(allNodes[i]).find("[data-events]").length>0){
			        wType="iframe";
			    }else if(($(allNodes[i]).tagName=="INPUT"||$(allNodes[i]).find("input").length>0)&&!($(allNodes[i]).tagName=="FORM"||$(allNodes[i]).parents("form").length>0)){
			         wType="iframe";
			    }else{
			          wType="html";
			    } 
			    if(wType=="iframe"){//AJAX
			    	allNodes[i].setAttribute("wm_ajaxProblem", "true");
			    }else if(allNodes[i].tagName=="IFRAME"){//lo considero un script
					allNodes[i].setAttribute("wm_jsProblem", "true");
				}
			}
		}
		this.deleteUnnecessaryAjax();
};

Canvasmodel.prototype.deleteUnnecessaryAjax=function(){
//	var listElem=$("[wm_ajaxProblem]");debugger;
//	for(var i=0; i<listElem.length; i++){
		//for(var j=i+1; j<listElem.length; j++){
			//if($(listElem[i]).find('[wm_ajaxProblem]').length>3){
			//if($(listElem[i]).contents('[wm_ajaxProblem]')>1){
			//if($(listElem[i]).has('[wm_ajaxProblem]').size()<2){
			//if($.contains( listElem[i], listElem[j] )){
				//console.log($(listElem[i]).children("[wm_ajaxProblem]").length);
//			if($(listElem[i]).contents().find('[wm_ajaxProblem]').length>2){
//				$(listElem[i]).attr("wm_ajaxproblem", "false");
			//}
//		}
//	}
	var hijosbody=$('body').children();debugger;
	for(var i=0; i<hijosbody.length; i++){
		if($('body').children()[i].attributes.wm_ajaxProblem!=undefined){
			if(hijosbody[i].attributes.wm_ajaxProblem.textContent=="true"){
				$(hijosbody[i]).attr("wm_ajaxproblem", "false");
			}
		}
	}
	this.eliminarProblems();
};

Canvasmodel.prototype.eliminarProblems=function(){
	setTimeout(function(){
		var listElem=$("[wm_ajaxProblem]");
		for(var i=0; i<listElem.length; i++){
			$(listElem[i]).attr("wm_ajaxproblem", "false");
		}
		var listJs=$("[wm_jsProblem]");
		for(var i=0; i<listJs.length; i++){
			$(listJs[i]).attr("wm_jsProblem", "false");
		}
	}, 5000);
};

Canvasmodel.prototype.activarRisize=function(){
	$( ".resizable" ).resizable({
  //    animate: true
  //https://www.google.es/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=resizable+element+javascript
  //http://cssdeck.com/labs/d5u5fol7
  //https://codepen.io/zz85/post/resizing-moving-snapping-windows-with-js-css
  //http://interactjs.io/
  //https://jqueryui.com/resizable/#default
    });
};

Canvasmodel.prototype.inicializarFlechas=function(){
	var layer=new WireIt.util.BodyLayer({containers:[{xtype:"WireIt.util.BodyContainer"}]});
	var container=layer.containers[0];

	var config={wireConfig: {width: 1,
					label: "click",
					labelStyle: { fontSize: "100%" },
					labelEditor: {type: 'select', choices: ['mouseEnter', 'click', 'dbClick'] },					
					xtype: "WireIt.BezierArrowWire"}};
	var input={	className:"WireIt-Terminal WireInput",		
				ddConfig:{ type: "input", allowedTypes: ["output"] },
				alwaysSrc:true,		
				xtype:"WireIt.util.TerminalBody"};
	var output={className:"WireIt-Terminal WireOutput",		
				ddConfig:{ type: "output", allowedTypes: ["input"] },
				xtype:"WireIt.util.TerminalCustomElement"};				 
	var inputConfig=YAHOO.lang.merge(config,input);
	var outputConfig=YAHOO.lang.merge(config,output);
	this.inputConfig=inputConfig;
	this.outputConfig=outputConfig;
	this.container=container;
};

Canvasmodel.prototype.clone=function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
};

Canvasmodel.prototype.nuevasFlechas=function(elemento, name1, name2) {
	var block = elemento[0];
	this.container.addTerminal(this.inputConfig,block);
	this.container.terminals[this.container.terminals.length-1].name=name1;
	this.container.addTerminal(this.outputConfig,block);
	this.container.terminals[this.container.terminals.length-1].name=name2;
};

Canvasmodel.prototype.createOrchestration=function(list){
 var orchestrations=new Array();
 for(var h=0; h<canvasmodel.container.wires.length; h++){
   var id=canvasmodel.container.wires[h].terminal2.parentEl.getAttribute("data_wmwidget_id");
   var id2=canvasmodel.container.wires[h].terminal1.parentEl.getAttribute("data_wmwidget_id");
   var estadoInicial=canvasmodel.widgetsInserted[id].estadoWidget;
   orchestrations.push({idactor: id2,idreactor:id,actor: canvasmodel.container.wires[h].terminal1.parentEl.title, action: canvasmodel.container.wires[h].labelField.value, reactor:canvasmodel.container.wires[h].terminal2.parentEl.title, initial:estadoInicial});
 }
 return orchestrations;
};

Canvasmodel.prototype.updateWidgetlist=function(list){
	widgetList=list;
};

if(typeof CLONE_ACTIVATED === "undefined" && typeof CLONE_ENABLED === "undefined"){
    CLONE_ACTIVATED=false;
    CLONE_ENABLED=false;
}

function onCloneEnable(request){debugger;
    if(request.operation=="activateClone"){
		$(".wm_background").removeClass("wm_background");
		$(".wm_backgroundForeign").removeClass("wm_backgroundForeign");			
    }   
}
chrome.runtime.onMessage.addListener(onCloneEnable);

Canvasmodel.prototype.evitarClicksIndeseados=function(){
	var obj=this;
/*		$(document).mousedown(function(e){
		console.log("pesadilla222222");
	});
	$('[data_wmwidget_id]').mousedown(function(e){
		console.log("pesadilla");
	});*/
	$('[data_wmwidget_id]').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			if(!(e.target.classList.contains('WireIt-Terminal'))){
				obj.eliminarEventos();
				obj.artivarEventos();
			}
	if(e.altKey){
		var w=obj.getWidget($(e.target));
		if(w!=null){
			var num=w.attr("data_wmwidget_pattern_number");
			if(num==null){
				obj.addNumber(w,obj.numbers);
				obj.numbers++;
			}else{
				obj.renumberFrom(num);				
				obj.numbers--;
			}
		}
	}			
	});
};

Canvasmodel.prototype.evitarClicksIndeseados2=function (){
	$('[data_wmwidget_id]').click(function(e){
			e.preventDefault();
			e.stopPropagation();
	});
};

Canvasmodel.prototype.nombreCorrecto=function (cloneName){
	var valorCorrecto;
	if( cloneName == null || cloneName.length == 0 || /^\s+$/.test(cloneName) ){
		valorCorrecto=false;
	}
	else{
	     valorCorrecto=true;
	}
	return valorCorrecto;
};

Canvasmodel.prototype.deleteWidgetFromWidgetList=function (){
	var obj=this;
	$('.foreignCloneToolButtonDelete').click(function(e){	
		obj.deleteWidgetFromWidgetListBis(e);
	});
};

Canvasmodel.prototype.deleteWidgetFromWidgetListBis=function(e, widgetList){
	var widgetToDelete;
	var objeto=this;
	this.eliminarEventos();
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
		$(elem).remove();
		
		for(var j=0; j<paletteModel.widgetList.length; j++){
			$('#'+paletteModel.widgetList[j].type).remove();
		}
		$(".foreignCloneToolButtonDelete").remove();//lo pongo xq siempre me queda un boton de eliminar
		paletteModel.widgetList[widgetToDelete].type="";
		paletteModel.widgetList[widgetToDelete].xpath="";
		paletteModel.widgetList[widgetToDelete].widgetType="";
		paletteModel.widgetList[widgetToDelete].html="";
		paletteModel.widgetList[widgetToDelete].url="";
		chrome.storage.local.get("widgets",function (obj){
			 var tempWidgetList=obj["widgets"]!=null?obj["widgets"]:[];
			 var widgetAEliminar=widgetToDelete-3;
			 var deleted=tempWidgetList.splice(widgetAEliminar,1);
			 chrome.storage.local.set({"widgets":tempWidgetList});
			 paletteModel.numWidgetListToDelete=0;
			 paletteModel.loadCloneWidgets();
			 objeto.artivarEventos();
		      }); 
};

Canvasmodel.prototype.checkIfInView=function (element, reactivacionWidgetized){
	var obj=this;
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
    	if(reactivacionWidgetized){
    		this.reactivarWidgetizar();
    	}
        $('html,body').animate(moveTo, 1000, "swing", function(){
        	setTimeout(function(){obj.widgetizar(element);},1);
        });
    }
};

Canvasmodel.prototype.reactivarWidgetizar=function (){
	$(document).off('click');
	$(document).off('keypress');
	$(document).off('mouseover');
	$(document).off('mouseout');
	$("#buttonLeft a").off('mousedown');
	$("#widgetizar").off('click');
	$("#clone").off('click');
	$("#extruderLeft").off('click');
};

Canvasmodel.prototype.contieneElemento=function (elem){
	 var flag=false;
	 var flug=false;
	for(var h=0; h<$("[data_wmwidget_id]").size(); h++){
		if(elem.closest("[data_wmwidget_id]")[0]==$("[data_wmwidget_id]")[h] || $.contains($("[data_wmwidget_id]")[h],elem[0])){
			flag=true;
		}
		if($("[data_wmwidget_id]")[h].attributes.data_wmwidget_type.textContent!="original_widgetized"){
			if($.contains(elem[0],$("[data_wmwidget_id]")[h])){
				flug=true;
			}
		}
	}
	return (flag || flug);
};

Canvasmodel.prototype.contieneElementoMoveClick=function (elemParent, elem){
	 var flag=false;
	 var flug=false;
	for(var h=0; h<$("[data_wmwidget_id]").size(); h++){
	//	if(elemParent.closest("[data_wmwidget_id]")[0]==$("[data_wmwidget_id]")[h] || $.contains($("[data_wmwidget_id]")[h],elemParent[0])){
		if($.contains($("[data_wmwidget_id]")[h],elemParent[0])){
			flag=true;
		}
		if($("[data_wmwidget_id]")[h].attributes.data_wmwidget_type.textContent!="original_widgetized"){
			if(elem[0]!=$("[data_wmwidget_id]")[h]){
				if($.contains(elemParent[0],$("[data_wmwidget_id]")[h])){
					flug=true;
				}
			}
		}
	}
	return (flag || flug);
};

Canvasmodel.prototype.contieneRestoElementos=function (elem){
	var nodosPadre=$('html')[0]==elem[0] || $('body')[0]==elem[0];
//	var flog=$.contains($("#extruderBottom")[0],elem[0]);
	var flig=$.contains($("#extruderLeft")[0],elem[0]);
	var flug=$.contains($("#extruderRight")[0],elem[0]);
	var fleg=$('.wm_close')[0]==elem[0] || $('.wm_select')[0]==elem[0] || $('.wm_hide')[0]==elem[0] || $('.wm_undo')[0]==elem[0] || $('.wm_download')[0]==elem[0] || $('.wm_ventana')[0]==elem[0] || $.contains($('.wm_close')[0],elem[0]) || $.contains($('.wm_download')[0],elem[0]) || $.contains($('.wm_select')[0],elem[0]) || $.contains($('.wm_hide')[0],elem[0]) || $.contains($('.wm_undo')[0],elem[0]) || $.contains($('.wm_ventana')[0],elem[0]);
	//return (flog || flig || fleg || nodosPadre);	
	return (flig || fleg || nodosPadre || flug);	        	
};

Canvasmodel.prototype.contieneScript=function (elem){
	var script=elem.getElementsByTagName("script");
	if(script[0]==undefined){
		return false;
	}
	else{
		return true;
	}
	//return script[0].tagName=="SCRIPT";
};

Canvasmodel.prototype.contieneElementoDragAnddrop=function (elem){
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
};

Canvasmodel.prototype.contieneElementoWire=function(elem){
	var flag=false;
	var fleg=false;
	var flig=false;
	var flog=false;
	var flug=false;
	for(var h=0; h<$(".WireIt-Wire").size(); h++){
		if(elem.closest(".WireIt-Wire")[0]==$(".WireIt-Wire")[h] || $.contains($(".WireIt-Wire")[h],elem[0])){
			flag=true;
		}
	}
	for(var j=0; j<$(".WireIt-Wire-scissors").size(); j++){
		if(elem.closest(".WireIt-Wire-scissors")[0]==$(".WireIt-Wire-scissors")[j] || $.contains($(".WireIt-Wire-scissors")[j],elem[0])){
			fleg=true;
		}
	}
	for(var i=0; i<$(".inputEx-InPlaceEdit-editor").size(); i++){
		if(elem.closest(".inputEx-InPlaceEdit-editor")[0]==$(".inputEx-InPlaceEdit-editor")[i] || $.contains($(".inputEx-InPlaceEdit-editor")[i],elem[0])){
			flig=true;
		}
	}
	for(var l=0; l<$(".inputEx-InPlaceEdit-visu").size(); l++){
		if(elem.closest(".inputEx-InPlaceEdit-visu")[0]==$(".inputEx-InPlaceEdit-visu")[l] || $.contains($(".inputEx-InPlaceEdit-visu")[l],elem[0])){
			flog=true;
		}
	}
	for(var m=0; m<$(".wm_conditionalButton").size(); m++){
		if(elem.closest(".wm_conditionalButton")[0]==$(".wm_conditionalButton")[m] || $.contains($(".wm_conditionalButton")[m],elem[0])){
			flug=true;
		}
	}
	//inputEx-InPlaceEdit-visu
	
	return (flag || fleg || flig || flog || flug);
};

var posAnteriorUltimoWidget="-1";
Canvasmodel.prototype.previoInsertConditionalIcon=function(){
	$('.WireIt-Terminal').mousedown(function(e){
		posAnteriorUltimoWidget=posUltimoWidget;
	});
};

Canvasmodel.prototype.insertConditionalIconCarryon=function(orc){
	var obj=this;
	var aux;
	//	setTimeout(function(){ 
		debugger;
		for(var i=0; i<$(".WireIt-Wire-Label").length; i++){
			aux=$(".WireIt-Wire-Label")[i];
			if(!($(aux).hasClass("wm_conditionalButtonAdded"))){//si no tiene boton, se inserta
				$(aux).append('<button class="wm_conditionalButton wmfrom_'+orc.idactor+' wmto_'+orc.idreactor+'">Condition</button>');
				$(aux).addClass("wm_conditionalButtonAdded"); 
				obj.eliminarEventos();
				obj.artivarEventos();
			}
		}
//		}, 0);
};

Canvasmodel.prototype.insertConditionalIcon=function(){
	var obj=this;
	var aux;
	$('[data_wmwidget_id]').mouseup(function(e){
		setTimeout(function(){ 
		for(var i=0; i<$(".WireIt-Wire-Label").length; i++){
			aux=$(".WireIt-Wire-Label")[i];
			if(!($(aux).hasClass("wm_conditionalButtonAdded"))){//si no tiene boton, se inserta
				$(aux).append('<button class="wm_conditionalButton wmfrom_'+posAnteriorUltimoWidget+' wmto_'+posUltimoWidget+'">Condition</button>');
				$(aux).addClass("wm_conditionalButtonAdded"); 
				obj.eliminarEventos();
				obj.artivarEventos();
			}
		}
		}, 0);
	});
	
	$('.wm_closeVentana').mouseup(function(e){
		setTimeout(function(){ 
		for(var i=0; i<$(".WireIt-Wire-Label").length; i++){
			aux=$(".WireIt-Wire-Label")[i];
			if(!($(aux).hasClass("wm_conditionalButtonAdded"))){//si no tiene boton, se inserta
				$(aux).append('<button class="wm_conditionalButton wmfrom_'+posAnteriorUltimoWidget+' wmto_'+posUltimoWidget+'">Condition</button>');
				$(aux).addClass("wm_conditionalButtonAdded"); 
				$('.wm_ventana').removeClass('wm_clickMoveMode');
				$('.wm_ventana').addClass('wm_clickNormal');
				obj.eliminarEventos();
				obj.artivarEventos();
			}
		}
		}, 0);
	});
};

Canvasmodel.prototype.clickConditionalIcon=function(){
	var obj=this;
	$(".wm_conditionalButton").click(function(e){
		obj.eliminarEventos();
		console.log("AAAAAAA");
		$(e.srcElement).after("<div class='wm_conditionalDefinitionDiv'><input type='text' class='wm_valor1' value><select id='wm_selectConditional'><option value='wm_menor'>"+'<'+"</option><option value='wm_mayor'>"+'>'+"</option><option value='wm_igual'>"+'='+"</option></select><input type='text' class='wm_valor2' value><br><button class='wm_conditionAccept'>Ok</button><button class='wm_conditionCancel'>Cancel</button></div>");
		//var boton=$(".wm_conditionalButton").detach();
		var boton=obj.buscarExisteCondicional(this);
		obj.pintarConditionalIcon(boton);
		obj.acceptConditionalIcon(boton);
		obj.cancelConditionalIcon(boton);
	});
};

Canvasmodel.prototype.buscarExisteCondicional=function(botonClicado){
	var widget1=-1;
	var widget2=-1;
	var existeCondicionDeAntes=false;
	var clases=$(botonClicado).attr('class').split(' ');
	for(var i=0; i<clases.length; i++){
		if(clases[i].getWidgetIdentifier()!=""){
			if(widget1==-1){
				widget1=clases[i].getWidgetIdentifier();
			}
			else if(widget2==-1){
				widget2=clases[i].getWidgetIdentifier();
			}
		}
	}
	var boton=$(".wm_conditionalButton.wmfrom_"+widget1+".wmto_"+widget2+"").detach();
	for(var j=0; j<conditionList.length; j++){
		if(conditionList[j].from==widget1 && conditionList[j].to==widget2){
			$('.wm_valor1').val(conditionList[j].valorFrom);
			$('.wm_valor2').val(conditionList[j].valorTo);
			$('#wm_selectConditional').val(conditionList[j].conditionType);
			existeCondicionDeAntes=true;
		}
	}
	return {boton:boton, widget1:widget1, widget2:widget2, existeCondicionDeAntes:existeCondicionDeAntes};
};

Canvasmodel.prototype.pintarConditionalIcon=function(boton){
	this.pintarConditionalIconBis(boton.widget1, boton.widget2);
};

Canvasmodel.prototype.pintarConditionalIconBis=function(widget1, widget2){
	var obj=this; 
	$('[data_wmwidget_id='+widget1+']').click(function(e){
		obj.clickPintarConditionalIconBis(e, this, "from");
	});
	$('[data_wmwidget_id='+widget1+']').mouseover(function(e){
		obj.mouseoverPintarConditionalIconBis(e, "from");
	});
	$('[data_wmwidget_id='+widget1+']').mouseout(function(e){
		obj.mouseoutPintarConditionalIconBis(e);
	});
	$('[data_wmwidget_id='+widget2+']').click(function(e){
		obj.clickPintarConditionalIconBis(e, this, "to");
	});
	$('[data_wmwidget_id='+widget2+']').mouseover(function(e){
		obj.mouseoverPintarConditionalIconBis(e, "to");
		});
	$('[data_wmwidget_id='+widget2+']').mouseout(function(e){
		obj.mouseoutPintarConditionalIconBis(e);
	});
};

Canvasmodel.prototype.clickPintarConditionalIconBis=function(e, widget, fromOrTo){
	var elemento;
	var clicamos = true;
	e.preventDefault();
	e.stopPropagation();
	elemento=$(e.target); 
	var xpathDocument=minimizeXPath(generateXPath(e.target,document.documentElement,null,{showId:true}),document.documentElement).join("");
	var xpathDentroWidget=minimizeXPath(generateXPath(e.target,widget,null,{showId:true}),widget).join(""); 
	if(xpathDentroWidget=="."){
		xpathDentroWidget="WHOLE WIDGET";
	}
	for(var p=0; p<$(".WireIt-Terminal").size(); p++){
		if(elemento.closest(".WireIt-Terminal")[0]==$(".WireIt-Terminal")[p] || $.contains($(".WireIt-Terminal")[p],elemento[0])){
			clicamos=false;
		}
	}
	if(clicamos){
		if(fromOrTo=="from"){
			$('.wm_valor1').val(xpathDentroWidget);
		} else{
			$('.wm_valor2').val(xpathDentroWidget);
		}
		elemento.removeClass("wm_background");
		elemento.css({cursor: ""});
	}
};

Canvasmodel.prototype.mouseoverPintarConditionalIconBis=function(e, fromOrTo){
	var obj=this;
	var elemento;
	var pintamos = true;
	elemento=$(e.target);
	for(var p=0; p<$(".WireIt-Terminal").size(); p++){
		if(elemento.closest(".WireIt-Terminal")[0]==$(".WireIt-Terminal")[p] || $.contains($(".WireIt-Terminal")[p],elemento[0])){
			pintamos=false;
		}
	}
	if(elemento[0].shadowRoot==null && elemento[0].contentWindow!=undefined){
		var doc=elemento[0].contentWindow.document;
		$(doc.body).mouseover(function(e){
			obj.mouseoverPintarConditionalIconBisCropped(e);
		});
		$(doc.body).mouseout(function(e){
			obj.mouseoutPintarConditionalIconBisCropped(e);
		});
		$(doc.body).click(function(e){
			obj.clickPintarConditionalIconBisCropped(e, this, fromOrTo);
		});
	}else if (elemento[0].shadowRoot!=null && elemento[0].contentWindow==undefined){
		$(elemento[0].shadowRoot.children[2]).mouseover(function(e){
			obj.mouseoverPintarConditionalIconBisComplex(e);
		});
		$(elemento[0].shadowRoot.children[2]).mouseout(function(e){
			obj.mouseoutPintarConditionalIconBisComplex(e);
		});
		$(elemento[0].shadowRoot.children[2]).click(function(e){
			obj.clickPintarConditionalIconBisComplex(e, this, fromOrTo);
		});
	}else{//(elemento[0].shadowRoot==null && elemento[0].contentWindow==undefined )
		if(pintamos){
			elemento.addClass("wm_background");
			elemento.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
		}
	}
};

Canvasmodel.prototype.mouseoverPintarConditionalIconBisCropped=function(e){debugger;
	var elemento=$(e.target);
	elemento.addClass("wm_background");
	elemento.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
	$(elemento).css("background", "green");
};

Canvasmodel.prototype.mouseoutPintarConditionalIconBisCropped=function(e){
	var elemento;
	elemento=$(e.target);
	elemento.removeClass("wm_background");
	elemento.css({cursor: ""});
	$(elemento).css("background", "");
};

Canvasmodel.prototype.clickPintarConditionalIconBisCropped=function(e, widget, fromOrTo){
	var elemento;
	var clicamos = true;
	e.preventDefault();
	e.stopPropagation();
	elemento=$(e.target); debugger;
	var xpathDocument=minimizeXPath(generateXPath(e.target,document.documentElement,null,{showId:true}),document.documentElement).join("");
	var xpathDentroWidget=minimizeXPath(generateXPath(e.target,widget,null,{showId:true}),widget).join(""); 
	if(xpathDentroWidget=="."){
		xpathDentroWidget="ENTIRE COMPLEX WIDGET";
	}
	for(var p=0; p<$(".WireIt-Terminal").size(); p++){debugger;
		if(elemento.closest(".WireIt-Terminal")[0]==$(".WireIt-Terminal")[p] || $.contains($(".WireIt-Terminal")[p],elemento[0])){
			clicamos=false;
		}
	}
	if(clicamos){
		if(fromOrTo=="from"){
			$('.wm_valor1').val(xpathDentroWidget);
		} else{
			$('.wm_valor2').val(xpathDentroWidget);
		}
		elemento.removeClass("wm_background");
		elemento.css({cursor: ""});
	}
};

Canvasmodel.prototype.mouseoverPintarConditionalIconBisComplex=function(e){
	var elemento=$(e.target);
	elemento.addClass("wm_background");
	elemento.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
};

Canvasmodel.prototype.mouseoutPintarConditionalIconBisComplex=function(e){
	var elemento;
	elemento=$(e.target);
	elemento.removeClass("wm_background");
	elemento.css({cursor: ""});
};

Canvasmodel.prototype.clickPintarConditionalIconBisComplex=function(e, widget, fromOrTo){
	var elemento;
	var clicamos = true;
	e.preventDefault();
	e.stopPropagation();
	elemento=$(e.target); debugger;
	var xpathDocument=minimizeXPath(generateXPath(e.target,document.documentElement,null,{showId:true}),document.documentElement).join("");
	var xpathDentroWidget=minimizeXPath(generateXPath(e.target,widget,null,{showId:true}),widget).join(""); 
	if(xpathDentroWidget=="."){
		xpathDentroWidget="ENTIRE COMPLEX WIDGET";
	}
	for(var p=0; p<$(".WireIt-Terminal").size(); p++){debugger;
		if(elemento.closest(".WireIt-Terminal")[0]==$(".WireIt-Terminal")[p] || $.contains($(".WireIt-Terminal")[p],elemento[0])){
			clicamos=false;
		}
	}
	if(clicamos){
		if(fromOrTo=="from"){
			$('.wm_valor1').val(xpathDentroWidget);
		} else{
			$('.wm_valor2').val(xpathDentroWidget);
		}
		elemento.removeClass("wm_background");
		elemento.css({cursor: ""});
	}
};

Canvasmodel.prototype.mouseoutPintarConditionalIconBis=function(e){
	var elemento;
	elemento=$(e.target);
	elemento.removeClass("wm_background");
	elemento.css({cursor: ""});
};

Canvasmodel.prototype.acceptConditionalIcon=function(boton){
	var obj=this;
	$(".wm_conditionAccept").click(function(e){
		obj.acceptConditionalIconBis(boton,e);
	});
};

Canvasmodel.prototype.acceptConditionalIconBis=function(boton, e){
	var unValorEsCogidaDeLaWeb=false;
	var widget1=boton.widget1;
	var widget2=boton.widget2;
		var valor1=$(".wm_valor1").val();
		var valor2=$(".wm_valor2").val();
		var valorCombo=$('#wm_selectConditional option:selected').val(); //.text();
		if(valor1=="" && valor2==""){
			this.deleteConditionFromList(widget1,widget2);
			$(".wm_conditionalDefinitionDiv").before('<button class="wm_conditionalButton wmfrom_'+widget1+' wmto_'+widget2+'">Condition</button>');
			$(".wm_conditionalDefinitionDiv").remove();
			this.eliminarEventos();
			this.eliminarComplexListeners();
			this.artivarEventos();
		}else if(valor1!="" && valor2!=""){debugger;
			var a=this.getWidgetValue(widget1,valor1);
			var b=this.getWidgetValue(widget2,valor2);
			var valorXpath1=a.value;
			var valorXpath2=b.value;
			if(!a.insertadoAMano){
				valorXpath1=this.eliminarCaracteresIndeseados(valorXpath1);
			}
			if(!b.insertadoAMano){
				valorXpath2=this.eliminarCaracteresIndeseados(valorXpath2);
			}
			if(!isNaN(valorXpath1.replace(",", ".")) && !isNaN(valorXpath2.replace(",", "."))){ //isNaN(valor1) false significa q es numero
				if(a.insertadoAMano && b.insertadoAMano){
					alert("ONE OF THE VALUES MUST BE TAKEN FROM THE WEBSITE");
				}else{
					if(!boton.existeCondicionDeAntes){
						conditionList.push({valorFrom:valor1, valorTo:valor2, conditionType:valorCombo, from:widget1, to:widget2});
						$(".wm_conditionalDefinitionDiv").before('<button class="wm_conditionalButton wmfrom_'+widget1+' wmto_'+widget2+'">Condition</button>');
						$(".wm_conditionalDefinitionDiv").remove();
						this.eliminarEventos();
						this.eliminarComplexListeners();
						this.artivarEventos();
					}else{
						this.actualizarConditionList(boton, valor1, valor2, valorCombo);
						$(".wm_conditionalDefinitionDiv").before('<button class="wm_conditionalButton wmfrom_'+widget1+' wmto_'+widget2+'">Condition</button>');
						$(".wm_conditionalDefinitionDiv").remove();
						this.eliminarEventos();
						this.eliminarComplexListeners();
						this.artivarEventos();
					}
			}
				}else{
					alert("BOTH VALUES MUST BE NUMBERS");
				}
		}else{
			alert("IT IS NOT ALLOWED TO HAVE AN EMPTY VALUE");
		}
};

Canvasmodel.prototype.eliminarComplexListeners = function(){debugger;
	var eliminar;
	for(var i=0; i<$('[data_wmwidget_foreigncloned_type=complex]').length; i++){
		eliminar=$('[data_wmwidget_foreigncloned_type=complex]')[i].shadowRoot.children[2];
		$(eliminar).off('mouseover');
		$(eliminar).off('mouseout');
		$(eliminar).off('click');
	}
};

Canvasmodel.prototype.getWidgetValue = function(widget, xpath){debugger;
	var value=null;
	var nodeNew="";
	var insertadoAMano;
	if(xpath.charAt(0)=="W"){//WHOLE WIDGET
		value=$('[data_wmwidget_id='+widget+']')[0].textContent;
		insertadoAMano=false;
	}else if(xpath.charAt(0)=="."){
		nodeNew=document.evaluate(xpath,$('[data_wmwidget_id='+widget+']')[0],null, XPathResult.ANY_TYPE, null).iterateNext(); 
		if(nodeNew==null && $('[data_wmwidget_id='+widget+']')[0].shadowRoot!=null){
			nodeNew=document.evaluate(xpath,$('[data_wmwidget_id='+widget+']')[0].shadowRoot.children[2],null, XPathResult.ANY_TYPE, null).iterateNext(); 
		}else if(nodeNew==null && $('[data_wmwidget_id='+widget+']')[0].contentWindow!=null){
			nodeNew=document.evaluate(xpath,$('[data_wmwidget_id='+widget+']')[0].contentWindow.document,null, XPathResult.ANY_TYPE, null).iterateNext();
		}
		if(nodeNew!=null){
			value=nodeNew.textContent;
			insertadoAMano=false;
		}
	}else if(xpath.charAt(0)=="E"){//ENTIRE COMPLEX WIDGET
		var nodeNuevo=$('[data_wmwidget_id='+widget+']')[0].shadowRoot.children[2];
		value=nodeNuevo.children[1].textContent;
		insertadoAMano=false;
	}else{
		value=xpath;
		insertadoAMano=true;
	}
	return {value:value, insertadoAMano:insertadoAMano};
};

Canvasmodel.prototype.eliminarCaracteresIndeseados = function(numero){
	var numDevolver="";
	for(var i=0; i<numero.length; i++){
		if(!isNaN(numero[i]) || numero[i]=="," || numero[i]=="."){
			numDevolver=numDevolver+numero[i];
		}
	}
	return numDevolver;
};

Canvasmodel.prototype.deleteConditionFromList=function(widgetFrom, widgetTo){debugger;
	for(var i=0; i<conditionList.length; i++){
		if(conditionList[i].from==widgetFrom && conditionList[i].to==widgetTo){
			conditionList.splice(i,1);
		}
	}
};

Canvasmodel.prototype.cancelConditionalIcon=function(boton){
	var obj=this;
	var widget1=boton.widget1;
	var widget2=boton.widget2;
	$(".wm_conditionCancel").click(function(e){
		$(".wm_conditionalDefinitionDiv").before('<button class="wm_conditionalButton wmfrom_'+widget1+' wmto_'+widget2+'">Condition</button>');
		$(".wm_conditionalDefinitionDiv").remove();
		obj.eliminarEventos();
		obj.eliminarComplexListeners();
		obj.artivarEventos();
	});
};

Canvasmodel.prototype.actualizarConditionList=function(boton, valor1, valor2, valorCombo){
	for(var i=0; i<conditionList.length; i++){
		if(conditionList[i].from==boton.widget1 && conditionList[i].to==boton.widget2){
			conditionList[i].conditionType=valorCombo;
			conditionList[i].valorFrom=valor1;
			conditionList[i].valorTo=valor2;
		}
	}
};

Canvasmodel.prototype.widgetizadoSpace=function (elem, ev){
	//NO ES EXACTAMENTE IGUAL QUE CUANDO HACES CLICK CON EL RATON
	var poderWidgetizar=true;
	var selection = window.getSelection();//para evitar widgetizar si se selecciona algo
				//	if(!CLONE_ACTIVATED &&!this.savingExporting && selection.isCollapsed && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
					if(!CLONE_ACTIVATED &&!this.savingExporting && selection.isCollapsed){
					if(poderWidgetizar){
					console.log("widgetizar clickDocument");						
			        	if(!this.contieneRestoElementos(elem) && !this.contieneElemento(elem) && !this.contieneScript(elem[0])){
			        		this.widgetizeEtiquetar(elem);
                     	}
                      else{
                      	elem.css({background:elem.attr("viejoBackground")});
                      	this.eliminarEventos();
						this.artivarEventos();
                      }
                     }
                    }
};

Canvasmodel.prototype.widgetizeEtiquetar=function (elem){debugger;
	//var dialog=$("<div id='dialog'></div>");
	//var algo2 = CanvasConstraints.getCurrentState();
		//	        	algo2.push({widget:"widgetized-"+this.numerodeWidget, action:"Enable"});
			//        	CanvasConstraints.setCurrentState(algo2);
			//        	var lista = DiagramConstraints.getWidgets();
			//        	lista.push("widgetized-"+this.numerodeWidget);
			//        	CanvasConstraints.setWidgets(lista);
						$('[class*=wm_selected]').removeClass("wm_selected");
						elem.closest("[data_wmwidget_id]").addClass("wm_selected");
						elem.attr("draggable","true");
						elem.attr("title","widgetized"+this.numerodeWidget);
						elem.attr("data_wmwidget_id", ""+this.numerodeWidget);
						elem.attr("data_wmwidget_foreignCloned_type", "false");
						elem.attr("data_wmwidget_updateMoment", "Never");
						elem.attr("data_wmwidget_state", "visible");
						elem.removeClass("wm_background");
						elem.css({cursor: ""});
						elem.addClass("resizable");
						//Al clonar, si el elemento tiene un ID habria problemas (no puede haber 2 elementos con el mismo ID) y habria q vaciar el original
						var copiaParaInsertar=elem.clone();
						copiaParaInsertar.attr("data_wmwidget_type", "widgetized");
						elem.attr("data_wmwidget_type", "original_widgetized");
						elem[0].setAttribute('style', 'display:none !important');
						elem.attr("data_wmwidget_original_widgetized", this.numerodeWidget);
						elem.after(copiaParaInsertar);
						this.nuevasFlechas(copiaParaInsertar, "input-"+this.numerodeWidget, "output-"+this.numerodeWidget);
						this.container.redrawAllWires();
				//     var widgetizadoName=document.getElementById("cloneName").value;
				//		var listaEstados= new Array();
				//AQUI DEBO EXTRAER EL ESTADO EN EL QUE ESTA EL DTE
						//listaEstados.push({estadoWidget: "enable", estadoDTE: "Initial"});
						this.widgetsInserted.push({type:"widgetized-"+this.numerodeWidget, widget:"w_number"+this.numerodeWidget, estadoWidget: "visible", topTerminal: ""});
						this.numerodeWidget++;
				//		dialog.remove(); 
					    this.eliminarEventos();
						this.artivarEventos();
};

Canvasmodel.prototype.widgetizar=function (anteriorElem){
	var obj=this;  
    var elem=anteriorElem;
	var poderWidgetizar=true;
	console.log("widgetizar clickWidgetizar");
				$(document).click(function(ev){elem=obj.clickWidgetizar(ev, elem, poderWidgetizar);
			    });
			        
			    $(document).keypress(function(e) {elem=obj.keypressWidgetizar(e, elem, poderWidgetizar);  
			    });
			   
			    $(document).mouseover(function(eve){elem=obj.mouseOverWidgetizar(eve, elem, poderWidgetizar);  
			    });
			    
			    $(document).mouseout(function(eve) {elem=obj.mouseOutWidgetizar(eve, elem, poderWidgetizar); 			        
			    });
			    $("#extruderLeft").click(function(event){elem=obj.clickExtruderLeftWidgetizar(event, elem, poderWidgetizar); 
			    });
};

Canvasmodel.prototype.clickExtruderLeftWidgetizar=function(event, elem, poderWidgetizar){
//	if(!CLONE_ACTIVATED &&!this.savingExporting && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
	if(!CLONE_ACTIVATED &&!this.savingExporting){
		var elem=$(event.target);
		elem.css({background:elem.attr("viejoBackground")});
		this.eliminarEventos();
		this.artivarEventos();
	}
	return elem;
};

Canvasmodel.prototype.mouseOverWidgetizar=function(eve, elem, poderWidgetizar){
//	if(!CLONE_ACTIVATED &&!this.savingExporting && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
	if(!CLONE_ACTIVATED &&!this.savingExporting && !eve.altKey){
		console.log("widgetizar mouseoverDocument");
		eve.preventDefault();
		eve.stopPropagation(); 
	//	this.contieneScript(eve.target);  
		if(!$.contains($("#extruderLeft"),eve.target) && !$.contains($("[data_wmwidget_id]"),eve.target)){
			elem=$(eve.target);
			if(!this.contieneRestoElementos(elem) && !this.contieneElemento(elem) && !this.contieneElementoWire(elem) && !this.contieneScript(eve.target)){
			    poderWidgetizar=true;
			    elem.addClass("wm_background");
			    elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
			 }
			 else{
			     poderWidgetizar=false;
			 }
		}
	}
	return elem;
};

Canvasmodel.prototype.mouseOutWidgetizar=function(eve, elem, poderWidgetizar){
//	if(!CLONE_ACTIVATED &&!this.savingExporting && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
	if(!CLONE_ACTIVATED &&!this.savingExporting && !eve.altKey){
		console.log("widgetizar mouseleaveDocument");
		eve.preventDefault();
		eve.stopPropagation();
		if(!$.contains($("#extruderLeft"),eve.target) && !$.contains($("[data_wmwidget_id]"),eve.target)){							        
			elem.removeClass("wm_background");
			elem.css({cursor: ""});
		}
	}
	$("#extruderLeft .content").css("background","white");
//	$("#extruderBottom .content").css("background","white");
	return elem;	
};

Canvasmodel.prototype.clickWidgetizar=function(ev, elem, poderWidgetizar){		
	var selection = window.getSelection();//para evitar widgetizar si se selecciona algo
	// se ha quitado el isDragAndDroping de este if xq si se hace drop en un iframe, no deja widgetizar un elemento despues
	//if(!CLONE_ACTIVATED && $("#wm_dialog2")[0]==undefined &&!this.savingExporting && selection.isCollapsed && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
	if(!CLONE_ACTIVATED && $("#wm_dialog2")[0]==undefined &&!this.savingExporting && selection.isCollapsed && !ev.altKey){
		if(poderWidgetizar){
			ev.preventDefault();
			ev.stopPropagation();
			console.log("widgetizar clickDocument");						
			var elemento=$(ev.target);
			if(!this.contieneRestoElementos(elemento) && !this.contieneElemento(elemento) && !this.contieneElementoWire(elem) && !this.contieneScript(ev.target)){
				this.widgetizeEtiquetar(elem);
            }
            else{
                elem.css({background:elem.attr("viejoBackground")});
                this.eliminarEventos();
				this.artivarEventos();
             }
          }
      }
     
      return elem;
};

Canvasmodel.prototype.keypressWidgetizar=function(e, elem, poderWidgetizar){
//	if(!CLONE_ACTIVATED &&!this.savingExporting && !this.isDragAndDroping && (CanvasConstraints.getSparks()==null || CanvasConstraints.getSparks()=="inicio")){
	if(!CLONE_ACTIVATED &&!this.savingExporting && !this.isDragAndDroping){
			    	if(e.keyCode==119){//w
			    		if(!this.contieneElemento(elem.parent()) && !this.contieneScript(elem.parent()[0])){
			    			//if(elem.parent()[0].tagName=="BODY"){}
				    		if(!(elem.parent()[0]==document) && !(elem.parent()[0].tagName=="BODY")){
								elem.removeClass("wm_background");
					    		elem=elem.parent();
					    		if(elem[0].tagName=="TBODY"){
					    			elem=elem.parent();
					    		}
						        elem.addClass("wm_background");
						        this.checkIfInView(elem,true);
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
					        this.checkIfInView(elem,true);
					        elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
					    }
			    	}
			    	if(e.keyCode==97){//a
			    		if(!(elem.prev()[0]==undefined)){
			    			var pasoHechoA=false;
			    			var elemBorrarClassA=elem;
			    			var elemCambiadoA=false;
			    			while(!(elem.prev()[0]==undefined) && !pasoHechoA){
			    				if(!(this.contieneElemento(elem.prev())) && !this.contieneScript(elem.prev()[0])){
			    					elemBorrarClassA.removeClass("wm_background");
			    					elem=elem.prev();
			    					pasoHechoA=true;
			    					elem.addClass("wm_background");
					       			this.checkIfInView(elem,true);
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
			    		if(!(elem.next()[0]==undefined)){
			    			var pasoHechoD=false;
			    			var elemBorrarClassD=elem;
			    			var elemCambiadoD=false;
			    			while(!(elem.next()[0]==undefined) && !pasoHechoD){
			    				if(!(this.contieneElemento(elem.next())) && !this.contieneScript(elem.next()[0])){
			    					elemBorrarClassD.removeClass("wm_background");
			    					elem=elem.next();
			    					pasoHechoD=true;
			    					elem.addClass("wm_background");
					        		this.checkIfInView(elem,true);
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
						this.widgetizadoSpace(elem, e);
					}
			    	}
	return elem;
};

Canvasmodel.prototype.dragMoveOver=function (e, position, div1){
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
		//	 var flog=$.contains($("#extruderBottom")[0],elem2[0]);
			 var flig=$.contains($("#extruderLeft")[0],elem2[0]);
			 var flug=$.contains($("#extruderRight")[0],elem2[0]);
			// if(!flog && !flig && !this.contieneElementoDragAnddrop(elem)){
			 if(!flig && !flug && !this.contieneElementoDragAnddrop(elem) && !this.contieneElementoWire(elem)){
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
};

Canvasmodel.prototype.dragMoveEnter=function (e){
	e.preventDefault();
	e.stopPropagation();
	$(".WireIt-Wire").css('display', 'none');
	$(".inputEx-InPlaceEdit-visu").css('display', 'none');
	$(".inputEx-InPlaceEdit-editor").css('display', 'none');
	$(".WireIt-Wire-scissors").css('display', 'none');
	var elem2=$(e.target);
	//var flog=$.contains($("#extruderBottom")[0],elem2[0]);
	var flig=$.contains($("#extruderLeft")[0],elem2[0]);
	var flug=$.contains($("#extruderRight")[0],elem2[0]);
	if(!$.contains($("#extruderLeft"),e.target) && !flig && !flug && !this.contieneElementoDragAnddrop(elem2) && !this.contieneElementoWire(elem2)){
		var elem=$(e.target);
		var oldBackground=elem[0].style.background;
		if(oldBackground!=""){
			elem.attr("viejoBackground", oldBackground);
		}
			elem.css({background:"orange"});
	}
};

Canvasmodel.prototype.dragMoveLeave=function (e, div1, position){
	if(!$.contains($("#extruderLeft"),e.target) || !$.contains($("#extruderRight"),e.target) || !contieneElementoDragAnddrop(e.target) && !this.contieneElementoWire(e.target)){			        
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
};

Canvasmodel.prototype.dragMoveDrop=function (e, div1, elementoClick, tipoMovimiento, elemento, position, elementoClonado){
	var elem=$(e.target);
          	 var flag=$.contains($("#extruderLeft")[0],elem[0]);
          	  var fleg=$.contains($("#extruderRight")[0],elem[0]);
        //  	 var flog=$.contains($("#extruderBottom")[0],elem[0]);
          	 var nodosPadre=$('html')[0]==elem[0] || $('body')[0]==elem[0];
          	 if(nodosPadre){alert("It is impossible to insert the element here");}
          	 	 if(flag || fleg || this.contieneElementoDragAnddrop(elem) && !nodosPadre || this.contieneElementoWire(elem)){	
						var viejoBackground=elem.attr("viejoBackground");
							        if(viejoBackground!=null){
								        elem.css({background:viejoBackground});
								        elem.removeAttr("viejoBackground");
							        }else{
							        	elem[0].style.background="";
							        }
          	 	 	div1.remove();
          	 	 	this.container.redrawAllWires();
          	       this.eliminarEventos();
				   this.artivarEventos();
				   $(".WireIt-Wire").css('display', 'inline');
					$(".inputEx-InPlaceEdit-visu").css('display', 'inline');
					$(".inputEx-InPlaceEdit-editor").css('display', 'none');
					$(".WireIt-Wire-scissors").css('display', 'none');
		         }
		       else{
		    	e.preventDefault();
			    e.stopPropagation(); 
			    this.eliminarEventos();		        
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
			  	$(".WireIt-Wire").css('display', 'inline');
				$(".inputEx-InPlaceEdit-visu").css('display', 'inline');
				$(".inputEx-InPlaceEdit-editor").css('display', 'none');
				$(".WireIt-Wire-scissors").css('display', 'none');
			  	this.container.redrawAllWires();
				this.eliminarEventos();
				this.artivarEventos();
		      }
		      else{
		      if(elementoClick.id=="link"){
			    	this.insertarLink(elementoClick, position, elem);
		       }//if link
		       else if(elementoClick.id=="image"){
		         this.insertarImagen(elementoClick, position, elem);
		       }// if image
		       else if(elementoClick.id=="button"){
		         this.insertarButton(elementoClick, position, elem);
		        }//if button
		       else if(elementoClick.id=="rawhtml"){
		       	this.insertarRawHtml(elementoClick, position, elem);
		       }
		      else if(elementoClick!="link" && elementoClick!="image" && elementoClick!="button" && elementoClick.id!="rawhtml"){
		      	if(elementoClick.attributes.type_wmbutton_toinsert.textContent=="foreignClone"){
		          this.insertarClon(elementoClick, position, elem, elementoClonado, "foreign");
		         }
		         else{
		         	 this.insertarClon(elementoClick, position, elem, elementoClonado, "local");
		         }
		       }//if clone
		       }	
		    }
};

Canvasmodel.prototype.dragAndDropEliminarActivar=function (){
	this.eliminarEventos();
	this.artivarEventos();
};

Canvasmodel.prototype.dragAndDropForeignClones=function (){
	var obj=this; 
	 $("#foreignClones a").click(function(evento){
	 	obj.dragAndDropEliminarActivar(); 
	 });
	
	 $("#foreignClones a").mousedown(function(evento){
	 	obj.dragAndDropForeignClonesMousedown(evento);
      });
};

Canvasmodel.prototype.dragAndDropForeignClonesMousedown=function (evento){
	var obj=this;
	console.log("drag&drop mousedownButtonleftA");
	// 	if (CanvasConstraints.getSparks()==null){
		 	elementoClick=evento.currentTarget;
		 	var elementoClonado=evento.currentTarget.id;
		 	var div1=$("<div style='position: relative !important; height:0px !important;width:0px !important; z-index:1000000 !important;'><div style='height:30px !important;width:30px !important;background:blue !important;display:block !important; position: absolute;'></div></div>");
	        var position="uknown";
            
            $("#foreignClones a").mouseup(function(ev){
            	obj.dragAndDropEliminarActivar(); 
            });
            
            $(document).on(
			    'dragover',
			    function(e) {
			    	console.log("drag&drop dragover");
			        position=obj.dragMoveOver(e, position, div1);
			    }
			    
			);
            $(document).on(
			    'dragleave',
			    function(e) {
			    	 position=obj.dragAndDropForeignClonesMousedownLeave(e, div1, position);
			    }
			);
			$(document).on(
			    'dragenter',
			    function(e) {
			    	console.log("drag&drop dragenter");
			        obj.dragMoveEnter(e);
			    }
			);
          	$(document).on(
          	  "drop",
          	 function( e ) {
          	 	obj.dragAndDropForeignClonesMousedownDrop(e, div1, elementoClick, position, elementoClonado);
      		});
    //     }
};

Canvasmodel.prototype.dragAndDropForeignClonesMousedownDrop=function (e, div1, elementoClick, position, elementoClonado){
	console.log("drag&drop drop");
    $("#extruderLeft .content").css("background","white");
    this.dragMoveDrop(e, div1, elementoClick, "dragAndDrop", null, position, elementoClonado);
};

Canvasmodel.prototype.dragAndDropForeignClonesMousedownLeave=function(e, div1, position){
	console.log("drag&drop dragleave");
	e.preventDefault();
	e.stopPropagation(); 
	isDragAndDroping=true;
	if($("#extruderLeft").attr("isOpened")){
		console.log($("#extruderLeft"));
		console.log($("#extruderLeft").closeMbExtruder());
		$("#extruderLeft").closeMbExtruder();
	}
	if($("#extruderRight").attr("isOpened")){
		$("#extruderRight").closeMbExtruder();
	}
	autoCloseTime:10;
	position=this.dragMoveLeave(e, div1, position);	 
	return position;
};


Canvasmodel.prototype.move=function (){
	var obj=this;
	$(".wm_ventana").mousedown(function(evento){
		console.log("move mousedown");
	 	  var div1=$("<div style='position: relative !important; height:0px !important;width:0px !important; z-index:1000000 !important;'><div style='height:30px !important;width:30px !important;background:blue !important;display:block !important; position: absolute;'></div></div>");  var position="uknown";
            var elemento=$(".wm_selected");
          	var position="uknown";
            var clone=elemento.clone();
            console.log(clone.html());
            
            $(document).mouseup(function(ev){debugger;
            	console.log("move mouseup");
            	obj.eliminarEventos();
				obj.artivarEventos();
            });
            
            $(document).on(
			    'dragover',
			    function(e) {
			    	console.log("move dragover");
			        position=obj.dragMoveOver(e, position, div1);
			    } 
			);
			
			$(document).on(
			    'dragenter',
			    function(e) {
			    	console.log("move dragenter");
			        obj.dragMoveEnter(e);
			    }
			);
			
            $(document).on(
			    'dragleave',
			    function(e) {
			    	console.log("move dragleave");
			        e.preventDefault();
			        e.stopPropagation();
			        autoCloseTime:10;
			        obj.desviarBotonesYSparks();
					position=obj.dragMoveLeave(e, div1, position);			        
			    }
			);
          	$(document).on(
          	  "drop",
          	 function( e ) {
          	 	console.log("move drop");
          	 	obj.dragMoveDrop(e, div1, null, "move", elemento, position, null);
      		});
	});
	
	$(".wm_ventana").click(function(evento){debugger;
		if($(".wm_ventana").hasClass("wm_clickNormal")){
		var elemento=$(".wm_selected");
		obj.isDragAndDroping=false;
		obj.eliminarEventos();
		//obj.artivarEventos();
		 $(document).keypress(function(e) {console.log("se movera?");
		 	elem=obj.keypressMoveClick(e, elemento);  
			    });
			    obj.reactivarClick();
		        new Canvasview(obj);
		        obj.evitarClicksIndeseados();
		    //   obj.deleteWidgetFromWidgetList();   
			    $('.wm_ventana').addClass("wm_clickMoveMode");
				$('.wm_ventana').removeClass("wm_clickNormal");
		}
	});
	
};

Canvasmodel.prototype.reactivarClick=function(){
	var obj=this;
	$(".wm_ventana").click(function(evento){
		if($(".wm_ventana").hasClass("wm_clickMoveMode")){
			$('.wm_ventana').addClass("wm_clickNormal");
				$('.wm_ventana').removeClass("wm_clickMoveMode");
				obj.artivarEventos();
		}
	});
};

Canvasmodel.prototype.clickMoveDrop=function (e, div1, elementoClick, tipoMovimiento, elemento, elementoClonado){debugger;
	var elem=$(e.target);
          	 var flag=$.contains($("#extruderLeft")[0],elem[0]);
          	  var fleg=$.contains($("#extruderRight")[0],elem[0]);
        //  	 var flog=$.contains($("#extruderBottom")[0],elem[0]);
          	 var nodosPadre=$('html')[0]==elem[0] || $('body')[0]==elem[0];
          	 if(nodosPadre){alert("It is impossible to insert the element here");}
          	 	 if(flag || fleg || this.contieneElementoDragAnddrop(elem) || !nodosPadre || this.contieneElementoWire(elem)){	
						var viejoBackground=elem.attr("viejoBackground");
          	 	 	div1.remove();
          	 	 	if(tipoMovimiento=="up"){
				      	if(elem[0]!=elemento[0]){
					      	elemento.remove();
					      	elem.prepend(elemento);
					      	
			  		}	
			      }
			      if(tipoMovimiento=="down"){
				      	if(elem[0]!=elemento[0]){
					      	elemento.remove();
					      	elem.append(elemento);
					      	
			  		}	
			      }
			      if(tipoMovimiento=="left"){
					      	elemento.remove();
					      	elemento.insertBefore(elem);
			      }
			       if(tipoMovimiento=="right"){
					      	elemento.remove();
					      	elemento.insertAfter(elem);
			      }
			        $(".WireIt-Wire").css('display', 'inline');
					$(".inputEx-InPlaceEdit-visu").css('display', 'inline');
					$(".inputEx-InPlaceEdit-editor").css('display', 'none');
					$(".WireIt-Wire-scissors").css('display', 'none');
				  	this.container.redrawAllWires();
				  	new Canvasview(this);
		            this.evitarClicksIndeseados();
				//	this.eliminarEventos();
		         }
};

Canvasmodel.prototype.keypressMoveClick=function(e, elem){debugger;
	if(!CLONE_ACTIVATED &&!this.savingExporting && !this.isDragAndDroping){
		var div1=$("<div>");
		if(e.keyCode==119){//w
			if(!this.contieneElementoMoveClick(elem.parent(), elem) && !this.contieneScript(elem.parent()[0])){
				if(!(elem.parent()[0]==document) && !(elem.parent()[0].tagName=="BODY")){ 
					var help={target:elem.parent().parent()};
					this.clickMoveDrop(help, div1, null, "up", elem, null);
					this.checkIfInView(elem, false);
				}
			}    		
		}
		if(e.keyCode==115){//s
			if(!(elem.next()[0]==undefined)){
				var help={target:elem.next()};
				this.clickMoveDrop(help, div1, null, "down", elem, null);
				this.checkIfInView(elem,false);
		    }    		
		}
		if(e.keyCode==97){//a
			 if(!(elem.prev()[0]==undefined)){
			    			var pasoHechoA=false;
			    			var elemBorrarClassA=elem;
			    			var elemCambiadoA=false;
			    			while((!(elem.prev()[0]==undefined) && !pasoHechoA) || (elem[0].attributes.data_wmwidget_type!=undefined && elem[0].attributes.data_wmwidget_type.value=="original_widgetized")){
			    				if(!(this.contieneElementoMoveClick(elem.prev(),elem)) && !this.contieneScript(elem.prev()[0])){
			    					pasoHechoA=true;
					       			this.checkIfInView(elem,false);
					        	}
			    				else{
			    					if(!elemCambiadoA){
			    						elemBorrarClassA=elem;
			    						elemCambiadoA=true;
			    					}	
			    				}
			    				elem=elem.prev();
			    			}debugger;
			    			var help={target:elem};
			    			this.clickMoveDrop(help, div1, null, "left", elemBorrarClassA, null);
			    			if(!pasoHechoA){
			    				elem=elemBorrarClassA;
			    			}
					    }   		
		}
		if(e.keyCode==100){//d
			  if(!(elem.next()[0]==undefined)){
			    			var pasoHechoA=false;
			    			var elemBorrarClassA=elem;
			    			var elemCambiadoA=false;
			    			while((!(elem.next()[0]==undefined) && !pasoHechoA) || (elem[0].attributes.data_wmwidget_type!=undefined && elem[0].attributes.data_wmwidget_type.value=="original_widgetized")){
			    				if(!(this.contieneElementoMoveClick(elem.next(),elem)) && !this.contieneScript(elem.next()[0])){
			    					pasoHechoA=true;
					       			this.checkIfInView(elem,false);
					        	}
			    				else{
			    					if(!elemCambiadoA){
			    						elemBorrarClassA=elem;
			    						elemCambiadoA=true;
			    					}	
			    				}
			    				elem=elem.next();
			    			}debugger;
			    			var help={target:elem};
			    			this.clickMoveDrop(help, div1, null, "right", elemBorrarClassA, null);
			    			if(!pasoHechoA){
			    				elem=elemBorrarClassA;
			    			}
					    }    		
		}
	}
	$(".WireIt-Wire").css('display', 'inline');
					$(".inputEx-InPlaceEdit-visu").css('display', 'inline');
					$(".inputEx-InPlaceEdit-editor").css('display', 'none');
					$(".WireIt-Wire-scissors").css('display', 'none');
				  	this.container.redrawAllWires();
				//	this.eliminarEventos();
				//	this.artivarEventos();
};

Canvasmodel.prototype.keypressMove=function(e, elem){debugger;
	if(!CLONE_ACTIVATED &&!this.savingExporting && !this.isDragAndDroping){
			    	if(e.keyCode==119){//w
			    		if(!this.contieneElemento(elem.parent()) && !this.contieneScript(elem.parent()[0])){
			    			//if(elem.parent()[0].tagName=="BODY"){}
				    		if(!(elem.parent()[0]==document) && !(elem.parent()[0].tagName=="BODY")){
								elem.removeClass("wm_background");
					    		elem=elem.parent();
					    		if(elem[0].tagName=="TBODY"){
					    			elem=elem.parent();
					    		}
						        elem.addClass("wm_background");
						        this.checkIfInView(elem,true);
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
					        this.checkIfInView(elem,true);
					        elem.css({cursor:'url("http://downloads.totallyfreecursors.com/cursor_files/camera.cur"), url("http://downloads.totallyfreecursors.com/thumbnails/camera.gif"), auto'});
					    }
			    	}
			    	if(e.keyCode==97){//a
			    		if(!(elem.prev()[0]==undefined)){
			    			var pasoHechoA=false;
			    			var elemBorrarClassA=elem;
			    			var elemCambiadoA=false;
			    			while(!(elem.prev()[0]==undefined) && !pasoHechoA){
			    				if(!(this.contieneElemento(elem.prev())) && !this.contieneScript(elem.prev()[0])){
			    					elemBorrarClassA.removeClass("wm_background");
			    					elem=elem.prev();
			    					pasoHechoA=true;
			    					elem.addClass("wm_background");
					       			this.checkIfInView(elem,true);
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
			    		if(!(elem.next()[0]==undefined)){
			    			var pasoHechoD=false;
			    			var elemBorrarClassD=elem;
			    			var elemCambiadoD=false;
			    			while(!(elem.next()[0]==undefined) && !pasoHechoD){
			    				if(!(this.contieneElemento(elem.next())) && !this.contieneScript(elem.next()[0])){
			    					elemBorrarClassD.removeClass("wm_background");
			    					elem=elem.next();
			    					pasoHechoD=true;
			    					elem.addClass("wm_background");
					        		this.checkIfInView(elem,true);
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
						this.widgetizadoSpace(elem, e);
					}
			    	}
	return elem;
};

Canvasmodel.prototype.desviarBotonesYSparks=function (){
	$('.wm_close').css('top', -1000); 
	$('.wm_close').css('left', -1000); 
	$('.wm_select').css('top', -1000); 
	$('.wm_select').css('left', -1000);
	//$('.wm_deselect').css('top', -1000); 
	//$('.wm_deselect').css('left', -1000);
	$('.wm_hide').css('top', -1000); 
	$('.wm_hide').css('left', -1000);
	$('.wm_undo').css('top', -1000); 
	$('.wm_undo').css('left', -1000);
	$('.wm_download').css('top', -1000); 
	$('.wm_download').css('left', -1000);
	$('.wm_ventana').css('top', -1000); 
	$('.wm_ventana').css('left', -1000);
	/*$(".wm_sparkclick").css('top', -1000); 
	$(".wm_sparkclick").css('left', -1000);
	$(".wm_sparkdblclick").css('top', -1000); 
	$(".wm_sparkdblclick").css('left', -1000);
	$(".wm_sparkmouseenter").css('top', -1000); 
	$(".wm_sparkmouseenter").css('left', -1000);
//	$(".wm_sparkmouseleave").css('top', -1000); 
//	$(".wm_sparkmouseleave").css('left', -1000);*/
};

/*Canvasmodel.prototype.allSparks=function (spark){
	var estadoTransition=[];
		var posestadoTransition=0;
		var IsPossibleToClick = true;
		var posEnLista=posUltimoWidget;//extraerPoswidget();		        		 	
		var s=CanvasConstraints.getSparks();
		for(var i=0; i<s.length; i++){
				if(s[i].widget==this.widgetsInserted[posEnLista].type){
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
				sparks.widget = this.widgetsInserted[posEnLista].type;
				sparks.event = "onClick";
		    CanvasConstraints.setCurrentSpark(sparks);
		 }
		}
		if(spark=="doubleClick"){
			 if(IsPossibleToClick && $('.wm_sparkdblclick').css('opacity')==1){
			var sparks = CanvasConstraints.getCurrentSpark();
				sparks = {};
				sparks.widget = this.widgetsInserted[posEnLista].type;
				sparks.event = "onDoubleClick";
		    CanvasConstraints.setCurrentSpark(sparks);
		   }
		}
		if(spark=="enter"){
			if(IsPossibleToClick && $('.wm_sparkmouseenter').css('opacity')==1){
			var sparks = CanvasConstraints.getCurrentSpark();
				sparks = {};
				sparks.widget = this.widgetsInserted[posEnLista].type;
				sparks.event = "onMouseEnter";
		    CanvasConstraints.setCurrentSpark(sparks);
		   }
		}
		if(spark=="leave"){
			if(IsPossibleToClick && $('.wm_sparkmouseleave').css('opacity')==1){
			var sparks = CanvasConstraints.getCurrentSpark();
				sparks = {};
				sparks.widget = this.widgetsInserted[posEnLista].type;
				sparks.event = "onMouseLeave";
		    CanvasConstraints.setCurrentSpark(sparks);
		   }
		}
		
		$(document).find('.wm_sparkclick').delay(0).fadeOut(0);
		$(document).find('.wm_sparkdblclick').delay(0).fadeOut(0);
		$(document).find('.wm_sparkmouseenter').delay(0).fadeOut(0);
		$(document).find('.wm_sparkmouseleave').delay(0).fadeOut(0);
		this.eliminarEventos();
		this.artivarEventos();
};

Canvasmodel.prototype.clickEvent=function (){
	var obj=this;
	$('.wm_sparkclick').click(function(e){
		console.log("click clickevent");
		obj.allSparks("click");
	});
};

Canvasmodel.prototype.doubleClickEvent=function (){
	var obj=this;
	$('.wm_sparkdblclick').click(function(e){
		console.log("click doubleClickEvent");
		obj.allSparks("doubleClick");
	});
};

Canvasmodel.prototype.mouseEnterEvent=function (){
	var obj=this;
	$('.wm_sparkmouseenter').click(function(e){
		console.log("click mouseEnterEvent");
		obj.allSparks("enter");
	});
};

Canvasmodel.prototype.mouseLeaveEvent=function (){
	var obj=this;
	$('.wm_sparkmouseleave').click(function(e){
		console.log("click mouseleaveEvent");
		obj.allSparks("leave");
	});
};*/


Canvasmodel.prototype.selectWidget=function (){
	var obj=this;
	$('.wm_select').click(function(e){
		console.log("click select");
		obj.selectWidgetBis();
	});
};

Canvasmodel.prototype.selectWidgetBis=function (){
	var posEnLista=posUltimoWidget;//extraerPoswidget();
	//	$(".wm_selected").removeClass("wm_deselected");
	if($(".wm_selected")[0].attributes.data_wmwidget_state.textContent=="collapse"){
		$(".wm_selected").attr("data_wmwidget_state", "visible");
		this.widgetsInserted[posEnLista].estadoWidget="visible";
		for(var i=0; i<$(".wm_selected").children().length; i++){
			if($(".wm_selected").children()[i]. classList.contains('WireIt-Terminal')){
				$(".wm_selected").children()[i].style.top=this.widgetsInserted[posEnLista].topTerminal;
			}
		}
	}else{
		$(".wm_selected").attr("data_wmwidget_state", "collapse");
		this.widgetsInserted[posEnLista].estadoWidget="collapse";
		for(var j=0; j<$(".wm_selected").children().length; j++){
			if($(".wm_selected").children()[j]. classList.contains('WireIt-Terminal')){
				this.widgetsInserted[posEnLista].topTerminal=$(".wm_selected").children()[j].style.top;
				$(".wm_selected").children()[j].style.top="-5px";
			}
		}
	}
		this.container.redrawAllWires();
		
	/*	var algo = CanvasConstraints.getCurrentState();
		for(var i=0; i<algo.length; i++){
			if(algo[i].widget.getWidgetIdentifier()==posEnLista){
				algo[i].action="Enable";
			}
		}
		CanvasConstraints.setCurrentState(algo);*/
		
		 $(document).find('.wm_select').delay(0).fadeOut(0);
	//	 $(document).find('.wm_deselect').delay(0).fadeOut(0);
		 $(document).find('.wm_hide').delay(0).fadeOut(0);
};

/*Canvasmodel.prototype.deselectWidget=function (){
	var obj=this;
	$('.wm_deselect').click(function(e){
		console.log("click deselect");
		obj.deselectWidgetBis();
	});
};

Canvasmodel.prototype.deselectWidgetBis=function (){
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
		this.propagarEliminacionSparksDueToWidget();
		this.widgetsInserted[posEnLista].estados[0].estadoWidget="disable";
		 $(document).find('.wm_select').delay(0).fadeOut(0);
		 $(document).find('.wm_deselect').delay(0).fadeOut(0);
		 $(document).find('.wm_hide').delay(0).fadeOut(0);
};*/

Canvasmodel.prototype.hideWidget=function (){
	var obj=this;
	$('.wm_hide').click(function(e){
		console.log("click hide");
		obj.selectWidgetBis();
	});
};

Canvasmodel.prototype.downloadHTMLWidget=function (){
	var obj=this;
	$('.wm_download').click(function(e){
		obj.downloadHTMLWidgetBis();
	});
};

Canvasmodel.prototype.downloadHTMLWidgetBis=function (){
	var obj=this;
	var dialog=$("<div id='dialog'></div>");
    $(document.body).append(dialog);
    obj.eliminarEventos();
    dialog.load(chrome.extension.getURL("parts/cloneName.html"),function(){
    	dialog.dialog({
        resizable: false,
        modal: true,
        close: function( event, ui ){
			    event.stopPropagation();
                dialog.remove();
                obj.artivarEventos();
              //  deactivateClone();
		},
        buttons: {
            "Generate Widget": function(e) {
       			e.stopPropagation();
       			obj.valuesHighWidget(dialog);
            //    onClickGenerate(dialog,elem,arrWidgets,wType);
            //    deactivateClone();    
            },
            Cancel: function(e) {
            	e.stopPropagation();
                dialog.remove();
                obj.artivarEventos();
             //   deactivateClone();
            }
        }
    });
    dialog.parent().zIndex(1000000000);
    $(".ui-widget-overlay").css({ "z-index": 10000000 });
    dialog.find("input").on('keypress', function(e) {
       if(e.keyCode==13){
    	   	e.stopPropagation();
    	   	obj.valuesHighWidget(dialog);
         //   onClickGenerate(dialog,elem,arrWidgets,wType); 
        //    deactivateClone();   
       }
    });
    });
	
	//JSON.stringify(proyectos[i]);
	/*chrome.storage.local.get("widgets",function (obj){
		debugger;
		var info={html:html, wwidth:wwidth, width:width, xpath:xpath, charset:charset, height:height, isForm:isForm, left:left, pasos:pasos, top:top, url:url, wheight:wheight, widgetType:widgetType};
		obj[obj.length]=info;
		chrome.storage.local.set({"widgets":obj},function (){
			chrome.extension.sendMessage({operation:"WidgetCreated"});
		});
	});*/
};

Canvasmodel.prototype.valuesHighWidget=function (dialog){
	var type=document.getElementById("cloneName").value;
	var cloneName=document.getElementById("cloneName").value;
	var quitarDialog=true;
	var hayNombreRepetido=false;
	if(/\s/.test(cloneName)){quitarDialog=false;alert("Spaces are forbidden in the name");}
    if(!(cloneName.length<16)){quitarDialog=false;alert("The name is too long");}
    if(!(cloneName.indexOf(".")==-1)){quitarDialog=false;alert("'.' character is forbidden");}
    if(!(cloneName.indexOf(",")==-1)){quitarDialog=false;alert("',' character is forbidden");}
    if(cloneName=="Link" || cloneName=="Image" || cloneName=="Button" || cloneName=="link" || cloneName=="image" || cloneName=="button"){hayNombreRepetido=true; quitarDialog=false; alert("This name is forbidden");}
    if(!(cloneName == null || cloneName.length == 0 || /\s/.test(cloneName)) && cloneName.length<16 && cloneName.indexOf(".")==-1 && cloneName.indexOf(",")==-1 && !hayNombreRepetido){//el . y , dan problemas al eliminarlos de la lista de widgets
		var html=$(".wm_selected")[0].outerHTML;
		var charset=document.characterSet;
		var height=0;
		var isForm=false;
		var left=0;
		var pasos=null;
		var top=0;
		var url=null;
		var wheight=0;
		var widgetType="rawHTML";
		var width=0;
		var wwidth=0;
		var xpath=null;debugger;
		var info={html:html, type:type, wwidth:wwidth, width:width, xpath:xpath, charset:charset, height:height, isForm:isForm, left:left, pasos:pasos, top:top, url:url, wheight:wheight, widgetType:widgetType};
		//var pro=JSON.parse(info);
		if(quitarDialog && !hayNombreRepetido){
			dialog.remove();
			this.artivarEventos();
			var pro=JSON.stringify(info);
			var blob = new Blob([pro], {type: "text/plain;charset=utf-8"});
			saveAs(blob, type+".mkpw");
		}
	}
};
/*
Canvasmodel.prototype.hideWidgetBis=function (){
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
		this.propagarEliminacionSparksDueToWidget();
		this.widgetsInserted[posEnLista].estados[0].estadoWidget="collapse";
		 $(document).find('.wm_select').delay(0).fadeOut(0);
		 $(document).find('.wm_deselect').delay(0).fadeOut(0);
		 $(document).find('.wm_hide').delay(0).fadeOut(0);
};*/

Canvasmodel.prototype.cerrarWidget=function (){
	var obj=this;
	$('.wm_close').click(
				 function(e){
				 	console.log("click close hover");
				 	obj.cerrarWidgetBis();
			 });
};

Canvasmodel.prototype.cerrarWidgetBis=function (){
	var posEnLista=posUltimoWidget;//extraerPoswidget();
	var widgetBorrar;
//	$(".wm_selected").removeClass("wm_deselected");
//	$(".wm_selected").removeClass("wm_hidden");
/*	var listWidgets=CanvasConstraints.getWidgets();
	for(var i=0; i<listWidgets.length; i++){
		if(listWidgets[i]==this.widgetsInserted[posEnLista].type){
			widgetBorrar=i;
		}
	}
	listWidgets.splice(widgetBorrar,1);
	CanvasConstraints.setWidgets(listWidgets);*/
	//this.propagarEliminacionSparksDueToWidget();
	this.widgetsInserted[posEnLista].type="";
	this.widgetsInserted[posEnLista].html="";
	this.widgetsInserted[posEnLista].widget="";
	this.widgetsInserted[posEnLista].estadoWidget="closed";
	this.eliminarWiresTrasDeleteUndo();
	this.desviarBotonesYSparks();
	this.eliminarEventos();
	this.artivarEventos();
	$('[class*=wm_selected]').remove();
	this.container.redrawAllWires();
};

Canvasmodel.prototype.eliminarWiresTrasDeleteUndo=function (){
	var listaWiresParaBorrar=new Array();
	for(var j=0; j<this.container.wires.length; j++){
			if(this.container.wires[j].terminal1.parentEl==$(".wm_selected")[0]){
				listaWiresParaBorrar.push(j);
			}
			if(this.container.wires[j].terminal2.parentEl==$(".wm_selected")[0]){
				listaWiresParaBorrar.push(j);
			}
		}
	var i=listaWiresParaBorrar.length-1;
	while(i>-1){
		this.container.wires[listaWiresParaBorrar[i]].remove();
		i--;
	}
};

Canvasmodel.prototype.undoWidget=function (){
	var obj=this;
	$('.wm_undo').click(function(e){
		obj.undoWidgetBis(e);
	});
};

Canvasmodel.prototype.undoWidgetBis=function (e){debugger;
	e.preventDefault();
			    e.stopPropagation(); 
					this.eliminarEventos();
				 	var posEnLista=this.extraerPoswidget();
				 	var widgetBorrar;
	//				$("[data_wmwidget_id="+posEnLista+"]").removeClass("wm_deselected");
	//				$("[data_wmwidget_id="+posEnLista+"]").removeClass("wm_hidden");
				/*	var listWidgets=CanvasConstraints.getWidgets();
					for(var i=0; i<listWidgets.length; i++){
						if(listWidgets[i]==this.widgetsInserted[posEnLista].type){
							widgetBorrar=i;
						}
					}
					listWidgets.splice(widgetBorrar,1);
					CanvasConstraints.setWidgets(listWidgets);*/
					//this.propagarEliminacionSparksDueToWidget();
					this.widgetsInserted[posEnLista].type="";
				 	this.widgetsInserted[posEnLista].html="";
				 	this.widgetsInserted[posEnLista].widget="";
				 	this.widgetsInserted[posEnLista].estadoWidget="undo";
				 	this.eliminarWiresTrasDeleteUndo();
				 	this.desviarBotonesYSparks();
				    var undoWidgets=$('[data_wmwidget_id='+posEnLista+']');
				    undoWidgets.removeClass("resizable");
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
				    undoWidgets2.removeAttribute("data_wmwidget_state");
				    undoWidgets2.removeAttribute("data_wmwidget_updatemoment");
				    undoWidgets2.removeAttribute("data_wmwidget_original_widgetized");
				    undoWidgets2.style.display=null;
				    this.container.redrawAllWires();
				    this.artivarEventos();
};

/*Canvasmodel.prototype.propagarEliminacionSparksDueToWidget=function (){
	DiagramModel.prototype.setSparkPropagationDueToWidget(posUltimoWidget);
};

Canvasmodel.prototype.propagarEliminacionSparksDueToSparks=function (evento){
	DiagramModel.prototype.setSparkPropagationDueToSparks(posUltimoWidget, evento);
};*/

Canvasmodel.prototype.introducirSpark=function (){
	//extraer el id del widget
	//this.widgetsInserted[0].sparks.push(elemento al que va)
};

Canvasmodel.prototype.extraerPoswidget=function (){
	                var i=0;
				 	var posEnLista=-1;
				 	var joke=document.getElementsByClassName('wm_selected');
				 	posEnLista=joke[0].attributes.data_wmwidget_id.textContent;
				 	/*if(typeof(posUltimoWidget)=="undefined"){
				 		posAnteriorUltimoWidget="-1";
				 	}else{
				 		posAnteriorUltimoWidget=posUltimoWidget;
				 	}*/
				 	posUltimoWidget=posEnLista;
				 	return posEnLista;
};

Canvasmodel.prototype.insertar=function (tipo, position, elem, dialog, urlLink, urlLinkText, urlImage, urlButton){
					/*	var algo2 = CanvasConstraints.getCurrentState();
						if(tipo=="link"){
			        		algo2.push({widget:urlLinkText+"Link-"+this.numerodeWidget, action:"Enable"});
			        	}
			        	if(tipo=="image"){
			        		algo2.push({widget:"Image-"+this.numerodeWidget, action:"Enable"});
			        	}
			        	if(tipo=="button"){
			        		algo2.push({widget:"Button-"+this.numerodeWidget, action:"Enable"});
			        	}
			        	CanvasConstraints.setCurrentState(algo2);
			        	var lista = DiagramConstraints.getWidgets();
			        	if(tipo=="link"){
			        		lista.push(urlLinkText+"Link-"+this.numerodeWidget);
			        	}
			        	if(tipo=="image"){
			        		lista.push("Image-"+this.numerodeWidget);
			        	}
			        	if(tipo=="button"){
			        		lista.push("Button-"+this.numerodeWidget);
			        	}
			        	DiagramConstraints.setWidgets(lista);*/
			        	var div=$("<div>");
				        if(position=="left"){
				        elem.before(div);
				       	this.insertAttributtes(tipo, div, urlLink, urlLinkText, urlImage, urlButton);
				        }
				        else{
				        elem.after(div);
				        this.insertAttributtes(tipo, div, urlLink, urlLinkText, urlImage, urlButton);
				        }		  
      		        //    var listaEstados= new Array();
						//AQUI DEBO EXTRAER EL ESTADO EN EL QUE ESTA EL DTE
						//listaEstados.push({estadoWidget: "enable", estadoDTE: "Initial"});
						if(tipo=="link"){
				        	this.widgetsInserted.push({type:urlLinkText+"Link-"+this.numerodeWidget, widget:"w_number"+this.numerodeWidget, estadoWidget: "visible", topTerminal: ""});
				        }
				        if(tipo=="image"){
				        	 this.widgetsInserted.push({type:"Image-"+this.numerodeWidget, widget:"w_number"+this.numerodeWidget, estadoWidget: "visible", topTerminal: ""});
				        }
				        if(tipo=="button"){
			        		 this.widgetsInserted.push({type:"Button-"+this.numerodeWidget, widget:"w_number"+this.numerodeWidget, estadoWidget: "visible", topTerminal: ""});
			        	}
			        	if(tipo=="rawhtml"){
			        		 this.widgetsInserted.push({type:"HTML-"+this.numerodeWidget, widget:"w_number"+this.numerodeWidget, estadoWidget: "visible", topTerminal: ""});
			        	}
				        this.numerodeWidget++;
				        var obj=this;
			            setTimeout(function(){$(".WireIt-Wire").css('display', 'inline');
												$(".inputEx-InPlaceEdit-visu").css('display', 'inline');
												$(".inputEx-InPlaceEdit-editor").css('display', 'none');
												$(".WireIt-Wire-scissors").css('display', 'none');
												obj.container.redrawAllWires();
												obj.isDragAndDroping=false;
												if(dialog!=null){dialog.remove();}
												obj.artivarEventos();}, 500);
};

Canvasmodel.prototype.insertAttributtes=function (tipo, div, urlLink, urlLinkText, urlImage, urlButton){debugger;
	if(tipo=="link"){
		var node = document.createElement("A");
		node.href=urlLink;
		node.text=urlLinkText;
		div.append(node);
		//div.append("<a href="+urlLink+">"+urlLinkText+"</a>");
	}
	if(tipo=="image"){
		 div.append("<img border='0' src="+urlImage+" alt='abc'>");
	}
	if(tipo=="button"){
		div.append("<button type='button'>"+urlButton+"</button>");	
	}
	if(tipo=="rawhtml"){
		div.append("<div class='wm_rawhtml' type='rawhtml'></div>");	
	}
	div.attr("data_wmwidget_id", ""+this.numerodeWidget);
	div.attr("data_wmwidget_type", "cloned");
	div.attr("data_wmwidget_state", "visible");
	div.attr("data_wmwidget_updateMoment", "Never");
	if(tipo=="link"){
		div.attr("title", urlLinkText+"Link"+this.numerodeWidget);
	}
	if(tipo=="image"){
		div.attr("title", "Image"+this.numerodeWidget);
	}
	if(tipo=="button"){
		div.attr("title", "Button"+this.numerodeWidget);	
	}
	if(tipo=="rawhtml"){
		div.attr("title", "HTML"+this.numerodeWidget);	
		div.attr("data_wmwidget_categoria", "rawhtml");
	}
	div.attr("data_wmwidget_foreignCloned_type", "linkimagebutton");
	div.addClass("resizable");
	this.nuevasFlechas(div, "input-"+this.numerodeWidget, "output-"+this.numerodeWidget);
	$(".WireIt-Wire").css('display', 'inline');
	$(".inputEx-InPlaceEdit-visu").css('display', 'inline');
	$(".inputEx-InPlaceEdit-editor").css('display', 'none');
	$(".WireIt-Wire-scissors").css('display', 'none');
	//this.container.redrawAllWires();
};

Canvasmodel.prototype.learnRegExp=function (){
	return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(this.learnRegExp.arguments[0]);
};

Canvasmodel.prototype.insertarLink=function (elementoClick, position, elem){
	var obj=this;
	this.eliminarEventos();
	var valorCorrecto=true;
	var valorCorrectoURL=true;
	var dialog=$("<div id='wm_dialog2'></div>");
			    $(document.body).append(dialog);
			    dialog.load(chrome.extension.getURL("parts/urlLink.html"),function(){
			    dialog.dialog({
			      resizable: false,
			      modal: true,
			      close: function( event, ui ){
			      	obj.closeCancelDialog(dialog);
			      },
			      buttons: {
			        "Create link": function() {
			          obj.createLink(position, elem, dialog);
			        },
			        Cancel: function() {
			        	obj.closeCancelDialog(dialog);
			        }
			      }
			    });
			    dialog.parent().zIndex(999999999);
			    
		       dialog.find("input").on('keypress', function(e) {
						if(e.keyCode==13){
							obj.createLink(position, elem, dialog);
						}
				});
		   });
};

Canvasmodel.prototype.checkURLImage=function (url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
};

Canvasmodel.prototype.insertarImagen=function (elementoClick, position, elem){
	var obj=this;
	this.eliminarEventos();
		var dialog=$("<div id='wm_dialog2'></div>");
			  $(document.body).append(dialog);
		   	  dialog.load(chrome.extension.getURL("parts/urlImage.html"),function(){
			  dialog.dialog({
			      resizable: false,
			      modal: true,
			      close: function( event, ui ){
			      	obj.closeCancelDialog(dialog);
			      },
			      buttons: {
			        "Create image": function() {
			          obj.createImage(position, elem, dialog);
			        },
			        Cancel: function() {
			        	obj.closeCancelDialog(dialog);
			        }
			      }
			    });
			    dialog.parent().zIndex(999999999);
			 
               dialog.find("input").on('keypress', function(e) {
						if(e.keyCode==13){
							obj.createImage(position, elem, dialog);
						}
				});
		   });
};

Canvasmodel.prototype.insertarButton=function (elementoClick, position, elem){
	var obj=this;
	this.eliminarEventos();
			var dialog=$("<div id='wm_dialog2'></div>");
			  $(document.body).append(dialog);
		   	  dialog.load(chrome.extension.getURL("parts/urlButton.html"),function(){
			  dialog.dialog({
			      resizable: false,
			      modal: true,
			      close: function( event, ui ){
			      	obj.closeCancelDialog(dialog);
			      },
			      buttons: {
			        "Create button": function() {
			          obj.createButton(position, elem, dialog);
			        },
			        Cancel: function() {
			        	obj.closeCancelDialog(dialog);
			        }
			      }
			    });
			    dialog.parent().zIndex(999999999);
			 
               dialog.find("input").on('keypress', function(e) {
						if(e.keyCode==13){ 
							obj.createButton(position, elem, dialog);
						}
				});
		   });
};

Canvasmodel.prototype.insertarRawHtml=function (elementoClick, position, elem){
	var obj=this;
	this.eliminarEventos();
	this.insertar("rawhtml", position, elem, null, null, null, null, null);
};

Canvasmodel.prototype.closeCancelDialog=function(dialog){
	dialog.remove();
	var obj=this;
	setTimeout(function(){obj.isDragAndDroping=false;obj.artivarEventos();}, 500);
};

Canvasmodel.prototype.createLink=function(position, elem, dialog){
	var urlLink=document.getElementById("urlLink").value;
	valorCorrectoURL=this.learnRegExp(urlLink);
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
			this.insertar("link", position, elem, dialog, urlLink, urlLinkText, null, null);
	 }
};

Canvasmodel.prototype.createImage=function(position, elem, dialog){
	var urlImage=document.getElementById("urlImage").value;
	var valorCorrecto=this.checkURLImage(urlImage);
	if(!valorCorrecto){alert("Illegal image");}
	if(valorCorrecto){
		this.insertar("image", position, elem, dialog, null, null, urlImage, null);
	}
};

Canvasmodel.prototype.createButton=function(position, elem, dialog){
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
		this.insertar("button", position, elem, dialog, null, null, null, urlButton);
	}
};

Canvasmodel.prototype.insertarClon=function (elementoClick, position, elem, elementoClonado, procedencia){
	var obj=this;
		 var clone=this.buscarClone(elementoClick.id);
		     	    var nuevoWidget;
		        	if(procedencia=="local"){
		         		nuevoWidget=$(clone.html);
		         	}else{
		         		nuevoWidget=this.crearForeignClone(clone);
		         	}			
   	 				nuevoWidget.attr("data_wmwidget_id", ""+this.numerodeWidget);
   	 				nuevoWidget.attr("data_wmwidget_state", "visible");
   	 				nuevoWidget.attr("data_wmwidget_updateMoment", "Never");
   	 				if(procedencia=="local"){
   	 					nuevoWidget.attr("data_wmwidget_type", "cloned");
   	 					nuevoWidget.attr("data_wmwidget_foreignCloned_type", "false");
   	 				}
   	 				else{
   	 					nuevoWidget.attr("data_wmwidget_type", "foreignCloned");
   	 					nuevoWidget.attr("data_wmwidget_foreignCloned_type", clone.widgetType);
   	 					nuevoWidget.attr("data_wmwidget_steps", JSON.stringify(clone.pasos));
   	 				}
   	 				nuevoWidget.attr("title", elementoClonado+"-"+this.numerodeWidget);	
	        		nuevoWidget.addClass("resizable");
		   	 		if(position=="left"){
				        elem.before(nuevoWidget);
				     }else{//} if(position=="right"){ //http://ayudawordpress.com/wp-content/uploads/2012/08/aprender-html.jpg
				        elem.after(nuevoWidget);
				        }
				     this.nuevasFlechas(nuevoWidget, "input-"+this.numerodeWidget, "output-"+this.numerodeWidget);
				     $(".WireIt-Wire").css('display', 'inline');
				$(".inputEx-InPlaceEdit-visu").css('display', 'inline');
				$(".inputEx-InPlaceEdit-editor").css('display', 'none');
				$(".WireIt-Wire-scissors").css('display', 'none');
					this.container.redrawAllWires();   
				//    var listaEstados= new Array();
					//AQUI DEBO EXTRAER EL ESTADO EN EL QUE ESTA EL DTE
				//	listaEstados.push({estadoWidget: "enable", estadoDTE: "Initial"});
			/*		var algo2 = CanvasConstraints.getCurrentState();
		        	algo2.push({widget:elementoClonado+"-"+this.numerodeWidget, action:"Enable"});
		        	CanvasConstraints.setCurrentState(algo2);
		        	var lista = DiagramConstraints.getWidgets();
		        	lista.push(elementoClonado+"-"+this.numerodeWidget);
		        	DiagramConstraints.setWidgets(lista);*/
		        	
		   	 this.widgetsInserted.push({type:elementoClonado+"-"+this.numerodeWidget, widget:"w_number"+this.numerodeWidget, estadoWidget: "visible", topTerminal: ""});
		   	 this.numerodeWidget++;
		   	 this.isDragAndDroping=false;
		   	 this.eliminarEventos();
			 this.artivarEventos();
			 if(clone.widgetType=="iframe" && clone.pasos!=null){
			 	nuevoWidget[0].children[0].addEventListener('load', function(){
			 		obj.recolocarCropped(clone.url, clone.pasos, obj.numerodeWidget-1);
			 	});
		     }
		     if(clone.widgetType=="iframe"){
		     	window.onbeforeunload = function() {
			        return "Unsaved data might be lost if you leave now";
		     };
		     }
};

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){debugger;
	if(request.op=="stepsCargado"){debugger;
		console.log("ENVIANDO PASOS");
		var widget=$('[data_wmwidget_id='+request.idWidget+']');
		var hijosWidget=widget[0].children;
		var url="";
		for(var i=0; i<hijosWidget.length; i++){
			if(hijosWidget[i].tagName=="IFRAME"){
				url=hijosWidget[i].src;
			}
		}
		var pasitos=JSON.parse(request.pasos);
		pasitos.push({url:url});
		var pasosSend=JSON.stringify(pasitos);
		widget[0].children[0].contentWindow.postMessage(pasosSend, "*");
	}
});

Canvasmodel.prototype.recolocarCropped=function(url, pasos, idWidget){
	chrome.extension.sendMessage({operation:"recolocarCropped", url:url, pasos:pasos, idWidget:idWidget}); 
};

//http://www.merriampark.com/ld.htm, http://www.mgilleland.com/ld/ldjavascript.htm, Damerau���������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������Levenshtein distance (Wikipedia)
var levDist = function(s, t) {
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

Canvasmodel.prototype.genRegexp=function (selectedText,value){debugger;
 var res=null;
 
 var cleanedValue=value.replace(/(\n| )+/g," ").trim();
 var cleanedSelectedText=selectedText.replace(/(\n| )+/g," ").trim();

 var index=cleanedValue.indexOf(cleanedSelectedText);
 if(index>-1){
  var pre=cleanedValue.substr(0,index);
  if(pre.length>5){
   pre=pre.substr(pre.length-5);
  }
  var pos=cleanedValue.substr(index+cleanedSelectedText.length);
  if(pos.length>5){
   pos=pos.substr(0,5);  
  }
  var preExp=this.escapeRegExp(pre);
  var postExp=this.escapeRegExp(pos);
  res=(pre.length==0?"^":preExp)+"(.*)"+(pos.length==0?"$":postExp);
 }
 
 return res;
};

Canvasmodel.prototype.escapeRegExp=function (str){
 return str.replace(/"/g,"\\\"").replace(/\^/g,"\\^").replace(/\$/g,"\\$").replace(/\(/g,"\\(").replace(/\)/g,"\\)");
};


Canvasmodel.prototype.handleCopy=function (ev){
    var sel=ev.currentTarget.getSelection();
    console.log("copy");
    if(sel.rangeCount>0){
        this.lastCopy={node:sel.getRangeAt(0).commonAncestorContainer,iframe:ev.data};
    }    
};

Canvasmodel.prototype.handlePaste=function (ev){
    var input=ev.target;
    if(input.tagName=="INPUT"){
    	var obj=this;
        ev.clipboardData.items[0].getAsString(function(lastPasteText){
        if(obj.lastCopy!=null&&obj.lastCopy.node.textContent.trim().indexOf(lastPasteText.trim())>-1){
            var node=obj.lastCopy.node.nodeType==Node.TEXT_NODE?obj.lastCopy.node.parentNode:this.lastCopy.node;
            var id=node.getAttribute("data-wmwidget-nodeid")?node.getAttribute("data-wmwidget-nodeid"):new Date().getTime();
            node.setAttribute("data-wmwidget-nodeid",id);
            var ifr=obj.lastCopy.iframe!=null?obj.lastCopy.iframe:"";
            var pasteData={iframe:ifr,id:id};
            var regexp=obj.genRegexp(lastPasteText,node.textContent);
            if(regexp!=null){
                pasteData.regexp=regexp;
            }
            input.setAttribute("data-wmwidget-extractFrom",JSON.stringify(pasteData));
           // var binding=obj.extraerBinding(node);
        }
    });
   }   
};

/*Canvasmodel.prototype.addFunctionalityToComplex=function(node,elemento){
  var defClone=elemento.bindingPoint;
  if(elemento.bindingPoint.extracts!=undefined){
  var shadow=node.shadowRoot;
  var divInputs=shadow.children[1];

  //var divInputs=shadow.children[1];
  for (extract in defClone.extracts.extracts){
      var act=defClone.extracts.extracts[extract];
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
  /*if($("[data-wmwidget-binded=false]").length==0){
    $(divInputs).css("display","none");
  }*/
 /* var form=$("form",divInputs);
  var copy=false;
  if(form.length==0&&defClone.extracts.widgets[0].completeForm!=null){
    var artForm=document.createElement("form");
    var mainContainer=divInputs.children[1];
    divInputs.replaceChild(artForm,mainContainer);
    artForm.appendChild(mainContainer);
    copy=true;
    form=$(defClone.extracts.widgets[0].completeForm);
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
  }
};

function handleFunctionalityOnSubmitComplex(form,defClone,shadow){
   var params;
   if(defClone.extracts.widgets[0].charset=="ISO-8859-1"){
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
        $(defClone.extracts.widgets.slice(1)).each(function(j,widget){ //for each part of complex
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
            var q1Params=getKeys(parseQueryString(anchor.search.substr(1))).sort();
            var q2Params=getKeys(parseQueryString(anc.search.substr(1))).sort();
            if(anchor.pathname==anc.pathname){
             if(arrayCompare(q1Params,q2Params)){
               dis=dis-30;
             }else if(q1Params.length==q2Params.length){
                dis=dis-20; 
             }else{
                dis=dis+5*Math.abs(q1Params.length-q2Params.length); 
             }
            }
            actDist[i]=dis;
        }
    });
    refreshWidgetFromForResultIfFine(0,as,actDist,j,shadow,widget,url);

};
function refreshWidgetFromForResultIfFine(intent,as,actDist,j,shadow,widget,url){
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
            }else if(intent<10){
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
        var nHTML=flo.getStyledNode(nodeNew);debugger;
        var div=shadow.getElementById("ComplexWidget"+(j+1));
        div.innerHTML=nHTML;
        frame.parentNode.removeChild(frame);
    },500);
};
function resolveLinkCSS(link,callback){
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
function arrayCompare (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};*/

Canvasmodel.prototype.extraerBinding=function (node){
	var bindingPoint=null;
   var bindingPointCoordinates=new Array();
   var type=node.getAttribute("data_wmwidget_type");
//if($(node).attr("data-wmwidget-foreign")!=undefined){
    //	var a=$(node).attr("data-wmwidget-foreign");
    //	var dataNode=JSON.parse(a);
    //	if(dataNode.widgetType=="complex"){
    		var b=$(node).attr("data-wmwidget-extractfroms");
    		var dataNodeComplex={};
    		if(b!=undefined){
    			dataNodeComplex=JSON.parse(b);
    		}
    		
    		//bindingPointCoordinates.push(dataNodeComplex);
    		bindingPoint=[];
    		for(nodeComplex in dataNodeComplex){
    			var dataC=$("[data-wmwidget-nodeid="+dataNodeComplex[nodeComplex].id+"]",document)[0];
                var xpathComplex=minimizeXPath(generateXPath(dataC,document.documentElement,null,{showId:true}),document.documentElement).join("");
                var win=$(window);
                var windowSize={height: $(dataC).outerHeight(), width:$(dataC).outerWidth()};
	   			var start={x: $(dataC).offset().left, y:$(dataC).offset().top};
	   			var end={x: $(dataC).offset().left+$(dataC).outerWidth(), y:$(dataC).offset().top+$(dataC).outerHeight()};
	   			bindingPointCoordinates.push({_type: "pixelBased", windowSize:windowSize, start:start, end:end});
    			bindingPointCoordinates.push({_type: "structureBased", path:xpathComplex});
    			bindingPoint={parameterName:nodeComplex, coordinate:bindingPointCoordinates, regexp: dataNodeComplex[nodeComplex].regexp};
    		}
   // 	}
 //  }
   var res={bindingPoint:bindingPoint};
   			
      if(node.getAttribute("data_wmwidget_type")=="cloned"||(type=="widgetized"&&node.getAttribute("data_wmwidget_widgetized_updated")=="true")){
    res.html=node.outerHTML;
   }else if(node.getAttribute("data_wmwidget_type")=="foreignCloned"){
    var extra=JSON.parse(node.getAttribute("data-wmwidget-foreign"));
    if(node.getAttribute("data_wmwidget_foreignCloned_type")=="html"){
      var child=$(node.shadowRoot.children);
      var d=child.first().detach();
      extra.html=node.shadowRoot.innerHTML;
      node.shadowRoot.insertBefore(d[0],node.shadowRoot.firstElementChild);
    }else if(node.getAttribute("data_wmwidget_foreignCloned_type")=="complex"){
      var ind=0;
      $(node.shadowRoot.children).map(function(i,div){if(div.className=="widgetContainer"){extra.widgets[ind].html=div.innerHTML;ind++;}});
      var extracts=node.getAttribute("data-wmwidget-extractfroms");
      if(extracts!=null){
          extracts=JSON.parse(extracts);
          extra.extracts=extracts;
           for(elem in extracts){
         // for(var i=0;i<extracts.length;i++){
              //var act=extracts[i];
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
    }
  //  res.extra=extra;
  if(extra){
    if(extra.widgetType=="complex"){
    	res._html=extra.widgets;
    }else{
    	res._html=extra.html;
    }
    }
    if(res.bindingPoint!=null){
    	res.bindingPoint.extracts=extra;
    }
    return res;
};

Canvasmodel.prototype.handleCopyInicializacion=function(){
	var obj=this;
	$(window).bind("copy", function(ev){obj.handleCopy(ev);});	
	$("iframe").map(function(i,ifr){ 
	   obj.handleCopyInicializacionBis(i, ifr);
	});
};

Canvasmodel.prototype.handleCopyInicializacionBis=function(i, ifr){
	var obj=this;	
	 if(ifr.src==""){
	        var win=$(ifr.contentWindow);
	        win.bind("copy", i, function(ev){obj.handleCopy(ev);});
	        ifr.setAttribute("data-wmwidget-iframe",i);
	    }
};

Canvasmodel.prototype.crearForeignClone=function (defClone){
    var res;
    if(defClone.widgetType=="html"||defClone.widgetType=="complex" || defClone.widgetType=="rawHTML"){
        var idI=0;
        if(defClone.widgetType=="rawHTML"){
        	var html=defClone.html;
        }else{
        	var html=defClone.widgetType=="html"?defClone.html:$.map(defClone.widgets,function(elem){return "<div id='ComplexWidget"+(idI++)+"' class='widgetContainer'>"+elem.html+"</div>";}).join("\n");
        }
        res=$("<div>").css({overflow:"auto", display: "inline-block"});
        var shadow=res[0].createShadowRoot();
        shadow.applyAuthorStyles = false;
        shadow.resetStyleInheritance = true;
        shadow.innerHTML="<style type='text/css'>\n.widgetContainer { position:relative; }\n.widgetContainer>*{ position:static !important; }\n</style>"+html+"<content/>";
        var objToDOM={};
        $.extend(true,objToDOM,defClone);
        defClone.widgetType=="html"? delete objToDOM.html:$(objToDOM.widgets).map(function(i,wid){delete wid.html;});
        res.attr("data-wmwidget-foreign",JSON.stringify(objToDOM));
    }else{
        res=$("<div>").css({width:defClone.width,height:defClone.height,overflow:"hidden"});
        //Pongo un numero grande para q se vea siempre
        //var iframe=$("<iframe>").attr({src:defClone.url,scrolling:"no"}).css({width:defClone.wwidth,height:defClone.wheight,top:-1*defClone.top,left:-1*defClone.left,border:"0px",overflow:"hidden",position:"relative"});
        var iframe=$("<iframe>").attr({src:defClone.url,scrolling:"no"}).css({width:defClone.wwidth,height:10000,top:-1*defClone.top,left:-1*defClone.left,border:"0px",overflow:"hidden",position:"relative"});
        res.append(iframe);
        res.attr("data-wmwidget-foreign",JSON.stringify(defClone));
    }   
    return res;                     
};

Canvasmodel.prototype.elementosSusceptiblesDeCambio=function (selected, shadow, hayCombo, selectedNode){
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
				var updateWhen=selectedNode.attributes.data_wmwidget_updatemoment.textContent;
				var updateComboValue=0;
				if(updateWhen=="Never"){
					updateComboValue=0;
				}else if(updateWhen=="Day"){
					updateComboValue=1;
				}else{
					updateComboValue=2;
				}
				var combobox=$('<br><select id="TimerWidget"><option value="nunca">Never</option><option value="onLoad">onLoad</option><option value="onBlink">onBlink</option><option value="dia">Day</option><option value="mes">Month</option></select>');
				var textPoly=$("<br><b>Poly Frequency</b>");
				shadow.append(textPoly);
				shadow.append(combobox);
				shadow[0].getElementById("TimerWidget").selectedIndex=updateComboValue;
				devolver.push({tipo:"combobox", elemento:"combobox"});
				indice++;
			}
	return devolver;
};

Canvasmodel.prototype.flip=function (){
	var obj=this;
	$(".wm_selected").dblclick(function(e){
		obj.flipBis(e);
	});
};

Canvasmodel.prototype.getTerminalsOfWidget=function (elem){
	var res=[];
	var terminals=this.container.terminals;
	for(var i=0;i<terminals.length;i++){
		var t=terminals[i];
		if(t.parentEl==elem){
			res.push(t);
		}
	}
	return res;
};

Canvasmodel.prototype.eliminarEventoTerminal=function(){
	for (var j=0; j<$("[data_wmwidget_id]").length; j++){
		var terms=this.getTerminalsOfWidget($("[data_wmwidget_id]")[j]);
			for(var i=0;i<terms.length;i++){
				terms[i].dd.lock();
			}
	}
};

Canvasmodel.prototype.activarEventoTerminal=function(){
	for (var j=0; j<$("[data_wmwidget_id]").length; j++){
		var terms=this.getTerminalsOfWidget($("[data_wmwidget_id]")[j]);
			for(var i=0;i<terms.length;i++){
				terms[i].dd.unlock();
			}
	}
};

Canvasmodel.prototype.flipBis=function (e){
	var obj=this;
	if($(".wm_selected")[0].attributes.data_wmwidget_categoria==undefined){
		$(".WireIt-Wire").css('display', 'none');
		$(".inputEx-InPlaceEdit-visu").css('display', 'none');
		$(".inputEx-InPlaceEdit-editor").css('display', 'none');
		$(".WireIt-Wire-scissors").css('display', 'none');
		this.eliminarEventoTerminal();
	   if($(".wm_selected")[0].attributes.data_wmwidget_foreignCloned_type.textContent!="iframe"){
			e.preventDefault();
		    e.stopPropagation();
			var elementoHover=$(e.target);
			$('[class*=wm_selected]').removeClass("wm_selected");
			elementoHover.closest("[data_wmwidget_id]").addClass("wm_selected");
		    var selected=$(".wm_selected");
		    selected.attr("data_wmwidget_flip", "true");
		    this.eliminarEventos();
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
				obj.flipOnEnd(flipped, selected);
				}
			});
			}
			else{
				this.eliminarEventos();
		   		this.artivarEventos();
			}
	}
};

Canvasmodel.prototype.flipOnEnd=function (flipped, selected){
			    if(selected[0].attributes.data_wmwidget_flip.textContent=="true"){
			    	flipped=true;
					console.log('when the animation has already ended');
					this.desviarBotonesYSparks();
					if($(".wm_selected")[0].attributes.data_wmwidget_foreignCloned_type.textContent=="html"){
						var lista=$(".wm_selected")[0].shadowRoot;
						var restaurarWidget = $(selected[0].shadowRoot.children);
						restaurarWidget.remove();
						var resultado=this.elementosSusceptiblesDeCambio(restaurarWidget[2], $(selected[0].shadowRoot), true, selected[0]);
						this.flop(resultado, $(selected[0].shadowRoot), selected, restaurarWidget, true);
					}
					else if($(".wm_selected")[0].attributes.data_wmwidget_foreignCloned_type.textContent!="complex"){
						var shadow = selected[0].createShadowRoot();
						shadow.applyAuthorStyles = false;
						shadow.resetStyleInheritance = true;
						var resultado=this.elementosSusceptiblesDeCambio(selected[0], $(shadow), true, selected[0]);	
						var content=selected.contents();  
						this.flop(resultado, $(selected[0].shadowRoot), selected, content, true);
					}
					else{
						var obj=this;
                        selected[0].shadowRoot.addEventListener("paste",function(ev){obj.handlePaste(ev);},true);					    
						var listaInputs = $(selected[0].shadowRoot.getElementById("ComplexWidget0")).find("input[type=text],[type=search]");
						var restaurarWidget = $(selected[0].shadowRoot.children);
						restaurarWidget.remove();
						var resultado=this.complexWidgetInsertInputs(listaInputs, $(selected[0].shadowRoot), selected);
						this.flopComplex(resultado, restaurarWidget, $(selected[0].shadowRoot), selected[0]);
					}
				}
};

Canvasmodel.prototype.flopComplex=function (resultado, restaurarWidget, shadow, widget){
	var obj=this;
	this.evitarClicksIndeseados2();
	 $(".wm_selected").dblclick(function(e){ 
	 	obj.flopComplexBis(e, resultado, restaurarWidget, shadow, widget);
	 });
};

Canvasmodel.prototype.flopComplexBis=function (e, resultado, restaurarWidget, shadow, widget){
	var obj=this;
	e.preventDefault();
		e.stopPropagation();
		 var elementoHover=$(e.target);
		$(".wm_selected").attr("data_wmwidget_flip", "false");
		//widget.webkitShadowRoot.removeEventListener("paste",this.handlePaste,true);                        
        var extractFroms={};
        for(var i=0; i<resultado.length-1; i++){
            var elem=shadow[0].getElementById("valor"+i);
            var val=elem.value;
            resultado[i].elemento.value=val;
            var extractFrom=elem.getAttribute("data-wmwidget-extractfrom");
            if(extractFrom!=null){
             extractFroms[resultado[i].elemento.name]=JSON.parse(extractFrom);  
            }
        }
        var posicionSeleccionada=shadow[0].getElementById("TimerWidget").options.selectedIndex;
        var valorSeleccionado=shadow[0].getElementById("TimerWidget").options[posicionSeleccionada].text;
        $(widget).attr("data_wmwidget_updateMoment", valorSeleccionado);
        widget.setAttribute("data-wmwidget-extractfroms",JSON.stringify(extractFroms));
        var selected=$('.wm_selected');
        var children=selected.children();
		selected.revertFlip();
		setTimeout(function(){
			selected.empty();
			selected.append(children);
			shadow[0].innerHTML="";
			try{
			shadow.append(restaurarWidget);
			}catch(ex){}
		    $('.wm_close').css('top', elementoHover.offset().top-20); 
			$('.wm_close').css('left', elementoHover.offset().left-20); 
	/*		$('.wm_select').css('top', elementoHover.offset().top-20); 
			$('.wm_select').css('left', elementoHover.offset().left-20+35);
		//	$('.wm_deselect').css('top', elementoHover.offset().top-20); 
		//	$('.wm_deselect').css('left', elementoHover.offset().left-20+70);
			$('.wm_hide').css('top', elementoHover.offset().top-20); 
			$('.wm_hide').css('left', elementoHover.offset().left-20+105);
			$(".wm_sparkclick").css('top', elementoHover.offset().top); 
			$(".wm_sparkclick").css('left', elementoHover.offset().left+elementoHover.width());
			$(".wm_sparkdblclick").css('top', elementoHover.offset().top+22); 
			$(".wm_sparkdblclick").css('left', elementoHover.offset().left+elementoHover.width());
			$(".wm_sparkmouseenter").css('top', elementoHover.offset().top+44); 
			$(".wm_sparkmouseenter").css('left', elementoHover.offset().left+elementoHover.width());
	//		$(".wm_sparkmouseleave").css('top', elementoHover.offset().top+66); 
	//		$(".wm_sparkmouseleave").css('left', elementoHover.offset().left+elementoHover.width());*/
	        obj.eliminarEventos();
	   		obj.artivarEventos();
	   		$(".WireIt-Wire").css('display', 'inline');
	   		$(".inputEx-InPlaceEdit-visu").css('display', 'inline');
	   		$(".inputEx-InPlaceEdit-editor").css('display', 'none');
	   		$(".WireIt-Wire-scissors").css('display', 'none');
	   		obj.container.redrawAllWires();
	   		obj.activarEventoTerminal();
	   		var restauranrBinding=obj.extraerBinding(selected[0]);
	   		obj.addFunctionalityToComplex(selected[0],restauranrBinding);},1000); 
};

Canvasmodel.prototype.complexWidgetInsertInputs=function (listaInputs, panelFlop, selected){
	var indice=0;
	var devolver = new Array();
	for(var i=0; i<listaInputs.length; i++){
		var linkButton=$('<br>Change '+listaInputs[i].name+':<input id=valor'+indice+' type="text" name="FirstName" value="'+listaInputs[i].value+'">');
		panelFlop.append(linkButton);
		devolver.push({tipo:"complex", elemento:listaInputs[i]});
		indice++;
	}
	var updateWhen=selected[0].attributes.data_wmwidget_updatemoment.textContent;
	var updateComboValue=0;
	if(updateWhen=="Never"){
		updateComboValue=0;
	}else if(updateWhen=="Day"){
		updateComboValue=1;
	}else{
		updateComboValue=2;
	}
	var combobox=$('<br><select id="TimerWidget"><option value="nunca">Never</option><option value="onLoad">onLoad</option><option value="onBlink">onBlink</option><option value="dia">Day</option><option value="mes">Month</option></select>');
	var textPoly=$("<br><b>Poly Frequency</b>");
	panelFlop.append(textPoly);
	panelFlop.append(combobox);
	panelFlop[0].getElementById("TimerWidget").selectedIndex=updateComboValue;
	devolver.push({tipo:"combobox", elemento:"combobox"});
	return devolver;
};

Canvasmodel.prototype.flop=function (resultadoString, shadow, selected, content, hayCombo){
	var obj=this;
	console.log("flop");
	var valorCorrecto=true;
	var hayCambiosDeValor=false;
	var introducirAlFinal=false;
	var pos = -1;
	var valorFinal2="";
	var valorFinal="";
	this.evitarClicksIndeseados2();
	this.eliminarEventos();
   $(".wm_selected").dblclick(function(e){
   		obj.flopBis(e, valorCorrecto, hayCambiosDeValor, introducirAlFinal, pos, valorFinal2, valorFinal, resultadoString, shadow, selected, content, hayCombo);
	});
};

Canvasmodel.prototype.flopBis=function (e, valorCorrecto, hayCambiosDeValor, introducirAlFinal, pos, valorFinal2, valorFinal, resultadoString, shadow, selected, content, hayCombo){
	var obj=this;debugger;
	e.preventDefault();
		e.stopPropagation();
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
			if(resultadoString[i].tipo=="imagen"){
				if (!this.checkURLImage(val)){
					valorCorrecto=false;
				}
			}
			if(resultadoString[i].tipo=="link"){
				if (!this.learnRegExp(val)){
					valorCorrecto=false;
				}
			}			
			if(resultadoString[i].tipo=="linkText"){
				if (!this.nombreCorrecto(val)){
					valorCorrecto=false;
				}
			}
			if(resultadoString[i].tipo=="text"){
				if (!this.nombreCorrecto(val)){
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
			$(".wm_selected").attr("data_wmwidget_flip", "false");
		   var selected=$('.wm_selected');
		   var posicionSeleccionada=shadow.getElementById("TimerWidget").options.selectedIndex;
           var valorSeleccionado=shadow.getElementById("TimerWidget").options[posicionSeleccionada].text;
           selected.attr("data_wmwidget_updateMoment", valorSeleccionado);
      		var children=selected.children();
			$('.wm_selected').revertFlip();
			if(hayCambiosDeValor){
				$('.wm_selected').attr("data_wmwidget_widgetized_updated", "true");
			}
			setTimeout(function(){
			selected.empty();
			selected.append(children);
			if(selected[0].attributes.data_wmwidget_foreignCloned_type.textContent=="html"){// si es tipo hatml hay comboBox
				selected[0].shadowRoot.innerHTML="";
				for(var i=0;i<content.length;i++){
					selected[0].shadowRoot.appendChild(content[i]);
				}
			}else{	
				shadow.innerHTML=$("<content>")[0].outerHTML;
				selected.empty();
				selected.append(content);
			}
			
			var i=0;
			while(resultadoString.length>i){
				var val=resultadoString[i].valor;
				if(resultadoString[i].tipo=="imagen"){
					resultadoString[i].elemento.src=val;
				}
				if(resultadoString[i].tipo=="link"){
					resultadoString[i].elemento.href=val;
				}			
				if(resultadoString[i].tipo=="linkText"){
					resultadoString[i].elemento.textContent=val;
				}
				if(resultadoString[i].tipo=="text"){
					if(obj.learnRegExp(val)){
						if(val.substring(0,4)!="http"){
							val="http://"+val;
						}
						
						$(resultadoString[i].elemento).replaceWith("<a href='"+val+"'>"+val+"</a>");
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
	//		$('.wm_select').css('top', elementoHover.offset().top-20); 
	//		$('.wm_select').css('left', elementoHover.offset().left-20+35);
		//	$('.wm_deselect').css('top', elementoHover.offset().top-20); 
		//	$('.wm_deselect').css('left', elementoHover.offset().left-20+70);
	//		$('.wm_hide').css('top', elementoHover.offset().top-20); 
	//		$('.wm_hide').css('left', elementoHover.offset().left-20+105);
	//		$(".wm_sparkclick").css('top', elementoHover.offset().top); 
	//		$(".wm_sparkclick").css('left', elementoHover.offset().left+elementoHover.width());
	//		$(".wm_sparkdblclick").css('top', elementoHover.offset().top+22); 
	//		$(".wm_sparkdblclick").css('left', elementoHover.offset().left+elementoHover.width());
	//		$(".wm_sparkmouseenter").css('top', elementoHover.offset().top+44); 
	//		$(".wm_sparkmouseenter").css('left', elementoHover.offset().left+elementoHover.width());
	//		$(".wm_sparkmouseleave").css('top', elementoHover.offset().top+66); 
	//		$(".wm_sparkmouseleave").css('left', elementoHover.offset().left+elementoHover.width());
	        obj.eliminarEventos();
	   		obj.artivarEventos();
	   		$(".WireIt-Wire").css('display', 'inline');
	   		$(".inputEx-InPlaceEdit-visu").css('display', 'inline');
	   		$(".inputEx-InPlaceEdit-editor").css('display', 'none');
	   		$(".WireIt-Wire-scissors").css('display', 'none');
	   		obj.container.redrawAllWires();
	   		obj.activarEventoTerminal();},1000);  
   	   }
   	   else{
   	   	//  this.eliminarEventos();
   	   	//  this.flop(resultadoString, shadow, selected, content);
   	  // 	this.flopBis(e, valorCorrecto, hayCambiosDeValor, introducirAlFinal, pos, valorFinal2, valorFinal, resultadoString, shadow, selected, content, hayCombo);
   	   }
};

Canvasmodel.prototype.introducirHtmlEditor=function(){
	$("body").append("<div id='wm_htmlEditorDiv'><textarea id='wm_htmlEditor' placeholder='Insert here your HTML code' rows='10' cols='60' contenteditable='true'></textarea><textarea id='wm_cssEditor' placeholder='Insert here your CSS code' rows='10' cols='60' contenteditable='true'></textarea><textarea id='wm_javascriptEditor' placeholder='Insert here your JAVASCRIPT code' rows='10' cols='60' contenteditable='true'></textarea><textarea id='wm_commentEditor' placeholder='Insert here your COMMENT About the Widget' rows='10' cols='60' contenteditable='true'></textarea></div>");
};

Canvasmodel.prototype.addTextAreaToRawHtml=function(){
	var obj=this;
	$("[data_wmwidget_categoria]").dblclick(function(){
		obj.addTextAreaToRawHtmlBis();
	});
};

var timeoutHandler;
var activadoListenerPaste=false;
var activadoCopy=false;
Canvasmodel.prototype.addTextAreaToRawHtmlBis=function(){
	var obj=this;
	var textoWidget="";
	if($(".wm_selected").children()[0].childNodes[0]==undefined){
		textoWidget="";
	}else{
		for(var i=0; i<$(".wm_selected").children()[0].childNodes.length; i++){
			if($(".wm_selected").children()[0].childNodes[i].nodeName!="#text" && $(".wm_selected").children()[0].childNodes[i].nodeName!="#comment"){
				textoWidget=textoWidget+" "+$(".wm_selected").children()[0].childNodes[i].outerHTML;
			}	
		}
	}debugger;
	var cssTextoWidget="";
	for(var j=0; j<$(".wm_selected").children().length; j++){
		if($(".wm_selected").children()[j].tagName=="STYLE"){
			cssTextoWidget=$(".wm_selected").children()[j].textContent;
			$(".wm_selected").children()[j].remove();
		}
	}
	var javascriptTextoWidget="";
	for(var k=0; k<$(".wm_selected").children().length; k++){
		if($(".wm_selected").children()[k].tagName=="SCRIPT"){
			javascriptTextoWidget=$(".wm_selected").children()[k].textContent;
			$(".wm_selected").children()[k].remove();
		}
	}
	var textoComment="";
	for(var k=0; k<$(".wm_selected")[0].childNodes.length; k++){
		if($(".wm_selected")[0].childNodes[k].nodeType===Node.COMMENT_NODE){
			textoComment=$(".wm_selected")[0].childNodes[k].textContent;
			$(".wm_selected")[0].childNodes[k].remove();
		}
	}
	$( "#wm_htmlEditor" ).val(textoWidget);
    var textarea=$( "#wm_htmlEditorDiv" ).detach();
    $(".wm_selected").after(textarea);
    $( "#wm_cssEditor" ).val(cssTextoWidget);
    $( "#wm_javascriptEditor" ).val(javascriptTextoWidget);
     $( "#wm_commentEditor" ).val(textoComment);
    if(!activadoListenerPaste){
    	$( "#wm_htmlEditor" )[0].addEventListener("paste",function(ev){obj.htmlPaste(ev);},true);
    	activadoListenerPaste=true;
    }
    $( "#wm_htmlEditorDiv" ).toggle( "clip", 500 );
    this.eliminarEventos();
    this.quitarTextAreaEditting();
    timeoutHandler = setInterval( this.whileTextAreaEditting, 2000 );
};

Canvasmodel.prototype.whileTextAreaEditting=function(){
	$(".wm_selected").children()[0].innerHTML=$("#wm_htmlEditor").val();
	//$(".wm_rawhtml")[0].innerHTML=textAreaContent;
};

Canvasmodel.prototype.quitarTextAreaEditting=function(){
	var obj=this;
	$("[data_wmwidget_categoria]").dblclick(function(){debugger;
		var textAreaContent=$("#wm_htmlEditor").val();
		var textAreaCssContent=$("#wm_cssEditor").val();
		var textAreaJavascriptContent=$("#wm_javascriptEditor").val();
		var textAreaComment=$("#wm_commentEditor").val();
		$(".wm_selected").children()[0].innerHTML=textAreaContent;
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML=textAreaCssContent;
		$(".wm_selected").append(css);
		var javaScript = document.createElement("script");
		javaScript.async = false;
		javaScript.innerHTML=textAreaJavascriptContent;
		$(".wm_selected").append(javaScript);
		//document.head.appendChild(css);
		var comment=document.createComment(textAreaComment);
		$(".wm_selected").append(comment);
		$( "#wm_htmlEditorDiv" ).toggle( "clip", 500 );
		clearTimeout( timeoutHandler );
		setTimeout(function(){ 
		var textarea=$( "#wm_htmlEditorDiv" ).detach();
		$("body").after(textarea);
		$(".ui-effects-wrapper").remove(); 
		obj.artivarEventos(); }, 500);
	});
};

Canvasmodel.prototype.htmlCopy=function (ev){
    var sel=ev.currentTarget.getSelection();
    activadoCopy=true;
    if(sel.rangeCount>0){
        this.lastCopy={node:sel.getRangeAt(0).commonAncestorContainer,iframe:ev.data};
    }    
};

Canvasmodel.prototype.htmlPaste=function (ev){
    var input=ev.target;
    if(input.tagName=="TEXTAREA"){debugger;
    	var obj=this;
    	if(activadoCopy){
    		var cursorPosition = $( "#wm_htmlEditor" ).prop("selectionStart");
    		if(window.getSelection().toString()!=""){
    			obj.deleteSelectedText();
    		}
    		var textohtml=$( "#wm_htmlEditor" ).val();
    		$( "#wm_htmlEditor" ).val(textohtml.substring(0,cursorPosition)+"<webMakeup>");
    		var textoDespues=textohtml.substring(cursorPosition,textohtml.length);
    	}
        ev.clipboardData.items[0].getAsString(function(lastPasteText){
        if(obj.lastCopy!=null&&obj.lastCopy.node.textContent.trim().indexOf(lastPasteText.trim())>-1){
            var node=obj.lastCopy.node.nodeType==Node.TEXT_NODE?obj.lastCopy.node.parentNode:this.lastCopy.node;
            var id=node.getAttribute("data-wmwidget-nodeid")?node.getAttribute("data-wmwidget-nodeid"):new Date().getTime();
            node.setAttribute("data-wmwidget-nodeid",id);
            var ifr=obj.lastCopy.iframe!=null?obj.lastCopy.iframe:"";
            var pasteData={iframe:ifr,id:id};
            var regexp=obj.genRegexp(lastPasteText,node.textContent);
            if(regexp!=null){
                pasteData.regexp=regexp;
            }debugger;
            var xpath=minimizeXPath(generateXPath(node,document,null,{showId:true}),document).join("");
            pasteData.xpath=xpath;
            $(".wm_selected")[0].setAttribute("data_wmwidget_extractHTML",JSON.stringify(pasteData));
           // var binding=obj.extraerBinding(node);
        }
        if(activadoCopy){
	        var textohtml2=$( "#wm_htmlEditor" ).val();
	    	$( "#wm_htmlEditor" ).val(textohtml2+"</webMakeup>"+textoDespues);
	    	activadoCopy=false;
    	}
    });
   }   
};

Canvasmodel.prototype.deleteSelectedText=function(){debugger;
	var selectedText=window.getSelection().toString();
	var textohtml=$( "#wm_htmlEditor" ).val();
	var posSelectedText=textohtml.indexOf(selectedText);
	var textoFinal=textohtml.substring(0,posSelectedText)+textohtml.substring(posSelectedText+selectedText.length, textohtml.length);;
	$( "#wm_htmlEditor" ).val(textoFinal);
};


Canvasmodel.prototype.htmlCopyInicializacion=function(){
	var obj=this;
	$(window).bind("copy", function(ev){obj.htmlCopy(ev);});	
	$("iframe").map(function(i,ifr){ 
	   obj.htmlCopyInicializacionBis(i, ifr);
	});
};

Canvasmodel.prototype.htmlCopyInicializacionBis=function(i, ifr){
	var obj=this;	
	 if(ifr.src==""){
	        var win=$(ifr.contentWindow);
	        win.bind("copy", i, function(ev){obj.htmlCopy(ev);});
	        ifr.setAttribute("data-wmwidget-rawhtml",i);
	    }
};

/*var extracts=node.getAttribute("data-wmwidget-extractfroms");
      if(extracts!=null){
          extracts=JSON.parse(extracts);
          extra.extracts=extracts;
           for(elem in extracts){
         // for(var i=0;i<extracts.length;i++){
              //var act=extracts[i];
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
      }*/

Canvasmodel.prototype.buscarClone=function (idBoton){
	var i=0;
	var encontrado=false;
	var devolver="";
	while(paletteModel.widgetList[i]!=null && !encontrado){
		if(paletteModel.widgetList[i].type==idBoton){
			encontrado=true;
			devolver=paletteModel.widgetList[i];
		}
		i++;
	}
	return devolver;
};


Canvasmodel.prototype.eliminarEventos=function (){
	//widgetizar
	$(document).off("click");
	$(document).off("mouseover");
	$(document).off("mouseleave");
	$(document).off("mouseout");
	$(document).off("keypress");
//	$("#widgetizar").off("click");
//	$("#buttonLeft a").off("mousedown");
//	$("#widgetizar").off("click");
//	$("#clone").off("click");
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
	//$("#widgetizar").off("click");
	//$("#clone").off("click");
	$("#extruderLeft").off("mouseup");
	//ponerXenwidget
	$('[data_wmwidget_id]').off('hover');
	$('.wm_select').off('hover');
//	$('.wm_deselect').off('hover');
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
    $(".wm_ventana").off("click");
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
	//$('.wm_sparkclick').off("hover");
	//$('.wm_sparkdblclick').off("hover");
	//$('.wm_sparkmouseenter').off("hover");
	//$('.wm_sparkmouseleave').off("hover");
	//selectWidget
	$('.wm_select').off("click");
	//deselectWidget
//	$('.wm_deselect').off("click");
	//hideWidget
	$('.wm_hide').off("click");
	//downloadHTMLWidget
	$('.wm_download').off("click");
	//clickEvent();
	//$('.wm_sparkclick').off("click");
	//doubleClickEvent();
	//$('.wm_sparkdblclick').off("click");
	//mouseEnterEvent()
	//$('.wm_sparkmouseenter').off("click");
	//mouseLeaveEvent();
	//$('.wm_sparkmouseleave').off("click");
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
	//insertConditionalIcon
	$('[data_wmwidget_id]').off("mouseup");
	$('.wm_closeVentana').off('mouseup');
	//clickConditionalIcon
	$(".wm_conditionalButton").off("click");
	//previoInsertConditionalIcon
	$('.WireIt-Terminal').off("mousedown");
	//pintarConditionalIconBis
	$('[data_wmwidget_id]').off('click');
	$('[data_wmwidget_id]').off('mouseover');
	$('[data_wmwidget_id]').off('mouseout');
	$('#ComplexWidget1').off('mouseover');
	$('#ComplexWidget1').off('mouseout');
	$('#ComplexWidget1').off('click');
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
	//addTextAreaToRawHtml
	$("[data_wmwidget_categoria]").off("dblclick");
};

Canvasmodel.prototype.artivarEventos=function(){
       this.dragAndDropForeignClones();
       this.widgetizar($("div"));
       this.move();
     //  emitte.emit('ponerXenwidget');
      // this.ponerXenwidget();
       this.cerrarWidget();
       //this.incluirSparks();
       new Canvasview(this);
       this.selectWidget();
       //this.deselectWidget();
       this.hideWidget();
       this.downloadHTMLWidget();
       this.insertConditionalIcon();
       this.clickConditionalIcon();
       this.previoInsertConditionalIcon();
     //  this.clickEvent();
     //  this.doubleClickEvent();
     //  this.mouseEnterEvent();
     //  this.mouseLeaveEvent();
       this.flip();
     //  this.activarRisize();
       this.evitarClicksIndeseados();
       this.deleteWidgetFromWidgetList();   
       this.undoWidget();
       this.addTextAreaToRawHtml();
};

var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    queries = queryString.split("&");

    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
 
    return params;
};
 
Canvasmodel.prototype.getKeys=function (obj, filter) {
    var name,
        result = [];

    for (name in obj) {
        if ((!filter || filter.test(name)) && obj.hasOwnProperty(name)) {
            result[result.length] = name;
        }
    }
    return result;
};

Canvasmodel.prototype.arrayCompare=function(array,array2) {
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

Canvasmodel.prototype.getNumberSameItemsInAsocArray=function(array,array2) {
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
Canvasmodel.prototype.form2form=function(formA, formB) {
    $(':input[name]', formA).each(function() {
        $("[name='" + $(this).attr('name') +"']", formB).val($(this).val());
    });
};

Canvasmodel.prototype.serializeWithEscape=function (form) {
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
Canvasmodel.prototype.addFunctionalityToComplex=function(node,defClone){debugger;
	var obj=this;
  var shadow=node.shadowRoot;
  var divInputs=shadow.children[1];
  $(shadow.children[2]).empty();
  $(shadow.children[2]).append('<h2 style="color:blue">LOADING...</h2>');
  if(defClone.bindingPoint.extracts!=undefined){
  for (extract in defClone.bindingPoint.extracts.extracts){
      var act=defClone.bindingPoint.extracts.extracts[extract];
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
  
  /*if($("[data-wmwidget-binded=false]").length==0){
    $(divInputs).css("display","none");
  }*/
  var form=$("form",divInputs);
  var copy=false;
  if((form.length==0&&defClone.bindingPoint.extracts.widgets[0].completeForm!=null) || (form[0].action==undefined || form[0].action=="")){
    var artForm=document.createElement("form");
    var mainContainer=divInputs.children[1];
    divInputs.replaceChild(artForm,mainContainer);
    artForm.appendChild(mainContainer);
    copy=true;
    form=$(defClone.bindingPoint.extracts.widgets[0].completeForm);
    obj.form2form($(artForm),form);
  }
  form=form[0];

  shadow.addEventListener("submit",function(ev){
    ev.preventDefault();
	ev.stopPropagation();
    if(copy){
        obj.form2form($(artForm),form);   
    }
    obj.handleFunctionalityOnSubmitComplex(form,defClone,shadow);
  },true);  
  obj.handleFunctionalityOnSubmitComplex(form,defClone,shadow);
  }
};
var parametroDelFormulario;
Canvasmodel.prototype.handleFunctionalityOnSubmitComplex=function (form,defClone,shadow){debugger;
	var obj=this;
   var params;
   if(defClone._html[0].charset=="ISO-8859-1"){
       params=this.serializeWithEscape(form);       
   }else{
       params=$(form).serialize();
   }
   parametroDelFormulario=params;
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
        $(defClone._html.slice(1)).each(function(j,widget){ //for each part of complex
            var nodeNew=doc.evaluate(widget.xpath,doc,null, XPathResult.ANY_TYPE, null).iterateNext();  
            if(nodeNew!=null){ //Node found in result page
                obj.refreshWidgetPart(j,shadow,data,loc,widget);        
            }else{ //Navigate through result page
                obj.refreshWidgetFromFormResult(j,widget,doc,hrefs,as,shadow);
            }
        });
    }
    }); 
};

Canvasmodel.prototype.refreshWidgetFromFormResult=function (j,widget,doc,hrefs,as,shadow){
	var obj=this;
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
            var q1ParamsKeys=obj.getKeys(q1Params).sort();
            var q2ParamsKeys=obj.getKeys(q2Params).sort();            
            if(anchor.pathname==anc.pathname){
             if(obj.arrayCompare(q1ParamsKeys,q2ParamsKeys)){
               dis=dis-30-(10*obj.getNumberSameItemsInAsocArray(q1Params,q2Params));
             }else if(q1ParamsKeys.length==q2ParamsKeys.length){
                dis=dis-20; 
             }else{
                dis=dis+5*Math.abs(q1ParamsKeys.length-q2ParamsKeys.length); 
             }
            }
            actDist[i]=dis;
        }
    });
    obj.refreshWidgetFromForResultIfFine(0,as,actDist,j,shadow,widget,url);
};

Canvasmodel.prototype.refreshWidgetFromForResultIfFine=function (intent,as,actDist,j,shadow,widget,url){debugger;
	var obj=this;
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
          //  nodeNew=null;
            if(nodeNew!=null){
                obj.refreshWidgetPart(j,shadow,data,loc,widget);
            }else{
            	obj.riaWidget(widget, as[index], j, shadow, data, loc, intent, as, index, actDist, url);
            /*	if(nodeNew!=null){
            		 obj.refreshWidgetPart(j,shadow,data,loc,widget);
            	}
	            else if(intent<2){
	                as.splice(index,1);
	                actDist.splice(index,1);
	                obj.refreshWidgetFromForResultIfFine(intent+1,as,actDist,j,shadow,widget,url);
	            }else if(intent==2){
	            	 setTimeout(function(){
		            	 var nodo='<p class="wm_notFound"><font color="red">'+obj.maneinputComplex(parametroDelFormulario)+' NOT FOUND IN '+obj.maneNameUrl(widget.url)+'</font></p>';
		            	  var div=shadow.getElementById("ComplexWidget"+(j+1));
					        div.innerHTML=nodo;
		            	//  if($(".wm_notFound",shadow.children)[0]==undefined){
				       	//  	var div=shadow.getElementById("ComplexWidget"+(j+1));
				       	//  	div.appendChild($(nodo)[0]);
			       	  //}
			       	  },500);
	            }*/
            }
        }                                     
    });
};

Canvasmodel.prototype.riaWidget=function(widget, url, j, shadow, data, loc, intent, as, index, actDist, urlAnt){debugger;
	var obj=this;
	// var res=$("<div>").css({width:widget.wwidth,height:widget.wheight,overflow:"hidden"});
	 var iframe=$("<iframe>").attr({src:url,scrolling:"no"});
	 iframe.css({width:widget.width,height:widget.height,top:-1*widget.top,left:-1*widget.left,border:"0px",overflow:"hidden"});
	 // iframe[0].style.setProperty("position","relative","important");
	//  res.append(iframe);
	 $('body').append(iframe);
	 iframe[0].addEventListener("load",function(e){debugger;
	 	try{
	 		var nodeNew=iframe[0].contentWindow.document.evaluate(widget.xpath, iframe[0].contentWindow.document.body, null, XPathResult.ANY_TYPE, null).iterateNext();
	 	}catch(error){
	 		var nodeNew=null;
	 	}	
	 	if(nodeNew!=null){
	 		 var nHTML=flo.getStyledNode(nodeNew);
            		  setTimeout(function(){
					      //  var nHTML=flo.getStyledNode(nodeNew);
					        var div=shadow.getElementById("ComplexWidget"+(j+1));
					        div.innerHTML=nHTML;
					        iframe[0].parentNode.removeChild(iframe[0]);},500);

            	}
	            else if(intent<10){
	            	iframe[0].parentNode.removeChild(iframe[0]);
	                as.splice(index,1);
	                actDist.splice(index,1);
	                obj.refreshWidgetFromForResultIfFine(intent+1,as,actDist,j,shadow,widget,urlAnt);
	            }else if(intent==10 || intent>10){
	            	iframe[0].parentNode.removeChild(iframe[0]);
	            	 setTimeout(function(){debugger;
		            	 var nodo='<p class="wm_notFound"><font color="red">'+obj.maneinputComplex(parametroDelFormulario)+' NOT FOUND IN '+obj.maneNameUrl(widget.url)+'</font></p>';
		            	  var div=shadow.getElementById("ComplexWidget"+(j+1));
					        div.innerHTML=nodo;
		            	//  if($(".wm_notFound",shadow.children)[0]==undefined){
				       	//  	var div=shadow.getElementById("ComplexWidget"+(j+1));
				       	//  	div.appendChild($(nodo)[0]);
			       	  //}
			       	  },500);
	            }	        	
	 	},true);
};

Canvasmodel.prototype.maneinputComplex=function(name){
	var inicio=-1;
	var final=-1;
	for(var i=0; i<name.length; i++){
		if(name[i]=="=" && inicio==-1){
			inicio=i;
		}
		if(name[i]=="&" && final==-1){
			final=i;
		}
	}
	var devolverInicial=0;
	var devolver="";
	var aux=name.slice(inicio+1, final);
	for(var j=0; j<aux.length; j++){
		if(aux[j]=="+"){
			devolver=devolver+" ";
		}else{
			devolver=devolver+""+aux[j];
		}
	}
	return devolver;
};

Canvasmodel.prototype.maneNameUrl=function(url){
	var primero=-1;
	var segundo=-1;
	for(var i=0;i<url.length; i++){
		if(url[i]=="."){
			if(primero==-1){
				primero=i;
			}else if(segundo==-1){
				segundo=i;
			}
		}
	}
	return url.slice(primero+1, segundo);
};

Canvasmodel.prototype.refreshWidgetPart=function (j,shadow,data,loc,widget){
	var obj=this;
    var doc=document.implementation.createHTMLDocument();
    doc.documentElement.innerHTML=data;
    var base=doc.createElement("base");
    base.href=loc;
    doc.documentElement.firstElementChild.appendChild(base);
    var links=doc.querySelectorAll("link[rel=stylesheet]");
    var arr=[];var i=0;for(i=0;i<links.length;i++){arr[i]=links[i];}
    var callback=function(){obj.refreshWidgetPart3(doc,j,shadow,widget);};
    obj.refreshWidgetPart2(arr,j,shadow,widget,callback);                                      
};

Canvasmodel.prototype.refreshWidgetPart2=function (links,j,shadow,widget,callback){
	var obj=this;
    if(links.length>0){
        var link=links[0];
        var restLink=links.slice(1);
        var callb=function(){obj.refreshWidgetPart2(restLink,j,shadow,widget,callback);};
        obj.resolveLinkCSS(link,callb);
    }else{
        callback();
    }                                         
};

Canvasmodel.prototype.refreshWidgetPart3=function (doc,j,shadow,widget){
	var obj=this;
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
        frame.parentNode.removeChild(frame);},500);
};

Canvasmodel.prototype.getAnchors=function(orc, isSave){debugger;
  var obj=this;
  var docElement=document.documentElement;
  var icon="";
  var xpathsInserted=[];
  var originalWidgetized=$([]);
  var widgetized={};
  var extractForms=null;
  var complexInfoForeign=null;
  var isAComplexWidget=false;
var blinks=orc.map(function(n,elem){
	return{"event":n.action,"triggering":n.idactor,"triggered":n.idreactor};
});

 var nodesInserted=$("[data_wmwidget_type='cloned'],[data_wmwidget_type='original_widgetized'],[data_wmwidget_type='widgetized'],[data_wmwidget_type='foreignCloned']").map(function(n,node){
   var range=document.createRange();
   range.selectNode(node);   
   if(node.attributes.data_wmwidget_type.textContent!="original_widgetized"){
   	node.parentNode.removeChild(node);
   }
 //  var a=$(node).attr("data-wmwidget-foreign");
 //  var dataNode=JSON.parse(a);
   if(node.attributes.data_wmwidget_pattern!=undefined){
	   	  icon=node.attributes.data_wmwidget_pattern.textContent;
	   }
	else if(node.classList.contains("wm_wireIcon")){
   		icon="yes";
   }
 //  return{node:node,range:range, icon:icon, iconoPattern:iconoPattern, url:dataNode.url, xpath:dataNode.xpath, heightSize:dataNode.wheight, widthSize:dataNode.wwidth, startx: dataNode.left, starty:dataNode.top, endx: dataNode.left+dataNode.width, endy:dataNode.top+dataNode.height};
 return{node:node,range:range, icon:icon};

 });

  
 nodesInserted.map(function(n,elem){debugger;
   var icon="";
   var node=elem.node;
   var range=elem.range;
   var place;
   var refNode;
   if (elem.node.attributes.data_wmwidget_foreignCloned_type.value=="complex"){
   	isAComplexWidget=true;
   }
   if(elem.node.attributes.data_wmwidget_type.textContent=="original_widgetized"){
     refNode=node;   	  	  	
   }else{
    range.insertNode(node); 
    place=node.nextElementSibling!=null?"before":"append";
    refNode=node.nextElementSibling!=null?node.nextElementSibling:node.parentNode;   	  	
   }

   var steps=node.getAttribute("data_wmwidget_steps");
   var type=node.getAttribute("data_wmwidget_type");
   type="hostBased"; //widgetized and original_widgetized
   var id=node.getAttribute("data_wmwidget_id");
   var title=node.getAttribute("title");
   var foreignClonedType=node.getAttribute("data_wmwidget_foreignCloned_type");
   if(foreignClonedType=="html"){
   	foreignClonedType="simpleCloned";
   }else if(foreignClonedType=="iframe"){
   	foreignClonedType="cropped";
   	complexInfoForeign=node.getAttribute("data-wmwidget-foreign");
   }
   else if(foreignClonedType=="linkimagebutton"){
   	foreignClonedType="linkimagebutton";
   }
   else if(foreignClonedType=="rawHTML"){
   	foreignClonedType="rawHTML";
   }
   else if(foreignClonedType=="false"){
   	foreignClonedType="hostBased";
   }
   else{//complex
   	foreignClonedType="complexCloned";
   	extractForms=node.getAttribute("data-wmwidget-extractfroms");
   	complexInfoForeign=node.getAttribute("data-wmwidget-foreign");
   }
	if(node.attributes.data_wmwidget_pattern!=undefined){
	   	  icon=node.attributes.data_wmwidget_pattern.textContent;
	   }
	else if(node.classList.contains("wm_wireIcon")){
   		icon="yes";
   }
   var anchoringPoint;
   var anchoringPointCoordinates=new Array();	
   var locationPoint;
   var locationPointCoordinates=new Array();
   var bindingPoint=null;
   var bindingPointCoordinates=new Array();
   
   if($(node).attr("data-wmwidget-foreign")!=undefined){
    	var a=$(node).attr("data-wmwidget-foreign");
    	var dataNode=JSON.parse(a);
    	if(dataNode.widgetType=="complex"){
    		var b=$(node).attr("data-wmwidget-extractfroms");
    		var dataNodeComplex={};
    		if(b!=undefined){
    			dataNodeComplex=JSON.parse(b);
    		}
    		
    		//bindingPointCoordinates.push(dataNodeComplex);
    		bindingPoint=[];
    		for(nodeComplex in dataNodeComplex){
    			var dataC=$("[data-wmwidget-nodeid="+dataNodeComplex[nodeComplex].id+"]",document)[0];
                var xpathComplex=minimizeXPath(generateXPath(dataC,document.documentElement,null,{showId:true}),document.documentElement).join("");
                var win=$(window);
                var windowSize={height: $(dataC).outerHeight(), width:$(dataC).outerWidth()};
	   			var start={x: $(dataC).offset().left, y:$(dataC).offset().top};
	   			var end={x: $(dataC).offset().left+$(dataC).outerWidth(), y:$(dataC).offset().top+$(dataC).outerHeight()};
	   			bindingPointCoordinates.push({_type: "pixelBased", windowSize:windowSize, start:start, end:end});
    			bindingPointCoordinates.push({_type: "structureBased", path:xpathComplex});
    			bindingPoint={parameterName:nodeComplex, coordinate:bindingPointCoordinates, regexp: dataNodeComplex[nodeComplex].regexp};
    		}
    	}
   }
   if(foreignClonedType=="linkimagebutton"){
   	    	var nodoPixelBasedInsert; 
		   	if(place=="before"){
		   		nodoPixelBasedInsert=$(elem.node).next();
		   	}else{
		   		nodoPixelBasedInsert=$(elem.node).prev();
		   	}
		   	if(elem.node.attributes.data_wmwidget_type.textContent!="widgetized"){
		   		node.parentNode.removeChild(node);
		   	}
		   	var html=elem.node.outerHTML;
		   	var d=new Date();
		   	var fecha={dia:d.getDate(), mes:d.getMonth(), ano:d.getFullYear(), hora:d.getHours()};
		  type="false"; //para links, imagenes y botones 
		   	var win=$(window);
		   	var windowSize={height: nodoPixelBasedInsert.outerHeight(), width:nodoPixelBasedInsert.outerWidth()};
			var start={x: nodoPixelBasedInsert.offset().left, y:nodoPixelBasedInsert.offset().top};
			var end={x: nodoPixelBasedInsert.offset().left+nodoPixelBasedInsert.outerWidth(), y:nodoPixelBasedInsert.offset().top+nodoPixelBasedInsert.outerHeight()};
		   	anchoringPointCoordinates.push({_type:"pixelBased", windowSize:windowSize, start:start, end:end});
		   	 var xpath=minimizeXPath(generateXPath(refNode,docElement,null,{showId:true}),docElement).join("");
			var nodoDomHash=document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
			var domHash=obj.getDomHash(nodoDomHash);
		   anchoringPointCoordinates.push({path:xpath, _type:"structureBased"});
		   anchoringPoint={place:place, domHash:domHash,coordinate:anchoringPointCoordinates};
		   locationPointCoordinates.push({_type: "pixelBased", windowSize:null, start:null, end:null});
	   		locationPointCoordinates.push({_type: "structureBased", path:null});
		   	locationPoint={url:null, coordinate:locationPointCoordinates};
		   	
		   	if(isSave){
		   		 var res={icon:icon,title:title,_type:type,_html:html,steps:steps,date:fecha, updateWhen: node.attributes.data_wmwidget_updateMoment.textContent,id:id, initialState: obj.widgetsInserted[id].estadoWidget, locationPoint:locationPoint, anchoringPoint:anchoringPoint, bindingPoint:bindingPoint};
   			}else{
		   		 var res={icon:icon,title:title,_type:type,_html:html,steps:steps,date:fecha, updateWhen: node.attributes.data_wmwidget_updateMoment.textContent,id:id, initialState: obj.widgetsInserted[id].estadoWidget, locationPoint:locationPoint, anchoringPoint:anchoringPoint, bindingPoint:bindingPoint};
   			}
		  
   }
   else{debugger;
   	var nodoDomHash=null;
   	var domHash=null;
   if(elem.node.attributes.data_wmwidget_type.textContent!="original_widgetized"){
   	//todos los widgets salvo el original tienen anchoring	
   	var nodoPixelBasedInsert; 
   	if(place=="before"){
   		nodoPixelBasedInsert=$(elem.node).next();
   	}else{
   		nodoPixelBasedInsert=$(elem.node).prev();
   	}
   	if(elem.node.attributes.data_wmwidget_type.textContent!="widgetized"){
   		node.parentNode.removeChild(node);
   		 var xpath=minimizeXPath(generateXPath(refNode,docElement,null,{showId:true}),docElement).join("");
   		anchoringPointCoordinates.push({path:xpath, _type:"structureBased"});
   		nodoDomHash=document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
		domHash=obj.getDomHash(nodoDomHash);
   	}
  
   	var win=$(window);
   	var windowSize={height: nodoPixelBasedInsert.outerHeight(), width:nodoPixelBasedInsert.outerWidth()};
	var start={x: nodoPixelBasedInsert.offset().left, y:nodoPixelBasedInsert.offset().top};
	var end={x: nodoPixelBasedInsert.offset().left+nodoPixelBasedInsert.outerWidth(), y:nodoPixelBasedInsert.offset().top+nodoPixelBasedInsert.outerHeight()};
   	anchoringPointCoordinates.push({_type:"pixelBased", windowSize:windowSize, start:start, end:end}); 
   	anchoringPoint={place:place, domHash:domHash,coordinate:anchoringPointCoordinates};
   }

   var xpath=minimizeXPath(generateXPath(refNode,docElement,null,{showId:true}),docElement).join("");
 //  anchoringPointCoordinates.push({path:xpath, _type:"structureBased"});
 //  anchoringPoint={place:place, coordinate:anchoringPointCoordinates};
   if($(node).attr("data-wmwidget-foreign")!=undefined){
   	if(dataNode.widgetType=="complex"){
   		var locationPointList= new Array();
   		for(var i=0; i<dataNode.widgets.length; i++){
   			var locationPointCoordinatesComplex=new Array();
   			var windowSize={height: dataNode.widgets[i].height, width:dataNode.widgets[i].width};
	   		var start={x: dataNode.widgets[i].left, y:dataNode.widgets[i].top};
	   		var end={x: dataNode.widgets[i].left+dataNode.widgets[i].width, y:dataNode.widgets[i].top+dataNode.widgets[i].height};
	   		locationPointCoordinatesComplex.push({_type: "pixelBased", windowSize:windowSize, start:start, end:end});
	   		locationPointCoordinatesComplex.push({_type: "structureBased", path:dataNode.widgets[i].xpath});
		   	locationPointList.push({url:dataNode.widgets[0].url, coordinate:locationPointCoordinatesComplex});
   		}
   		locationPoint=locationPointList;
   	}
   	else{
   		var windowSize={height: win.outerHeight(), width:win.outerWidth()};
   		var start={x: dataNode.left, y:dataNode.top};
   		var end={x: dataNode.left+dataNode.width, y:dataNode.top+dataNode.height};
	   	locationPointCoordinates.push({_type: "pixelBased", windowSize:windowSize, start:start, end:end});
	   	locationPointCoordinates.push({_type: "structureBased", path:dataNode.xpath});
	   	locationPoint={url:dataNode.url, coordinate:locationPointCoordinates};
   	}
   	var d=new Date();
   	var fecha={dia:d.getDate(), mes:d.getMonth(), ano:d.getFullYear(), hora:d.getHours()};
   	if(isSave){
   		var res={complexInfoForeign:complexInfoForeign,extractForms:extractForms,steps:steps,title:title,icon:icon,_type:foreignClonedType,id:id, updateWhen: node.attributes.data_wmwidget_updateMoment.textContent, initialState: obj.widgetsInserted[id].estadoWidget, _html:"", locationPoint:locationPoint, anchoringPoint:anchoringPoint, bindingPoint:bindingPoint};
   	}else{
   		var res={complexInfoForeign:complexInfoForeign,extractForms:extractForms,steps:steps,icon:icon,_type:foreignClonedType,date:fecha,updateWhen: node.attributes.data_wmwidget_updateMoment.textContent,id:id, initialState: obj.widgetsInserted[id].estadoWidget, _html:"", locationPoint:locationPoint, anchoringPoint:anchoringPoint, bindingPoint:bindingPoint};
   	}
   	 }
   else{
   	 var htmlNode="";
   	//widgetized, todos los original tienen locationPoint. El binding se pone despues
   	if(elem.node.attributes.data_wmwidget_type.textContent=="original_widgetized"){
   		elem.node.attributes.data_wmwidget_type.textContent="widgetizedado";
   		var identificadorAux=elem.node.attributes.data_wmwidget_id.textContent;
   		$(elem.node).removeAttr("data_wmwidget_id");
   			var locationPointwidgetized=new Array();
   			var win=$(window);
	   		var start={x: $(elem.node).offset().left, y:$(elem.node).offset().top};
	   		var end={x: $(elem.node).offset().left+$(elem.node).outerWidth(), y:$(elem.node).offset().top+$(elem.node).outerHeight()};
	   		var windowSize={height: $(elem.node).outerHeight(), width:$(elem.node).outerWidth()};
   			locationPointwidgetized.push({_type: "pixelBased", windowSize:windowSize, start:start, end:end});
		   	locationPointwidgetized.push({_type:"structureBased", path:xpath});
		   	locationPoint={url:document.URL, coordinate:locationPointwidgetized};
		   	var xpath=minimizeXPath(generateXPath(refNode,docElement,null,{showId:true}),docElement).join("");
			var nodoDomHash=document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
			var domHash=obj.getDomHash(nodoDomHash);
		   	anchoringPoint={place:"", domHash: domHash,coordinate:locationPointwidgetized};
		   	$(elem.node).attr("data_wmwidget_id", ""+identificadorAux);
		   	elem.node.attributes.data_wmwidget_type.textContent="original_widgetized";
   	}else{
   			var anchoringPointwidgetized=new Array();
   			var nodoPixelBasedInsert;
		   	if(place=="before"){
		   		nodoPixelBasedInsert=$(elem.node).next();
		   	}else{
		   		nodoPixelBasedInsert=$(elem.node).prev();
		   	}
		   	node.parentNode.removeChild(node);
		   	 var xpath=minimizeXPath(generateXPath(refNode,docElement,null,{showId:true}),docElement).join("");
  			// anchoringPointCoordinates.push({path:xpath, _type:"structureBased"});
   			var windowSize={height: nodoPixelBasedInsert.outerHeight(), width:nodoPixelBasedInsert.outerWidth()};
			var start={x: nodoPixelBasedInsert.offset().left, y:nodoPixelBasedInsert.offset().top};
			var end={x: nodoPixelBasedInsert.offset().left+nodoPixelBasedInsert.outerWidth(), y:nodoPixelBasedInsert.offset().top+nodoPixelBasedInsert.outerHeight()};
		   	anchoringPointwidgetized.push({_type:"pixelBased", windowSize:windowSize, start:start, end:end}); 
		   	anchoringPointwidgetized.push({_type:"structureBased", path:xpath});
   			locationPoint={url:"", coordinate:""};
   			nodoDomHash=document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
			domHash=obj.getDomHash(nodoDomHash);
		   	anchoringPoint={place:place, domHash:domHash,coordinate:anchoringPointwidgetized};
		   	if(elem.node.attributes.data_wmwidget_widgetized_updated!=undefined){
		   		htmlNode=elem.node.outerHTML;
		   	}
   	}
   //	$('.wm_selected').attr("data_wmwidget_widgetized_updated", "true");
  
    var d=new Date();
   	var fecha={dia:d.getDate(), mes:d.getMonth(), ano:d.getFullYear(), hora:d.getHours()};
   	if(isSave){
   		var res={title:title,icon:icon,_type:type,id:id, steps:steps,updateWhen: node.attributes.data_wmwidget_updateMoment.textContent,initialState: obj.widgetsInserted[id].estadoWidget, _html:htmlNode, locationPoint:locationPoint, anchoringPoint:anchoringPoint, bindingPoint:bindingPoint};
   	}else{
   		var res={icon:icon,_type:type,date:fecha, steps:steps,updateWhen: node.attributes.data_wmwidget_updateMoment.textContent,id:id, initialState: obj.widgetsInserted[id].estadoWidget, _html:htmlNode, locationPoint:locationPoint, anchoringPoint:anchoringPoint, bindingPoint:bindingPoint};
   	}
   	}
  // console.log("GetAnchor inserted: "+id+" "+type+" "+ place+" "+xpath+" "+node.outerHTML);
   if(node.getAttribute("data_wmwidget_type")=="cloned"||(type=="widgetized"&&node.getAttribute("data_wmwidget_widgetized_updated")=="true")){
    res.html=node.outerHTML;
   }else if(node.getAttribute("data_wmwidget_type")=="foreignCloned"){
    var extra=JSON.parse(node.getAttribute("data-wmwidget-foreign"));
    if(node.getAttribute("data_wmwidget_foreignCloned_type")=="html"){
      var child=$(node.shadowRoot.children);
      var d=child.first().detach();
      extra.html=node.shadowRoot.innerHTML;
      node.shadowRoot.insertBefore(d[0],node.shadowRoot.firstElementChild);
    }else if(node.getAttribute("data_wmwidget_foreignCloned_type")=="complex"){
      var ind=0;
      $(node.shadowRoot.children).map(function(i,div){if(div.className=="widgetContainer"){extra.widgets[ind].html=div.innerHTML;ind++;}});
      var extracts=node.getAttribute("data-wmwidget-extractfroms");
      if(extracts!=null){
          extracts=JSON.parse(extracts);
          extra.extracts=extracts;
           for(elem in extracts){
         // for(var i=0;i<extracts.length;i++){
              //var act=extracts[i];
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
    }
  //  res.extra=extra;
  if(extra){
    if(extra.widgetType=="complex"){
    	res._html=extra.widgets;
    }else{
    	res._html=extra.html;
    }
    }
    if(res.bindingPoint!=null){
    	res.bindingPoint.extracts=extra;
    }
   }   

   if(node.getAttribute("data_wmwidget_type")=="widgetized"){
   	   widgetized[res.id]=res;
   }else if(node.getAttribute("data_wmwidget_type")=="original_widgetized"){
   	   originalWidgetized.push(res);
   }else{
   	   xpathsInserted.push(res);
   }
   
  
 });
 
  originalWidgetized.each(function(n,elem){
    var w=widgetized[elem.id];
  	if(w!=undefined){
  		elem.anchoringPoint=w.anchoringPoint;
  		elem.icon=w.icon;
  		elem._html=w._html;//si hay cambios en el widget es distinto
  	}
    xpathsInserted.push(elem);
  	   
  }); 
 
 /*var nodesExisting=$("[data_wmwidget_type='original_widgetized']").map(function(n,node){
 	var icon="";
   var id=node.getAttribute("data_wmwidget_id");
   var type=node.getAttribute("data_wmwidget_type");
   var title=node.getAttribute("title");
   var foreignClonedType=node.getAttribute("data_wmwidget_foreignCloned_type");
   var xpath=minimizeXPath(generateXPath(node,docElement,null,{showId:true}),docElement).join("");
    if(node.attributes.data_wmwidget_pattern!=undefined){
	   	  icon=node.attributes.data_wmwidget_pattern.textContent;
	   }
	else if(node.classList.contains("wm_wireIcon")){
   		icon="yes";
   }
   console.log("GetAnchor Existing: "+id+" "+type+" "+xpath+" "+node.outerHTML);
   return {_type:type,icon:icon,xpath:xpath,id:id, title:title, foreignClonedType:foreignClonedType};
 });*/
 $(nodesInserted.toArray().reverse()).map(function(n,elem){
  if(elem.node.attributes.data_wmwidget_type.textContent!="original_widgetized"){	
  	elem.range.insertNode(elem.node);
  }
 });
 var listaBlinkEntera={blinks:blinks, conditionList:conditionList};
 return {widgetList:xpathsInserted, blinkList:listaBlinkEntera, isAComplexWidget:isAComplexWidget};
};

Canvasmodel.prototype.resolveLinkCSS=function (link,callback){
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

Canvasmodel.prototype.crearForeignCloneIframe=function(locationPoint){
    var res;
    var defClone=locationPoint.coordinate[0];
    res=$("<div>").css({width:defClone.end.x-defClone.start.x,height:defClone.end.y-defClone.start.y,overflow:"hidden"});
     //Pongo un numero grande para q se vea siempre
  //  var iframe=$("<iframe>").attr({src:locationPoint.url,scrolling:"no"}).css({width:defClone.windowSize.width,height:defClone.windowSize.height,top:-1*defClone.start.y,left:-1*defClone.start.x,border:"0px",overflow:"hidden",position:"relative"});
    var iframe=$("<iframe>").attr({src:locationPoint.url,scrolling:"no"}).css({width:defClone.windowSize.width,height:10000,top:-1*defClone.start.y,left:-1*defClone.start.x,border:"0px",overflow:"hidden",position:"relative"});
    res.append(iframe);
    res.attr("data-wmwidget-foreign",JSON.stringify(defClone));
    return res;
};

Canvasmodel.prototype.crearForeignCloneHtmlComplex=function(elemento){
	 var res;
	 var idI=0;
	if(elemento._type=="complexCloned"){
	 	var defClone=elemento.locationPoint[0].coordinate[0];
     }else{
	 	var defClone=elemento.locationPoint.coordinate[0]; 
	 }
	 var html=elemento._type=="simpleCloned"?elemento._html:$.map(elemento._html,function(elem){return "<div id='ComplexWidget"+(idI++)+"' class='widgetContainer'>"+elem.html+"</div>";}).join("\n");// elemento._html lista de widgets en el complejo
	// if(widgetInfo!=null){
	//		for(var i=0; i<widgetInfo.length; i++){
	//			if(elemento.id==widgetInfo[i].id){
					if(elemento._type=="complexCloned"){
						html="";
						for(var j=0; j<elemento._html.length; j++){
							html=html+"<div id='ComplexWidget"+j+"' class='widgetContainer'>"+elemento._html[j].html+"</div>";
						}
					}else{
						html=elemento._html;
					}	
	//			}
	//		}
	//	}

        res=$("<div>").css({overflow:"auto", display: "inline-block"});
        var shadow=res[0].createShadowRoot();
        shadow.applyAuthorStyles = false;
        shadow.resetStyleInheritance = true;
        shadow.innerHTML="<style type='text/css'>\n.widgetContainer { position:relative; }\n.widgetContainer>*{ position:static !important; }\n</style>"+html;
        var objToDOM={};
        $.extend(true,objToDOM,defClone);
        defClone.widgetType=="simpleCloned"? delete objToDOM.html:$(objToDOM.widgets).map(function(i,wid){delete wid.html;});
        res.attr("data-wmwidget-foreign",JSON.stringify(objToDOM));
     return res;
};

Canvasmodel.prototype.getAnchoringXpath=function(elem){
	var xpath;
	for(var i=0; i<elem.anchoringPoint.coordinate.length; i++){
		if(elem.anchoringPoint.coordinate[i]._type=="structureBased"){
			xpath=elem.anchoringPoint.coordinate[i].path;
		}
	}
	return xpath;
};

Canvasmodel.prototype.getLocationXpath=function(elem){
	var xpath;
	if(elem._type!="complexCloned"){	
		for(var i=0; i<elem.locationPoint.coordinate.length; i++){
			if(elem.locationPoint.coordinate[i]._type=="structureBased"){
				xpath=elem.locationPoint.coordinate[i].path;
			}
		}
	}else{
		for(var i=0; i<elem.locationPoint.length; i++){
			for(var j=0; j<elem.locationPoint[i].coordinate.length; j++){
				if(elem.locationPoint[i].coordinate[j]._type=="structureBased"){
					xpath=elem.locationPoint[i].coordinate[j].path;
				}
			}
		}
	}
	return xpath;
};

Canvasmodel.prototype.getAnchoringPixelBased=function(elem){
	var start, end, size;
	for(var i=0; i<elem.anchoringPoint.coordinate.length; i++){
		if(elem.anchoringPoint.coordinate[i]._type=="pixelBased"){
			start=elem.anchoringPoint.coordinate[i].start;
			end=elem.anchoringPoint.coordinate[i].end;
			size=elem.anchoringPoint.coordinate[i].windowSize;
		}
	}
	var doc = document.documentElement, body = document.body;
	var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
	var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
	var nodoEnPunto=document.elementFromPoint(Math.abs(left-(start.x+(end.x-start.x)/2)), Math.abs(top-(start.y+(end.y-start.y)/2)));
	var nodo=$(nodoEnPunto);
	if(nodoEnPunto!=null){
		var width=nodo.outerWidth();
		var height=nodo.outerHeight();
		while((width<size.width || height<size.height) && (width!=null && height!=null)){
			nodo=nodo.parent();
			width=nodo.outerWidth();
			height=nodo.outerHeight();
		}
	}
	if(width==size.width && height==size.height){
		return nodo[0];
	}else{
		return null;
	}
};

Canvasmodel.prototype.getLocationPixelBased=function(elem, documento){
	var start, end, size;
	if(elem._type=="false"){
		return null;
	}else{
		if(elem._type=="complexCloned"){
			for(var i=0; i<elem.locationPoint[1].coordinate.length; i++){
			if(elem.locationPoint[1].coordinate[i]._type=="pixelBased"){
				start=elem.locationPoint[1].coordinate[i].start;
				end=elem.locationPoint[1].coordinate[i].end;
				size=elem.locationPoint[1].coordinate[i].windowSize;
			}
		}
		}else{
		for(var i=0; i<elem.locationPoint.coordinate.length; i++){
			if(elem.locationPoint.coordinate[i]._type=="pixelBased"){
				start=elem.locationPoint.coordinate[i].start;
				end=elem.locationPoint.coordinate[i].end;
				size=elem.locationPoint.coordinate[i].windowSize;
			}
		}
		}
		var doc = documento.documentElement, body = documento.body;
		var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
		var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);;
		var nodoEnPunto=documento.elementFromPoint(Math.abs(left-(start.x+(end.x-start.x)/2)), Math.abs(top-(start.y+(end.y-start.y)/2)));
		var nodo=$(nodoEnPunto);
		if(nodoEnPunto!=null){
			var width=nodo.outerWidth();
			var height=nodo.outerHeight();
			while((width<size.width || height<size.height) && (width!=null && height!=null)){
				nodo=nodo.parent();
				width=nodo.outerWidth();
				height=nodo.outerHeight();
			}
		}
		return nodo[0];
	}
};

Canvasmodel.prototype.recolocarWidgetsParaSuReinsercion=function(configOfInserted){
	var listaHostBased= new Array();
		var punteroHost=0;
		var listaDemas= new Array();
		var punteroDemas=0;
	for (var t=0; t<configOfInserted.length; t++){
		if(configOfInserted[t]._type=="hostBased"){
			listaHostBased[punteroHost]=configOfInserted[t];
			punteroHost++;
		}else{
			listaDemas[punteroDemas]=configOfInserted[t];
			punteroDemas++;
		}
	}
		
	var listaAuxiliar= new Array();
	var puntero=0;
	var punteroConfig=listaHostBased.length-1;
	
	while(listaHostBased.length>puntero){
		listaAuxiliar[puntero]=listaHostBased[punteroConfig];
		puntero++;
		punteroConfig--;
	}
	//ojo el orden de esta lista si los widgets no se insertan en el orden correcto
	var devolver=listaAuxiliar.concat(listaDemas);
	return devolver;
};

Canvasmodel.prototype.getDomHash = function(element) {
        var nodeType = element.nodeType, nodeName = element.nodeName, hash = '';
        if (nodeType === 3 || nodeType === 4) {
            return '#';
        } else if (nodeType === 1 || nodeType === 9) {
            hash += '<' + nodeName + '>';
            for (element = element.firstChild; element; element = element.nextSibling) {
                hash += this.getDomHash(element);
            }
            hash +=
            '</' + nodeName + '>';
            hash = hash.replace(/##+/g, '#');
        }
        return hash;
    }; 

Canvasmodel.prototype.putNodesAnchors=function(config){debugger;
	var obj=this;
 var docElement=document.documentElement;
// var configOfExisting=$(config.recover);
 var configOfInserted=$(config.widgetList);
 var configOfBlinks=$(config.blinkList.blinks);
 conditionList=config.blinkList.conditionList;
 var tempConfigForHtml={};
 var objeto=this;
 /*configOfExisting.map(function(n,elem){
   var node=document.evaluate(elem.xpath, docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
   if(node!=null){
	   node.setAttribute("data_wmwidget_type",elem._type);
	   node.setAttribute("data_wmwidget_id",elem.id);
	   node.setAttribute("data_wmwidget_foreignCloned_type",elem.foreignClonedType);
	   node.setAttribute("title",elem.title);
	   elem.node=node;
	   tempConfigForHtml[elem.id]=elem.node;
	   console.log("Anchoring existing: "+elem.type+" "+elem.xpath+" "+node.outerHTML);
   }
 });*/

 var listaAux=new Array();
 var puntero=0;
 listaAux=configOfInserted;
/* for (var g=configOfInserted.length-1; g>-1; g--){
 	listaAux[puntero]=configOfInserted[g];
 	puntero++;
 }*/


 configOfInserted=objeto.recolocarWidgetsParaSuReinsercion(listaAux);
 
 configOfInserted.map(function(elem,n){
	if(elem.anchoringPoint.coordinate==""){debugger;
	 	elem.node="";
	 	var node2=document.evaluate(objeto.getLocationXpath(elem), docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
	 	if(node2==null){
 			node2=objeto.getLocationPixelBased(elem, document);
 		}
	   elem.node2=node2;
	 }else{
	   var node=document.evaluate(objeto.getAnchoringXpath(elem), docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
	//   if($(elem._html)[0].attributes.data_wmwidget_widgetized_updated.textContent=="true" && elem._type=="hostBased"){
	//   		var node2=$(elem._html)[0];
	//   }else{
	   		var node2=document.evaluate(objeto.getLocationXpath(elem), docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
	//   }

	   if(node==null){
	   	node=objeto.getAnchoringPixelBased(elem);
	   }
	   if(node2==null){
	   	node2=objeto.getLocationPixelBased(elem, document);
	   }
	   elem.node2=node2;
	   elem.node=node;
 //  if(elem._type=="foreignCloned"&&elem.extra.widgetType=="complex"){
 //  	if(elem._type=="complex"&&elem.extra.widgetType=="complex"){
 if(elem._type=="complexCloned"){
  	if(elem.bindingPoint.extracts!=undefined){
       var extracts=elem.bindingPoint.extracts.extracts;
       if(extracts!=null){
          for(extract in extracts){
              var act=extracts[extract];
              var xpaths=act.xpaths;
              var xpath=xpaths[0];
            //  var xpath=act;
              var node;
              var refDoc=document;
              if(extracts.length==2){
                node=refDoc.evaluate(xpath, refDoc.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
                node.setAttribute("data-wmwidget-iframe",act.iframe);
                refDoc=node.contentDocument;
                xpath=xpaths[1];
              }
              node=refDoc.evaluate(xpath, refDoc.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
              var nodeValue="";
			  if(node!=null){
			  	node.setAttribute("data-wmwidget-nodeid",act.id);
			   if(elem.initialState=="visible"){
			   	node.setAttribute("data-wmwidget-deselected", "false");
			   	node.setAttribute("display", "block");
			   }else{
			   	node.setAttribute("data-wmwidget-deselected", "true");
			   	node.setAttribute("display", "none");
			   } 			  	
				nodeValue=node.textContent.replace(/(\n| )+/g," ").trim();
			  }
              extracts[extract].node=nodeValue; 
          } 
       }
   }
  }
   }
 });

 configOfInserted.map(function(elem,n){debugger;
   var node=elem.node;
   var html;
   var html2;
   if(elem._type=="hostBased"){
    html=$(elem.node2.outerHTML);//location
    elem.node2.setAttribute("data_wmwidget_type","original_widgetized");
    elem.node2.setAttribute('style', 'display:none !important');
    elem.node2.setAttribute("data_wmwidget_original_widgetized",elem.id);
    elem.node2.setAttribute("data_wmwidget_id",elem.id);
    elem.node2.setAttribute("data_wmwidget_foreignCloned_type","false");
    elem.node2.setAttribute("title",elem.title);
    elem.node2.setAttribute("data_wmwidget_updateMoment",elem.updateWhen);
   }/*else if(elem._type=="cloned"){
    html=$(elem.html);       
   }*/else if(elem._type=="cropped"){
    html=objeto.crearForeignCloneIframe(elem.locationPoint);
    }else if(elem._type=="rawHTML"){
    	html=$(elem._html);
    }else if(elem._type=="simpleCloned" || elem._type=="complexCloned"){
    	html=objeto.crearForeignCloneHtmlComplex(elem);
	    if(elem._type=="complexCloned"){
	      objeto.addFunctionalityToComplex(html[0],elem);
    }
   }else if(elem._type=="false"){
   	html=$(elem._html);
   }
   if(node!=""){
 //  	if(objeto.getDomHash(node)==elem.anchoringPoint.domHash){
   	if(elem._type=="hostBased" && elem._html!=""){
	  	 if($(elem._html)[0].attributes.data_wmwidget_widgetized_updated.textContent=="true"){
		   		var html=$(elem._html);
		  }
	  }
	   if(elem.anchoringPoint.place=="before"){
	    node.parentNode.insertBefore(html[0],node);
	   }else if(elem.anchoringPoint.place=="append"){
	    node.appendChild(html[0]);
	   }
	   if(elem.icono=="plus"){
	   	 html[0].setAttribute("data_wmwidget_pattern","plus");
	   }else if(elem.icon=="minus"){
	   	 html[0].setAttribute("data_wmwidget_pattern","minus");
	   }else if(elem.icon=="both"){
	   	 html[0].setAttribute("data_wmwidget_pattern","both");
	   	}else if(elem.icon=="yes"){
			html[0].classList.add("wm_wireIcon");
		}
	   if(elem._type=="hostBased"){
		html[0].setAttribute("data_wmwidget_type","widgetized");
		}else{
			if(elem._type=="false"){//para botones, links e imagenes
				html[0].setAttribute("data_wmwidget_type","cloned");
			}else if(elem._type=="simpleCloned" || elem._type=="cropped" || elem._type=="complexCloned"){
				html[0].setAttribute("data_wmwidget_type","foreignCloned");
				if(elem._type=="complexCloned"){
					html[0].setAttribute("data-wmwidget-extractfroms",elem.extractForms);
					html[0].setAttribute("data-wmwidget-foreign",elem.complexInfoForeign);
				}
				if(elem._type=="cropped"){
					html[0].setAttribute("data-wmwidget-foreign",elem.complexInfoForeign);
					if(elem.steps!="null"){
					 	html[0].children[0].addEventListener('load', function(){
					 		objeto.recolocarCropped(elem.locationPoint.url, JSON.parse(elem.steps), elem.id);
					 	});	
					 }
				}
			}
			else{
				html[0].setAttribute("data_wmwidget_type",elem._type);
			}
		}
	 var foreignClonedType;
if(elem._type=="simpleCloned"){
   	foreignClonedType="html";
   }else if(elem._type=="cropped"){
   	foreignClonedType="iframe";
   }else if(elem._type=="complexCloned"){//
   	foreignClonedType="complex";
   }else if(elem._type=="rawHTML"){
   	foreignClonedType="rawHTML";
   }else if(elem._type=="false"){
   	foreignClonedType="linkimagebutton";
   }else{
   	foreignClonedType="widgetized";
   }
   
   	   html[0].setAttribute("data_wmwidget_steps",elem.steps);
	   html[0].setAttribute("data_wmwidget_id",elem.id);
	   html[0].setAttribute("data_wmwidget_updateMoment",elem.updateWhen);
	   html[0].setAttribute("draggable",true);
	   html.addClass('resizable');
	   html[0].setAttribute("data_wmwidget_foreignCloned_type",foreignClonedType);
	   html[0].setAttribute("title",elem.title);
	    if(elem.initialState=="visible"){
				   	 html[0].setAttribute("data-wmwidget-deselected", "false");
				   	 html[0].setAttribute("data_wmwidget_state", "visible");
				  // 	 html[0].style.display= "block";
				   }else{
				   	 html[0].setAttribute("data-wmwidget-deselected", "true");
				   	 html[0].setAttribute("data_wmwidget_state", "collapse");
				  // 	 html[0].style.display= "none";
				   } 			  	
	   elem.node=html[0];
 //  }
   }debugger;
   obj.recolarJavascript();
   obj.eliminarEventos();
   obj.artivarEventos();
   console.log("Anchoring inserting: "+elem.place+" "+elem.xpath+" "+node.outerHTML);
 });debugger;
	this.eliminarEventos();
	this.artivarEventos();
};

Canvasmodel.prototype.recolarJavascript=function(){debugger;
	var javascriptTextoWidget="";
	for(var i=0; i<$("[data_wmwidget_categoria=rawhtml]").length; i++){
		var turno=$("[data_wmwidget_categoria=rawhtml]")[i];
		for(var k=0; k<turno.children.length; k++){
			if(turno.children[k].tagName=="SCRIPT"){
				javascriptTextoWidget=turno.children[k].textContent;
				turno.children[k].remove();
				var javaScript = document.createElement("script");
				javaScript.async = false;
				javaScript.innerHTML=javascriptTextoWidget;
				$(".wm_selected").append(javaScript);
			}
		}
	}
};

/*Go through an String from last position to first. When found a no numeric character it return went through number*/
/*
* @ Object: "elem123"
* @ Returns: "123"
*
* @ Object: "elem1-234"
* @ Returns: "234
* */
String.prototype.getWidgetIdentifier = function(){
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
};

Canvasmodel.prototype.getProjectName=function(f){
	var obj=this;
				var dialog=$("<div id='wm_dialog2'></div>");
			  $(document.body).append(dialog);
		   	  dialog.load(chrome.extension.getURL("parts/projectName.html"),function(){
			  dialog.dialog({
			      resizable: false,
			      modal: true,
			      close: function( event, ui ){
			      	dialog.remove();
			        	obj.eliminarEventos();
			            obj.artivarEventos();
			            var nada="";
			            f(nada);
			      },
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
				        obj.eliminarEventos();
			            obj.artivarEventos();
			            f(projectName);
					  }
			        },
			        Cancel: function() {
			        	dialog.remove();
			        	obj.eliminarEventos();
			            obj.artivarEventos();
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
						        obj.eliminarEventos();
					            obj.artivarEventos();
					            f(projectName);
							  }
						}
					});
});
};

Canvasmodel.prototype.addListeners=function (){
	var obj=this;
	//$(document).on("click",function(ev){obj.onClick(ev);});
	//$(document).on("mouseover",this.mouseOverWidgetizar);	
	//$(document).on("mouseout",this.mouseOutWidgetizar);		
	$(document).on("keydown",function(ev){obj.onKeyDown(ev);});
	$(document).on("keyup",function(ev){obj.onKeyUp(ev);});
};

Canvasmodel.prototype.onKeyDown=function(ev){
	if(ev.keyCode==18){
		$("#extruderRight").openMbExtruder();
		this.despintarElementos();
	//	this.removePatternNumbers();
	//	this.numbers=1;
		}
};

Canvasmodel.prototype.onKeyUp=function(ev){
	if(ev.keyCode==18){
		this.removePatternNumbers();
		this.numbers=1;
		$("#extruderRight").closeMbExtruder();}
};

Canvasmodel.prototype.removePatternNumbers=function(){
	$("[data_wmwidget_pattern_number]").removeAttr("data_wmwidget_pattern_number");
	$("[wmpattern_panel]").remove();
};

Canvasmodel.prototype.despintarElementos=function(){
	$(".wm_background").removeClass("wm_background");
};

Canvasmodel.prototype.onClick=function (ev){
	if(ev.altKey){
		var w=getWidget($(ev.target));
		if(w!=null){
			var num=w.attr("data_wmwidget_pattern_number");
			if(num==null){
				this.addNumber(w,this.numbers);
				numbers++;
			}else{
				this.renumberFrom(num);				
				this.numbers--;
			}
		}		
	}
};

Canvasmodel.prototype.addNumber=function(elem,num){
	elem.attr("data_wmwidget_pattern_number",num);
	var div=$("<div></div>").css({"position":"absolute","top":0,"left":0,"z-index":500000,"background-color":"blue","opacity":"0.8","color":"white","height":"100%","width":"100%","text-align":"center","display":"block"}).attr("wmpattern_panel","true");
	var table=$("<span></span>").css({"display":"table","height":"100%","width":"100%"});
	var cell=$("<span></span>").css({"display":"table-cell","vertical-align":"middle","font-weight": "bold","font-size": "25px"}).text(num);
	table.append(cell);
	div.append(table);
	elem.append(div);
};

Canvasmodel.prototype.renumberFrom=function(num){
	var obj=this;
	$("[data_wmwidget_pattern_number]").each(function(index,value){
		var w=$(value);
		var actNum=w.attr("data_wmwidget_pattern_number");
		if(actNum==num||actNum>num){
			w.removeAttr("data_wmwidget_pattern_number");
			w.find("[wmpattern_panel]").remove();
		 	if(actNum>num){
				obj.addNumber(w,actNum-1);
			}
		}	
	});
};

/*Canvasmodel.prototype.mouseOverWidgetizar=function(eve){
	if(!eve.altKey){
		console.log("widgetizar mouseoverDocument");
		eve.preventDefault();
		eve.stopPropagation();   
		if(this.getWidget($(eve.target))==null&&this.isInWidget($(eve.target))==null){
			elem=$(eve.target);
			elem.addClass("wm_background");
		}
	}
};

Canvasmodel.prototype.mouseOutWidgetizar=function(eve){
		console.log("widgetizar mouseleaveDocument");
		eve.preventDefault();
		eve.stopPropagation();
		if( $(eve.target).hasClass("wm_background")){	
			this.despintarElementos();
		}	
};

Canvasmodel.prototype.isInWidget=function(elem){
	return elem.find("[data_wmwidget_id]")[0];
};*/

Canvasmodel.prototype.getWidget=function(elem){
	var res=elem.attr("data_wmwidget_id")?elem:null;
	if(res==null){
		var parents=elem.parents("[data_wmwidget_id]");
		if(parents.length>0){
			res=$(elem.parents("[data_wmwidget_id]")[0]);
		}
	}
	return res;
};

