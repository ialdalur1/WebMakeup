Animations = function(augmentationModel){
    this.augmentationModel = {};
    this.widgets = [];
    this.augmentationModel.widgets = augmentationModel.widgetList;
    this.augmentationModel.blinks = augmentationModel.blinkList.blinks;
};

Animations.prototype.create = function(){
    //Create widgets list with node id asociation
    this.widgetsPointers();
    //Get triggered widgets
    this.widgetsTriggered();
    //Create one STD foreach triggered widgetList
   // this.createAnimations();
   new AnimationFSM(this.widgets);
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
        if(!this.widgets[triggered].blinks){
            this.widgets[triggered].blinks = [];
            this.widgets[triggered].blinks.push({event:event, triggering:this.widgets[triggering]});
        }
        //Append to the list if already exists
        else{
            this.widgets[triggered].blinks.push({event:event, triggering:this.widgets[triggering]});
        }
    }
};




AnimationFSM = function(widget){
    this.widget = widget;
    this.fsm=new Array();
    this.createFSM();
    this.createAnimations();
};

AnimationFSM.prototype.createFSM = function(){
	 for(i=0;i<this.widget.length;i++){
    	this.fsm.push(cjs.fsm());
   }
};

AnimationFSM.prototype.deleteFSM = function(){
	 for(i=0;i<this.fsm.length;i++){debugger;
	// 	var algo=this.fsm[i].off("enable->collapse"); 
	// 	var algo=this.fsm[i].off("collapse->enable");
	//$(".wm_wireIcon").unbind();
/*	var old_element = $(".wm_wireIcon")[0];
	var new_element = old_element.cloneNode(true);
	old_element.parentNode.replaceChild(new_element, old_element);
	this.widget[i].node=new_element;
	if(this.widget[i].blinks){
		this.widget[i].blinks[0].triggering.node=new_element;
	}*/
	//var algo=$('.wm_wireIcon').detach();
//	$(document.body).append(algo);
	 	this.fsm[i].destroy();
	// 	this.fsm[i]=null;
	 //	document.getElementsByClassName("wm_wireIcon")[0].removeEventListener("click", listener);
	 //	$(".wm_wireIcon").unbind("click", listener);
	 	this.fsm[i]=cjs.fsm();
  //  	this.fsm[i].off();   	
   }
};

var listener = function(event){
	console.log("srgbudkfgkfldsb");
};

AnimationFSM.prototype.createAnimations = function(){
    for(i=0;i<this.widget.length;i++){
        //If the widgets is triggered
        if(this.widget[i]!=undefined){
	        if(this.widget[i].blinks){
	            this.create(this.widget[i],i);
	        }
        }
    }
    this.requestCreation=false;
};

AnimationFSM.prototype.create = function(wid,pos){
    var i;
    var obj=this;
    var widR=wid;
    //Add fsm states
    this.fsm[pos].addState("collapse");
    this.fsm[pos].addState("enable");
    //Add transitions to blink the triggered widget
    for(i=0;i<wid.blinks.length;i++){
    	var blink = wid.blinks[i];
 //   	if(blink.triggering.node.style.display!="none"){
	        var collapse2EnableEvent = wid.initialState==="collapse"?this.normalizeEvent(blink.event):this.reverseEvent(this.normalizeEvent(blink.event));
	        var enable2CollapseEvent = this.reverseEvent(collapse2EnableEvent);
	        this.fsm[pos].addTransition("collapse", "enable", cjs.on(collapse2EnableEvent, blink.triggering.node));
	        this.fsm[pos].addTransition("enable", "collapse", cjs.on(enable2CollapseEvent, blink.triggering.node));
 //      }
    }
    //Set start state
   // if(this.widget.initialState==="collapse"){
  // 	if(blink.triggering.node.style.display!="none"){
	    if(wid.node.style.display==="none"){
	        this.fsm[pos].startsAt("collapse");
	    }
	    else{
	        this.fsm[pos].startsAt("enable");
	    }
	    //Add state transition handlers
	    var triggered = wid.node;
	    if(triggered!=null){
		    this.fsm[pos].on("collapse->enable", function(){
		    	triggered.style.display = "block";
		    	if(!obj.requestCreation){
		    		obj.requestCreation=true;
		    /*		window.setTimeout(function(){
			    		obj.deleteFSM();
			    		obj.createAnimations();
			    	},0);*/
				}
		    });
		    this.fsm[pos].on("enable->collapse", function(){
		    	triggered.style.display = "none";
		    	if(!obj.requestCreation){
		    		obj.requestCreation=true;
		    	//	window.setTimeout(function(){
			    //		obj.deleteFSM();
			    //		obj.createAnimations();
			    //	},0);
				}
		    	});
	//    }

    }
};

AnimationFSM.prototype.anadir=function(pos, triggered){
	var obj=this;
	
};
AnimationFSM.prototype.quitar=function(pos, triggered){
	var obj=this;
	
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