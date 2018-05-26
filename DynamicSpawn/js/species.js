"use strict";
function addVisible(event){
	var li=$("#speciesList>li.list-group-item"),
	_l=li.length;
	if(event.shiftKey){
		var base=document.querySelectorAll("#npcTab>li.nav-link-sel>a"),
		uls=[],
		css=[],
		_b=base.length;
		for(var n=0;n<_b;n++){
			uls[n]=document.getElementById(base[n].dataset.hash.replace("#",""));
			css[n]="active-"+uls[n].id.replace("#","");
		}
		for(var s=0;s<_l;s++)if(li[s].style.display!=="none"){
			let lii=li[s].cloneNode(true);
			lii.setAttribute("onclick","removeEl(this)");
			lii.id="";
			lii.classList.add(...css);
			for(var l in uls){
				if(!li[s].classList.contains(css[l])){
					li[s].classList.add(css[l]);
					let clone=lii.cloneNode(true);
					uls[l].getElementsByTagName("ul")[0].prepend(clone);
				}
			}
		}
	}
	else{
		var hash=location.hash,
		css="active-"+hash.replace("#","");
		for(var i=0;i<_l;i++)if(!(li[i].classList.contains(css)||li[i].style.display==="none")){
			li[i].classList.add(css);
			let lii=li[i].cloneNode(true);
			lii.setAttribute("onclick","removeEl(this)");
			lii.id="";
			document.querySelector(hash+">ul").prepend(lii);
		}
	}
}

function removeVisible(event){
	var li=$("#speciesList>li.list-group-item"),
	_l=li.length;
	if(event.shiftKey){
		var base=document.querySelectorAll("#npcTab>li.nav-link-sel>a"),
		_b=base.length;
		for(var n=0;n<_b;n++){
			var css="active-"+base[n].dataset.hash.replace("#","");
			for(var i=0;i<_l;i++){
				if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
					li[i].classList.remove(css);
					var l=document.querySelector(`${base[n].dataset.hash} [value="${li[i].getAttribute("value")}"]`);
					l.parentNode.removeChild(l);
				}
			}
		}
	}
	else{
		var hash=location.hash,
		css="active-"+hash.replace("#","");
		for(var i=0;i<_l;i++){
			if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
				li[i].classList.remove(css);
				var l=document.querySelector(`${hash} [value="${li[i].getAttribute("value")}"]`);
				l.parentNode.removeChild(l);
			}
		}
	}
}

var baseLi=(function(){
	var btnB=document.createElement("button");
		btnB.classList.add("btn");
	var li=document.createElement("li");
		li.classList.add("list-group-item");
	var btn=btnB.cloneNode();
		btn.setAttribute("onclick","modifyCont(this)");
		btn.style="width:50%;min-width:100px";
		btn.classList.add("btn-dark");
	var div=document.createElement("div");
		div.classList.add("btn-group","float-right");
		btnB.classList.add("btn-secondary");
		var all=btnB.cloneNode();
			all.setAttribute("onclick","addToAll(this,event)");
			all.innerHTML="Add to All";
			btnB.setAttribute("onclick","removeFromAll(this,event)");
			btnB.innerHTML="Remove from All";
		div.append(all,btnB);
	return[li,btn,div];
}());

function dtTab(el){
	var hash=el.dataset.hash,
	style=document.getElementById("activeStyle"),
	oldHash=location.hash,
	list=document.getElementById(hash.replace("#",""));
	document.querySelector('[data-hash="'+oldHash+'"]').classList.remove("show","active");
	document.getElementById(oldHash.replace("#","")).classList.remove("active");
	el.classList.add("show","active");
	list.classList.add("active");
	list.classList.remove("fade");
	location.hash=hash;
	style.innerHTML=style.innerHTML.replace(/(active\-).+?\{/,`$1${hash.replace("#","")}\{`);
}

function modifyCont(el){
	el=el.parentNode;
	let hash=location.hash;
	var css="active-"+hash.replace("#","");
	if(el.classList.contains(css)){
		var item=document.querySelector(`${hash} li[value=${el.getAttribute("value")}]`);
		item.parentNode.removeChild(item);
		el.classList.remove(css);
	}
	else{
		el.classList.add(css);
		var li=el.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		document.querySelector(hash+">ul").prepend(li);
	}
}

function addToAll(el,event){
	var elp=document.getElementById(el.parentNode.parentNode.getAttribute("value")),
	spawns=$("#npcList ul"),
	base=$("#npcList>div"),
	arr=[],
	_b=base.length;
	if(event.shiftKey)for(var i=0;_b>i;i++){
		if(!document.querySelector(`[data-hash="#${base[i].id}"]`).parentNode.classList.contains("nav-link-sel"))arr[i]=false;
		else if(elp.classList.contains("active-"+base[i].id))arr[i]=false;
		else elp.classList.add("active-"+base[i].id);
	}
	else for(var i=0;_b>i;i++){
		if(elp.classList.contains("active-"+base[i].id))arr[i]=false;
		else elp.classList.add("active-"+base[i].id);
	}
	var _s=spawns.length;
	for(var i=0;_s>i;i++)if(arr[i]!=false){
		let li=elp.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		spawns[i].prepend(li);
	}
}

function removeEl(el){
	var elp=el.parentNode;
	document.getElementById(el.getAttribute("value")).classList.remove("active-"+location.hash.replace("#",""));
}

function removeFromAll(el,event){
	var elp=document.getElementById(el.parentNode.parentNode.getAttribute("value")),
	arr=elp.classList.value.split(" ");
	if(event.shiftKey){
//BUG Deselects active item even if it is deselected
		for(var i in arr)if(arr[i].includes("active-")){
			let t=arr[i].replace("active-","");
			if(document.querySelector(`[data-hash="#${t}"]`).parentNode.classList.contains("nav-link-sel")){
				let item=document.querySelector(`#${t} li[value=${elp.getAttribute("value")}]`);
				if(item){
					item.parentNode.removeChild(item);
					elp.classList.remove(arr[i]);
				}
			}
		}
	}
	else for(var i in arr){
		if(arr[i].includes("active-")){
			let t=arr[i].replace("active-",""),
			item=document.querySelector(`#${t} li[value=${elp.getAttribute("value")}]`);
			if(item){
				item.parentNode.removeChild(item);
				elp.classList.remove(arr[i]);
			}
		}
	}
}

function setLi(set,key){
	var el=document.getElementById(key),
	css="active-"+set;
	if(!el){
		var el=customSetUp(key)
		let ul=document.querySelector(`#${set}>ul`);
		if(!ul.querySelector(`#npcList li[value="${key}"]`))ul.prepend(el);
	}
	else if(!el.classList.contains(css)){
		el.classList.add(css);
		var li=el.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		document.querySelector(`#${set}>ul`).appendChild(li);
	}
}

function getLi(){
	var spawns=$("#npcList>div"),
	arr={},
	_s=spawns.length;
	for(var i=0;_s>i;i++){
		let id=spawns[i].id,
		items=$(`#${id} li`),
		_i=items.length;
		arr[id]=[];
		for(var n=0;_i>n;n++)arr[id][n]=items[n].getAttribute("value");
	}
	return arr;
}

window.addEventListener("beforeunload",()=>{
	document.cookie=`value=${JSON.stringify(getLi())};expires=${dayPlus(90)}`;
});