var levDist = function(s, t) {
    var d = []; //2d matrix
    var n = s.length;
    var m = t.length;
    if (n == 0) return m;
    if (m == 0) return n;
    for (var i = n; i >= 0; i--) d[i] = [];
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);
        for (var j = 1; j <= m; j++) {
            if (i == j && d[i][j] > 4) return n;
            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;
            if (b < mi) mi = b;
            if (c < mi) mi = c;
            d[i][j] = mi;
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    return d[n][m];
};

function getDomHash(element) {
	if(element.attributes==undefined || element.attributes.data_wmwidget_id==undefined){
        var nodeType = element.nodeType, nodeName = element.nodeName, hash = '';
        if (nodeType === 3 || nodeType === 4) {
            return '#';
        } else if (nodeType === 1 || nodeType === 9) {
            hash += '<' + nodeName + '>';
            for (element = element.firstChild; element; element = element.nextSibling) {
                hash += getDomHash(element);
            }
            hash +=
            '</' + nodeName + '>';
            hash = hash.replace(/##+/g, '#');
        }
       }else{
       	hash="";
       }
        return hash;
}

function crearForeignCloneIframe(locationPoint){
    var res;
    var defClone=locationPoint.coordinate[0];
 /*   res=$("<div>").css({width:defClone.end.x-defClone.start.x,height:defClone.end.y-defClone.start.y,overflow:"hidden"});
    var iframe=$("<iframe>").attr({src:locationPoint.url,scrolling:"no"}).css({width:defClone.windowSize.width,height:defClone.windowSize.height,top:-1*defClone.start.y,left:-1*defClone.start.x,border:"0px",overflow:"hidden",position:"relative"});
    res.append(iframe);*/
    res.attr("data-wmwidget-foreign",JSON.stringify(defClone));
    return res;
}

function crearForeignCloneHtmlComplex(elemento, widgetInfo){
	 var res;
	 var idI=0;
	if(elemento._type=="complexCloned"){
	 	var defClone=elemento.locationPoint[0].coordinate[0];
     }else{
	 	var defClone=elemento.locationPoint.coordinate[0]; 
	 }
	 var html=elemento._type=="simpleCloned"?elemento._html:$.map(elemento._html,function(elem){return "<div id='ComplexWidget"+(idI++)+"' class='widgetContainer'>"+elem.html+"</div>";}).join("\n");// elemento._html lista de widgets en el complejo
	 if(widgetInfo!=null){
			for(var i=0; i<widgetInfo.length; i++){
				if(elemento.id==widgetInfo[i].id){
					if(elemento._type=="complexCloned"){
						html="";
						for(var j=0; j<widgetInfo[i].html.length; j++){
							html=html+"<div id='ComplexWidget"+j+"' class='widgetContainer'>"+widgetInfo[i].html[j].html+"</div>";
						}
					}else{
						html=widgetInfo[i].html;
					}	
				}
			}
		}

        res=$("<div>").css({overflow:"auto", display: "inline-block"});
        var shadow=res[0].createShadowRoot();
        shadow.applyAuthorStyles = false;
        shadow.resetStyleInheritance = true;
        shadow.innerHTML="<style type='text/css'>\n.widgetContainer { position:relative; }\n.widgetContainer>*{ position:static !important; }\n</style>"+html;
        var objToDOM={};
        $.extend(true,objToDOM,defClone);
        defClone.widgetType=="simpleCloned"? delete objToDOM.html:$(objToDOM.widgets).map(function(i,wid){delete wid.html;});
        res.attr("data-wmwidget-foreign",JSON.stringify(objToDOM));
     return res;
}


var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    queries = queryString.split("&");

    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
 
    return params;
};
function getKeys(obj, filter) {
    var name,
        result = [];

    for (name in obj) {
        if ((!filter || filter.test(name)) && obj.hasOwnProperty(name)) {
            result[result.length] = name;
        }
    }
    return result;
}
function arrayCompare (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
function form2form(formA, formB) {
    $(':input[name]', formA).each(function() {
        $("[name='" + $(this).attr('name') +"']", formB).val($(this).val());
    });
};
function serializeWithEscape(form) {
        if (!form || form.nodeName !== "FORM") {
                return;
        }
        var i, j, q = [];
        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
                if (form.elements[i].name === "") {
                        continue;
                }
                switch (form.elements[i].nodeName) {
                case 'INPUT':
                        switch (form.elements[i].type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                        case 'button':
                        case 'reset':
                        case 'submit':
                                q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                                break;
                        case 'checkbox':
                        case 'radio':
                                if (form.elements[i].checked) {
                                        q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                                }                                               
                                break;
                        case 'file':
                                break;
                        }
                        break;                   
                case 'TEXTAREA':
                        q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                        break;
                case 'SELECT':
                        switch (form.elements[i].type) {
                        case 'select-one':
                                q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                                break;
                        case 'select-multiple':
                                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                        if (form.elements[i].options[j].selected) {
                                                q.push(form.elements[i].name + "=" + escape(form.elements[i].options[j].value));
                                        }
                                }
                                break;
                        }
                        break;
                case 'BUTTON':
                        switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                                q.push(form.elements[i].name + "=" + escape(form.elements[i].value));
                                break;
                        }
                        break;
                }
        }
        return q.join("&");
};
function addFunctionalityToComplex(node,elemento){debugger;
  var defClone=elemento.bindingPoint;
  if(elemento.bindingPoint.extracts!=undefined){
  var shadow=node.shadowRoot;
  var divInputs=shadow.children[1];
  $(shadow.children[2]).empty();
  $(shadow.children[2]).append('<h2 style="color:blue">LOADING...</h2>');
  //var divInputs=shadow.children[1];
  for (extract in defClone.extracts.extracts){
      var act=defClone.extracts.extracts[extract];
      var binded=false;
      var input=$("input[name='"+extract+"']",divInputs);
      if(act.node!=null){
          var nodeValue=act.node;
          if(act.regexp!=null){
            var matches=new RegExp(act.regexp).exec(nodeValue);
            if(matches!=null&&matches.length>1){
                nodeValue=matches[1];
                if(nodeValue.indexOf(":") > -1){
                	var posCharacter = nodeValue.indexOf(":");
                	nodeValue=nodeValue.substring(0,posCharacter)+nodeValue.substring(posCharacter+1,nodeValue.length);
                }
                binded=true;
            }
          }         
          input.val(nodeValue);
      }
      input.attr("data-wmwidget-binded",binded);
  }  
  /*if($("[data-wmwidget-binded=false]").length==0){
    $(divInputs).css("display","none");
  }*/
  var form=$("form",divInputs);
  var copy=false;
  if((form.length==0&&defClone.extracts.widgets[0].completeForm!=null) || (form[0].action==undefined || form[0].action=="")){
    var artForm=document.createElement("form");
    var mainContainer=divInputs.children[1];
    divInputs.replaceChild(artForm,mainContainer);
    artForm.appendChild(mainContainer);
    copy=true;
    form=$(defClone.extracts.widgets[0].completeForm);
    form2form($(artForm),form);
  }
  form=form[0];

  shadow.addEventListener("submit",function(ev){
    ev.preventDefault();
	ev.stopPropagation();
    if(copy){
        form2form($(artForm),form);   
    }
    handleFunctionalityOnSubmitComplex(form,defClone,shadow);
  },true);  
  handleFunctionalityOnSubmitComplex(form,defClone,shadow);
  }
};
var parametroDelFormulario;
function handleFunctionalityOnSubmitComplex(form,defClone,shadow){
   var params;
   if(defClone.extracts.widgets[0].charset=="ISO-8859-1"){
       params=serializeWithEscape(form);       
   }else{
       params=$(form).serialize();
   }
   parametroDelFormulario=params;
   var url=form.action;
   if(form.method=="post"){url=url.split("?")[0];}
   $.ajax({ //load form url
    type: form.method,
    url: url,
    data: params,
    success: function(data,status,xhr) {debugger;
        var doc=document.implementation.createHTMLDocument();
        doc.documentElement.innerHTML=data;
        var base=doc.createElement("base");
        var loc=xhr.getResponseHeader("Location")!=null?xhr.getResponseHeader("Location"):form.action;
        base.href=loc; //Or Location
        doc.documentElement.firstElementChild.appendChild(base);
        var as=[];
        
        var hrefs=[];
        $("a",doc).each(function(i,a){ //extract urls from page result
            var href=a.href;
            if($.inArray(href,hrefs)==-1){
             as.push(a);
             hrefs.push(href);
            }
        });
        $(defClone.extracts.widgets.slice(1)).each(function(j,widget){ //for each part of complex
            var nodeNew=doc.evaluate(widget.xpath,doc,null, XPathResult.ANY_TYPE, null).iterateNext();  
            if(nodeNew!=null){ //Node found in result page
                refreshWidgetPart(j,shadow,data,loc,widget);        
            }else{ //Navigate through result page
                refreshWidgetFromFormResult(j,widget,doc,hrefs,as,shadow);
            }
        });
    }
    }); 
};
function refreshWidgetFromFormResult(j,widget,doc,hrefs,as,shadow){
    var anchor=document.createElement("a");
    anchor.href=widget.url;
    var url=anchor.pathname;//widget.url;
    var actDist=[];
    var urlSplit=url.split("/").slice(1);
    // Workout syntactic proximity
    $(hrefs).each(function(i,a){
        var anc=document.createElement("a");
        anc.href=a;
        actDist.push(levDist(anc.pathname,url)+1000*Math.abs(anc.pathname.split("/").slice(1).length-urlSplit.length));
    });
    $(hrefs).each(function(i,a){
        if(actDist[i]<1000){
            var anc=document.createElement("a");
            anc.href=a;
            var aSplit=anc.pathname.split("/").slice(1);
            var dis=0;
            for(var ind=0;ind<urlSplit.length;ind++){
             var tDis=levDist(aSplit[ind],urlSplit[ind]);
             dis=tDis==0?dis-100:dis+tDis;
            }
            var q1Params=getKeys(parseQueryString(anchor.search.substr(1))).sort();
            var q2Params=getKeys(parseQueryString(anc.search.substr(1))).sort();
            if(anchor.pathname==anc.pathname){
             if(arrayCompare(q1Params,q2Params)){
               dis=dis-30;
             }else if(q1Params.length==q2Params.length){
                dis=dis-20; 
             }else{
                dis=dis+5*Math.abs(q1Params.length-q2Params.length); 
             }
            }
            actDist[i]=dis;
        }
    });
    refreshWidgetFromForResultIfFine(0,as,actDist,j,shadow,widget,url);

};
function refreshWidgetFromForResultIfFine(intent,as,actDist,j,shadow,widget,url){debugger;
    var index=actDist.indexOf(Math.min.apply(Math,actDist)); //Take best ranked URL
    console.log("Most similar to : "+url+" is "+as[index]);

    $.ajax({ //Load URL 
        type: "GET",
        url: as[index],  
        success: function(data,status,xhr) {
            var doc=document.implementation.createHTMLDocument();debugger;
            doc.documentElement.innerHTML=data;
            var base=doc.createElement("base");
            var loc=xhr.getResponseHeader("Location")!=null?xhr.getResponseHeader("Location"):as[index];
            base.href=loc; //Or Location
            doc.documentElement.firstElementChild.appendChild(base);                                       
            
            var nodeNew=doc.evaluate(widget.xpath,doc,null, XPathResult.ANY_TYPE, null).iterateNext();  //Evaluate XPATH
            if(nodeNew!=null){
                refreshWidgetPart(j,shadow,data,loc,widget);
                }else{
            	riaWidget(widget, as[index], j, shadow, data, loc, intent, as, index, actDist, url);
            	}
          /*  }else if(intent<20){
                as.splice(index,1);
                actDist.splice(index,1);
                refreshWidgetFromForResultIfFine(intent+1,as,actDist,j,shadow,widget,url);
            }else if(intent==20){
            	 setTimeout(function(){
            	 	var nodo='<p class="wm_notFound"><font color="red">'+maneinputComplex(parametroDelFormulario)+' NOT FOUND IN '+maneNameUrl(widget.url)+'</font></p>';
	            	  var div=shadow.getElementById("ComplexWidget"+(j+1));
				        div.innerHTML=nodo;
	            	//  if($(".wm_notFound",shadow.children)[0]==undefined){
			       	//  	var div=shadow.getElementById("ComplexWidget"+(j+1));
			       	//  	div.appendChild($(nodo)[0]);
		       	  //}
		       	  },500);
            }*/
        }                                     
    });
};

