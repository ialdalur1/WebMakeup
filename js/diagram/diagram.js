//@ sourceURL=diagram.js

$('#extruderBottom .container').html("<div id=\"myDiagram\" style=\"background-color: whitesmoke; border: solid 1px black; width: 100%; height: 200px\"></div>");
	/*$('#extruderBottom .container').append("<div id=\"area\">"+
	"<button id='botonSave'>Save userScript</button>" +
	"<button id='save'>Save Augmentation</button>" +
	"<button id='restore'>Restore Augmentation</button>" +
	"</div>");*/

function init() {
	//document.getElementById('botonSave').addEventListener("click", prueba4, false);
	//document.getElementById('save').addEventListener("click", prueba5, false);
	//document.getElementById('restore').addEventListener("click", prueba6, false);
	//
	if (window.goSamples){
		goSamples();  // init for these samples -- you don't need to call this
	}
//	var $ = go.GraphObject.make;  // for conciseness in defining templates

//	var defaultStateColor = $(go.Brush, go.Brush.Linear, { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" });
//	var selectedStateColor = $(go.Brush, go.Brush.Linear, { 0: "rgb(0, 254, 201)", 1: "rgb(0, 254, 162)" });
//	var startStateColor = $(go.Brush, go.Brush.Linear, { 0: "rgb(201, 0, 254)", 1: "rgb(162, 0, 254)" });
//	var radgrad = $(go.Brush, go.Brush.Radial, { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" });

/*	myDiagram =
		$(go.Diagram, "myDiagram",  // must name or refer to the DIV HTML element
			{ initialContentAlignment: go.Spot.Center,
				// have mouse wheel events zoom in and out instead of scroll up and down
				"toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom
			//	, "clickCreatingTool.archetypeNodeData": { name:"State", actions:""}
			});*/


/*	var forelayer = myDiagram.findLayer("Foreground");
	myDiagram.addLayerBefore($(go.Layer, {name: "unDeleteable", allowDelete: false}), forelayer);

	//Define a plus (+) button for a selected node
	var selectedStatePlusButton =
		$(go.Adornment, "Spot",
			$(go.Panel, "Auto",
				$(go.Placeholder)
			),
			// the button to create a "next" node, at the top-right corner
			$("Button",
				{ alignment: go.Spot.TopRight,
					click: addNodeAndLink },  // this function is defined below
				$(go.Shape, "PlusLine", { desiredSize: new go.Size(6, 6) })
			) // end button
		); // end Adornment

	// define the Node template
	var defaultStateNodeTemplate =
		$(go.Node, "Auto",
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			new go.Binding("startNode", "startNode").makeTwoWay(),
			new go.Binding("name", "name").makeTwoWay(),
			new go.Binding("actions", "actions").makeTwoWay(),
			new go.Binding("key", "key").makeTwoWay(),
			// define the node's outer shape, which will surround the TextBlock
			$(go.Shape, "RoundedRectangle",
				{ parameter1: 20,
					fill: defaultStateColor, stroke: "black",
					portId: "out", fromLinkable: true, toLinkable: true, // Link From and To any state
					fromLinkableSelfNode: true, toLinkableSelfNode: true, // Can be linkable from or to himself
					cursor: "pointer" },
				new go.Binding("fill", "isSelected", function(sel) {
					return sel ? selectedStateColor : defaultStateColor;
				}).ofObject()),
			$(go.Panel, "Vertical",
				{width:150},
				$(go.TextBlock, "State"+DiagramUtils.getModelNodes().length,
					{ font: "bold 15pt helvetica, bold arial, sans-serif", editable: true , isMultiline:false},
					new go.Binding("text", "name").makeTwoWay()),
				$(go.TextBlock,
					{ font: "bold 11pt helvetica, bold arial, sans-serif", editable: false , isMultiline:true},
					new go.Binding("text", "actions").makeTwoWay())
			)
		);*/

/*	var STDinitialAdornment =
		$(go.Adornment, "Spot",
			$(go.Panel, "Auto",
				$(go.Placeholder),
				$(go.Shape, "RoundedRectangle",
					{ alignment: go.Spot.TopLeft, fill:"blue", width:50, height:50})
			)
		); // end Adornment

	//Start state template
	var startStateNodeTemplate =
		$(go.Node, "Auto",
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			new go.Binding("startNode", "startNode").makeTwoWay(),
			new go.Binding("name", "name").makeTwoWay(),
			new go.Binding("actions", "actions").makeTwoWay(),
			new go.Binding("key", "key").makeTwoWay(),
			// define the node's outer shape, which will surround the TextBlock
			$(go.Shape, "RoundedRectangle",
				{ parameter1: 20,
					fill: startStateColor, stroke: "black",
					portId: "out", fromLinkable: true, toLinkable: true, // Link From and To any state
					fromLinkableSelfNode: true, toLinkableSelfNode: true, // Can be linkable from or to himself
					cursor: "pointer"},
				new go.Binding("fill", "isSelected", function(sel) {
					return sel ? selectedStateColor : startStateColor;
				}).ofObject()
			),
			$(go.Panel, "Vertical",
				{width:150},
				$(go.TextBlock,
					{ font: "bold 15pt helvetica, bold arial, sans-serif", editable: true, isMultiline:false},
					new go.Binding("text", "name").makeTwoWay()),
				$(go.TextBlock,
					{ font: "bold 11pt helvetica, bold arial, sans-serif", editable: false , isMultiline:true},
					new go.Binding("text", "actions").makeTwoWay())
			),
			{layerName: "unDeleteable"}
		);

	//Add a plus button for the selected node
	defaultStateNodeTemplate.selectionAdornmentTemplate = selectedStatePlusButton;
	startStateNodeTemplate.selectionAdornmentTemplate = selectedStatePlusButton;
	startStateNodeTemplate.addAdornment("Adorno", STDinitialAdornment);

	//Generate a template map with different node templates; 
	//if category: startState uses startStateNodeTemplate; else uses stateNodeTemplate
	var templmap = new go.Map("string", go.Node);
	templmap.add("defaultState", defaultStateNodeTemplate);
	templmap.add("startState", startStateNodeTemplate);
	templmap.add("", defaultStateNodeTemplate);
	myDiagram.nodeTemplateMap = templmap;



	// clicking the button inserts a new node to the right of the selected node,
	// and adds a link to that new node
	function addNodeAndLink(e, obj) {
		function suggestSensibleStateChange(actionsString)
		{
			var newActionsArray = DiagramUtils.stateActionsToArray(actionsString), i;
			for(i=0;i<newActionsArray.length;i++){
				if(newActionsArray[i].action.toLowerCase()==='enable'){
					newActionsArray[i].action = 'Enable';
				}
				else if(newActionsArray[i].action.toLowerCase()==='disable'){
					newActionsArray[i].action = 'Disable';
				}
				else if(newActionsArray[i].action.toLowerCase()==='collapse'){
					newActionsArray[i].action = 'Collapse';
				}
			}
			return DiagramUtils.stateActionsToString(newActionsArray);
		}
		var adorn = obj.part;
		if (adorn === null){
			return;
		}
		e.handled = true;
		//var myDiagram = adorn.diagram;
		myDiagram.startTransaction("Add State");
		// get the node data for which the user clicked the button
		var fromNode = adorn.adornedPart;
		var fromData = fromNode.data;
		// create a new "State" data object, positioned off to the right of the adorned Node
		var toData = { name: "State"+DiagramUtils.getModelNodes().length , actions:suggestSensibleStateChange(fromData.actions)};
		var p = fromNode.location;
		toData.loc = p.x + 400 + " " + p.y;  // the "loc" property is a string, not a Point object
		// add the new node data to the model
		var model = myDiagram.model;
		model.addNodeData(toData);
		// create a link data from the old node data to the new node data
		var linkdata = { event: "", widget: ""};
		linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
		linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
		// and add the link data to the model
		model.addLinkData(linkdata);
		// select the new Node
		var newnode = myDiagram.findNodeForData(toData);
		myDiagram.select(newnode);
		myDiagram.commitTransaction("Add State");
	}

	// replace the default Link template in the linkTemplateMap
	myDiagram.linkTemplate =
		$(go.Link,  // the whole link panel
			{ curve: go.Link.Bezier,
				adjusting: go.Link.Stretch,
				reshapable: true
			},
			new go.Binding("points").makeTwoWay(),
			new go.Binding("widget", "widget").makeTwoWay(),
			new go.Binding("event", "event").makeTwoWay(),
			new go.Binding("curviness", "curviness"),
			//new go.Binding("key", "key", ).ofObject(),
			$(go.Shape,  // the link shape
				{ isPanelMain: true,
					stroke: "black", strokeWidth: 1.5 }),
			$(go.Shape,  // the arrowhead
				{ toArrow: "standard",
					stroke: null }),
			$(go.Panel, "Auto",
				$(go.Shape,  // the link shape
					{ fill: radgrad, stroke: null }),
				$(go.Panel, "Vertical",
					$(go.TextBlock, "",  // the label for event
						{ textAlign: "center",
							editable: false,
							font: "10pt helvetica, arial, sans-serif",
							stroke: "black",
							margin: 4},
						new go.Binding("text", "event").makeTwoWay()),
					$(go.TextBlock, "",  // the label for widget
						{ 	textAlign: "center",
							editable: false,
							font: "12pt helvetica, arial, sans-serif",
							stroke: "black",
							margin: 4},
						new go.Binding("text", "widget").makeTwoWay())/*,
					 $(go.TextBlock, function(){ return DiagramUtils.getModelTransitions().length.toString()+"a"; },  // the label for widget
					 { 	textAlign: "center",
					 editable: false,
					 font: "12pt helvetica, arial, sans-serif",
					 stroke: "black",
					 margin: 4}//,
					 new go.Binding("text", "key", function() { 
					 return DiagramUtils.getModelTransitions().length.toString()+"a"; }))
				)
			)
		);

    var ultimoEstadoSeleccionado="Initial";
    var ultimaTransicionSeleccionada={from:"", to:"", event:"", widget:""};
    var ultimoSeleccionadoEraUnEstado=true;
	//Defines de default State of the STD
	var initialState = myDiagram.nodes.first();

	//On changed selection on the diagram, we have to send a message to the canvas for doing actions with his own widgets
	function changedSelectionHandler(e){
		function convertToActionsArray(currentActionsString)
		{
			var currentState = myDiagram.selection.first();
			var currentActions = [], i, j;
			//Si es vacio
			if(currentActionsString==="")
			{
				return currentActions;
			}
			var arrayActions = currentActionsString.split(/\s/);
			for(i=0, j=0; i<arrayActions.length; i+=2, j++)
			{
				currentActions[j] = {};
				currentActions[j].action = arrayActions[i];
				currentActions[j].widget = arrayActions[i+1];
			}
			return currentActions;
		}
		//If there is an element (node or transition) selected on the STD
		if(e.diagram.selection.first()!==null)
		{
			//If it is a node selected
			if((e.diagram.selection.first().actions!==null) && (typeof e.diagram.selection.first().actions) !== "undefined")
			{
				DiagramConstraints.setCurrentState(DiagramUtils.stateActionsToArray(e.diagram.selection.first().actions));
				DiagramConstraints.setSparks(null);
				//DiagramConstraints.setPropagationSparks(myDiagram.model.linkDataArray);
				ultimoEstadoSeleccionado=e.diagram.selection.first().Fb;
				ultimoSeleccionadoEraUnEstado=true;
			}
			//If it is a transition selected
			else if(myDiagram.selection.first().fromNode || myDiagram.selection.first().toNode)
			{
				ultimaTransicionSeleccionada.from=e.diagram.selection.first().fromNode.key;
				ultimaTransicionSeleccionada.to=e.diagram.selection.first().toNode.key;
				ultimaTransicionSeleccionada.event=e.diagram.selection.first().event;
				ultimaTransicionSeleccionada.widget=e.diagram.selection.first().widget;
				ultimoSeleccionadoEraUnEstado=false;
				if(e.diagram.selection.first().fromNode.actions){
					DiagramConstraints.setCurrentState(DiagramUtils.stateActionsToArray(e.diagram.selection.first().fromNode.actions));
				}
				else{
					DiagramConstraints.setCurrentState([]);
				}
				//Get sparks for the From Node State of the selected transition
				var sparks = [];
				var links = myDiagram.model.linkDataArray;
				var i;
				for(i=0; i<links.length; i++){
					var link = links[i];
					if(link.from === myDiagram.selection.first().fromNode.key){
						if(link.widget && link.event){
							sparks.push({widget: link.widget, event: link.event});
						}
						else{
							sparks.push({widget: "", event: ""});
						}
					}
				}
				//Set sparks constraint
				DiagramConstraints.setSparks(sparks);
				//Set current spark constraints
				var currentSpark = {widget:"", event:""};
				if(e.diagram.selection.first().widget){
					currentSpark.widget=e.diagram.selection.first().widget;
				}
				if(e.diagram.selection.first().event){
					currentSpark.event = e.diagram.selection.first().event;
				}
				DiagramConstraints.setCurrentSpark(currentSpark);
			}	
		}
		//if a click is done out to a state or a transition
		else{
			if(ultimoSeleccionadoEraUnEstado){
			    for(var i=0; i<myDiagram.model.nodeDataArray.length; i++){
			    	if(myDiagram.model.nodeDataArray[i].name==ultimoEstadoSeleccionado){
			    		myDiagram.select(myDiagram.findNodeForData(myDiagram.model.nodeDataArray[i]));
			    	}
			    }
			  }else{
			    for(var i=0; i<myDiagram.model.linkDataArray.length; i++){
			    	if(myDiagram.model.linkDataArray[i].from==ultimaTransicionSeleccionada.from && myDiagram.model.linkDataArray[i].to==ultimaTransicionSeleccionada.to && myDiagram.model.linkDataArray[i].event==ultimaTransicionSeleccionada.event && myDiagram.model.linkDataArray[i].widget==ultimaTransicionSeleccionada.widget){
			    		myDiagram.select(myDiagram.findLinkForData(myDiagram.model.linkDataArray[i]));
			    	}
			    }
			   }
			}
	}
	//Define function to do when selected state changed
	myDiagram.addDiagramListener("ChangedSelection", changedSelectionHandler);
    myDiagram.addDiagramListener("SelectionDeleted", borradoDeleteTransitionOrState);
	// read in the JSON-format data from the "mySavedModel" element
	DiagramView.load();*/

	//Add codemirror autocompletion
	//autocompletion();

	//Add STD checker
	//embedSTDChecker();
}

