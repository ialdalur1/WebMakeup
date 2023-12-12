//@ sourceURL=widgetPaletteModel.js

WidgetPaletteModel=function(){
	this.numWidgetListToDelete=0;
	this.widgetList = new Array();
	return this;
};


WidgetPaletteModel.prototype.loadCloneWidgets=function (){
	var objeto=this;debugger;
	this.borrarWidgetsConMismoNombreSiEstanSeguidos();
/*	 chrome.storage.local.get("widgets",function (obj){
	      objeto.loadCloneWidgetsBis(obj);
	  });*/
};

WidgetPaletteModel.prototype.borrarWidgetsConMismoNombreSiEstanSeguidos=function (){
	var objeto=this;
	chrome.storage.local.get("widgets",function (obj){debugger;
	      var tempWidgetList=obj["widgets"]!=null?obj["widgets"]:[];
	      for(var i=0; i<tempWidgetList.length; i++){
	      	if(i>0){
		      	if(tempWidgetList[i-1].type==tempWidgetList[i].type){
		      		tempWidgetList.splice(i,1);
		      		i--;
		      	}
	      	}
	      }
	      chrome.storage.local.set({"widgets":tempWidgetList},function (){
	      	objeto.loadCloneWidgetsPrevio();
	      });
	  });
};

WidgetPaletteModel.prototype.loadCloneWidgetsPrevio=function (){
	var objeto=this;
	 chrome.storage.local.get("widgets",function (obj){
	      objeto.loadCloneWidgetsBis(obj);
	  });
};

WidgetPaletteModel.prototype.loadCloneWidgetsBis=function (obj){
	var objeto=this;
	 var tempWidgetList=obj["widgets"]!=null?obj["widgets"]:[];
		var fClones=$("#foreignClones");
		$(tempWidgetList).map(function(n, elem){
			 	objeto.loadCloneWidgetsTris(elem, fClones);
		});
		this.widgetList=this.widgetList.concat(tempWidgetList);
     // artivarEventos(); 
     //   this.comprobarCambioEstado();
        this.insertarForeignWidgetsInmediatamente();   
};

WidgetPaletteModel.prototype.loadCloneWidgetsTris=function (elem, fClones){
	fClones.append(this.createWidget(elem.type,elem.html));
};

WidgetPaletteModel.prototype.createWidget=function (cloneName,html){
	var nButton=$("<div><a id='"+cloneName+"'href='#' class='foreignCloneToolButton' onclick='return false'>"+cloneName+"</a></div>");
	$(nButton).append("<div id='foreignCloneToolButtonDelete-"+this.numWidgetListToDelete+"' class='foreignCloneToolButtonDelete'><img src='"+chrome.extension.getURL('images/eliminar.png')+"' style='float:left;' onclick='return false;'></img></div>");
	this.numWidgetListToDelete++;
	$("a",nButton).button();
	$("a",nButton).attr("type_wmbutton_toinsert", "foreignClone");
	return nButton;  
};


WidgetPaletteModel.prototype.comprobarCambioEstado=function (){
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
};

WidgetPaletteModel.prototype.insertarForeignWidgetsInmediatamente=function (){
	var obj=this;
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
		obj.insertarForeignWidgetsInmediatamenteBis(request, sender, sendResponse);
	});
};

function insertarForeignWidgetsInmediatamente(){debugger;
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){debugger;
		insertarForeignWidgetsInmediatamenteBis(request, sender, sendResponse);
	});
}

function insertarForeignWidgetsInmediatamenteBis(request, sender, sendResponse){
		if(request.operation=="WidgetHighAvailable"){
			chrome.storage.local.get("widgets",function (obj){
				insertarHighWidgets(request, sender, sendResponse, obj);
			});
		}
}

function insertarHighWidgets(request, sender, sendResponse, obj){
	chrome.storage.local.get("widgets",function (elem){debugger;
		var arrWidgets=elem["widgets"]!=null?elem["widgets"]:[];
         arrWidgets[arrWidgets.length]=request.content;
		chrome.storage.local.set({"widgets":arrWidgets},function (){ debugger;
		});
	});
}

WidgetPaletteModel.prototype.insertarForeignWidgetsInmediatamenteBis=function (request, sender, sendResponse){
	var objeto=this;
	if(request.operation=="WidgetAvailable"){
			chrome.storage.local.get("widgets",function (obj){
				objeto.insertarForeignWidgetsInmediatamenteTris(request, sender, sendResponse, obj);
			});
		}
		if(request.operation=="WidgetHighAvailable"){
			chrome.storage.local.get("widgets",function (obj){
				objeto.insertarHighWidgets(request, sender, sendResponse, obj);
			});
		}
};

WidgetPaletteModel.prototype.insertarHighWidgets=function (request, sender, sendResponse, obj){
	var obj=this;
	chrome.storage.local.get("widgets",function (elem){debugger;
		var arrWidgets=elem["widgets"]!=null?elem["widgets"]:[];
         arrWidgets[arrWidgets.length]=request.content;
		chrome.storage.local.set({"widgets":arrWidgets},function (){ debugger;
			var algo=arrWidgets;
			//chrome.extension.sendMessage({operation:"WidgetCreated"});
			var fClones=$("#foreignClones");
			var ultimoWidget=request.content;
			$(ultimoWidget).map(function(n, elem){
				 	fClones.append(obj.createWidget(elem.type,elem.html));
				 });
		});
	});
};

WidgetPaletteModel.prototype.insertarForeignWidgetsInmediatamenteTris=function (request, sender, sendResponse, obj){
	var objeto=this;
			var tempWidgetList=obj["widgets"]!=null?obj["widgets"]:[];
			var ultimoWidget=tempWidgetList[tempWidgetList.length-1];
			 var fClones=$("#foreignClones");
			 if(ultimoWidget.type!=this.widgetList[this.widgetList.length-1].type){//esto kiere decir q no se ha anadido ninguno nuevo
				 $(ultimoWidget).map(function(n, elem){
				 	fClones.append(objeto.createWidget(elem.type,elem.html));
				 });
			
				 this.widgetList=this.widgetList.concat(tempWidgetList[tempWidgetList.length-1]);
			//	 eliminarEventos();
			//	 artivarEventos(); 
			}
			else{
				for (var i=0; i<tempWidgetList.length; i++){
					if (tempWidgetList[i].widgetType=="complex"){
						for(var j=0; j<this.widgetList.length; j++){
							if(this.widgetList[j].type==tempWidgetList[i].type){
								this.widgetList[j]=tempWidgetList[i];
							}
						}
					}
				}
			}
};