function riaWidget(widget, url, j, shadow, data, loc, intent, as, index, actDist, urlAnt){debugger;
	// var res=$("<div>").css({width:widget.wwidth,height:widget.wheight,overflow:"hidden"});
	 var iframe=$("<iframe>").attr({src:url,scrolling:"no"});
	 iframe.css({width:widget.width,height:widget.height,top:-1*widget.top,left:-1*widget.left,border:"0px",overflow:"hidden"});
	 // iframe[0].style.setProperty("position","relative","important");
	//  res.append(iframe);
	 $('body').append(iframe);
	 iframe[0].addEventListener("load",function(e){debugger;
	 	try{
	 		var nodeNew=iframe[0].contentWindow.document.evaluate(widget.xpath, iframe[0].contentWindow.document.body, null, XPathResult.ANY_TYPE, null).iterateNext();
	 	}catch(e){
	 		var nodeNew=null;
	 	}	
	 	if(nodeNew!=null){
	 		// var nHTML=flo.getStyledNode(nodeNew);
            		  setTimeout(function(){
					        var nHTML=flo.getStyledNode(nodeNew);
					        var div=shadow.getElementById("ComplexWidget"+(j+1));
					        div.innerHTML=nHTML;
					        iframe[0].parentNode.removeChild(iframe[0]);},500);

            	}
	            else if(intent<10){
	            	iframe[0].parentNode.removeChild(iframe[0]);
	                as.splice(index,1);
	                actDist.splice(index,1);
	                refreshWidgetFromForResultIfFine(intent+1,as,actDist,j,shadow,widget,urlAnt);
	            }else if(intent==10 || intent>10){
	            	iframe[0].parentNode.removeChild(iframe[0]);
	            	 setTimeout(function(){debugger;
		            	 var nodo='<p class="wm_notFound"><font color="red">'+maneinputComplex(parametroDelFormulario)+' NOT FOUND IN '+maneNameUrl(widget.url)+'</font></p>';
		            	  var div=shadow.getElementById("ComplexWidget"+(j+1));
					        div.innerHTML=nodo;
		            	//  if($(".wm_notFound",shadow.children)[0]==undefined){
				       	//  	var div=shadow.getElementById("ComplexWidget"+(j+1));
				       	//  	div.appendChild($(nodo)[0]);
			       	  //}
			       	  },500);
	            }	        	
	 	},true);
};