function borradoDeleteTransitionOrState(e){
	myDiagram.select(myDiagram.findNodeForData(myDiagram.model.nodeDataArray[0]));
	/*var states=myDiagram.model.nodeDataArray;
	var transitions=myDiagram.model.linkDataArray;
	var listOfStates=[];
	for(var i=0; i<states.length; i++){
		listOfStates[i]={comunicado: false, key: states[i].key};
	}
	listOfStates[0].comunicado=true;//Estado Inicial true de inicio xq puede no tener transicion entrante
	for(var j=0; j<transitions.length; j++){
		for(var k=0; k<listOfStates.length; k++){
			if(listOfStates[k].key==transitions[j].to){
				listOfStates[k].comunicado=true;
			}
		}
	}
	//Comprobar que todos los estados han sido alcanzados
	for(var h=0; h<listOfStates.length; h++){
		if(listOfStates[h].comunicado==false){
			var key = states[h].key;
			states.splice(h,1);
			
			//this.errors.log.push(this.states[h]);
			//this.errors.logString += "Error on state "+this.states[h].name+". It is isolated";
			return true;
		}
	}
	return false;*/
}

function changedSelectionHandler(e){
	/*function convertToActionsArray(currentActionsString)
	 {
	 var currentState = myDiagram.selection.first();
	 var currentActions = [], i, j;
	 //Si es vacio
	 if(currentActionsString==="")
	 {
	 return currentActions;
	 }
	 var arrayActions = currentActionsString.split(/\s/);
	 for(i=0, j=0; i<arrayActions.length; i+=2, j++)
	 {
	 currentActions[j] = {};
	 currentActions[j].action = arrayActions[i];
	 currentActions[j].widget = arrayActions[i+1];
	 }
	 return currentActions;
	 }*/
	//If there is an element (node or transition) selected on the STD
	if(myDiagram.selection.first())
	{
		//If it is a node selected
		if((myDiagram.selection.first().actions!==null) && (typeof myDiagram.selection.first().actions) !== "undefined")
		{
			DiagramConstraints.setCurrentState(DiagramUtils.stateActionsToArray(myDiagram.selection.first().actions));
			DiagramConstraints.setSparks(null);
		}
		//If it is a transition selected
		else
		{
			if(myDiagram.selection.first().fromNode.actions){
				DiagramConstraints.setCurrentState(DiagramUtils.stateActionsToArray(myDiagram.selection.first().fromNode.actions));
			}
			else{
				DiagramConstraints.setCurrentState([]);
			}
			//Get sparks for the From Node State of the selected transition
			var sparks = [];
			var links = myDiagram.model.linkDataArray;
			var i;
			for(i=0; i<links.length; i++){
				var link = links[i], selectedTransition = myDiagram.selection.first();
				if(link.from === selectedTransition.fromNode.key){
					if(link.widget && link.event){
						sparks.push({widget: link.widget, event: link.event});
					}
					else{
						sparks.push({widget: "", event: ""});
					}
				}
			}
			//Set sparks constraint
			DiagramConstraints.setSparks(sparks);
			//Set current spark constraints
			var currentSpark = {widget:"", event:""};
			if(myDiagram.selection.first().widget){
				currentSpark.widget=myDiagram.selection.first().widget;
			}
			if(myDiagram.selection.first().event){
				currentSpark.event = myDiagram.selection.first().event;
			}
			//DiagramConstraints.setCurrentSpark(currentSpark);
		}
	}
}

