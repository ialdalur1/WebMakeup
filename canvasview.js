//@ sourceURL=canvasview.js

var canvasmodel;

Canvasview=function(canvasmodelo){
	canvasmodel=canvasmodelo;
	this.ponerXenwidget();
//	this.incluirSparks();
	//this.emitte = new Jvent();
	//this.emitte.addListener('ponerXenwidget', this.ponerXenwidget); 
};

Canvasview.prototype.ponerXenwidget=function (){
	var obj=this;
	$('[data_wmwidget_id]').hover(
		function(e) {
			 obj.ponerXenwidgetBis(e);
		},
		function(e) {
			 obj.parpadeoSalir(e);
		});

	$('.wm_closeVentana').hover(function(e) {
    	obj.parpadeoEntrar(e);
    },
    function(e){
    	 obj.parpadeoSalir(e);
    });
};

Canvasview.prototype.parpadeoSalir=function(e){
	$(document).find('.wm_close').fadeOut(0);
	$(document).find('.wm_select').fadeOut(0);
	//$(document).find('.wm_deselect').delay(0).fadeOut(0);
	$(document).find('.wm_hide').fadeOut(0);
	$(document).find('.wm_undo').fadeOut(0);
	$(document).find('.wm_download').fadeOut(0);
	$(document).find('.wm_ventana').fadeOut(0);
};

Canvasview.prototype.parpadeoEntrar=function(e){
	$(document).find('.wm_close').fadeIn(0);
	$(document).find('.wm_select').fadeIn(0);
	//$(document).find('.wm_deselect').delay(0).fadeIn(0);
	$(document).find('.wm_hide').fadeIn(0);
	$(document).find('.wm_undo').fadeIn(0);
	$(document).find('.wm_download').fadeIn(0);
	$(document).find('.wm_ventana').fadeIn(0);
};

Canvasview.prototype.ponerXenwidgetBis=function (e){
	//if (CanvasConstraints.getSparks()==null){
				        		console.log("link hover in");
				        		var elementoHover=$(e.target);
				        		$('[class*=wm_selected]').removeClass("wm_selected");
				        		elementoHover.closest("[data_wmwidget_id]").addClass("wm_selected");
				        		var widget=canvasmodel.extraerPoswidget();

				        		//HAY Q SABER EN QUE ESTADO ESTA EL DTE. AKI PONGO CERO XQ SOLO HAY ESTADO INICIAL
				        		//var estadoWidget;//=widgetsInserted[widget].estados[0].estadoWidget;
				        		//var currentState=CanvasConstraints.getCurrentState();
				        		/*for(var i=0; i<currentState.length; i++){
				        			if (currentState[i].widget==canvasmodel.widgetsInserted[widget].type){
				        				estadoWidget=currentState[i].action;
				        			}
				        		}*/
				        		 if(elementoHover.closest("[data_wmwidget_id]").hasClass("wm_selected")){
				        		 	$('.wm_close').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
				        		 	$('.wm_close').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20);
				        		 	if($(".wm_selected")[0].attributes.data_wmwidget_state.textContent=="collapse"){
				        		 		$('.wm_hide').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
				        		 		$('.wm_hide').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+10);
				        		 		$('.wm_select').css('top', -1000); 
										$('.wm_select').css('left', -1000);
				        		 	}else{
				        		 		$('.wm_select').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
				        		 		$('.wm_select').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+10);
				        		 		$('.wm_hide').css('top', -1000); 
										$('.wm_hide').css('left', -1000);
				        		 	}
				        		 	if(elementoHover.closest("[data_wmwidget_id]")[0].attributes.data_wmwidget_categoria!=null){
					        		 	if(elementoHover.closest("[data_wmwidget_id]")[0].attributes.data_wmwidget_categoria.textContent=="rawhtml"){
					        		 		$('.wm_download').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20);
					        		 		$('.wm_download').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+20);
					        		 	}
				        		 	}else{
				        		 		$('.wm_download').css('top', -1000);
					        		 	$('.wm_download').css('left', -1000);
				        		 	}
				        		 	//$('.wm_deselect').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
				        		 	//$('.wm_deselect').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+10);
				        		 	//$('.wm_hide').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
				        		 	//$('.wm_hide').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+15);
				        		 	if(elementoHover.closest("[data_wmwidget_id]")[0].attributes.data_wmwidget_type!=undefined){//Los link, image y button q estan dentro de un div, dan error
					        		 	if(elementoHover.closest("[data_wmwidget_id]")[0].attributes.data_wmwidget_type.textContent=="widgetized"){				        		 	 
						        		 	$('.wm_undo').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-20); 
						        		 	$('.wm_undo').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+20);
						        		 	$('.wm_ventana').css('top', elementoHover.closest("[data_wmwidget_id]").offset().top-10); 
						        			$('.wm_ventana').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+$(".w_close").width()+30);
						        			if(($(".wm_close").width()*5)<$(".wm_selected").width()){
						        				$('.wm_ventana').css('width', $(".wm_selected").width()-($(".wm_close").width()*3));
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
						        			$('.wm_ventana').css('left', elementoHover.closest("[data_wmwidget_id]").offset().left-20+$(".w_close").width()+$(".w_close").width()+20);
						        			if(($(".wm_close").width()*4)<$(".wm_selected").width()){
						        				$('.wm_ventana').css('width', $(".wm_selected").width()-($(".wm_close").width()*2)+10);
						        				if($('.wm_ventana').width()<70){
						        					$('.wm_ventana').css('width', 70);
						        				}
						        			}else{
						        				$('.wm_ventana').css('width', 70);
						        			}
						        			$('.wm_ventana')[0].innerHTML="MOVE "+$('.wm_selected')[0].title;
						        		 }
					        		 }
				        		/* 	console.log(elementoHover.position() );
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
				        		 	}*/
						        		this.parpadeoEntrar(e);
				        		 }
				        //		 } 
};

