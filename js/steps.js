//@ sourceURL=steps.js

var observerObject;
var numPaso=0;

function main(){
		hacerPasos();
		observerObject = new MutationObserver(function(mutationRecordsList){
			hacerPasos();	
		});
		observeChange();	
}
/*window.addEventListener("message", function(ev){
	
	try{
		pasos=JSON.parse(ev.data);
		main();
	}catch(e){
		console.log(e.message);
	}
}, false);*/

function observeChange(){
  observerObject.observe(document.body, { 
    attributes: true,
   // attributeFilter: true,
    attributeOldValue: true,
    childList: true,
    characterData: true,
    subtree: true,
    characterDataOldValue: true
  });
}

function hacerPasos(){
		if(numPaso<pasos.length){//ten en cuenta q el ultimo elemento en pasos es la URL
			//var el=$(pasos[numPaso].elem);
			var div = document.createElement('div');
			div.innerHTML = pasos[numPaso].elem;
			var el = div.childNodes;
			var tagName=el[0].tagName.toLowerCase();
			//var elems=$(tagName);
			var elems=document.getElementsByTagName(tagName);
			var nodo=document.evaluate(pasos[numPaso].xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
			if(nodo==null){
				for(var i=0; i<elems.length; i++){
					if(elems[i].textContent==el[0].textContent){
						elems[i].click();
						numPaso++;	
					}
				}
			}else{
				nodo.click();
				numPaso++;
			}
			}
			else{
				observerObject.disconnect();
			}
		}

if(url==document.head.baseURI || url==document.URL){
	main();
}
