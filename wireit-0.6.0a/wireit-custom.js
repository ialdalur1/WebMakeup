WireIt.Wire.prototype.positionLabel=function(){
    YAHOO.util.Dom.setStyle(this.labelEl, "left", (this.min[0] + this.max[0] - this.labelEl.clientWidth) / 2+"px");
    YAHOO.util.Dom.setStyle(this.labelEl, "top", (this.min[1] + this.max[1] - this.labelEl.clientHeight) / 2+"px");
};

WireIt.Wire.prototype.remove=function() {
    this.parentEl.removeChild(this.element);
    if (this.terminal1 && this.terminal1.removeWire) {
        this.terminal1.removeWire(this);
    }
    if (this.terminal2 && this.terminal2.removeWire) {
        this.terminal2.removeWire(this);
    }
    this.terminal1 = null;
    this.terminal2 = null;
    if (this.labelEl) {
        if (this.labelField) {
            this.labelField.destroy();
        }
        this.labelEl.parentNode.removeChild(this.labelEl);
    }
};
WireIt.Terminal.prototype.remove=function() {
    while (this.wires.length > 0) {
        this.wires[0].remove();
    }
    this.parentEl.removeChild(this.el);
    YAHOO.util.Event.purgeElement(this.el);
    if (this.scissors) {
		var elm=this.scissors.get("element");		
        YAHOO.util.Event.purgeElement(elm);
 		elm.parentNode.removeChild(elm);			  			
    }
};
WireIt.util.BodyLayer = function (B){
    WireIt.util.BodyLayer.superclass.constructor.call(this, B);
};
YAHOO.lang.extend(WireIt.util.BodyLayer, WireIt.Layer, {
	render: function(){
		this.el=document.body;		
	}
});

WireIt.util.BodyContainer = function (A, B){
	var APRIMA=YAHOO.lang.merge(A);
	APRIMA.ddHandle=false;
	APRIMA.close=false;
	APRIMA.resizable=false;
	APRIMA.draggable=false;
	APRIMA.preventSelfWiring=false;
    WireIt.util.BodyContainer.superclass.constructor.call(this, APRIMA, B);
};
YAHOO.lang.extend(WireIt.util.BodyContainer, WireIt.Container, {
	xtype: "WireIt.util.BodyContainer",
	render: function(){
		this.el=document.body;		
	},
	addTerminal: function(G, H){
		var GPRIMA=YAHOO.lang.merge(G);
        var E = WireIt.terminalClassFromXtype(GPRIMA.xtype);		
		var offset={top:(H.clientHeight/2)-15};
		if(GPRIMA.xtype=="WireIt.util.TerminalCustomElement"){
			offset.left=-15;
		}else if(GPRIMA.xtype=="WireIt.util.TerminalBody"){
			offset.right=-15;
		}
		GPRIMA.offsetPosition=offset;
        var F = new E(H, GPRIMA, this);
        this.terminals.push(F);
        F.eventAddWire.subscribe(this.onAddWire, this, true);
        F.eventRemoveWire.subscribe(this.onRemoveWire, this, true);
        return F;		
	},
	remove: function(){
		this.removeAllTerminals();
	},
	removeAllTerminals: function() {
		var listNameTerminals=new Array();
        for (var E = 0; E < this.terminals.length; E++) {
			var terminal=this.terminals[E];
			listNameTerminals.push(terminal.name);
            terminal.remove();
			var frame=terminal.dd.getDragEl();			
			if(frame){
				frame.parentNode.removeChild(frame);
			}
        }
        this.terminals = [];
        return listNameTerminals;
    }
});
WireIt.util.TerminalBody = function(C, B, A) {
	B.editable=false;
    WireIt.util.TerminalBody.superclass.constructor.call(this, C, B, A);
	this.editable=true;
    this.dd = new WireIt.util.TerminalProxyBody(this, this.ddConfig);
    this.scissors = new WireIt.Scissors(this);
};
YAHOO.lang.extend(WireIt.util.TerminalBody, WireIt.Terminal, {});

WireIt.util.TerminalProxyBody = function(E, D) {
	    WireIt.util.TerminalProxyBody.superclass.constructor.call(this, E, D);
};
YAHOO.lang.extend(WireIt.util.TerminalProxyBody, WireIt.TerminalProxy, {
	onDrag: function(F){
        if (!this.editingWire) {
            return;
        }
        if (this.terminal.container) {
            var E = this.terminal.container.layer.el;
            this.fakeTerminal.pos = [F.clientX + E.scrollLeft, F.clientY + E.scrollTop];
        } else {
            this.fakeTerminal.pos = (YAHOO.env.ua.ie) ? [F.clientX, F.clientY] : [F.clientX + window.pageXOffset, F.clientY + window.pageYOffset];
        }
        this.editingWire.redraw();	
	}
});
WireIt.util.TerminalCustomElement = function(C, B, A) {
	this.CustomObject=C;
    WireIt.util.TerminalCustomElement.superclass.constructor.call(this, C, B, A);
	if(this.dd){this.dd.startDrag=function(){};this.dd.b4MouseDown=function(){};this.dd.b4StartDrag=function(){};}
};
YAHOO.lang.extend(WireIt.util.TerminalCustomElement, WireIt.Terminal, {
	xtype: "WireIt.util.TerminalCustomElement",
	render: function(){
		this.el=this.CustomObject;		
	},
	getXY: function(){
		var xy=WireIt.util.TerminalCustomElement.superclass.getXY.call(this);
		var height=this.el.clientHeight;
		var width=this.el.clientWidth;
		xy[0]=xy[0]-15;
		xy[1]=xy[1]-15+height/2;
		return xy;
	},
	remove: function(){
	    while (this.wires.length > 0) {
             this.wires[0].remove();
         }
         if (this.scissors) {
			 var elm=this.scissors.get("element");
		     YAHOO.util.Event.purgeElement(elm);
			 elm.parentNode.removeChild(elm);
         }		
	}
});