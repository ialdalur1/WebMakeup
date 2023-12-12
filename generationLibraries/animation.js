Animations = function(augmentationModel){
    this.augmentationModel = {};
    this.widgets = [];
    this.augmentationModel.widgets = augmentationModel.widgetList;
    this.augmentationModel.blinks = augmentationModel.blinkList.blinks;
    this.augmentationModel.conditions = augmentationModel.blinkList.conditionList;
};

Animations.prototype.create = function(){
    //Create widgets list with node id asociation
    this.widgetsPointers();
    //Get triggered widgets
    this.widgetsTriggered();
    //Create one STD foreach triggered widgetList
    this.createAnimations();
};

Animations.prototype.widgetsPointers = function(){
    var i;
    for(i=0;i<this.augmentationModel.widgets.length;i++){
        var node = this.augmentationModel.widgets[i].node;
        var id = this.augmentationModel.widgets[i].id;
        var initialState = this.augmentationModel.widgets[i].initialState;
        this.widgets[id] = {};
        this.widgets[id].node = node;
        this.widgets[id].initialState = initialState;
    }
};

Animations.prototype.widgetsTriggered = function(){
    var i;
    //For each blink, watch for triggered and add to his own blink list
    for(i=0;i<this.augmentationModel.blinks.length;i++){
        var triggered = this.augmentationModel.blinks[i].triggered;
        var triggering = this.augmentationModel.blinks[i].triggering;
        var event = this.augmentationModel.blinks[i].event;
        //If list is empty or not exists, create a new one
 //       if(!this.widgets[triggered]){
	        if(!this.widgets[triggered].blinks){
	            this.widgets[triggered].blinks = [];
	            this.widgets[triggered].blinks.push({event:event, triggering:this.widgets[triggering]});
	        }
	        //Append to the list if already exists
	        else{
	            this.widgets[triggered].blinks.push({event:event, triggering:this.widgets[triggering]});
	        }
  //     }else{
  //     	 this.widgets[triggered].blinks.push({event:event, triggering:this.widgets[triggering]});
  //     }
    }
};

Animations.prototype.createAnimations = function(){debugger;
	this.introducirImagenCondition();
    for(i=0;i<this.widgets.length;i++){
        //If the widgets is triggered
        if(this.widgets[i]!=undefined){
	        if(this.widgets[i].blinks){
	        	var listCondition=this.listaDeCondiciones(this.widgets[i]);
	            new AnimationFSM(this.widgets[i], listCondition);
	        }
        }
    }
};

Animations.prototype.introducirImagenCondition = function(){
	var j=document.createElement('div'); 
	j.className='wm_conditionImage';
	$('body').append(j);debugger;
	$(".wm_conditionImage").append("<span><H2 class='wm_imageCondition'>CONDITION IS NOT MET<ul class='wm_textConditionsBroken'></ul></H2></span>");
	//<img class='wm_imageCondition' src="+chrome.extension.getURL('images/storm.png')+">
};

Animations.prototype.listaDeCondiciones = function(widget){
	var condition= new Array();
	for(var i=0; i<this.augmentationModel.conditions.length; i++){
		var idWidget=widget.node.attributes.data_wmwidget_id.value;
		if(this.augmentationModel.conditions[i].to==widget.node.attributes.data_wmwidget_id.value){
			condition.push(this.augmentationModel.conditions[i]);
		}
	}
	return condition;
};

AnimationFSM = function(widget, listCondition){
    this.widget = widget;
    this.conditions=listCondition;
    this.create();
};

