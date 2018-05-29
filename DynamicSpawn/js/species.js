"use strict";
function addVisible(event){
	var li=elm.speciesList.querySelectorAll("li.list-group-item");
	const _l=li.length;
	if(event.shiftKey){
		var base=elm.npcTab.querySelectorAll("li.nav-link-sel>a"),
		uls=[],
		css=[];
		const _b=base.length;
		for(let n=0;n<_b;n++){
			uls[n]=document.getElementById(base[n].dataset.hash.slice(1));
			css[n]="active-"+uls[n].id.slice(1);
		}
		for(let s=0;s<_l;s++)if(li[s].style.display!=="none"){
			let LI=li[s].cloneNode(true);
			LI.setAttribute("onclick","removeEl(this)");
			LI.id="";
			LI.classList.add(...css);
			for(let l in uls)if(!li[s].classList.contains(css[l])){
				li[s].classList.add(css[l]);
				let clone=LI.cloneNode(true);
				uls[l].getElementsByTagName("ul")[0].prepend(clone);
			}
		}
	}
	else{
		var hash=location.hash,
		css="active-"+hash.slice(1);
		for(let i=0;i<_l;i++)if(!(li[i].classList.contains(css)||li[i].style.display==="none")){
			li[i].classList.add(css);
			let LI=li[i].cloneNode(true);
			LI.setAttribute("onclick","removeEl(this)");
			LI.id="";
			document.querySelector(hash+">ul").prepend(LI);
		}
	}
}

function removeVisible(event){
	var li=elm.speciesList.querySelectorAll("li.list-group-item"),
	_l=li.length;
	if(event.shiftKey){
		var base=elm.npcTab.querySelectorAll("li.nav-link-sel>a"),
		_b=base.length;
		for(let n=0;n<_b;n++){
			var css="active-"+base[n].dataset.hash.slice(1);
			for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
				li[i].classList.remove(css);
				let l=document.querySelector(`${base[n].dataset.hash} [value="${li[i].getAttribute("value")}"]`);
				l.parentNode.removeChild(l);
			}
		}
	}
	else{
		var hash=location.hash,
		css="active-"+hash.slice(1);
		for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
			li[i].classList.remove(css);
			let l=document.querySelector(`${hash} [value="${li[i].getAttribute("value")}"]`);
			l.parentNode.removeChild(l);
		}
	}
}

function dtTab(el){
	var hash=el.dataset.hash,
	style=document.getElementById("activeStyle"),
	oldHash=location.hash,
	list=document.getElementById(hash.slice(1));
	document.querySelector(`[data-hash="${oldHash}"]`).classList.remove("show","active");
	document.getElementById(oldHash.slice(1)).classList.remove("active");
	el.classList.add("show","active");
	list.classList.add("active");
	list.classList.remove("fade");
	location.hash=hash;
	style.innerHTML=style.innerHTML.replace(/(active\-).+?\{/,`$1${hash.slice(1)}\{`);
}

function modifyCont(el){
	el=el.parentNode;
	let hash=location.hash;
	var css="active-"+hash.slice(1);
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

function removeEl(el){
	var elp=el.parentNode;
	document.getElementById(el.getAttribute("value")).classList.remove("active-"+location.hash.slice(1));
}

function removeFromAll(el,event){
	var elp=document.getElementById(el.parentNode.parentNode.getAttribute("value")),
	arr=elp.classList.value.split(" ");
	if(event.shiftKey){
//BUG Deselects active item even if it is deselected
		for(let i in arr)if(arr[i].includes("active-")){
			let t=arr[i].slice(7);
			if(elm.npcTab.querySelector(`[data-hash="#${t}"]`).parentNode.classList.contains("nav-link-sel")){
				let item=document.querySelector(`#${t} li[value=${elp.getAttribute("value")}]`);
				if(item){
					item.parentNode.removeChild(item);
					elp.classList.remove(arr[i]);
				}
			}
		}
	}
	else for(let i in arr){
		if(arr[i].includes("active-")){
			let item=document.querySelector(`#${arr[i].slice(7)} li[value=${elp.getAttribute("value")}]`);
			if(item){
				item.parentNode.removeChild(item);
				elp.classList.remove(arr[i]);
			}
		}
	}
}

function addToAll(el,event){
	var elp=document.getElementById(el.parentNode.parentNode.getAttribute("value")),
	spawns=elm.npcList.getElementsByTagName("ul"),
	base=elm.npcList.getElementsByTagName("div"),
	arr=[];
	const _b=base.length;
	if(event.shiftKey)for(let i=0;_b>i;i++){
		if(!document.querySelector(`[data-hash="#${base[i].id}"]`).parentNode.classList.contains("nav-link-sel"))arr[i]=false;
		else if(elp.classList.contains("active-"+base[i].id))arr[i]=false;
		else elp.classList.add("active-"+base[i].id);
	}
	else for(let i=0;_b>i;i++){
		if(elp.classList.contains("active-"+base[i].id))arr[i]=false;
		else elp.classList.add("active-"+base[i].id);
	}
	const _s=spawns.length;
	for(let i=0;_s>i;i++)if(arr[i]!=false){
		let li=elp.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		spawns[i].prepend(li);
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
	var spawns=elm.npcList.getElementsByTagName("div"),
	arr={},
	_s=spawns.length;
	for(let i=0;_s>i;i++){
		let id=spawns[i].id,
		items=$(`#${id} li`),
		_i=items.length;
		arr[id]=[];
		for(let n=0;_i>n;n++)arr[id][n]=items[n].getAttribute("value");
	}
	return arr;
}