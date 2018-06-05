"use strict";

window.addEventListener("load",()=>{
$("#mods>li").on("click",function(){
	this.classList.toggle("active");
	var items=$("#mods>li"),
	_i=items.length,
	u=true;
	for(let i=0;i<_i;i++){
		let el=$(`[data-mod="${items[i].getAttribute("value")}"]`),
		_e=el.length,
		v;
		if(items[i].classList.contains("active")){
			v=false;
			u=false;
		}
		else v=true;
		for(let n=0;n<_e;n++)el[n].classList.toggle("hideMod",v);
	}
	let el=document.getElementById("activeStyle2");
	if(u)el.innerHTML=el.innerHTML.replace(".hideMod","null");
	else el.innerHTML=el.innerHTML.replace("null",".hideMod");
	
});

$("#speciesList .species").on("click",modifyCont);
$("#npcList .species").on("click",removeEl);
$(".species-group>.addToAll").on("click",addToAll);
$(".species-group>.removeFromAll").on("click",removeFromAll);

});



//=============================================================
function removeEl(){
	console.log(this);
	console.log(this.parentNode);
	var elp=this.parentNode;
	document.getElementById(elp.getAttribute("value")).classList.remove("active-"+location.hash.slice(1));
	elp.parentNode.removeChild(elp);
}

function modifyCont(event){
	var el=this.parentNode;
	if(event.altKey){
		let l=el.dataset.steamid||el.dataset.sbid;
		console.log(l);
		if(l)location.assign(l);
	}
	else{
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
			li.id="";
			document.querySelector(hash+">ul").prepend(readyLi(li));
		}
	}
}

function addToAll(event){
	var elp=document.getElementById(this.parentNode.parentNode.getAttribute("value")),
	spawns=document.querySelectorAll("#npcList>div>ul"),
	base=document.querySelectorAll("#npcList>div"),
	arr=[];
	const _b=base.length;
	if(event.shiftKey)for(let i=0;_b>i;i++){
		if(
			!document.querySelector(`[data-hash="#${base[i].id}"]`).parentNode.classList.contains("nav-link-sel")
			||
			elp.classList.contains("active-"+base[i].id)
		)arr[i]=false;
		else elp.classList.add("active-"+base[i].id);
	}
	else for(let i=0;_b>i;i++){
		if(elp.classList.contains("active-"+base[i].id))arr[i]=false;
		else elp.classList.add("active-"+base[i].id);
	}
	const _s=spawns.length;
	for(let i=0;_s>i;i++)if(arr[i]!=false){
		let li=elp.cloneNode(true);
		li.id="";
		spawns[i].prepend(readyLi(li));
	}
}

function removeFromAll(event){
	var elp=document.getElementById(this.parentNode.parentNode.getAttribute("value")),
	arr=elp.classList.value.split(" ");
	if(event.shiftKey){
//BUG Deselects active item even if it is deselected
		for(let i in arr)if(/^active-./.test(arr[i])){
			let t=arr[i].replace("active-","");
			if(elm.npcTab.querySelector(`[data-hash="#${t}"]`).parentNode.classList.contains("nav-link-sel")){
				let item=document.querySelector(`#${t} li[value=${elp.getAttribute("value")}]`);
				elp.classList.remove(arr[i]);
				if(item)item.parentNode.removeChild(item);
			}
		}
	}
	else for(let i in arr){
		if(/^active-./.test(arr[i])){
			let item=document.querySelector(`#${arr[i].replace("active-","")} li[value=${elp.getAttribute("value")}]`);
			elp.classList.remove(arr[i]);
			if(item)item.parentNode.removeChild(item);
		}
	}
}

function readyLi(li){
	li.querySelector(".species-group>.addToAll").addEventListener("click",addToAll);
	li.querySelector(".species-group>.removeFromAll").addEventListener("click",removeFromAll);
	li.querySelector("button.btn.species").addEventListener("click",removeEl);
	return li;
}