AnimationFSM.prototype.create = function(){
    var i;
    var obj=this;
    this.fsm = cjs.fsm();
    //Add fsm states
    this.fsm.addState("collapse");
    this.fsm.addState("enable");
    //Add transitions to blink the triggered widget
    for(i=0;i<this.widget.blinks.length;i++){
        var blink = this.widget.blinks[i];
        var collapse2EnableEvent = this.widget.initialState==="collapse"?this.normalizeEvent(blink.event):this.reverseEvent(this.normalizeEvent(blink.event));
        var enable2CollapseEvent = this.reverseEvent(collapse2EnableEvent);
        this.fsm.addTransition("collapse", "enable", cjs.on(collapse2EnableEvent, blink.triggering.node));
        this.fsm.addTransition("enable", "collapse", cjs.on(enable2CollapseEvent, blink.triggering.node));
    }
    //Set start state
    if(this.widget.initialState==="collapse"){
        this.fsm.startsAt("collapse");
    }
    else{
        this.fsm.startsAt("enable");
    }
    //Add state transition handlers
    var triggered = this.widget.node;
    var triggering = this.widget.blinks[0].triggering.node;
    this.fsm.on("collapse->enable", function(){obj.comprobarCondicionCE(triggered, triggering);});
    this.fsm.on("enable->collapse", function(){obj.comprobarCondicionEC(triggered, triggering);});//triggered.style.display = "none";
};

AnimationFSM.prototype.comprobarCondicionCE = function(triggered, triggering){debugger;
	if(this.conditions.length>0){
		for(var i=0; i<this.conditions.length; i++){
			if(triggering.attributes.data_wmwidget_id.value==this.conditions[i].from && triggered.attributes.data_wmwidget_id.value==this.conditions[i].to){
				var fromValues=this.getWidgetValue(this.conditions[i].from, this.conditions[i].valorFrom);
				var toValues=this.getWidgetValue(this.conditions[i].to, this.conditions[i].valorTo);
				fromValues=this.eliminarCaracteresIndeseados(fromValues);
				toValues=this.eliminarCaracteresIndeseados(toValues);
				if(this.condition(fromValues, toValues, this.conditions[i].conditionType)){
					triggered.style.display = "block";
					this.mostrarIframe(triggered);
				}else{
					var conditionType;
					if(this.conditions[i].conditionType=="wm_menor"){
						conditionType="<";
					}else if(this.conditions[i].conditionType=="wm_mayor"){
						conditionType=">";
					}else{//wm_igual
						conditionType="=";
					}
					this.introducirImagen(""+fromValues+" "+conditionType+" "+toValues);
				}
			}
		}
	}else{
		triggered.style.display = "block";
		this.mostrarIframe(triggered);
	}
};

AnimationFSM.prototype.mostrarIframe = function(triggered){debugger;
	if(triggered.tagName=="IFRAME"){
		var padre=triggered.parentNode;
		padre.style.display = "block";
	}
};

AnimationFSM.prototype.oculatarIframe = function(triggered){debugger;
	if(triggered.tagName=="IFRAME"){
		var padre=triggered.parentNode;
		padre.style.display = "none";
	}
};

AnimationFSM.prototype.comprobarCondicionEC = function(triggered, triggering){debugger;
	if(this.conditions.length>0){
		for(var i=0; i<this.conditions.length; i++){
			if(triggering.attributes.data_wmwidget_id.value==this.conditions[i].from && triggered.attributes.data_wmwidget_id.value==this.conditions[i].to){
				var fromValues=this.getWidgetValue(this.conditions[i].from, this.conditions[i].valorFrom);
				var toValues=this.getWidgetValue(this.conditions[i].to, this.conditions[i].valorTo);
				fromValues=this.eliminarCaracteresIndeseados(fromValues);
				toValues=this.eliminarCaracteresIndeseados(toValues);
				if(this.condition(fromValues, toValues, this.conditions[i].conditionType)){
					triggered.style.display = "none";
					this.oculatarIframe(triggered);
				}else{debugger;
					if(triggered.style.display!="block"){
						var conditionType;
						if(this.conditions[i].conditionType=="wm_menor"){
							conditionType="<";
						}else if(this.conditions[i].conditionType=="wm_mayor"){
							conditionType=">";
						}else{//wm_igual
							conditionType="=";
						}
						this.introducirImagen(""+fromValues+" "+conditionType+" "+toValues);
					}
				}
			}
		}
	}else{
		triggered.style.display = "none";
		this.oculatarIframe(triggered);
	}
	triggered.style.display = "none";
	this.oculatarIframe(triggered);
};

