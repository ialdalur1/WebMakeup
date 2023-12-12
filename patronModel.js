//@ sourceURL=patronModel.js

PatronModel=function(){
};

PatronModel.prototype.click2erase=function (){
	if($('[data_wmwidget_pattern_number]').length==1){
		var widget=$('[data_wmwidget_pattern_number]')[0].attributes.data_wmwidget_id.textContent;
		$('[data_wmwidget_pattern_number]').attr("data_wmwidget_pattern", "minus");
		this.createWire("input-"+widget, "output-"+widget, "click");
		canvasmodel.removePatternNumbers();
	}else{
		canvasmodel.removePatternNumbers();
		alert("You must have 1 widget selected");
	}
};

PatronModel.prototype.click2alternate=function (){
	if($('[data_wmwidget_pattern_number]').length==2){
		var widgetA=$('[data_wmwidget_pattern_number=1]')[0].attributes.data_wmwidget_id.textContent;
		var widgetB=$('[data_wmwidget_pattern_number=2]')[0].attributes.data_wmwidget_id.textContent;
		$('[data_wmwidget_pattern_number=1]').attr("data_wmwidget_pattern", "both");
		$('[data_wmwidget_pattern_number=2]').attr("data_wmwidget_pattern", "both");
		this.createWire("input-"+widgetB, "output-"+widgetA, "click");
		this.createWire("input-"+widgetA, "output-"+widgetB, "click");
		this.createWire("input-"+widgetB, "output-"+widgetB, "click");
		this.createWire("input-"+widgetA, "output-"+widgetA, "click");
		this.ocultarWidget(widgetB);
		canvasmodel.widgetsInserted[widgetB].estadoWidget="collapse";
		this.recolocarTeminalAlOcultarWidgets(widgetB);
		canvasmodel.removePatternNumbers();
		canvasmodel.container.redrawAllWires();
	}else{
		canvasmodel.removePatternNumbers();
		alert("You must have 2 widgets selected");
	}
};

PatronModel.prototype.and=function (){
	if($('[data_wmwidget_pattern_number]').length>1){
	/*	var widgetA=$('[data_wmwidget_pattern_number=1]')[0].attributes.data_wmwidget_id.textContent;
		var widgetB=$('[data_wmwidget_pattern_number=2]')[0].attributes.data_wmwidget_id.textContent;
		var widgetC=$('[data_wmwidget_pattern_number=3]')[0].attributes.data_wmwidget_id.textContent;
		this.createWire("input-"+widgetA, "output-"+widgetB);
		this.createWire("input-"+widgetA, "output-"+widgetC);*/
		var widgets=this.createListPatronWidgets();
		$('[data_wmwidget_pattern_number=1]').attr("data_wmwidget_pattern", "both");
		for (var i=1; i<widgets.length; i++){
			this.createWire("input-"+widgets[0], "output-"+widgets[i], "click");
			this.ocultarWidget(widgets[i]);
			canvasmodel.widgetsInserted[widgets[i]].estadoWidget="collapse";
			this.recolocarTeminalAlOcultarWidgets(widgets[i]);
		}
		canvasmodel.removePatternNumbers();
		canvasmodel.container.redrawAllWires();
	}else{
		canvasmodel.removePatternNumbers();
		alert("You must have more than 2 widgets selected");
	}
};

PatronModel.prototype.or=function (){
	if($('[data_wmwidget_pattern_number]').length==3){
		var widgetA=$('[data_wmwidget_pattern_number=1]')[0].attributes.data_wmwidget_id.textContent;
		var widgetB=$('[data_wmwidget_pattern_number=2]')[0].attributes.data_wmwidget_id.textContent;
		var widgetC=$('[data_wmwidget_pattern_number=3]')[0].attributes.data_wmwidget_id.textContent;
		$('[data_wmwidget_pattern_number=1]').attr("data_wmwidget_pattern", "both");
		this.createWire("input-"+widgetA, "output-"+widgetB, "click");
		this.createWire("input-"+widgetA, "output-"+widgetC, "click");
		this.ocultarWidget(widgetC);
		canvasmodel.widgetsInserted[widgetC].estadoWidget="collapse";
		this.recolocarTeminalAlOcultarWidgets(widgetC);
		canvasmodel.removePatternNumbers();
		canvasmodel.container.redrawAllWires();
	}else{
		canvasmodel.removePatternNumbers();
		alert("You must have 3 widgets selected");
	}
};