//This embed a function that checks if the diagram has a possible STD (with good transitions and
/*function embedSTDChecker()
 {
 function checkSTD()
 {
 //Get the actual model of the diagram
 var jsonModel = JSON.parse(myDiagram.model.toJson());

 //We have to define 3 type of returnable messages Good STD, STD with warnings or STD with errors
 var stdChecker = new STDChecker(jsonModel);
 var result = stdChecker.checkModel();

 //result.code = 0 Good STD
 if(result.code==0)
 {
 alert("El diagrama está bien");
 }
 //result.code = 1 STD with errors
 else if(result.code==1)
 {
 var displayErrors = "";
 for(var i=0; i<result.errors.length; i++)
 {
 displayErrors += result.errors[i]+"\n";
 }
 alert(displayErrors);
 }
 else //Bad finishing of the funciton
 {
 alert("Bad checking, contact with developer");
 }
 }

 //When a text change on the STD, we check if the STD have errors
 myDiagram.addDiagramListener("TextEdited", checkSTD);
 Console.log("Hola");
 }*/

//var definedActions = ("show hide select deselect").split(" ");

var AbstractDiagramModel = function(){};
AbstractDiagramModel.prototype.map = { "nodeDataArray": [
	{ "key": 0, "loc": "120 120", "name": "Initial", "actions": "", "category":"startState"}
],
	"linkDataArray": [
	]
};

var DiagramModel = function(){};
DiagramModel.prototype = new AbstractDiagramModel();
DiagramModel.prototype.getModelString = function(){
	return myDiagram.model.toJson();
};
DiagramModel.prototype.getModelJson = function(){
	return JSON.parse(this.getModelString());
};
/*DiagramModel.prototype.addNewAction = function(action, state){
 var modelJson = JSON.parse(myDiagram.model.toJson());
 
 for(var i=0;i<modelJson.nodeDataArray.length;i++)
 {
 if(state.key==modelJson.nodeDataArray[i].key)
 modelJson.nodeDataArray[i].actions += "\n"+action.state+" "+action.widget;
 }
 myDiagram.model = go.Model.fromJson(modelJson);
 };*/
DiagramModel.prototype.getNodeWithKey = function(key){
	var nodes = myDiagram.model.nodeDataArray, i;
	for(i=0; i<nodes.length;i++){
		if(nodes[i].key===key){
			return nodes[i];
		}
	}
	return null;
};

DiagramModel.prototype.getTransition = function(transitionInfo){
	var from, to, widget, event, transitions = myDiagram.model.linkDataArray, i;
	if(transitionInfo.from===null){
		return;
	}
	else{
		from = transitionInfo.from;
	}
	if(transitionInfo.to===null){
		return;
	}
	else{
		to=transitionInfo.to;
	}
	//Set prototype variables
	if(transitionInfo.widget){
		widget = transitionInfo.widget;
	}
	if(transitionInfo.event){
		event = transitionInfo.event;
	}


	//Find transition in the model
	for(i=0;i<transitions.length;i++){
		if(transitions[i].from===from &&transitions[i].to===to){
			if((widget && transitions[i].widget && transitions[i].widget===widget)&&
				(event && transitions[i].event && transitions[i].event===event)){
				return transitions[i];
			}
			// TODO If we find an undefined transition, we take the first one (no the selected one on the view)
			// because there is no way to diference between them
			else if(!widget && !event && !transitions[i].widget && !transitions[i].event){
				return transitions[i];
			}
		}
	}
	return;//Transition not found

};

DiagramModel.prototype.setSparkPropagationDueToWidget = function(widget){
	
	myDiagram.startTransaction("Change actions");
	var sparks = myDiagram.model.linkDataArray;
	for(var i=0; i<sparks.length; i++){
		if(sparks[i].widget){
			if (sparks[i].widget.slice(-1)==widget && myDiagram.selection.first().key==sparks[i].from){
				myDiagram.model.setDataProperty(sparks[i], "event", "");
				myDiagram.model.setDataProperty(sparks[i], "widget", "");
			}
		} //myDiagram.selection.first()
	}
	myDiagram.commitTransaction("Change actions");
};

DiagramModel.prototype.setSparkPropagationDueToSparks = function(widget, evento){
	myDiagram.startTransaction("Change actions");
	var sparks = myDiagram.model.linkDataArray;
	for(var i=0; i<sparks.length; i++){
	if(sparks[i].widget){
			if (sparks[i].widget.slice(-1)==widget && myDiagram.selection.first().fromNode.key==sparks[i].from){
				if(evento=="onclick" && sparks[i].event=="onDoubleClick"){
					myDiagram.model.setDataProperty(sparks[i], "event", "");
					myDiagram.model.setDataProperty(sparks[i], "widget", "");
				}
				if(evento=="onmouseenter" && (sparks[i].event=="onDoubleClick" || sparks[i].event=="onClick")){
					myDiagram.model.setDataProperty(sparks[i], "event", "");
					myDiagram.model.setDataProperty(sparks[i], "widget", "");
				}
			}
		} //myDiagram.selection.first()
	}
	myDiagram.commitTransaction("Change actions");
};