function maneinputComplex(name){
	var inicio=-1;
	var final=-1;
	for(var i=0; i<name.length; i++){
		if(name[i]=="=" && inicio==-1){
			inicio=i;
		}
		if(name[i]=="&" && final==-1){
			final=i;
		}
	}
	var devolverInicial=0;
	var devolver="";
	var aux=name.slice(inicio+1, final);
	for(var j=0; j<aux.length; j++){
		if(aux[j]=="+"){
			devolver=devolver+" ";
		}else{
			devolver=devolver+""+aux[j];
		}
	}
	return devolver;
};

function maneNameUrl(url){
	var primero=-1;
	var segundo=-1;
	for(var i=0;i<url.length; i++){
		if(url[i]=="."){
			if(primero==-1){
				primero=i;
			}else if(segundo==-1){
				segundo=i;
			}
		}
	}
	return url.slice(primero+1, segundo);
};

function refreshWidgetPart(j,shadow,data,loc,widget){
    var doc=document.implementation.createHTMLDocument();
    doc.documentElement.innerHTML=data;
    var base=doc.createElement("base");
    base.href=loc;
    doc.documentElement.firstElementChild.appendChild(base);
    var links=doc.querySelectorAll("link[rel=stylesheet]");
    var arr=[];var i=0;for(i=0;i<links.length;i++){arr[i]=links[i];}
    var callback=function(){refreshWidgetPart3(doc,j,shadow,widget);};
    refreshWidgetPart2(arr,j,shadow,widget,callback);                                      
};
function refreshWidgetPart2(links,j,shadow,widget,callback){
    if(links.length>0){
        var link=links[0];
        var restLink=links.slice(1);
        var callb=function(){refreshWidgetPart2(restLink,j,shadow,widget,callback);};
        resolveLinkCSS(link,callb);
    }else{
        callback();
    }                                         
};
function refreshWidgetPart3(doc,j,shadow,widget){
    var frame=document.createElement("iframe");
    frame.sandbox="allow-same-origin";
    document.body.appendChild(frame); 
    frame.style.display="none";frame.style.position="absolute";frame.style.border="0";frame.style.top="0";frame.style.left="0";
    frame.style.width=widget.wwidth+"px";frame.style.height=widget.wheight+"px";
    var destDocument = frame.contentDocument;
    var srcNode = doc.documentElement;
    var newNode = destDocument.importNode(srcNode, true);  
    destDocument.replaceChild(newNode, destDocument.documentElement);
    
    var nodeNew=destDocument.evaluate(widget.xpath,destDocument,null, XPathResult.ANY_TYPE, null).iterateNext();

    setTimeout(function(){
        var nHTML=flo.getStyledNode(nodeNew);
        var div=shadow.getElementById("ComplexWidget"+(j+1));
        div.innerHTML=nHTML;
        frame.parentNode.removeChild(frame);
        /*	for(var i=0; i<$('[data_wmwidget_id]').length;i++){
        		if($('[data_wmwidget_id]')[i].attributes.data_wmwidget_type.value=="complexCloned"){
        			 if($('[data_wmwidget_id]')[i].scrollHeight>$('[data_wmwidget_id]')[i].clientHeight || $('[data_wmwidget_id]')[i].scrollWidth>$('[data_wmwidget_id]')[i].clientWidth){
        			 	if($('[data_wmwidget_id='+i+']')[0].style.display=="block"){
        			 		$('[data_wmwidget_id='+i+']')[0].style.display="initial";
        			 	}
        			 }
        		}
        	}*/
    	},500);
};
function resolveLinkCSS(link,callback){
    console.log("Resolving css: "+link.href);
    $.get(link.href).done(function(css){
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet){
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }       
        link.parentNode.replaceChild(style,link);
    }).always(function(){
        callback();
    });
};

function getAnchoringXpath(elem){
	var xpath;
	for(var i=0; i<elem.anchoringPoint.coordinate.length; i++){
		if(elem.anchoringPoint.coordinate[i]._type=="structureBased"){
			xpath=elem.anchoringPoint.coordinate[i].path;
		}
	}
	return xpath;
}

function getLocationXpath(elem){
	var xpath;
	if(elem._type!="complexCloned"){	
		for(var i=0; i<elem.locationPoint.coordinate.length; i++){
			if(elem.locationPoint.coordinate[i]._type=="structureBased"){
				xpath=elem.locationPoint.coordinate[i].path;
			}
		}
	}else{
		for(var i=0; i<elem.locationPoint.length; i++){
			for(var j=0; j<elem.locationPoint[i].coordinate.length; j++){
				if(elem.locationPoint[i].coordinate[j]._type=="structureBased"){
					xpath=elem.locationPoint[i].coordinate[j].path;
				}
			}
		}
	}
	return xpath;
}

function getAnchoringPixelBased(elem){
	var start, end, size;
	for(var i=0; i<elem.anchoringPoint.coordinate.length; i++){
		if(elem.anchoringPoint.coordinate[i]._type=="pixelBased"){
			start=elem.anchoringPoint.coordinate[i].start;
			end=elem.anchoringPoint.coordinate[i].end;
			size=elem.anchoringPoint.coordinate[i].windowSize;
		}
	}
	var doc = document.documentElement, body = document.body;
	var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
	var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
	var nodoEnPunto=document.elementFromPoint(Math.abs(left-(start.x+(end.x-start.x)/2)), Math.abs(top-(start.y+(end.y-start.y)/2)));
	var nodo=$(nodoEnPunto);
	if(nodoEnPunto!=null){
		var width=nodo.outerWidth();
		var height=nodo.outerHeight();
		while((width<size.width || height<size.height) && (width!=null && height!=null)){
			nodo=nodo.parent();
			width=nodo.outerWidth();
			height=nodo.outerHeight();
		}
	}
	if(width==size.width && height==size.height){
		return nodo[0];
	}else{
		return null;
	}
	
}

