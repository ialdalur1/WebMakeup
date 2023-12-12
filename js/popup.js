
//estados: none, predesign, design, deploy
window.addEventListener("load", cargar, true);
var estado="none";
var onRequestHandler=null;
var url=null;
var Projects=null;
var Deploys=null;

onRequestHandler=function(req, msg) {
    if(req.operation!="currentWebPageStatusResponse") return;
    chrome.extension.onRequest.removeListener(onRequestHandler);
    cargarMenu(req.editorLoaded,req.isInProject,req.isInDeploy);
};

function cargar(){
	$( "#popup" ).menu();
	$( "#importexport" ).menu();
	desactivarTodos();

	document.getElementById("newProject").addEventListener("click", openNewProject, false);
	//document.getElementById("saveScr").addEventListener("click", saveUserscript, false);
	                             //document.getElementById("saveAug").addEventListener("click", saveAugmentation, false);
	//document.getElementById("restoreAug").addEventListener("click", changePannel, false);
	document.getElementById("wm_back").addEventListener("click", back, false);
	
	
	document.getElementById("wm_deploy").addEventListener("click", deployMakeup, false);
	document.getElementById("wm_makeup").addEventListener("click", makeUp, false);
	document.getElementById("wm_delete").addEventListener("click", deleteProject, false);
	document.getElementById("wm_import").addEventListener("click", importProject, false);
	document.getElementById("wm_export").addEventListener("click", exportProject, false);
	chrome.extension.onRequest.addListener(onRequestHandler);	
	chrome.extension.sendRequest({ operation: 'currentWebPageStatus' });
}

function cargarMenu(editorCargado, isInProject, isInDeploy){
	 if(isInProject){estado="predesign";}
	 if(editorCargado){estado="design";}
	 if(isInDeploy){estado="deploy";}
	 habilitarDesabilitarBotonesMenu();
}

function activarTodos(){
	$( "#newProject" ).removeClass( "ui-state-disabled" );
	$( "#saveAug" ).removeClass( "ui-state-disabled" );
	$( "#wm_deploy" ).removeClass( "ui-state-disabled" );
	$( "#wm_makeup" ).removeClass( "ui-state-disabled" );
	$( "#wm_delete" ).removeClass( "ui-state-disabled" );
	$( "#wm_import" ).removeClass( "ui-state-disabled" );
	$( "#wm_export" ).removeClass( "ui-state-disabled" );
}

function desactivarTodos(){
	$( "#newProject" ).addClass( "ui-state-disabled" );
	$( "#saveAug" ).addClass( "ui-state-disabled" );
	$( "#wm_deploy" ).addClass( "ui-state-disabled" );
	$( "#wm_makeup" ).addClass( "ui-state-disabled" );
	$( "#wm_delete" ).addClass( "ui-state-disabled" );
	$( "#wm_import" ).addClass( "ui-state-disabled" );
	$( "#wm_export" ).addClass( "ui-state-disabled" );
}

function habilitarDesabilitarBotonesMenu(){debugger;
	activarTodos();
	console.log(estado);
	if(estado=="none"){
		$( "#saveAug" ).addClass( "ui-state-disabled" );
		$( "#wm_deploy" ).addClass( "ui-state-disabled" );
		$( "#wm_makeup" ).addClass( "ui-state-disabled" );
		$( "#wm_delete" ).addClass( "ui-state-disabled" );
		$( "#wm_export" ).addClass( "ui-state-disabled" );
	}else if(estado=="design"){
		$( "#newProject" ).addClass( "ui-state-disabled" );
		$( "#wm_makeup" ).addClass( "ui-state-disabled" );
		$( "#wm_import" ).addClass( "ui-state-disabled" );
		$( "#wm_export" ).addClass( "ui-state-disabled" );
	}else if(estado=="predesign"){
		$( "#newProject" ).addClass( "ui-state-disabled" );
		$( "#wm_deploy" ).addClass( "ui-state-disabled" );
		$( "#saveAug" ).addClass( "ui-state-disabled" );
		$( "#wm_delete" ).addClass( "ui-state-disabled" );
		$( "#wm_export" ).addClass( "ui-state-disabled" );
	}else if(estado=="deploy"){
		$( "#newProject" ).addClass( "ui-state-disabled" );
		$( "#saveAug" ).addClass( "ui-state-disabled" );
		$( "#wm_deploy" ).addClass( "ui-state-disabled" );
	}
}