DiagramModel.prototype.setActionsOnCurrentState = function(actions)
{
	var state = {};
	//Look if is an state selected
	if(myDiagram.selection.first()===null || myDiagram.selection.first().key===null){
		return;
	}
	state.key = myDiagram.selection.first().key;
	/***MODE 1***/
	myDiagram.startTransaction("Change actions");
	var node = this.getNodeWithKey(state.key);
	myDiagram.model.setDataProperty(node,"actions", actions);
	myDiagram.commitTransaction("Change actions");//*/

	/***MODE 2***/
	/*myDiagram.startTransaction("Change actions");
	 var selectedState = myDiagram.selection.first();
	 var node = this.getNodeWithKey(myDiagram.selection.first().key);
	 myDiagram.model.removeNodeData(node);
	 var newData = {key:selectedState.key, name:selectedState.name,
	 actions:actions, location:selectedState.location.x+" "+selectedState.location.y};
	 if(selectedState.category)
	 newData.category = selectedState.category;
	 var p = selectedState.location;
	 newData.loc = p.x + " " + p.y;  // the "loc" property is a string, not a Point object
	 myDiagram.model.addNodeData(newData);
	 //var newnode = myDiagram.findNodeForData(newData);
	 //myDiagram.select(newNode);
	 myDiagram.commitTransaction("Change actions");//*/
};

/*Work with transitions*/


/*DiagramModel.prototype.unsetTransition = function(spark){
 //Is really a transition selected
 if(myDiagram.selection.first()===null || myDiagram.selection.first().fromNode===null){
 console.error("Transition not selected");
 return;
 }
 //Define a prototype transition to find in the model
 var protoTrans = {widget: spark.widget, event: spark.event, from: myDiagram.selection.first().fromNode.key};
 myDiagram.startTransaction("Delete transition");
 var transition = this.getTransition(protoTrans);
 myDiagram.model.setDataProperty(transition, "widget", "");
 myDiagram.model.setDataProperty(transition, "event", "");
 myDiagram.commitTransaction("Delete transition");
 };
 DiagramModel.prototype.setCurrentTransition = function(spark){
 var transition = {};
 //Is really a transition selected
 if(myDiagram.selection.first()===null || myDiagram.selection.first().fromNode===null){
 console.error("Transition not selected");
 return;
 }
 //Define a prototype transition to find in the model
 var protoTrans = {widget: "", event: "", from: myDiagram.selection.first().fromNode.key};
 myDiagram.startTransaction("Set transition");
 var transition = this.getTransition(protoTrans);
 myDiagram.model.setDataProperty(transition, "widget", spark.widget);
 myDiagram.model.setDataProperty(transition, "event", spark.event);
 myDiagram.commitTransaction("Set transition");
 };
 DiagramModel.prototype.modifyTransition = function(oldSpark, newSpark){
 //Define a prototype transition to find in the model
 var protoTrans = {widget: oldSpark.widget, event: oldSpark.event, from: myDiagram.selection.first().fromNode.key};
 myDiagram.startTransaction("Modify transition");
 var transition = this.getTransition(protoTrans);
 myDiagram.model.setDataProperty(transition, "widget", newSpark.widget);
 myDiagram.model.setDataProperty(transition, "event", newSpark.event);
 myDiagram.commitTransaction("Modify transition");

 };*/
DiagramModel.prototype.modifyCurrentTransition = function(spark){
	var protoWidget = "", protoEvent = "";
	if(!myDiagram.selection.first()){
		return;
	}
	if(!myDiagram.selection.first().fromNode){
		return;
	}
	if(!myDiagram.selection.first().toNode){
		return;
	}
	if(myDiagram.selection.first().widget){
		protoWidget = myDiagram.selection.first().widget;
	}
	if(myDiagram.selection.first().event){
		protoEvent = myDiagram.selection.first().event;
	}
	var protoTrans = {widget: protoWidget, event: protoEvent,
		from: myDiagram.selection.first().fromNode.key,
		to: myDiagram.selection.first().toNode.key};
	myDiagram.startTransaction("Modify transition");
	var transition = this.getTransition(protoTrans);
	myDiagram.model.setDataProperty(transition, "widget", spark.widget);
	myDiagram.model.setDataProperty(transition, "event", spark.event);
	myDiagram.commitTransaction("Modify transition");
};

DiagramModel.prototype.reloadSparks = function(){
	//Ensure that is a transition selected
	if(!myDiagram.selection.first()){
		return;
	}
	if((myDiagram.selection.first().actions!==null) && (typeof myDiagram.selection.first().actions) !== "undefined"){
		return;
	}
	//Get sparks for the From Node State of the selected transition
	var sparks = [];
	var links = myDiagram.model.linkDataArray;
	var i;
	for(i=0; i<links.length; i++){
		var link = links[i];
		if(link.from === myDiagram.selection.first().fromNode.key){
			if(link.widget && link.event){
				sparks.push({widget: link.widget, event: link.event});
			}
			else{
				sparks.push({widget: "", event: ""});
			}
		}
	}
	//Apply changes on the constraint
	DiagramConstraints.setSparks(sparks);
	//Debugging messages
	console.log(CanvasConstraints.getSparks());
};

DiagramModel.prototype.reloadState = function(){
	DiagramConstraints.setCurrentState(DiagramUtils.stateActionsToArray(myDiagram.selection.first().actions));
	DiagramConstraints.setSparks(null);
};
/*DiagramModel.prototype.applyTransitionChanges = function(currentSparks, oldSparks){
 var i;
 //If oldsparks have a previous value (the change wasn't produce on STD diagram, was done on Canvas)
 if(!oldSparks || !currentSparks){
 return;
 }
 //If oldSparks is lower than current -> no change was made
 if(oldSparks.length<currentSparks.length){
 //this.setCurrentTransition(currentSparks[currentSparks.length-1]);//Taken last element
 return;
 }
 //If oldSparks is greater than current -> a spark was deleted
 else if(oldSparks.length>currentSparks.length){
 for(i=0; i<currentSparks.length;i++){
 if(!DiagramUtils.equalSparks(oldSparks[i],currentSparks[i])){
 this.unsetTransition(oldSparks[i]);
 return;
 }
 }
 }
 //If oldSparks are equal to current -> a spark was modified
 else{
 for(i=0; i<currentSparks.length; i++){
 if(!DiagramUtils.equalSparks(currentSparks[i],oldSparks[i])){
 this.modifyTransition(oldSparks[i], currentSparks[i]);
 }
 }
 }
 };*/

/*Work with widgets*/


DiagramModel.prototype.deleteWidget = function(widget){
	myDiagram.startTransaction("Delete Widget "+widget);
	var model = myDiagram.model;
	var transitions = model.linkDataArray;
	var states = model.nodeDataArray;
	//Unset transition values which have widget like transition widget
	for(var i=0;i<transitions.length;i++){
		if(transitions[i].widget===widget){
			myDiagram.model.setDataProperty(transitions[i], "widget", "");
			myDiagram.model.setDataProperty(transitions[i], "event", "");
		}
	}
	//Remove widget from states
	for(var i=0;i<states.length;i++){
		var actions = states[i].actions;
		var actionsArray = DiagramUtils.stateActionsToArray(actions);
		//Look if is in array
		var newActionsArray = [];
		for(var j=0;j<actionsArray.length;j++){
			if(actionsArray[j].widget!==widget){//If widget isn't in the action we don't delete it
				newActionsArray.push(actionsArray[j]);
			}
		}
		var newActions = DiagramUtils.stateActionsToString(newActionsArray);
		myDiagram.model.setDataProperty(states[i], "actions", newActions);
	}
	myDiagram.commitTransaction("Delete Widget "+widget);
};

