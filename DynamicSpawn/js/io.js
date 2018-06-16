"use strict";
addEventListener("load",()=>{
$("#mods>li").on("click",function(){
	this.classList.toggle("active");
	var items=$("#mods>li"),
	_i=items.length,
	u=1;
	for(let i=0;i<_i;i++){
		let el=$(`[data-mod="${items[i].getAttribute("value")}"]`),
		_e=el.length,
		v;
		if(items[i].classList.contains("active"))v=u=0;
		else v=1;
		for(let i=0;i<_e;i++)el[i].classList.toggle("hideMod",v);
	}
	let el=document.getElementById("activeStyle2");
	el.innerHTML=el.innerHTML.replace(u?".hideMod":"null",u?"null":".hideMod");
});

$("#speciesList .species").on("click",modifyCont);
$("#speciesList .addToAll").on("click",addToAll);
$("#speciesList .removeFromAll").on("click",removeFromAll);

});

function removeEl(){
	var elp=this.parentNode;
	if(!elp.classList.contains("custom-species"))document.getElementById(elp.getAttribute("value")).classList.remove("active-"+location.hash.slice(1));
	elp.parentNode.removeChild(elp);
}

function modifyCont(event){
	var el=this.parentNode;
	if(el.classList.contains("custom-species"))el.parentNode.removeChild(el);
	else{
		if(event.altKey){
			let l=el.dataset.steamid||el.dataset.sbid;
			if(l)location.assign(l);
		}
		else{
			let hash=location.hash;
			var css="active-"+hash.slice(1);
			if(el.classList.contains(css)){
				var item=document.querySelector(hash+` li[value=${el.getAttribute("value")}]`);
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
}

function addToAll(event){
	var arr=[],
	prev=this.parentNode.parentNode;
	if(prev.classList.contains("custom-species")){
		var spawns=elm.npcList.getElementsByTagName("ul"),
		base=elm.npcList.getElementsByTagName("div");
		const _b=base.length;
		if(event.shiftKey)for(let i=0;_b>i;i++){
			if(!document.querySelector(`[data-hash="#${base[i].id}"]`).parentNode.classList.contains("nav-link-sel"))arr[i]=false;
			else if(base[i].querySelector(`ul>li[value="${prev.getAttribute("value")}"]`))arr[i]=false;
		}
		else for(let i=0;_b>i;i++){
			if(base[i].querySelector(`ul>li[value="${prev.getAttribute("value")}"]`))arr[i]=false;
		}
		const _s=spawns.length;
		for(let i=0;_s>i;i++)if(arr[i]!==false){
			let li=prev.cloneNode(true);
			li.id="";
			spawns[i].prepend(readyLi(li));
		}
	}
	else{
		var elp=document.getElementById(prev.getAttribute("value")),
		spawns=document.querySelectorAll("#npcList ul"),
		base=document.querySelectorAll("#npcList>div");
		const _b=base.length;
		if(event.shiftKey)for(let i=0;_b>i;i++){
			let ba=base[i];
			if(
				!document.querySelector(`[data-hash="#${ba.id}"]`).parentNode.classList.contains("nav-link-sel")||
				elp.classList.contains("active-"+ba.id)
			)arr[i]=false;
			else elp.classList.add("active-"+ba.id);
		}
		else for(let i=0;_b>i;i++){
			let ba=base[i];
			if(elp.classList.contains("active-"+ba.id))arr[i]=false;
			else elp.classList.add("active-"+ba.id);
		}
		const _s=spawns.length;
		for(let i=0;_s>i;i++)if(arr[i]!==false){
			let li=elp.cloneNode(true);
			li.id="";
			spawns[i].prepend(readyLi(li));
		}
	}
}

function removeFromAll(event){
	var prev=this.parentNode.parentNode;
	if(prev.classList.contains("custom-species")){
		var arr=elm.npcList.querySelectorAll(`li.list-group-item[value="${prev.getAttribute("value")}"]`),
		_l=arr.length;
		if(event.shiftKey){
			for(let i=0;i<_l;i++){
				let el=arr[i].parentNode;
				if(document.querySelector(`[data-hash="#${el.parentNode.id}"]`).parentNode.classList.contains("nav-link-sel"))el.removeChild(arr[i]);
			}
		}
		else for(let i=0;i<_l;i++)arr[i].parentNode.removeChild(arr[i]);
	}
	else{
		var elp=document.getElementById(prev.getAttribute("value")),
		arr=elp.classList.value.split(" ");
		if(event.shiftKey){
			for(let i of arr)if(/^active-./.test(i)){
				let t=i.replace("active-","");
				if(elm.npcTab.querySelector(`[data-hash="#${t}"]`).parentNode.classList.contains("nav-link-sel")){
					let item=document.querySelector(`#${t} li[value=${elp.getAttribute("value")}]`);
					elp.classList.remove(i);
					if(item)item.parentNode.removeChild(item);
				}
			}
		}
		else for(let i of arr)if(/^active-./.test(i)){
			let item=document.querySelector(`#${i.replace("active-","")} li[value=${elp.getAttribute("value")}]`);
			elp.classList.remove(i);
			if(item)item.parentNode.removeChild(item);
		}
	}
}