function importProject(){
 	if(!($( "#wm_import" ).hasClass( "ui-state-disabled" ))){
		//estado="deploy";
		chrome.extension.sendMessage({operation:"importMakeup", estado: estado}); 
		window.close();	
	}
}

function exportProject(){
	if(!($( "#wm_export" ).hasClass( "ui-state-disabled" ))){
		//estado="deploy";
		chrome.extension.sendMessage({operation:"exportMakeup", estado: estado}); 
		window.close();	
	}
}

function deployMakeup(){
	if(!($( "#wm_deploy" ).hasClass( "ui-state-disabled" ))){
		estado="deploy";
		chrome.extension.sendMessage({operation:"deployMakeup"}); 
		window.close();	
	}
}

function makeUp(){
	if(!($( "#wm_makeup" ).hasClass( "ui-state-disabled" ))){
		estado="design";
		chrome.extension.sendMessage({operation:"makeUp"}); 
		window.close();	
	}
}

function deleteProject(){
	if(!($( "#wm_delete" ).hasClass( "ui-state-disabled" ))){
		estado="none";
		chrome.extension.sendMessage({operation:"deleteAugmentation"}); 
		window.close();	
	}
}

function openNewProject(){
	if(!($( "#newProject" ).hasClass( "ui-state-disabled" ))){
	estado="design";
var d = document.getElementById("newProject");
if(!(d.className.indexOf('cargado') != -1)){
	d.classList.add("cargado");
	chrome.extension.sendMessage({operation:"newAugmentation"}); 
}
	window.close();
	}
}

//Generar el script
function saveUserscript(){
	chrome.extension.sendMessage({operation:"saveUserscript"}); 
	window.close();	
}

//Guardar el estado de la aumentacion
function saveAugmentation(){
	if(!($( "#saveAug" ).hasClass( "ui-state-disabled" ))){
		estado="design";
		chrome.extension.sendMessage({operation:"saveAugmentation"});
		window.close();	
	} 
}

function changePannel(){
	$('#popup').addClass("inactivo");
	$('#popup').removeClass("activo");
	$('#projects').addClass('activo');
	$('#projects').removeClass('inactivo');
	$('#projects').menu("refresh");
}

//Restaurar una aumentacion guardada
function restoreAugmentation(){
	$('.wm_project').click(function(e){
		chrome.extension.sendMessage({operation:"newProject"}); 
		setTimeout(function(){
			var target=$(e.target);
		chrome.extension.sendMessage({operation:"restoreAugmentation", projectName: target[0].text});
		window.close();
		}, 2000); 
	});
	
}

function createProject(ProjectName){
	var nButton=$("<li class='wm_project'><div class='foreignCloneToolButtonDelete'><img src='"+chrome.extension.getURL('images/eliminar.png')+"' style='float:left;' onclick='return false;'></img></div><a href='#'>"+ProjectName+"</a></li>");
	return nButton; 
}

function back(){
	$('#popup').addClass("activo");
	$('#popup').removeClass("inactivo");
	$('#projects').addClass('inactivo');
	$('#projects').removeClass('activo');
}

function deleteWidgetFromWidgetList(){
	var projectToDelete;
	$('.foreignCloneToolButtonDelete').click(function(e){	
		e.preventDefault();
		e.stopPropagation();
		var elem=$(e.target);
		while(elem[0].tagName!="LI"){
			elem=[elem[0].parentNode];
		}
		projectToDelete=getProjectName(elem[0].innerText);
		$(elem).remove();
		chrome.storage.local.get("Projects",function (obj){
			var projectAEliminar;
			var tempWidgetList=obj["Projects"]!=null?obj["Projects"]:[];
			for(var i=0; i<tempWidgetList.length; i++){
				if(tempWidgetList[i].ProjectName==projectToDelete){
					projectAEliminar=i;
				}
			 }
			// var seBorrara= tempWidgetList.length-(tempWidgetList+1);
			 var deleted=tempWidgetList.splice(projectAEliminar,1);
			 chrome.storage.local.set({"Projects":tempWidgetList});	
		      }); 
		});
}

function getProjectName(name){
	var desde=0;
	var hasta=0;
	var haHabidoSaltoDeLinea= false;
	for(var i=0; i<name.length; i++){
		if(name[i]=="\n"){
			if(!haHabidoSaltoDeLinea){
				desde=hasta+1;
			}
			hasta=i;
			haHabidoSaltoDeLinea=true;
		}
	}
		return name.substring(desde,hasta);
};