DiagramModel.prototype.propagateWidget = function(widget){
	//Check if is an state selected
	if(!myDiagram.selection.first()){
		return;
	}
	if(myDiagram.selection.first().key===null){
		return;
	}
	var selectedStateKey = myDiagram.selection.first().key;
	var states = myDiagram.model.nodeDataArray;
	var i;
	myDiagram.startTransaction("Propagate widget");
	for(i=0; i<states.length;i++){
		if(states[i].key!==selectedStateKey){
			var newActions = DiagramUtils.addNewAction(states[i].actions, {widget:widget, action:"Enable"});
			myDiagram.model.setDataProperty(states[i], "actions", newActions);
		}
	}
	myDiagram.commitTransaction("Propagate widget");
};
//DiagramModel.widgets = DiagramConstraints.getWidgetsCJS().get();
DiagramModel.events = ("onClick onDoubleclick onMouseenter onMouseleave").split(" ");
DiagramModel.actions = ("enable disable collapse").split(" ");

var DiagramController = function(){this.initialize();};
DiagramController.prototype.initialize = function(){
	//Define handlers for Canvas->STD comunication
	DiagramConstraints.bindCurrentState(function(){//When something change on current state widget actions
		new DiagramModel().setActionsOnCurrentState(DiagramUtils.stateActionsToString(DiagramConstraints.getCurrentState()));
	});
	DiagramConstraints.bindCurrentSpark(function(){//When sparks has been changed
		//new DiagramModel().applyTransitionChanges(DiagramConstraints.getSparks(), DiagramConstraints.getPreviousSparks());
		//Apply changes on STD model
		new DiagramModel().modifyCurrentTransition(DiagramConstraints.getCurrentSpark());
		//Reload the sparks
		new DiagramModel().reloadSparks();
	});
	DiagramConstraints.bindWidgets(function(){//When widgets list changed
		var deletedWidget, insertedWidget;
		if(DiagramConstraints.getWidgets().length<DiagramConstraints.getPreviousWigdets().length){//A widget was deleted
			deletedWidget = DiagramUtils.whoIsDeletedElement(DiagramConstraints.getWidgets(), DiagramConstraints.getPreviousWigdets(), DiagramUtils.equalWidgets);
			new DiagramModel().deleteWidget(deletedWidget);
		}
		else if(DiagramConstraints.getWidgets().length>DiagramConstraints.getPreviousWigdets().length){//A widget was inserted
			insertedWidget = DiagramConstraints.getWidgets()[DiagramConstraints.getWidgets().length-1];
			new DiagramModel().propagateWidget(insertedWidget);
		}
		new DiagramModel().reloadState();
	});
};
DiagramController.prototype.setActions = function(actions){
	var model = new DiagramModel();
	model.setActionsOnCurrentState(actions);
};

var DiagramView = function(){};
DiagramView.load = function (){
	new DiagramController();
	myDiagram.model = go.Model.fromJson(JSON.stringify(DiagramModel.prototype.map));
	myDiagram.undoManager.isEnabled = true;
	myDiagram.select(myDiagram.findNodeForData(myDiagram.model.nodeDataArray[0]));
};

DiagramView.init = init;

/*var AbstractSelector = function(){};
 AbstractSelector.prototype.selector=function(){};
 AbstractSelector.prototype.show = function(){};
 AbstractSelector.prototype.hide = function(){};*/

/*var EventSelector = function(){this.create();};
 EventSelector.prototype = new AbstractSelector();
 EventSelector.prototype.selector = function(){
 var customEditor = document.createElement("select");
 var op;
 var list = ["onClick", "onKeyUp", "onLoad", "onMouseEnter"];
 var l = list.length;
 for (var i = 0; i < l; i++) {
 op = document.createElement("option");
 op.text = list[i];
 op.value = list[i];
 customEditor.add(op, null);
 }
 return customEditor;
 };
 EventSelector.prototype.create= function(){
 var customText = this.selector();
 customText.onActivate = function()
 {
 customText.addEventListener("keydown", function(e) {
 var keynum = e.which;
 var tool = customText.textEditingTool;
 if (tool === null) return;
 if (keynum == 13) { // Accept on Enter
 tool.acceptText(go.TextEditingTool.Enter);
 return;
 } else if (keynum == 9) { // Accept on Tab
 tool.acceptText(go.TextEditingTool.Tab);
 e.preventDefault();
 return false;
 } else if (keynum === 27) { // Cancel on Esc
 tool.doCancel();
 if (tool.diagram) tool.diagram.focus();
 }
 }, false);
 var loc = customText.textEditingTool.textBlock.getDocumentPoint();
 var pos = myDiagram.transformDocToView(loc);
 console.log(pos.x + " " + pos.y);
 customText.style.left = pos.x + "px";
 customText.style.top  = pos.y + "px";
 };
 };*/

/*var WidgetSelector = function(){this.create();};
 WidgetSelector.prototype = new AbstractSelector();
 WidgetSelector.prototype.selector = function(){
 var customEditor = document.createElement("select");
 var op;
 var list = DiagramConstraints.getWidgetsCJS().get();
 var l = list.length;
 for (var i = 0; i < l; i++) {
 op = document.createElement("option");
 op.text = list[i];
 op.value = list[i];
 customEditor.add(op, null);
 }
 return customEditor;
 };
 WidgetSelector.prototype.create= function(){
 var customText = this.selector();
 customText.onActivate = function()
 {
 customText.addEventListener("keydown", function(e) {
 var keynum = e.which;
 var tool = customText.textEditingTool;
 if (tool === null) return;
 if (keynum == 13) { // Accept on Enter
 tool.acceptText(go.TextEditingTool.Enter);
 return;
 } else if (keynum == 9) { // Accept on Tab
 tool.acceptText(go.TextEditingTool.Tab);
 e.preventDefault();
 return false;
 } else if (keynum === 27) { // Cancel on Esc
 tool.doCancel();
 if (tool.diagram) tool.diagram.focus();
 }
 }, false);
 var loc = customText.textEditingTool.textBlock.getDocumentPoint();
 var pos = myDiagram.transformDocToView(loc);
 console.log(pos.x + " " + pos.y);
 customText.style.left = pos.x + "px";
 customText.style.top  = pos.y + "px";
 };
 };*/


//Initialize the diagram
DiagramView.init();

/*DiagramConstraints.bindFunctionCurrentState(function(){
 //Detect what is the diference
 var currentState = DiagramConstraints.getCurrentStateCJS().get();
 var lastAction = currentState.actions.slice(-1)[0];
 var controller = new DiagramController();
 //Do change on the diagram
 controller.addNewAction(lastAction);
 });*/

//Do a set of a state actions
function prueba()
{
	CanvasConstraints.setCurrentState([{widget:"W2", action:"Deselect"},{widget:"W3", action:"Select"},{widget:"W4", action:"Select"}]);
	CanvasConstraints.setWidgets(["W2", "W3", "W4"]);
}

//Do a transition set
function prueba2()
{
	var spark = {};
	spark.widget = "W"+Math.floor(Math.random()*10);
	spark.event = "onClick";
	CanvasConstraints.setCurrentSpark(spark);
}

//Do a widget deletion
function prueba3(){
	var widgetPosDelete, widgets;
	widgets = CanvasConstraints.getWidgets();
	widgetPosDelete = Math.floor(Math.random()*widgets.length);
	alert("Deleted widget: "+widgets[widgetPosDelete]);
	widgets.splice(widgetPosDelete, 1);
	CanvasConstraints.setWidgets(widgets);
}

