"use strict";
addEventListener("load",()=>{
$("#mods>li").on("click",toggleMods);
$("#speciesList .species").on("click",modifyCont);
$("#speciesList .addToAll").on("click",addToAll);
$("#speciesList .removeFromAll").on("click",removeFromAll);
});
function toggleMods(){
	this.classList.toggle("active");
	this.setAttribute("aria-selected",this.classList.contains("active"));
	document.getElementById("npcList").setAttribute("aria-busy","true");
	var items=$("#mods>li"),
	_i=items.length,
	u=1;
	for(let i=0;i<_i;i++){
		let el=$(`[data-mod="${items[i].getValue()}"]`),
		_e=el.length,
		v;
		if(items[i].classList.contains("active"))v=u=0;
		else v=1;
		for(let i=0;i<_e;i++)el[i].classList.toggle("hideMod",v);
	}
	let el=document.getElementById("activeStyle2");
	el.innerHTML=el.innerHTML.replace(u?".hideMod":"null",u?"null":".hideMod");
	document.getElementById("npcList").removeAttribute("aria-busy");
}

function removeEl(){
	var elp=this.parentNode;
	document.getElementById("npcList").setAttribute("aria-busy","true");
	if(!elp.classList.contains("custom-species")){
		let top=document.getElementById(elp.getValue());
		top.classList.remove("active-"+location.hash.slice(1));
		top.setAttribute("aria-selected","false");
	}
	elp.remove();
	document.getElementById("npcList").removeAttribute("aria-busy");
}

function modifyCont(event){
	var el=this.parentNode;
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
			let hash=location.hash;
			var css="active-"+hash.slice(1);
			if(el.getAttribute("aria-selected")=="true"){
				el.setAttribute("aria-selected","false");
				var item=document.querySelector(hash+` li[value=${el.getValue()}]`);
				item.remove();
				el.classList.remove(css);
			}
			else{
				el.setAttribute("aria-selected","true");
				el.classList.add(css);
				var li=el.cloneNode(true);
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
		var spawns=elm.npcList.getElementsByTagName("ul"),
		base=elm.npcList.getElementsByTagName("div");
		const _b=base.length;
		if(event.shiftKey)for(let i=0;_b>i;i++){
			if(!document.querySelector(`[data-hash="#${base[i].id}"]`).parentNode.classList.contains("nav-link-sel"))arr[i]=false;
			else if(base[i].querySelector(`ul>li[value="${prev.getValue()}"]`))arr[i]=false;
		}
		else for(let i=0;_b>i;i++){
			if(base[i].querySelector(`ul>li[value="${prev.getValue()}"]`))arr[i]=false;
		}
		const _s=spawns.length;
		for(let i=0;_s>i;i++)if(arr[i]!==false){
			let li=prev.cloneNode(true);
			li.id="";
			spawns[i].prepend(readyLi(li));
		}
	}
	else{
		var elp=document.getElementById(prev.getValue()),
		spawns=document.querySelectorAll("#npcList ul"),
		base=document.querySelectorAll("#npcList>div");
		elp.setAttribute("aria-selected","true");
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
				let el=arr[i].parentNode;
				if(document.querySelector(`[data-hash="#${el.parentNode.id}"]`).parentNode.classList.contains("nav-link-sel"))el.removeChild(arr[i]);
			}
		}
		else for(let i=0;i<_l;i++)arr[i].remove();
	}
	else{
		var elp=document.getElementById(prev.getValue()),
		arr=elp.classList.value.split(" ");
		elp.setAttribute("aria-selected","false");
		if(event.shiftKey){
			for(let i of arr)if(/^active-./.test(i)){
				let t=i.replace("active-","");
				if(elm.npcTab.querySelector(`[data-hash="#${t}"]`).parentNode.classList.contains("nav-link-sel")){
					let item=document.querySelector(`#${t} li[value=${elp.getValue()}]`);
					elp.classList.remove(i);
					if(item)item.remove();
				}
			}
		}
		else for(let i of arr)if(/^active-./.test(i)){
			let item=document.querySelector(`#${i.replace("active-","")} li[value=${elp.getValue()}]`);
			elp.classList.remove(i);
			if(item)item.remove();
		}
	}
	document.getElementById("npcList").removeAttribute("aria-busy");
}