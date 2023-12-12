//@ sourceURL=flechas.js

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
}

window.onload = function() {
	var config={wireConfig: {width: 1,
					label: "mouseEnter",
					labelStyle: { fontSize: "100%" },
					labelEditor: {type: 'select', choices: ['mouseEnter', 'click', 'dbClick'] },					
					xtype: "WireIt.BezierArrowWire"}};
	var inputConfig=clone(config);
	var outputConfig=clone(config);
	inputConfig.className="WireIt-Terminal WireInput";			
	inputConfig.ddConfig={ type: "input", allowedTypes: ["output"] };		
	inputConfig.alwaysSrc=true;				
	outputConfig.className="WireIt-Terminal WireOutput";				
	outputConfig.ddConfig={ type: "output", allowedTypes: ["input"] };				

	var block1 = YAHOO.util.Dom.get('block1');
	var height1=block1.clientHeight;
	var inputConfig1=clone(inputConfig);
	inputConfig1.offsetPosition={right:-15,top:(height1/2)-15};
	var t1In=new WireIt.Terminal(block1, inputConfig1);
	var outputConfig1=clone(outputConfig);
	outputConfig1.offsetPosition={left:-15,top:(height1/2)-15};	
	var t1Out=new WireIt.Terminal(block1, outputConfig1);
	
	var block2 = YAHOO.util.Dom.get('block2');	
	var height2=block2.clientHeight;
	var inputConfig2=clone(inputConfig);
	inputConfig2.offsetPosition={right:-15,top:(height2/2)-15};	
	var t2In=new WireIt.Terminal(block2, inputConfig2);
	var outputConfig2=clone(outputConfig);
	outputConfig2.offsetPosition={left:-15,top:(height2/2)-15};	
	var t2Out=new WireIt.Terminal(block2, outputConfig2);	
	var previous=null;
	var wire=null;
	t2Out.eventAddWire.subscribe(function(ev,wires){
		wire=wires[0];
		var elem=wire.element;	
		YAHOO.util.Event.addListener(elem,"mouseover",function(e){
			e.stopImmediatePropagation();			
		});		
		YAHOO.util.Event.addListener(elem,"mousemove",function(e){
			e.stopImmediatePropagation();
			elem=e.target;
		    var posX = e.clientX;
		    var posY = e.clientY;
			elem.style.display="none";
		    var elm = document.elementFromPoint(posX, posY);
			elem.style.display="";
			if(elm.className=="wm_background"){
				previous=elm;
			}
			if(previous!=elm){
				if(previous!=null){			
		            var evObj = document.createEvent('MouseEvents');
		            evObj.initEvent( 'mouseout', true, false );
		            previous.dispatchEvent(evObj);	
				}
	            var evObj = document.createEvent('MouseEvents');
	            evObj.initEvent( 'mouseover', true, false );
	            elm.dispatchEvent(evObj);
				previous=elm;						
			}				
		});
		YAHOO.util.Event.addListener(elem,"mouseout",function(e){
			e.stopImmediatePropagation();
			elem=e.target;
		    var posX = e.clientX;
		    var posY = e.clientY;
			elem.style.display="none";
		    var elm = document.elementFromPoint(posX, posY);
			elem.style.display="";				
            if(previous!=null){
	            var evObj = document.createEvent('MouseEvents');
	            evObj.initEvent( 'mouseout', true, false );				
				previous.dispatchEvent(evObj);
				previous=null;
			};				
		});
	});
 
 	var target=document.getElementById("p");
	
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		if(wire!=null){
			var i=0;
			var found=false;
			for(i=0;i<mutation.removedNodes.length&&!found;i++){
				var node=mutation.removedNodes[i];
				if(node.id=="p"){
					found=true;
				}
			}
			if(found){
		
			 	wire.redraw();
				observer.disconnect();
		 	}
	 	}
	  });    
	});
 
	// configuration of the observer:
	var config = { childList: true, subtree: true };

	observer.observe(document, config);

};