//Generate and save userScript
function saveUserscript(){
	//var augName = prompt("Please insert augmentation name", "Augmentation");
	//var uri = prompt("Please insert URI for augmentation", "");
//	var stdModel = new DiagramModel().getModelJson();
	var valorAugmentation= 'Augmentation';
	var dialog=$("<div id='emergeDialog' title='Generate augmentation'>" +
		"<div><label for='augName'>Augmentation name: *</label><input type='text' id='augName' style='width:350px' value='"+valorAugmentation+"'></input></div>" +
		"<div><label for='augURI'>Augmentation URI: </label><input type='text' id='augURI' style='width:350px' value='"+document.URL+"'></input></div>" +
		"<div><label for='augDescription'>Augmentation description: </label><textarea id='augDescription' style='width:350px'></textarea></div>" +
		"</div>");
	$(document.body).append(dialog);
	$("#emergeDialog").dialog({
		resizable: false,
		modal: true,
		width: 400,
		closeOnEscape: true,
		close: function( event, ui ){
			    $("#emergeDialog").remove();
				setTimeout(function(){canvasmodel.savingExporting=false;},500);
		},
		buttons:[{
			text: "Continue",
			click: function(){
				//TODO check name and URI

				var name = document.getElementById('augName').value, description = document.getElementById('augDescription').value,
					uri = document.getElementById('augURI').value;
				//Clean previous errors
				document.getElementById('augName').style.backgroundColor = 'white';
				document.getElementById('augURI').style.backgroundColor = 'white';
				//Check name is not empty
				if(!name || !(name.indexOf(".")==-1) || !(name.indexOf(",")==-1)){
					document.getElementById('augName').style.backgroundColor = 'red';
					return;
				}
				//Check URI is correct
				if(uri){
					var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
					if(!uri.match(regex)){
						document.getElementById('augURI').style.backgroundColor = 'red';
						return;
					}
				}
				//add icon to widget with events
				var orc=canvasmodel.createOrchestration();
				for(var b=0; b<$("[data_wmwidget_id]").length; b++){
					if($("[data_wmwidget_id]")[b].attributes.data_wmwidget_type.textContent!="original_widgetized"){
						for (var c=0; c<orc.length; c++){
							if(orc[c].actor==$("[data_wmwidget_id]")[b].attributes.title.textContent){
								if(!($("[data_wmwidget_id]")[b].classList.contains("wm_wireIcon"))){
									$("[data_wmwidget_id]")[b].classList.add("wm_wireIcon");
								}
							}
						} 
					}
				}
				var wireProxy=$("#WireIt-TerminalProxy");
				var listaNAmeTerminals=canvasmodel.container.removeAllTerminals();
			//	var usg = new UsgController({name:name, stdModel:stdModel,uri: uri, description: description,widgets:getAnchors()});
				var usg = new UsgController({name:name,uri: uri, description: description, widgets:canvasmodel.getAnchors(orc, false)});
				$("#emergeDialog").remove();
				recolocarWires(wireProxy, listaNAmeTerminals, orc, true, false);
				
				usg.generateUserScript(); 
				setTimeout(function(){canvasmodel.savingExporting=false;},500);
			}
		},
		{
			text: "Cancel",
			click: function(){
				$("#emergeDialog").remove();
				setTimeout(function(){canvasmodel.savingExporting=false;},500);
			}

		}]
	});
	 dialog.parent().zIndex(999999999);

	/*var augName = (new emergeDialog).inputText({title: "Augmentation name", description: "Please insert augmentation name:"})
		.then(function(answer){ return answer});
	alert("Nombre de la aumentacion: "+augName);*/
}

function recolocarWires(wireProxy, listaNAmeTerminals, orc, reinsertarProxy, loading){debugger;
	
	if(canvasmodel.widgetsInserted.length!=listaNAmeTerminals.length*2){
		var nuevaListaTerminales=new Array();
		for(var g=0; g<canvasmodel.widgetsInserted.length; g++){
			nuevaListaTerminales[(g*2)]="input-"+g;
			nuevaListaTerminales[(g*2)+1]="output-"+g;
		}
		listaNAmeTerminals=nuevaListaTerminales;
	}
	
	var contListaNAmeTerminals=0;
				var contadorUndosHechos=0;
				var contadorOriginalWidgetized=0;
				if(reinsertarProxy){
					$("body").append(wireProxy);
				}
				
				for (var i=0; i<canvasmodel.widgetsInserted.length; i++){
					if($("[data_wmwidget_id="+i+"]")[0]!=undefined){
						if($("[data_wmwidget_id="+i+"]")[0].attributes.data_wmwidget_type.value!="original_widgetized"){
							while(canvasmodel.widgetsInserted[i+contadorUndosHechos-contadorOriginalWidgetized]!=undefined && canvasmodel.widgetsInserted[i+contadorUndosHechos-contadorOriginalWidgetized].estadoWidget=="undo"){
								//contListaNAmeTerminals=contListaNAmeTerminals+2;
								contadorUndosHechos++;
							}
						}
						else{
							contadorOriginalWidgetized++;
							while(canvasmodel.widgetsInserted[i+contadorUndosHechos-contadorOriginalWidgetized]!=undefined && canvasmodel.widgetsInserted[i+contadorUndosHechos-contadorOriginalWidgetized].estadoWidget=="undo"){
								//contListaNAmeTerminals=contListaNAmeTerminals+2;
								contadorUndosHechos++;
							}
						}
						if($("[data_wmwidget_id="+i+"]")[0].attributes.data_wmwidget_type.value!="original_widgetized"){
						
							if(loading && $("[data_wmwidget_id="+i+"]")[0].attributes.data_wmwidget_foreigncloned_type.textContent=="complex"){
								$("[data_wmwidget_id="+i+"]")[0].shadowRoot.appendChild($("<content>")[0]);
							}
							canvasmodel.nuevasFlechas([$("[data_wmwidget_id="+i+"]")[0]], listaNAmeTerminals[contListaNAmeTerminals], listaNAmeTerminals[contListaNAmeTerminals+1]);
							contListaNAmeTerminals=contListaNAmeTerminals+2;
						}else{
							if($("[data_wmwidget_id="+i+"]")[1]!=undefined){
								canvasmodel.nuevasFlechas([$("[data_wmwidget_id="+i+"]")[1]], listaNAmeTerminals[contListaNAmeTerminals], listaNAmeTerminals[contListaNAmeTerminals+1]);}
								contListaNAmeTerminals=contListaNAmeTerminals+2;
						}
					}else{// cuando hay unods hechos
						contListaNAmeTerminals=contListaNAmeTerminals+2;
					}
				}
				for (var h=0; h<orc.length; h++){
					addWires("input-"+orc[h].idactor, "output-"+orc[h].idreactor, orc[h].action);
					canvasmodel.insertConditionalIconCarryon(orc[h]);
				}	
}

function addWires(E, G, action){
	var t1 = canvasmodel.container.getTerminal(E);
    var t2 = canvasmodel.container.getTerminal(G);
    var nWire = new WireIt.BezierArrowWire(t1,t2, canvasmodel.container.el, {width: 1,
					label: action,
					labelStyle: { fontSize: "100%" },
					labelEditor: {type: 'select', choices: ['mouseEnter', 'click', 'dbClick'] },					
					xtype: "WireIt.BezierArrowWire"});
    nWire.redraw();
}

