"use strict";
addEventListener("DOMContentLoaded",()=>{
$("#mods>li").on("click",toggleMods);
$("#mods>li").on("keyup",toggleModsKey);
$("#speciesList .species").on("click",modifyCont);
$("#speciesList .addToAll").on("click",addToAll);
$("#speciesList .removeFromAll").on("click",removeFromAll);
});
function toggleMods(){
	this.classList.toggle("active");
	this.setAttribute("aria-selected",this.classList.contains("active"));
	document.getElementById("npcList").setAttribute("aria-busy","true");
	const items=$("#mods>li"),
	_i=items.length;
	var u=1;
	for(let i=0;i<_i;i++){
		const el=$(`[data-mod="${items[i].getValue()}"]`),
		_e=el.length;
		let v;
		if(items[i].classList.contains("active"))v=u=0;
		else v=1;
		for(let i=0;i<_e;i++)el[i].classList.toggle("hideMod",v);
	}
	const el=document.getElementById("activeStyle2");
	el.innerHTML=el.innerHTML.replace(u?".hideMod":"null",u?"null":".hideMod");
	document.getElementById("npcList").removeAttribute("aria-busy");
}

function toggleModsKey(event){
	if(event.key==="Enter")toggleMods.call(this);
}

function removeEl(){
	const elp=this.parentNode;
	document.getElementById("npcList").setAttribute("aria-busy","true");
	if(!elp.classList.contains("custom-species")){
		const top=document.getElementById(elp.getValue());
		top.classList.remove("active-"+location.hash.slice(1));
		top.setAttribute("aria-selected","false");
	}
	elp.remove();
	document.getElementById("npcList").removeAttribute("aria-busy");
}

function modifyCont(event){
	const el=this.parentNode;
	document.getElementById("npcList").setAttribute("aria-busy","true");
	if(el.classList.contains("custom-species"))el.remove();
	else{
		if(event.altKey){
			let l;
			el=el.dataset;
			if(el.steamid)l="s://steamcommunity.com/sharedfiles/filedetails/?id="+el.steamid;
			else if(el.sbid)l="://community.playstarbound.com/resources/"+el.sbid;
			if(l)location.assign("http"+l);
		}
		else{
			const hash=location.hash,
			css="active-"+hash.slice(1);
			if(el.getAttribute("aria-selected")=="true"){
				el.setAttribute("aria-selected","false");
				const item=document.querySelector(hash+` li[value=${el.getValue()}]`);
				item.remove();
				el.classList.remove(css);
			}
			else{
				el.setAttribute("aria-selected","true");
				el.classList.add(css);
				const li=el.cloneNode(1);
				delete li.id;
				document.querySelector(hash+">ul").prepend(readyLi(li));
			}
		}
	}
	document.getElementById("npcList").removeAttribute("aria-busy");
}

function addToAll(event){
	var arr=[],
	prev=this.parentNode.parentNode;
	document.getElementById("npcList").setAttribute("aria-busy","true");
	if(prev.classList.contains("custom-species")){
		const spawns=elm.npcList.getElementsByTagName("ul"),
		base=elm.npcList.getElementsByTagName("div"),
		_b=base.length,
		prevQ=`ul>li[value="${prev.getValue()}"]`;
		if(event.shiftKey)for(let i=0;_b>i;i++){
			if(!document.querySelector(`[data-hash="#${base[i].id}"]`).parentNode.classList.contains("nav-link-sel"))arr[i]=false;
			else if(base[i].querySelector(prevQ))arr[i]=false;
		}
		else for(let i=0;_b>i;i++)
			if(base[i].querySelector(prevQ))arr[i]=false;
		const _s=spawns.length;
		for(let i=0;_s>i;i++)if(arr[i]!==false){
			const li=prev.cloneNode(1);
			delete li.id;
			spawns[i].prepend(readyLi(li));
		}
	}
	else{
		const elp=document.getElementById(prev.getValue()),
		spawns=document.querySelectorAll("#npcList ul"),
		base=document.querySelectorAll("#npcList>div"),
		_b=base.length;
		elp.setAttribute("aria-selected","true");
		if(event.shiftKey)for(let i=0;_b>i;i++){
			const ba=base[i];
			if(
				!document.querySelector(`[data-hash="#${ba.id}"]`).parentNode.classList.contains("nav-link-sel")||
				elp.classList.contains("active-"+ba.id)
			)arr[i]=false;
			else elp.classList.add("active-"+ba.id);
		}
		else for(let i=0;_b>i;i++){
			const ba=base[i];
			if(elp.classList.contains("active-"+ba.id))arr[i]=false;
			else elp.classList.add("active-"+ba.id);
		}
		const _s=spawns.length;
		for(let i=0;_s>i;i++)if(arr[i]!==false){
			const li=elp.cloneNode(1);
			delete li.id;
			spawns[i].prepend(readyLi(li));
		}
	}
	document.getElementById("npcList").removeAttribute("aria-busy");
}

function removeFromAll(event){
	var prev=this.parentNode.parentNode;
	document.getElementById("npcList").setAttribute("aria-busy","true");
	if(prev.classList.contains("custom-species")){
		var arr=elm.npcList.querySelectorAll(`li.list-group-item[value="${prev.getValue()}"]`),
		_l=arr.length;
		if(event.shiftKey){
			for(let i=0;i<_l;i++){
				const el=arr[i].parentNode;
				if(document.querySelector(`[data-hash="#${el.parentNode.id}"]`).parentNode.classList.contains("nav-link-sel"))el.removeChild(arr[i]);
			}
		}
		else for(let i=0;i<_l;i++)arr[i].remove();
	}
	else{
		const elp=document.getElementById(prev.getValue()),
		arr=elp.classList.value.split(" ");
		elp.setAttribute("aria-selected","false");
		if(event.shiftKey){
			for(let i of arr)if(/^active-./.test(i)){
				const t=i.replace("active-","");
				if(elm.npcTab.querySelector(`[data-hash="#${t}"]`).parentNode.classList.contains("nav-link-sel")){
					const item=document.querySelector(`#${t} li[value=${elp.getValue()}]`);
					elp.classList.remove(i);
					if(item)item.remove();
				}
			}
		}
		else for(let i of arr)if(/^active-./.test(i)){
			const item=document.querySelector(`#${i.replace("active-","")} li[value=${elp.getValue()}]`);
			elp.classList.remove(i);
			if(item)item.remove();
		}
	}
	document.getElementById("npcList").removeAttribute("aria-busy");
}