AnimationFSM.prototype.introducirImagen=function(texto){
	$(".wm_textConditionsBroken").append("<li>"+texto+"</li>");
	$(".wm_imageCondition").fadeIn(1000, function(){
		$(".wm_imageCondition").fadeOut(1000, function(){debugger;
			$(".wm_textConditionsBroken").empty();
		});
	});
};

AnimationFSM.prototype.eliminarCaracteresIndeseados = function(numero){
	var numDevolver="";
	for(var i=0; i<numero.length; i++){
		if(!isNaN(numero[i]) || numero[i]=="," || numero[i]=="."){
			numDevolver=numDevolver+numero[i];
		}
	}
	return numDevolver;
};

AnimationFSM.prototype.getWidgetValue = function(widget, xpath){
	var value=null;
	var nodeNew="";
	if(xpath.charAt(0)=="W"){//WHOLE WIDGET
		value=$('[data_wmwidget_id='+widget+']')[0].textContent;
	}else if(xpath.charAt(0)=="."){
		nodeNew=document.evaluate(xpath,$('[data_wmwidget_id='+widget+']')[0],null, XPathResult.ANY_TYPE, null).iterateNext(); 
		if(nodeNew==null && $('[data_wmwidget_id='+widget+']')[0].shadowRoot!=null){
			nodeNew=document.evaluate(xpath,$('[data_wmwidget_id='+widget+']')[0].shadowRoot.children[2],null, XPathResult.ANY_TYPE, null).iterateNext(); 
		}else if(nodeNew==null && $('[data_wmwidget_id='+widget+']')[0].contentWindow!=null){
			nodeNew=document.evaluate(xpath,$('[data_wmwidget_id='+widget+']')[0].contentWindow.document,null, XPathResult.ANY_TYPE, null).iterateNext();
		}
		if(nodeNew!=null){value=nodeNew.textContent;}
	}else if(xpath.charAt(0)=="E"){//ENTIRE COMPLEX WIDGET
		debugger;
		var nodeNuevo=$('[data_wmwidget_id='+widget+']')[0].shadowRoot.children[2];
		value=nodeNuevo.children[1].textContent;
	}else{
		value=xpath;
	}
	return value;
};

AnimationFSM.prototype.condition = function(fromValues, toValues, conditionType){
	var seCumpleCondicion=true;
	if(fromValues==null || toValues==null){// En principio si algun valor es null, se muestra
		seCumpleCondicion=true;
	}else{
		if(conditionType=="wm_menor"){
			if(parseFloat(fromValues.replace(",", ".")) < parseFloat(toValues.replace(",", "."))){
				seCumpleCondicion=true;
			}else{
				seCumpleCondicion=false;
			}
		}else if(conditionType=="wm_mayor"){
			if(parseFloat(fromValues.replace(",", ".")) > parseFloat(toValues.replace(",", "."))){
				seCumpleCondicion=true;
			}else{
				seCumpleCondicion=false;
			}
		}else{//wm_igual
			if(parseFloat(fromValues.replace(",", ".")) == parseFloat(toValues.replace(",", "."))){
				seCumpleCondicion=true;
			}else{
				seCumpleCondicion=false;
			}
		}
	}
	return seCumpleCondicion;
};

AnimationFSM.prototype.normalizeEvent = function(eventName){
    switch(eventName.toLowerCase()){
        case "click":
            return "click";
        case "mouseenter":
            return "mouseover";
        case "dbclick":
            return "dblclick";
    }
    return null;
};

AnimationFSM.prototype.reverseEvent = function(event){
    switch(event){
        case "click":
            return "click";
            break;
        case "dblclick":
            return "dblclick";
            break;
        case "mouseover":
            return "mouseout";
            break;
        case "mouseout":
            return "mouseover";
            break;
    }
    return null;
};