function saveAugmentation(){debugger;
	//var diagram=DiagramModel.prototype.getModelString();
	var orc=canvasmodel.createOrchestration();
	var wireProxy=$("#WireIt-TerminalProxy");
	var listaNAmeTerminals=canvasmodel.container.removeAllTerminals();
	var anchor=canvasmodel.getAnchors(orc, true);
	if(document.URL[document.URL.length-1]=="/"){
		var urlSave=document.URL+"*";
	}else{
		var urlSave=document.URL+"/*";
	}

	
//	canvasmodel.getProjectName(function(name){	
//		if(name!=""){
			var projects = {"ProjectName": "Makeup"+new Date().getTime(), "type":"Save", "terminales":listaNAmeTerminals, "widgetsInserted": canvasmodel.widgetsInserted, "urlReal":document.URL,"orc":orc, "anchor": anchor, "url": urlSave}; 
			recolocarWires(wireProxy, listaNAmeTerminals, orc, true, false);
			setTimeout(function(){canvasmodel.savingExporting=false;},500);
			return projects;
/*		}
		else{
			recolocarWires(wireProxy, listaNAmeTerminals, orc, true, false);
			setTimeout(function(){canvasmodel.savingExporting=false;},500);
		}*/
//	});
}


function makeup(project){
		var anchor=project.anchor;
		var terminals=project.terminales;
		var orc=project.orc;
		canvasmodel.widgetsInserted=project.widgetsInserted;
		canvasmodel.putNodesAnchors(anchor);
		canvasmodel.numerodeWidget=canvasmodel.widgetsInserted.length;
		//recolocarWires(null, terminals, orc, false, true);
		canvasmodel.eliminarEventos();
		canvasmodel.artivarEventos();	
		//Este serTimeout esta para evitar q haya parpadeos excesivos despues del carryon. Esperamos a q acabe todo el proceso para activar todo de nuevo. Al principio puede haber 2sgs de parpadeo	
		setTimeout(function(){
			recolocarWires(null, terminals, orc, false, true);
			canvasmodel.eliminarEventos();
			canvasmodel.artivarEventos(); }, 100);
}

function deployAugmentation(save){
/*		var valorAugmentation= 'Augmentation';
	var dialog=$("<div id='emergeDialog' title='Generate augmentation'>" +
		"<div><label for='augName'>Augmentation name: *</label><input type='text' id='augName' style='width:350px' value='"+valorAugmentation+"'></input></div>" +
		"<div><label for='augURI'>Augmentation URI: </label><input type='text' id='augURI' style='width:350px' value='"+document.URL+"'></input></div>" +
		"<div><label for='augDescription'>Augmentation description: </label><textarea id='augDescription' style='width:350px'></textarea></div>" +
		"</div>");
	$(document.body).append(dialog);
	$("#emergeDialog").dialog({
		resizable: false,
		modal: true,
		width: 400,
		closeOnEscape: true,
		close: function( event, ui ){
			    $("#emergeDialog").remove();
				setTimeout(function(){canvasmodel.savingExporting=false;},500);
		},
		buttons:[{
			text: "Continue",
			click: function(){
				//TODO check name and URI
*/
			//	var name = document.getElementById('augName').value, description = document.getElementById('augDescription').value,
			//		uri = document.getElementById('augURI').value;
				//Clean previous errors
			//	document.getElementById('augName').style.backgroundColor = 'white';
			//	document.getElementById('augURI').style.backgroundColor = 'white';
				//Check name is not empty
		/*		if(!name || !(name.indexOf(".")==-1) || !(name.indexOf(",")==-1)){
					document.getElementById('augName').style.backgroundColor = 'red';
					return;
				}
				//Check URI is correct
				if(uri){
					var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
					if(!uri.match(regex)){
						document.getElementById('augURI').style.backgroundColor = 'red';
						return;
					}
				}*/
				//add icon to widget with events
					
					
					var uri;//=generalizarURL(document.URL);
			 		 var partesUrl=scoping(document.URL);
			 		 
					var orc=canvasmodel.createOrchestration();
					for(var b=0; b<$("[data_wmwidget_id]").length; b++){
						if($("[data_wmwidget_id]")[b].attributes.data_wmwidget_type.textContent!="original_widgetized"){
							for (var c=0; c<orc.length; c++){
								if(orc[c].actor==$("[data_wmwidget_id]")[b].attributes.title.textContent){
									if(!($("[data_wmwidget_id]")[b].classList.contains("wm_wireIcon"))){
										$("[data_wmwidget_id]")[b].classList.add("wm_wireIcon");
									}
								}
							} 
						}
					}debugger;
					var wireProxy=$("#WireIt-TerminalProxy");
					var listaNAmeTerminals=canvasmodel.container.removeAllTerminals();
				//	var usg = new UsgController({name:name, stdModel:stdModel,uri: uri, description: description,widgets:getAnchors()});
					//var usg = new UsgController({name:"Meakeup"+new Date().getTime(),uri: uri, widgets:canvasmodel.getAnchors(orc, false)});
					$("#emergeDialog").remove();
			//		recolocarWires(wireProxy, listaNAmeTerminals, orc, true, false);
			 		 //var project = {"usg": usg.model.augInfo};
			 		 var anchors=canvasmodel.getAnchors(orc, false);
			 		 var hayQuePreguntarUsuario=false;
			 		 if(anchors.isAComplexWidget){
			 		 	if(partesUrl.length<5){//tener en cuenta q el // es un elemento mas en el array
							uri=recomponerUrlNoComplex(partesUrl);//si la URL es pequena funciona igual q si no fuera complex
						}else{
							hayQuePreguntarUsuario=true;
							var listaUrls=recomponerURLComplex(partesUrl);
							
							
							
							var dialogo=$("<div id='dialogo'></div>");
    $(document.body).append(dialogo);
    dialogo.load(chrome.extension.getURL("parts/scoping.html"),function(){
    	var posMejorScoping=recomendacionScoping(listaUrls);
    	for(var j=0; j<listaUrls.length; j++){
    		if(j==posMejorScoping){
    			$("#formularioScoping").append('<input type="radio" class="urlScoping" name="urlScoping" value="numero'+j+'" checked>'+listaUrls[j]+'<br>');
    		}else{
    			$("#formularioScoping").append('<input type="radio" class="urlScoping" name="urlScoping" value="numero'+j+'">'+listaUrls[j]+'<br>');
    		}
    	}
    dialogo.dialog({
        resizable: false,
        modal: true,
        close: function( event, ui ){
        	var posChecked=parseInt($("#formularioScoping input[type='radio']:checked").val()[$('.urlScoping')[0].value.length-1]);
        	if(listaUrls[posChecked][listaUrls[posChecked].length-1]=="/"){
        		 uri=listaUrls[posChecked]+"*";
        	} else{
        		 uri=listaUrls[posChecked]+"/*";
        	}
              var project = {"usg": {name:"Makeup"+new Date().getTime(),uri: uri, urlReal:document.URL,type:"Deploy", widgets:anchors}};		 	
									setTimeout(function(){canvasmodel.savingExporting=false;},500);
				dialogo.remove();
            	chrome.extension.sendMessage({operation:"scopingDeploy", estado: JSON.stringify({save:save,deploy:project})}); 
		},
        buttons: {
            "Accept": function(e) {debugger;
            	var posChecked=parseInt($("#formularioScoping input[type='radio']:checked").val()[$('.urlScoping')[0].value.length-1]);   
            	if(listaUrls[posChecked][listaUrls[posChecked].length-1]=="/"){
	        		var uri=listaUrls[posChecked]+"*";
	        	} else{
	        		var uri=listaUrls[posChecked]+"/*";
	        	}
            	 var project = {"usg": {name:"Makeup"+new Date().getTime(),uri: uri, urlReal:document.URL,type:"Deploy", widgets:anchors}};		 	
									setTimeout(function(){canvasmodel.savingExporting=false;},500);
				dialogo.remove();
            	chrome.extension.sendMessage({operation:"scopingDeploy", estado: JSON.stringify({save:save,deploy:project})}); 
            	//return project;
            }
        }
    });
    dialogo.parent().zIndex(1000000000);
    $(".ui-widget-overlay").css({ "z-index": 10000000 });
    dialogo.parent()[0].style.width="auto";
    canvasmodel.eliminarEventos();
    dialogo.find("input").on('keypress', function(e) {
       if(e.keyCode==13){ 
       	 var project = {"usg": {name:"Makeup"+new Date().getTime(),uri: uri, urlReal:document.URL,type:"Deploy", widgets:anchors}};		 	
									setTimeout(function(){canvasmodel.savingExporting=false;},500);
       	dialogo.remove();
       	chrome.extension.sendMessage({operation:"scopingDeploy", estado: JSON.stringify({save:save,deploy:project})}); 
       //	return project; 
       }
    });
    });
							
							
							
														
							
							
						}
			 		 }else{//no hay complejos
			 		 	 uri=recomponerUrlNoComplex(partesUrl);
			 		 }
			 		 if(!hayQuePreguntarUsuario){
			 		 var project = {"usg": {name:"Makeup"+new Date().getTime(),uri: uri, urlReal:document.URL,type:"Deploy", widgets:anchors}};		 	
						setTimeout(function(){canvasmodel.savingExporting=false;},500);
						}else{
							 var project = {"usg": {name:"Makeup"+new Date().getTime(),uri: uri, urlReal:document.URL,type:"Deploy", widgets:anchors}};		 	
									setTimeout(function(){canvasmodel.savingExporting=false;},500);
						}
					return project;
				//usg.generateUserScript(); 
				
	/*		}
		},
		{
			text: "Cancel",
			click: function(){
				$("#emergeDialog").remove();
				setTimeout(function(){canvasmodel.savingExporting=false;},500);
			}

		}]
	});
	 dialog.parent().zIndex(999999999);*/
	
}

