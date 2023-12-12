//@ sourceURL=editor.js

Editor=function(){
	var paletteModel=new WidgetPaletteModel();
	new WidgetPaletteView(paletteModel);
	var patronModel=new PatronModel();
	new PatronView(patronModel);
	var canvasmodel=new Canvasmodel(paletteModel);
	new Canvasview(canvasmodel);
//	new DiagramPaletteModel();
//	new DiagramPaletteView();
};