/*Canvasview.prototype.incluirSparks=function (){
	var obj=this;
	$('[data_wmwidget_id]').hover(
		function(e) {
			obj.incluirSparksBis(e);
		},
		function(e) {
			obj.parpadeoSalirSpark(e);
		});
									
	$('.wm_sparkVentana').hover(function(e) {
    	obj.parpadeoEntrarSpark(e);
    },
    function(e){
    	 obj.parpadeoSalirSpark(e);
    });    
};

Canvasview.prototype.parpadeoSalirSpark=function (e){
	$(document).find('.wm_sparkclick').delay(0).fadeOut(0);
	$(document).find('.wm_sparkdblclick').delay(0).fadeOut(0);
	$(document).find('.wm_sparkmouseenter').delay(0).fadeOut(0);
	//$(document).find('.wm_sparkmouseleave').delay(0).fadeOut(0);
};

Canvasview.prototype.parpadeoEntrarSpark=function (e){
	$(document).find('.wm_sparkclick').delay(0).fadeIn(0);
	$(document).find('.wm_sparkdblclick').delay(0).fadeIn(0);
	$(document).find('.wm_sparkmouseenter').delay(0).fadeIn(0);
	//$(document).find('.wm_sparkmouseleave').delay(0).fadeIn(0);
};*/

/*Canvasview.prototype.incluirSparksBis=function (e){
	//if (CanvasConstraints.getSparks()!=null){
					        		var posestadoTransition=0;
					        		var introducirSparks=false;
					        		console.log("spark hover in");
					        		var estadoTransition=[];
					        		var elementoHover=$(e.target);
					        		$('[class*=wm_selected]').removeClass("wm_selected");
					        		elementoHover.closest("[data_wmwidget_id]").addClass("wm_selected");
					        		var widgetUltimo = canvasmodel.extraerPoswidget();
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
						        	//	 	$(".wm_sparkmouseleave").css('top', elementoHover.closest("[data_wmwidget_id]").offset().top+$(".wm_spark").height()+$(".wm_spark").height()+$(".wm_spark").height()+15); 
						        	//	 	$(".wm_sparkmouseleave").css('left', elementoHover.closest("[data_wmwidget_id]").offset().left+elementoHover.width());
						        		 	console.log("offserHeight   "+elementoHover.closest("[data_wmwidget_id]").width());
						        		
						        	/*	 	var sparks = CanvasConstraints.getSparks();
						        		 	for(var i=0; i<sparks.length; i++){
						        		 		if(sparks[i].widget==canvasmodel.widgetsInserted[widgetUltimo].type){
						        		 			estadoTransition[posestadoTransition]={event: sparks[i].event, widget: sparks[i].widget};
						        		 			//estadoTransition[posestadoTransition].event=sparks[i].event;
						        		 			//estadoTransition[posestadoTransition].widget=sparks[i].widget;
						        		 			posestadoTransition++;
						        		 		} 
						        		 	}*/
						        	//	 	var currentSpark = CanvasConstraints.getCurrentSpark();
						        	/*	 	$('.wm_sparkclick').css('border', "5px solid rgba(0,0,0,0.5)");
						        		 	$('.wm_sparkdblclick').css('border', "5px solid rgba(0,0,0,0.5)");
						        		 	$('.wm_sparkmouseenter').css('border', "5px solid rgba(0,0,0,0.5)");
						        	//	 	$('.wm_sparkmouseleave').css('border', "5px solid rgba(0,0,0,0.5)");
						        		 	$('.wm_sparkclick').css('opacity', "1.0");
						        		 	$('.wm_sparkdblclick').css('opacity', "1.0");
						        		 	$('.wm_sparkmouseenter').css('opacity', "1.0");
						        	//	 	$('.wm_sparkmouseleave').css('opacity', "1.0");*/
						        		
						        	/*	 	for(var j=0; j<estadoTransition.length; j++){
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
								        	this.parpadeoEntrarSpark(e);
								        //	$(document).find('.wm_sparkmouseleave').delay(0).fadeIn(0);
								        } 
							        }
					//	        } 
};*/