function recomendacionScoping(listaUrls){
	var puntuacionListaUrls=new Array();
	for(var a=0; a<listaUrls.length; a++){
		puntuacionListaUrls[a]=0;
	}
	var pageLinks=$("a");
	for(var i=0; i<pageLinks.length; i++){
	var cachosUrl=scoping(pageLinks[i].href);
	var partesUrl=recomponerURLComplexUserSelection(cachosUrl);
		for(var j=0; j<listaUrls.length; j++){
			for (var k=0; k<partesUrl.length; k++){
				if(listaUrls[j]==partesUrl[k]){
					puntuacionListaUrls[j]++;
				}
			}
		}
	}
	var bestPos=0;
	for(t=0; t<puntuacionListaUrls.length; t++){
		if(puntuacionListaUrls[t]>0){
			bestPos=t;
		}
	}
	return bestPos;
}


function scoping(url){//la ultima parte de la URL no se guarda xq se sustituye por el *
	var partesUrl= new Array();
	var posAnterior=0;
	for (var i=0; i<url.length+1; i++){
		if(url.charAt(i)=='/' || url.charAt(i)==""){
			if(!(url.charAt(url.length-1)=="/" && i==url.length)){
				partesUrl.push(url.substring(posAnterior,i));
				posAnterior=i+1;
			}
		}
	}
	return partesUrl;
}

function recomponerURLComplexUserSelection(partesUrl){
	var urls=new Array();
	var url=partesUrl[0];
	for(var i=1; i<partesUrl.length; i++){
		if(partesUrl[i]==""){
			url=url+"/";
		}else{
			url=url+"/"+partesUrl[i];
		}
		if(i>1){
			urls.push(url);
		}
	}
	return urls;
}

function recomponerURLComplex(partesUrl){
	var urls=new Array();
	var url=partesUrl[0];
	for(var i=1; i<partesUrl.length-1; i++){
		if(partesUrl[i]==""){
			url=url+"/";
		}else{
			url=url+"/"+partesUrl[i];
		}
		if(i>1){
			urls.push(url);
		}
	}
	return urls;
}

function recomponerUrlNoComplex(partesUrl){
	var url=partesUrl[0];
	var limiteURL;//si la url solo tiene el dominio
	if(partesUrl.length<4){
		limiteURL=3;
	}else{
		limiteURL=partesUrl.length-1;
	}
	for(var i=1; i<limiteURL; i++){
		if(partesUrl[i]==""){
			url=url+"/";
		}else{
			url=url+"/"+partesUrl[i];
		}
	}
	url=url+"/*";
	return url;
}

function generalizarURL(url){
	var sliceAnteiores =2;
	var posSlice=0;
	for(var i=0; i<url.length; i++){
		if(url.charAt(i)=='/'){
			if(sliceAnteiores==0){
				posSlice=i;
				sliceAnteiores--;
			}else{
				sliceAnteiores--;
			}
		}
	}
	url=url.substring(0,posSlice+1);
	url=url+"*";
	return url;
};


function generalizarURL(url){
	
	var sliceAnteiores =2;
	var posSlice=0;
	for(var i=0; i<url.length; i++){
		if(url.charAt(i)=='/'){
			if(sliceAnteiores==0){
				posSlice=i;
				sliceAnteiores--;
			}else{
				sliceAnteiores--;
			}
		}
	}
	url=url.substring(0,posSlice+1);
	url=url+"*";
	return url;
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
	if(request.op=="saveUserscript"){
		canvasmodel.savingExporting=true;
		saveUserscript();
	}
	if(request.op=="saveAugmentation"){
		canvasmodel.savingExporting=true;
		var save=saveAugmentation();
		sendResponse({save:save,exportar:request.export,urlActual:document.URL});
	}
/*	if(request.op=="restoreAugmentation"){
//		prueba6(request.projectName);
	}*/
	if(request.op=="deployMakeup"){
		canvasmodel.savingExporting=true;debugger;
		var save=saveAugmentation();
		var deploy=deployAugmentation(save);
		//sendResponse(JSON.stringify({save:save,deploy:deploy}));
		debugger;
	/*	if(deploy){//algo debo poner aqui
			sendResponse(JSON.stringify({save:save,deploy:deploy}));
		}else{*/
			sendResponse(JSON.stringify({save:save,deploy:deploy}));
	//	}
		
	}
	if(request.op=="makeUp"){debugger;
		makeup(request.project);
	}
	/*if(request.op=="exportarMakeup"){
		canvasmodel.savingExporting=true;debugger;
		var save=saveAugmentation();
		sendResponse(save,request.export,document.URL);
	}*/
});
/*var emergeDialog = function(){};

emergeDialog.prototype.inputText = function(options){
	
	var defaultValue = options.defaultValue?options.defaultValue:"";
	var dialog = "<div id='emergeDialog'><label for='inputed'>"+options.description+
		"</label><input type='text' id='inputed'>"+defaultValue+"</input></div>";
	var returnable = null;
	$(document.body).append(dialog);
	var defer = $.Deferred();
	$("#emergeDialog").dialog({
		resizable: false,
		height: 140,
		modal: true,
		title: options.title,
		closeOnEscape: true,
		buttons : {
			"Continue" : function(){
			
				if(typeof options.continueCheck !== "undefined"){
					if(options.continueCheck(document.getElementById('inputed').value)){
						defer.resolve(document.getElementById('inputed').value);
					}
					else{
						defer.resolve(null);
					}
				}
				else{
					defer.resolve(document.getElementById('inputed').value);
				}
				$( this ).dialog( "close" );
			},
			"Cancel" : function(){
				
				defer.resolve(null);
				$( this ).dialog( "close" );
			}
		}
	});
	return defer.promise();
};*/