PatronModel.prototype.zoomin=function (){
	var widgets=this.createListPatronWidgets();
	this.createZooimInWires(widgets);
	canvasmodel.removePatternNumbers();
	canvasmodel.container.redrawAllWires();
};

PatronModel.prototype.zoominDomino=function (){
	var widgets=this.createListPatronWidgets();
	this.createZooimInWires(widgets);
	this.createDominoWires(widgets);
	canvasmodel.removePatternNumbers();
	canvasmodel.container.redrawAllWires();
};

PatronModel.prototype.ocultarWidget=function (pos){
	if($('[data_wmwidget_id='+pos+']')[0].attributes.data_wmwidget_type.textContent!="original_widgetized"){
		$('[data_wmwidget_id='+pos+']')[0].attributes.data_wmwidget_state.textContent="collapse";
	}else{
		$('[data_wmwidget_id='+pos+']')[1].attributes.data_wmwidget_state.textContent="collapse";
	}
};

PatronModel.prototype.recolocarTeminalAlOcultarWidgets=function (pos){
	for(var j=0; j<$('[data_wmwidget_id='+pos+']').children().length; j++){
			if($('[data_wmwidget_id='+pos+']').children()[j]. classList.contains('WireIt-Terminal')){
				canvasmodel.widgetsInserted[pos].topTerminal=$('[data_wmwidget_id='+pos+']').children()[j].style.top;
				$('[data_wmwidget_id='+pos+']').children()[j].style.top="-5px";
			}
		}
};

PatronModel.prototype.createWire=function (E, G, label){
	var t1 = canvasmodel.container.getTerminal(E);
    var t2 = canvasmodel.container.getTerminal(G);
    var nWire = new WireIt.BezierArrowWire(t1,t2, canvasmodel.container.el, {width: 1,
					label: label,
					labelStyle: { fontSize: "100%" },
					labelEditor: {type: 'select', choices: ['mouseEnter', 'click', 'dbClick'] },					
					xtype: "WireIt.BezierArrowWire"});
    nWire.redraw();
};

PatronModel.prototype.createListPatronWidgets=function(){
	var widgets=new Array();
	for(var i=1; i<$('[data_wmwidget_pattern_number]').length+1; i++){
		widgets.push($('[data_wmwidget_pattern_number='+i+']')[0].attributes.data_wmwidget_id.textContent);
	}	
	return widgets;
};

PatronModel.prototype.createZooimInWires=function(widgets){
	for(var j=0; j<widgets.length-1; j++){
		
		$('[data_wmwidget_pattern_number='+(j+1)+']').attr("data_wmwidget_pattern", "plus");
		this.createWire("input-"+widgets[j], "output-"+widgets[j+1], "click");
		this.ocultarWidget(widgets[j+1]);
		canvasmodel.widgetsInserted[widgets[j+1]].estadoWidget="collapse";
		this.recolocarTeminalAlOcultarWidgets(widgets[j+1]);
	}
};

PatronModel.prototype.createDominoWires=function(widgets){
	for(var j=1; j<widgets.length-1; j++){//el primer widget no debe ser borrado
		this.createWire("input-"+widgets[widgets.length-1], "output-"+widgets[j], "click");
	}
	$('[data_wmwidget_pattern_number='+(widgets.length)+']').attr("data_wmwidget_pattern", "minus");
	this.createWire("input-"+widgets[widgets.length-1], "output-"+widgets[widgets.length-1], "click");
};