function getLocationPixelBased(elem, documento){debugger;
	var start, end, size;
	
	if(elem._type=="complexCloned"){
		for(var i=0; i<elem.locationPoint[1].coordinate.length; i++){
		if(elem.locationPoint[1].coordinate[i]._type=="pixelBased"){
			start=elem.locationPoint[1].coordinate[i].start;
			end=elem.locationPoint[1].coordinate[i].end;
			size=elem.locationPoint[1].coordinate[i].windowSize;
		}
	}
	}else{
	for(var i=0; i<elem.locationPoint.coordinate.length; i++){
		if(elem.locationPoint.coordinate[i]._type=="pixelBased"){
			start=elem.locationPoint.coordinate[i].start;
			end=elem.locationPoint.coordinate[i].end;
			size=elem.locationPoint.coordinate[i].windowSize;
		}
	}
	}
	var doc = documento.documentElement, body = documento.body;
	var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
	var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
	var nodoEnPunto=documento.elementFromPoint(Math.abs(left-(start.x+(end.x-start.x)/2)), Math.abs(top-(start.y+(end.y-start.y)/2)));
	var nodo=$(nodoEnPunto);
	if(nodoEnPunto!=null){
		var width=nodo.outerWidth();
		var height=nodo.outerHeight();
		while((width<size.width || height<size.height) && (width!=null && height!=null)){
			nodo=nodo.parent();
			width=nodo.outerWidth();
			height=nodo.outerHeight();
		}
	}
	if(size.height==height && size.width==width){
		return nodo[0];
	}else{
		return null;
	}
}

function actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo){
	var urlUpdate;
	if(elem._type=="complexCloned"){
		urlUpdate=elem.locationPoint[0].url;
	}else{
		urlUpdate=elem.locationPoint.url;
	}
		$.ajax({ //load form url
		    type: "GET",
		    url: urlUpdate,
		    success: function(data,status,xhr) {
		        var doc=document.implementation.createHTMLDocument();
		        doc.documentElement.innerHTML=data;
		        var base=doc.createElement("base");
		        base.href=urlUpdate;
		        doc.documentElement.firstElementChild.insertBefore(base, doc.documentElement.firstElementChild.firstElementChild);
		        
		        //el nodo se actualiza en el configOfInsertedBis
		        if(elem._type=="hostBased"){
				      configOfInsertedBis(n, elem, docElement, null);
				      configOfInsertedTris(configOfInserted, widgetInfo, doc, elem, n,name);
		        }
		        if(elem._type=="cropped"){
		        	configOfInsertedBis(n, elem, docElement, null);
		       		configOfInsertedTris(configOfInserted, widgetInfo, doc, elem, n,name);
			    }
		        
		     //    var elementoActualizado=doc.evaluate(".//tr[8]/td[@class='weather' and position()=4]/div", doc.body, null, XPathResult.ANY_TYPE, null).iterateNext();
		    if(elem._type=="simpleCloned" || elem._type=="complexCloned"){
		      	var iframe=$("<iframe id='special_widget"+elem.id+"'>");
		     	iframe.append(this);
		     	$(document.body).append(iframe);
		     	var iframeWin = iframe[0].contentWindow;
		     	 var iframeDocument = iframe[0].contentWindow.document;
		     	 iframeDocument.write(doc.documentElement.innerHTML);
			        iframeDocument.close();
		     	iframeWin.addEventListener("load",function(e){debugger;
		     		 //getComputedStyle(elementoActualizado).cssText
		     		  //si elementoActualizado es null puede ser xq el elemento se carga madiante js
		        var elementoActualizado=iframeDocument.evaluate(getLocationXpath(elem), iframeDocument.body, null, XPathResult.ANY_TYPE, null).iterateNext();
		     //   elementoActualizado=null;
		        if(elementoActualizado==null){
		        	elementoActualizado=getLocationPixelBased(elem, doc);
		        	//elementoActualizado=getLocationPixelBased(elem, iframeWin);
		        }
		        if(elementoActualizado!=null){
		         		elementoActualizado=flo.getStyledNode(elementoActualizado);
			        	for(var i=0; i<widgetInfo.length; i++){
				         	if(widgetInfo[i].id==elem.id){
				         		if(elem._type=="complexCloned"){
				         			widgetInfo[0].html[1].html=elementoActualizado;
				         		}else{
				         			widgetInfo[i].html=elementoActualizado;
				         		}
				         	}
				         }
				         var iframeToDelete=document.getElementById("special_widget"+elem.id);
				         iframeToDelete.remove();
						 var config={};
						 config[name]={"widgets":widgetInfo};				         
				         chrome.storage.local.set(config, function(){
				         actualizarClon=false;
				         	 configOfInsertedBis(n, elem, docElement, iframeDocument);
				       		 configOfInsertedTris(configOfInserted, widgetInfo, doc, elem, n,name);
				         });
				        }else{
				        	 configOfInsertedBis(n, elem, docElement, iframeDocument);
				       		 configOfInsertedTris(configOfInserted, widgetInfo, doc, elem, n,name);
				        }
			        },true);
		        }
		    }
		    });		   
}

function actualizarCropped(elem, n, configOfInserted, widgetInfo, doc, node,name){
	var defClone;
			        for (var h=0; h<elem.locationPoint.coordinate.length; h++){
			        	if(elem.locationPoint.coordinate[h]._type=="pixelBased"){
			        	 	defClone=elem.locationPoint.coordinate[h];
			        	}
			        }
			        var res=$("<div>").css({width:defClone.end.x-defClone.start.x,height:defClone.end.y-defClone.start.y,overflow:"hidden"});
			        var iframe=$("<iframe>").attr({src:elem.locationPoint.url,scrolling:"no"});
			        //Pongo un numero grande para q se vea siempre
			       // iframe.css({width:defClone.windowSize.width,height:defClone.windowSize.height,top:-1*defClone.start.y,left:-1*defClone.start.x,border:"0px",overflow:"hidden"});
			        iframe.css({width:defClone.windowSize.width,height:10000,top:-1*defClone.start.y,left:-1*defClone.start.x,border:"0px",overflow:"hidden"});
			        iframe[0].style.setProperty("position","relative","important");
			        res.append(iframe);
				    //document.body.appendChild(res[0]); 
				    //var iframeDocument = iframe[0].contentWindow.document;
				    //iframeDocument.replaceChild(iframeDocument.importNode(doc.documentElement, true),iframeDocument.documentElement);
			        //iframeDocument.documentElement.innerHTML=doc.documentElement.innerHTML;
			        //iframeDocument.write(doc.documentElement.innerHTML);
			        //iframeDocument.close();
					//iframe.css({width: defClone.windowSize.width, height: defClone.windowSize.height});
					iframe[0].setAttribute("data_wmwidget_id",elem.id);
				    //var offset=res.offset();
				  if(elem.initialState=="collapse"){
				  	res[0].style.display="none";
				  }
				 /*  iframe[0].addEventListener('load', function(){
					 		recolocarCropped(elem.steps, elem.id);
					 	});*/
					 if(elem.anchoringPoint.place=="before"){
						node.parentNode.insertBefore(res[0],node); 
					}else{//append
						node.appendChild(res[0]);
					}
				    var iframeWin = iframe[0];
				    window.onbeforeunload = function() {
			       		 return "Unsaved data might be lost if you leave now";
		     		};
			        iframeWin.addEventListener("load",function(e){
			        	try{
				        	var elementoActualizado3=iframe[0].contentWindow.document.evaluate(getLocationXpath(elem), iframe[0].contentWindow.document.body, null, XPathResult.ANY_TYPE, null).iterateNext();
				        	if(elementoActualizado3==null){
				        		elementoActualizado3=getLocationPixelBased(elem, iframeWin.contentWindow.document);
				        	}
				        	if($(elementoActualizado3).offset()!=undefined){
					        	res=$("<div>").css({width:$(elementoActualizado3).outerWidth(),height:$(elementoActualizado3).outerHeight(),overflow:"hidden"});
					        	iframe.css({top:-1*$(elementoActualizado3).offset().top,left:-1*$(elementoActualizado3).offset().left,border:"0px",overflow:"hidden",position:"relative"});
				        	}
			        	}catch(e){
			        		//alert("I am sorry. I can't relocate de widget");
			        		console.log("I am sorry. I can't relocate de widget");
			        	}
			        	configOfInsertedTrisFinal(elem, iframe, configOfInserted,name);
			        	if(elem.steps!="null"){
			        		recolocarCropped(elem.locationPoint.url,JSON.parse(elem.steps), elem.id);
			        	}
			        //	res.remove();
			        //	iframe.remove();
			        },true);
			        
}

