"use strict";
window.addEventListener("load",()=>{
document.getElementById("speciesInput").addEventListener("keyup",event=>{
	if(event.key==="Enter"){
		var el=customSetUp(document.getElementById("speciesInput").value)
		if(event.shiftKey){
			let els=$("li.nav-link-sel>a.nav-link"),
			_l=els.length;
			for(var i=0;i<_l;i++){
				let ul=document.querySelector(els[i].dataset.hash+">ul");
				if(!ul.querySelector(`#npcList li[value="${species}"]`))ul.prepend(el.cloneNode(true));
			}
		}
		else if(event.ctrlKey){
			let els=$("li>a.nav-link"),
			_l=els.length;
			for(var i=0;i<_l;i++){
				let ul=document.querySelector(els[i].dataset.hash+">ul");
				if(!ul.querySelector(`#npcList li[value="${species}"]`))ul.prepend(el.cloneNode(true));
			}
		}
		else{
			let ul=document.querySelector(location.hash+">ul");
			if(!ul.querySelector(`#npcList li[value="${species}"]`))ul.prepend(el);
		}
	}
});
});

var customNPC=(function(){
	var[li,btn,div]=baseLi,
	el=li.cloneNode();
	el.classList.add("custom-species");
	var b=btn.cloneNode();
		b.setAttribute("onclick","modifyContC(this)");
	var divM=div.cloneNode(true);
		divM.firstChild.setAttribute("onclick","addToAllC(this,event)");
		divM.childNodes[1].setAttribute("onclick","removeFromAllC(this,event)");
	return[el,b,divM];
}());

function customSetUp(species){
	var[li,btn,div]=customNPC,
	el=li.cloneNode();
	el.setAttribute("value",species);
	var b=btn.cloneNode();
		b.innerHTML="Custom: "+species;
	el.append(b,div.cloneNode(true));
	return el;
}

function modifyContC(el){
	el=el.parentNode;
	el.parentNode.removeChild(el);
}

function addToAllC(el,event){
	var elp=el.parentNode.parentNode,
	spawns=$("#npcList ul"),
	base=$("#npcList>div"),
	arr=[],
	_b=base.length;
	if(event.shiftKey)for(var i=0;_b>i;i++){
		if(!document.querySelector(`[data-hash="#${base[i].id}"]`).parentNode.classList.contains("nav-link-sel"))arr[i]=false;
		else if(base[i].querySelector(`ul>li[value="${elp.getAttribute("value")}"]`))arr[i]=false;
	}
	else for(var i=0;_b>i;i++){
		if(base[i].querySelector(`ul>li[value="${elp.getAttribute("value")}"]`))arr[i]=false;
	}
	var _s=spawns.length;
	for(var i=0;_s>i;i++)if(arr[i]!=false){
		let li=elp.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		spawns[i].prepend(li);
	}
}

function removeFromAllC(el,event){
	var elp=el.parentNode.parentNode,
	arr=document.querySelectorAll(`#npcList li.list-group-item[value="${elp.getAttribute("value")}"]`),
	_l=arr.length;
	if(event.shiftKey){
		for(var i=0;i<_l;i++){
			if(document.querySelector(`[data-hash="#${arr[i].parentNode.parentNode.id}"]`).parentNode.classList.contains("nav-link-sel")){
				arr[i].parentNode.removeChild(arr[i]);
			}
		}
	}
	else for(var i=0;i<_l;i++){
		arr[i].parentNode.removeChild(arr[i]);
	}
}