function recolocarWidgetsParaSuReinsercion(configOfInserted, hostBased){
	var listaHostBased= new Array();
		var punteroHost=0;
		var listaDemas= new Array();
		var punteroDemas=0;
	for (var t=0; t<configOfInserted.length; t++){
		if(configOfInserted[t]._type=="hostBased"){
			listaHostBased[punteroHost]=configOfInserted[t];
			punteroHost++;
		}else{
			listaDemas[punteroDemas]=configOfInserted[t];
			punteroDemas++;
		}
	}
		
	var listaAuxiliar= new Array();
	var puntero=0;
	var punteroConfig=listaHostBased.length-1;
	
	while(listaHostBased.length>puntero){
		listaAuxiliar[puntero]=listaHostBased[punteroConfig];
		puntero++;
		punteroConfig--;
	}
	//ojo el orden de esta lista si los widgets no se insertan en el orden correcto
	var devolver=listaAuxiliar.concat(listaDemas);
	return devolver;
}

function configOfInsertedBis(n, elem, docElement, iframeDocument){debugger;
	//este node sirve para el hostBased y para el cropped
   var node=document.evaluate(getAnchoringXpath(elem), docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
   // el node2 es el nodo q se actualiza en esta parte
   if(elem._type=="hostBased"){
	   	if(elem._html!=""){
	   	var node2=$(elem._html)[0];
	   	var node3=document.evaluate(getLocationXpath(elem), docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
	   	if(node3==null){
	   		node3=getLocationPixelBased(elem, docElement);
	   	}
	   	elem.node3=node3;//en caso de q haya cambios en el widget este es el nodo q debe ser ocultado, el original
	   }else{
	   	var node2=document.evaluate(getLocationXpath(elem), docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
	   }
   }else{
   	var node2=document.evaluate(getLocationXpath(elem), docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
   }
  
   //node=null;
   if(node==null){
   	if(elem.anchoringPoint.coordinate!=""){//para los widgets hostBased eliminados en la aumentacion
   		node=getAnchoringPixelBased(elem);
   	}
   }
   if(node2==null){
   	if(iframeDocument!=null){
   		node2=getLocationPixelBased(elem, iframeDocument);
   	}else{
   		if(elem._type=="hostBased"){
   			node2=getLocationPixelBased(elem, docElement);
   		}
   	}
   	
   }
   elem.node2=node2;
   elem.node=node; 
 //  if(elem._type=="foreignCloned"&&elem.extra.widgetType=="complex"){
 //  	if(elem._type=="complex"&&elem.extra.widgetType=="complex"){	
  if(elem._type=="complexCloned"){
  	if(elem.bindingPoint.extracts!=undefined){
       var extracts=elem.bindingPoint.extracts.extracts;
       if(extracts!=null){
          for(extract in extracts){
              var act=extracts[extract];
              var xpaths=act.xpaths;
              var xpath=xpaths[0];
            //  var xpath=act;
              var node;
              var refDoc=document;
              if(extracts.length==2){
                node=refDoc.evaluate(xpath, refDoc.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
                node.setAttribute("data-wmwidget-iframe",act.iframe);
                refDoc=node.contentDocument;
                xpath=xpaths[1];
              }
              node=refDoc.evaluate(xpath, refDoc.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
              var nodeValue="";
			  if(node!=null){
			  	node.setAttribute("data-wmwidget-nodeid",act.id);
			   if(elem.initialState=="visible"){
			   	node.setAttribute("data-wmwidget-deselected", "false");
			   	node.setAttribute("display", "block");
			   }else{
			   	node.setAttribute("data-wmwidget-deselected", "true");
			   	node.setAttribute("display", "none");
			   } 			  	
				nodeValue=node.textContent.replace(/(\n| )+/g," ").trim();
			  }
              extracts[extract].node=nodeValue; 
          } 
       }
   }
  }
}

/*function estaElNodoHostBasedCerca(node, elem){
	var correctoDomHash=false;
	var copiaNodoNext=node;
	var copiaNodoPrevious=node;
	if(node!=null){
		if(getDomHash(node)==elem.anchoringPoint.domHash){
			correctoDomHash=true;
		}	
		else{
			for(var i=0; i<5; i++){
				copiaNodoNext=copiaNodoNext.nextSibling;
				if(copiaNodoNext!=null){
					if(getDomHash(copiaNodoNext)==elem.anchoringPoint.domHash){
						correctoDomHash=true;
					}
				}else{i=6;}
			}
			for(var i=0; i<5; i++){
				copiaNodoPrevious=copiaNodoPrevious.previousSibling;
				if(copiaNodoPrevious!=null){
					if(getDomHash(copiaNodoPrevious)==elem.anchoringPoint.domHash){
						correctoDomHash=true;
					}
				}else{i=6;}
			}
		}
	}
	return correctoDomHash;
}*/

function configOfInsertedTris(configOfInserted, widgetInfo, doc, elem, n,name){debugger;
//	configOfInserted.map(function(n,elem){
	
   var node=elem.node;
   var html;
   var html2;
   if(elem._type=="hostBased"){
    //html=$(elem.html!=null?elem.html:tempConfigForHtml[elem.id].outerHTML) ;
    html=$(elem.node2.outerHTML);//location
    if(elem.node3!=undefined){
    	elem.node3.setAttribute("data_wmwidget_type","original_widgetized");
    	elem.node3.setAttribute('style', 'display:none !important');
    	elem.node3.setAttribute("data_wmwidget_original_widgetized",elem.id);
    }else{
    	elem.node2.setAttribute("data_wmwidget_type","original_widgetized");
    	elem.node2.setAttribute('style', 'display:none !important');
    	elem.node2.setAttribute("data_wmwidget_original_widgetized",elem.id);
    }
   }else if(elem._type=="false"){// buton, image or link
    html=$(elem._html);       
   }
   else if(elem._type=="cropped"){
	   	
	    	//html=crearForeignCloneIframe(elem.locationPoint);
	   	
    }
    else if(elem._type=="rawHTML"){
    	html=$(elem._html);
    }
    else if(elem._type=="simpleCloned" || elem._type=="complexCloned"){
    	html=crearForeignCloneHtmlComplex(elem, widgetInfo);
	    if(elem._type=="complexCloned"){
	      addFunctionalityToComplex(html[0],elem);
    }
   }
    if(node!="" && node!=null){debugger;
    var domHashCorrecto;
    if($(node).prev()[0]==undefined){
    	domHashCorrecto=elem.domHashInicial==elem.anchoringPoint.domHash && getDomHash(node)==elem.anchoringPoint.domHash;
    }else{
    	domHashCorrecto=elem.domHashInicial==elem.anchoringPoint.domHash && (getDomHash(node)==elem.anchoringPoint.domHash || getDomHash($(node).prev()[0])==elem.anchoringPoint.domHash);
    }
      if(domHashCorrecto){
      	elem.insertadoUnaVez=true;
	   if(elem.anchoringPoint.place=="before"){
		   	if(elem._type=="cropped"){
		   		html=actualizarCropped(elem, n, configOfInserted, widgetInfo, doc, node,name);
		   	}else{
		   		if(elem._type=="complexCloned"){
		   			node.parentNode.insertBefore(html[0],node);
		    		configOfInsertedTrisFinal(elem, html, configOfInserted,name);
		   		}else{
		   			node.parentNode.insertBefore(html[0],node);
		    		configOfInsertedTrisFinal(elem, html, configOfInserted,name);

		   		}
		    }
	   }else if(elem.anchoringPoint.place=="append"){
	   	if(elem._type=="cropped"){
		   		html=actualizarCropped(elem, n, configOfInserted, widgetInfo, doc, node,name);	
		   	}else{
	   	if(elem._type=="complexCloned"){
		   			node.appendChild(html[0]);
		    		configOfInsertedTrisFinal(elem, html, configOfInserted,name);
		   		}else{
				    node.appendChild(html[0]);
				    configOfInsertedTrisFinal(elem, html, configOfInserted,name);
		   		}
		   	}
	   }else{// los hostBased que se han eliminado
	   		configOfInsertedTrisFinal(elem, html, configOfInserted,name);
	   }elem.insertadoPreHostBased=true;//En RIA AWARE, necesito saber q se han insertado todos los widgets antes de empezar con los hostBased
   
     }else{//domHash es diferente pero hay q suponer q se inserta sino luego los blinks no se generan nunca
     	 var posicionElemento=posExactaListaConfig(configOfInserted, elem);
   		configOfInserted[posicionElemento].done=true;
     }
   }else{//el nodo es nulo y no se insertara. Webmakeup debe creer q esta insertado
     	 var posicionElemento=posExactaListaConfig(configOfInserted, elem);
   		configOfInserted[posicionElemento].done=true;
     }
     recolarJavascript();
     actualizarValorRawHtml();
  // console.log("Anchoring inserting: "+elem.place+" "+elem.xpath+" "+node.outerHTML);
   console.log("Anchoring inserting: "+elem.place+" "+elem.xpath);
// });
}

function actualizarValorRawHtml(){
	for(var i=0; i<$("[data_wmwidget_categoria=rawhtml]").length; i++){debugger;
		if($("[data_wmwidget_categoria=rawhtml]")[0].attributes.data_wmwidget_extracthtml!=undefined){
			var extract=JSON.parse($("[data_wmwidget_categoria=rawhtml]")[0].attributes.data_wmwidget_extracthtml.textContent);		
			var nodo=document.evaluate(extract.xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
			var text=seleccionarTextoCorrecto(nodo, extract);
			for(var j=0; j<$("[data_wmwidget_categoria=rawhtml]")[0].children.length; j++){
				if($("[data_wmwidget_categoria=rawhtml]")[0].children[j].className=="wm_rawhtml"){
					var elementoWidget=$("[data_wmwidget_categoria=rawhtml]")[0].children[j];
					elementoWidget.getElementsByTagName("webmakeup")[0].innerHTML=text;
				}
			}
		}
	}
}

function seleccionarTextoCorrecto(nodo, extract){debugger;
	var textDevolver="";
	if(extract.regexp=="^(.*)$"){
		textDevolver=nodo.outerText;
	}else if(extract.regexp[0]=="^"){
		var textoNodo=nodo.outerText;
		var textoRegexp=extract.regexp.substring(5,extract.regexp.length);
		var posTexto=textoNodo.indexOf(textoRegexp);
		textDevolver=textoNodo.substring(0,posTexto);
	}else if(extract.regexp[extract.regexp.length-1]=="$"){
		var textoNodo=nodo.outerText;
		var textoRegexp=extract.regexp.substring(0,extract.regexp.length-5);
		textDevolver=textoNodo.substring(textoRegexp.length,textoNodo.length);
	}else{
		var textoNodo=nodo.outerText;
		var posPalabra=extract.regexp.indexOf("(.*)");
		var palabraAnterior=extract.regexp.substring(0, posPalabra);
		var palabraPosterior=extract.regexp.substring(posPalabra+4,extract.regexp.length);
		textDevolver=textoNodo.substring(palabraAnterior.length, textoNodo.indexOf(palabraPosterior));
	}
	return textDevolver;
}

function recolarJavascript(){
	var javascriptTextoWidget="";
	for(var i=0; i<$("[data_wmwidget_categoria=rawhtml]").length; i++){
		var turno=$("[data_wmwidget_categoria=rawhtml]")[i];
		for(var k=0; k<turno.children.length; k++){
			if(turno.children[k].tagName=="SCRIPT"){
				javascriptTextoWidget=turno.children[k].textContent;
				turno.children[k].remove();
				var javaScript = document.createElement("script");
				javaScript.async = false;
				javaScript.innerHTML=javascriptTextoWidget;
				$(".wm_selected").append(javaScript);
			}
		}
	}
};

function configOfInsertedTrisFinal(elem, html, configOfInserted,name){
	 if(elem.icon=="plus"){
   	 html[0].setAttribute("data_wmwidget_pattern","plus");
   }else if(elem.icon=="minus"){
   	 html[0].setAttribute("data_wmwidget_pattern","minus");
   }else if(elem.icon=="both"){
   	 html[0].setAttribute("data_wmwidget_pattern","both");
   	}else if(elem.icon=="yes"){
		html[0].classList.add("wm_wireIcon");
	}
	if(elem._type=="hostBased"){
		html[0].setAttribute("data_wmwidget_type","widgetized");
	}else{
		html[0].setAttribute("data_wmwidget_type",elem._type);
	}
   html[0].setAttribute("data_wmwidget_steps",elem.steps);
   html[0].setAttribute("data_wmwidget_id",elem.id);
 //  html[0].setAttribute("data_wmwidget_foreignCloned_type",elem.foreignClonedType);
   html[0].setAttribute("title",elem.title);
    if(elem.initialState=="visible"){
			   	 html[0].setAttribute("data-wmwidget-deselected", "false");
			   	 html[0].style.display= "block";
			   }else{
			   	 html[0].setAttribute("data-wmwidget-deselected", "true");
			   	 html[0].style.display= "none";
			   } 			  	
   elem.node=html[0];
   var posicionElemento=posExactaListaConfig(configOfInserted, elem);
   configOfInserted[posicionElemento].done=true;
   hayWidgetActualizandose[elem.id]=false;
    var todosTrue=true;
   for (var j=0; j<configOfInserted.length; j++){
   	if(configOfInserted[j].done!=true){
   		todosTrue=false;
   	}
   }
   	 if(todosTrue){
   	 	//var hotsBasedConfigOfInserted=recolocarWidgetsParaSuReinsercion(initialConfigPutAnchors.widgetList, true);
   	 	//putNodesAnchors(name,initialConfigPutAnchors,true);
   	 	(new Animations(configuracion)).create();
   	 	
   	 }
   
}

/*chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
	if(request.op=="stepsCargado"){
		console.log("ENVIANDO PASOS ANCHORS");
		var widget=$('[data_wmwidget_id='+request.idWidget+']');
		var hijosWidget=widget;
		var url="";
		for(var i=0; i<hijosWidget.length; i++){
			if(hijosWidget[i].tagName=="IFRAME"){
				url=hijosWidget[i].src;
			}
		}
		var pasitos=JSON.parse(request.pasos);
		pasitos.push({url:url});
		var pasosSend=JSON.stringify(pasitos);
		widget[0].contentWindow.postMessage(pasosSend, "*");
	}
});*/

function recolocarCropped(url, pasos, idWidget){
	chrome.extension.sendMessage({operation:"recolocarCropped", url:url, pasos:pasos, idWidget:idWidget}); 
};

function posExactaListaConfig(configOfInserted, elem){
	var pos=-1;
	for (var i=0; i<configOfInserted.length; i++){
		if(configOfInserted[i].id==elem.id){
			pos=i;
		}
	}
	return pos;
}

function widgetMayorID(conf){
	var num=0;
	for(var i=0; i<conf.widgetList.length; i++){
		if(conf.widgetList[i].id>num){
			num=conf.widgetList[i].id;
		}
	}
	return num;
}

function comprobarWidgetAusentes(mayorID){
	var listaWidgets=new Array();
	for(var j=0; j<parseInt(mayorID)+1; j++){
		listaWidgets.push({id:j, insertado:false});
	}
	for(var i=0; i<$('[data_wmwidget_id]').length;i++){
		listaWidgets[$('[data_wmwidget_id]')[i].attributes.data_wmwidget_id.value].insertado=true;
	}
/*	for(var i=0; i<$('[data_wmwidget_original_widgetized]').length;i++){
		listaWidgets[parseInt($('[data_wmwidget_original_widgetized]')[i].attributes.data_wmwidget_original_widgetized.value)].insertado=true;
	}*/
	var configDevolver;
	var widgetsConfigDevolver=new Array();
	for(var k=0; k<initialConfigPutAnchors.widgetList.length; k++){
		if(!(listaWidgets[initialConfigPutAnchors.widgetList[k].id].insertado)){
			widgetsConfigDevolver.push(initialConfigPutAnchors.widgetList[k]);
		}
	}
	configDevolver={widgetList:widgetsConfigDevolver, blinkList:initialConfigPutAnchors.blinkList};
	return configDevolver;
}

function domHashIniciales(config){
	hayDomHashInicialesNulos=false;
	for(var i=0; i<config.widgetList.length; i++){
		if((config.widgetList[i].domHashInicial==null || config.widgetList[i].domHashInicial==undefined) && !(config.widgetList[i].insertadoUnaVez)){
			var nodo=document.evaluate(getAnchoringXpath(config.widgetList[i]), document, null, XPathResult.ANY_TYPE, null).iterateNext();
			if(nodo==null){
				nodo=getAnchoringPixelBased(config.widgetList[i]);
			}
			if(nodo!=null){
				config.widgetList[i].domHashInicial=getDomHash(nodo);
			}else{
				config.widgetList[i].domHashInicial=null;
				hayDomHashInicialesNulos=true;
			}
		}
	}
	return config;
}

function widgetsInsertados(config){
	for(var i=0; i<config.widgetList.length; i++){
		config.widgetList[i].insertadoUnaVez=false;
	}
	return config;
}

function inicializarListaWidgetsActualizando(mayorID){
	for(var i=0; i<mayorID+1; i++){
		hayWidgetActualizandose[i]=false;
	}
}

function hayAlgunoActualizandose(){
	var devolver=false;
	for(var i=0; i<hayWidgetActualizandose.length; i++){
		if(hayWidgetActualizandose[i]==true){
			devolver=true;
		}
	}
	return devolver;
}

function vaciarDomHash(lista){debugger;
	for(var i=0; i<lista.widgetList.length; i++){
		lista.widgetList[i].domHashInicial=undefined;
		lista.widgetList[i].insertadoUnaVez=false;
	}
	return lista;
}

function eliminarWidgetizedAjax(){
	for(var i=0; i<$('[data_wmwidget_type=widgetized]').length; i++){
		$('[data_wmwidget_type=widgetized]')[i].remove();
	}
}

var configuracion;
var primeraVez=true;
var initialConfigPutAnchors;
var mayorID;
var hayDomHashInicialesNulos=true;
var actualizandoWidget=false;
var hayWidgetActualizandose=new Array();
function putNodesAnchors(name,config){
	if(primeraVez){
		config=widgetsInsertados(config);
		config=domHashIniciales(config);
		initialConfigPutAnchors=config;
		mayorID=widgetMayorID(initialConfigPutAnchors);	
		inicializarListaWidgetsActualizando(mayorID);
			observerObject = new MutationObserver(function(mutationRecordsList){
			   	  	primeraVez=false;
			   	  	if(!actualizandoWidget){debugger;
				   	  //	if(hayDomHashInicialesNulos){
				   	  	//	eliminarWidgetizedAjax();
				   	  		initialConfigPutAnchors=vaciarDomHash(initialConfigPutAnchors);
				   	  		initialConfigPutAnchors=domHashIniciales(initialConfigPutAnchors);
				   	  //	}
				   	  	setTimeout(function(){debugger;
				   	  		var newConfig=comprobarWidgetAusentes(mayorID);
				   	  		if(!hayAlgunoActualizandose()){
				   	  			putNodesAnchors(name,newConfig);
				   	  		}
				   	  	}, 2000);
			   	  	}
				  });
		  observeChange();
		 }
	configuracion=config;
 var docElement=document.documentElement;
 //var configOfExisting=$(config.recover);
 var configOfInserted=$(config.widgetList);
 var configOfBlinks=$(config.blinkList.blinks);
 var tempConfigForHtml={};
 chrome.storage.local.get(name,function (obj){
	var widgetInfo=obj[name]!=null?obj[name]["widgets"]:null;
	if(widgetInfo==null){
	var d=new Date();
   	var fecha={dia:d.getDate(), mes:d.getMonth(), ano:d.getFullYear(), hora:d.getHours()};
		widgetInfo=new Array();
		for (var i=0; i<configOfInserted.length; i++){
			widgetInfo.push({id: configOfInserted[i].id, html:  configOfInserted[i]._html, lastUpdateDate:  configOfInserted[i].date, updateWhen: configOfInserted[i].updateWhen});
		}
				// alert(widgetInfo);
		var config={};
		config[name]={"widgets":widgetInfo};
		chrome.storage.local.set(config);
		firstconfigOfInserted(name,configOfInserted);
	}	
	else{
		firstconfigOfInserted(name,configOfInserted);
	}
  });	
	

 /*configOfInserted.map(function(n,elem){
   var node=document.evaluate(elem.xpath, docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
   if(node!=null){
	   node.setAttribute("data_wmwidget_type",elem._type);
	   node.setAttribute("data_wmwidget_id",elem.id);
	   node.setAttribute("data_wmwidget_foreignCloned_type",elem.foreignClonedType);
	   node.setAttribute("title",elem.title);
	   elem.node=node;
	   tempConfigForHtml[elem.id]=elem.node;
	   console.log("Anchoring existing: "+elem.type+" "+elem.xpath+" "+node.outerHTML);
   }
 });*/



function ordenInversa(configOfInserted){
	var arrayInverso=new Array();
	for(var i=configOfInserted.length-1; i>-1; i--){
		arrayInverso.push(configOfInserted[i]);
	}
	return arrayInverso;
}

function firstconfigOfInserted(name,configOfInserted){
	chrome.storage.local.get(name,function (obj){
		//Aqui el tema es que si no se reordenan asi los widgets no se insertan casi nunca. 
		//De esta manera se insertan bien los widgets, donde deben y sin cambiar su orden
		//Sin embargo, si no hago q todos los hostBased se inserten los ultimos puede pasar que algun xpath ya no se a el mismo y debido al donHash ya no se inserten
	configOfInserted=recolocarWidgetsParaSuReinsercion(configOfInserted);
	//configOfInserted=ordenInversa(configOfInserted);
	
 configOfInserted.map(function(elem,n){

 var widgetInfo=obj[name]!=null?obj[name]["widgets"]:null;
 if(elem.anchoringPoint.coordinate==""){
 	elem.node="";
 	var node2=document.evaluate(getLocationXpath(elem), docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
 	if(node2==null){
 		node2=document.evaluate(getLocationXpath(elem), docElement, null, XPathResult.ANY_TYPE, null).iterateNext();
 	}
   elem.node2=node2;
   configOfInsertedBis(n, elem, document, null);
   configOfInsertedTris(configOfInserted, widgetInfo, null, elem, n, name);
 }else{
 	var d=new Date();
   	var dia=d.getDate();
   	dia=7985;
   	var mes=d.getMonth();
   	var ano=d.getFullYear();
  // 	var hora=d.getHours();
  
   	
   	if(elem.updateWhen=="Day"){
   	actualizandoWidget=true;
   		if(dia!=elem.date.dia || mes!=elem.date.mes || ano!=elem.date.ano){
   			if(elem.initialState=="visible"){
   				hayWidgetActualizandose[elem.id]=true;
   				actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);
   			}else{
	   			window.setTimeout(function(){
	   				hayWidgetActualizandose[elem.id]=true;
	   				actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);	
	   			},0);
   			}
   		}	
	   	else{
	 	configOfInsertedBis(n, elem, document, null);
	 	configOfInsertedTris(configOfInserted, widgetInfo, null, elem, n,name);
	    }
  	}
  	else if(elem.updateWhen=="onLoad"){
  	actualizandoWidget=true;
	  	//  if(mes!=elem.date.mes && dia>=elem.date.dia){
	  	  	if(elem.initialState=="visible"){
	  	  		hayWidgetActualizandose[elem.id]=true;
	  	  		actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);
	  	  	}else{
		  	  	window.setTimeout(function(){
		  	  		hayWidgetActualizandose[elem.id]=true;
		  	  		actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);
		  	  	},0);	
	  	  	}
/*	  	  }else{
	  	  	configOfInsertedBis(n, elem, document, null);
	 		configOfInsertedTris(configOfInserted, widgetInfo, null, elem, n,name);
	  	  }*/
  }
  else if(elem.updateWhen=="onBlink"){
  	actualizandoWidget=true;
	  	//  if(mes!=elem.date.mes && dia>=elem.date.dia){
	  	  	if(elem.initialState=="visible"){
	  	  		hayWidgetActualizandose[elem.id]=true;
	  	  		actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);
	  	  	}else{
		  	  	window.setTimeout(function(){
		  	  		hayWidgetActualizandose[elem.id]=true;
		  	  		actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);
		  	  	},0);	
	  	  	}
/*	  	  }else{
	  	  	configOfInsertedBis(n, elem, document, null);
	 		configOfInsertedTris(configOfInserted, widgetInfo, null, elem, n,name);
	  	  }*/
  }else if(elem.updateWhen=="Month"){
  	actualizandoWidget=true;
	  	  if(mes!=elem.date.mes && dia>=elem.date.dia){
	  	  	if(elem.initialState=="visible"){
	  	  		hayWidgetActualizandose[elem.id]=true;
	  	  		actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);
	  	  	}else{
		  	  	window.setTimeout(function(){
		  	  		hayWidgetActualizandose[elem.id]=true;
		  	  		actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);
		  	  	},0);	
	  	  	}
	  	  }else{
	  	  	configOfInsertedBis(n, elem, document, null);
	 		configOfInsertedTris(configOfInserted, widgetInfo, null, elem, n,name);
	  	  }
  	
  }else{ //Never
  	if(elem._type=="cropped"){
  		if(elem.initialState=="visible"){
  			hayWidgetActualizandose[elem.id]=true;
  			actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);
  		}else{
	  		window.setTimeout(function(){
	  			hayWidgetActualizandose[elem.id]=true;
	  			actualizarClon(name, elem, n, docElement, configOfInserted, widgetInfo);//xq el cropped siempre se actualiza
	  		},0);	
  		}
  	}else{
  		configOfInsertedBis(n, elem, document, null);
  		configOfInsertedTris(configOfInserted, widgetInfo, null, elem, n,name);
  	}
  	  }
  
  
 }
 });
 
 });
}

var observerObject;
function observeChange(){
  observerObject.observe(document.body, { 
    attributes: true,
  //  attributeFilter: true,
    attributeOldValue: true,
    childList: true,
    characterData: true,
    subtree: true,
    characterDataOldValue: true
  });
}
 

} 