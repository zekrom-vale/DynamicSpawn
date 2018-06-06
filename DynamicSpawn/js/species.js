"use strict";
function setLi(set,key){
	var el=document.getElementById(key),
	css="active-"+set;
	if(!el){
		let el=customSetUp(key),
		ul=document.querySelector(`#${set}>ul`);
		if(!ul.querySelector(`#npcList li[value="${key}"]`))ul.prepend(readyLi(el));
	}
	else if(!el.classList.contains(css)){
		el.classList.add(css);
		var li=el.cloneNode(true);
		li.querySelector("button.btn.species").dataset.toggle="";
		li.id="";
		document.querySelector(`#${set}>ul`).appendChild(readyLi(li));
	}
}

function getLi(){
	var spawns=document.querySelectorAll("#npcList>div"),
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

var baseLi=(function(){
	var btnB=document.createElement("button");
		btnB.classList.add("btn");
	var li=document.createElement("li");
		li.classList.add("list-group-item");
	var btn=btnB.cloneNode();
		btn.classList.add("btn-dark","species");
	var div=document.createElement("div");
		div.classList.add("btn-group","species-group");
		btnB.classList.add("btn-secondary");
		var all=btnB.cloneNode();
			all.innerHTML="Add to All";
			btnB.innerHTML="Remove from All";
		div.append(all,btnB);
	var img=document.createElement("img");
		img.classList.add("off");
	var img2=document.createElement("img");
		img2.classList.add("on");
	return[li,btn,img,img2,div];
}());


function removeEl(){
	var elp=this.parentNode;
	if(!this.parentNode.classList.contains("custom-species")){
		document.getElementById(elp.getAttribute("value")).classList.remove("active-"+location.hash.slice(1));
	}
	elp.parentNode.removeChild(elp);
}

function modifyCont(event){
	var el=this.parentNode;
	if(!el.classList.contains("custom-species")){
		if(event.altKey){
			let l=el.dataset.steamid||el.dataset.sbid;
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
	else{
		el.parentNode.removeChild(el);
	}
}

function addToAll(event){
	var arr=[],
	prev=this.parentNode.parentNode;
	if(!prev.classList.contains("custom-species")){
		var elp=document.getElementById(prev.getAttribute("value")),
		spawns=document.querySelectorAll("#npcList>div>ul"),
		base=document.querySelectorAll("#npcList>div");
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
	else{
		var elp=prev,
		spawns=elm.npcList.getElementsByTagName("ul"),
		base=elm.npcList.getElementsByTagName("div");
		const _b=base.length;
		if(event.shiftKey)for(let i=0;_b>i;i++){
			if(!document.querySelector(`[data-hash="#${base[i].id}"]`).parentNode.classList.contains("nav-link-sel"))arr[i]=false;
			else if(base[i].querySelector(`ul>li[value="${elp.getAttribute("value")}"]`))arr[i]=false;
		}
		else for(let i=0;_b>i;i++){
			if(base[i].querySelector(`ul>li[value="${elp.getAttribute("value")}"]`))arr[i]=false;
		}
		const _s=spawns.length;
		for(let i=0;_s>i;i++)if(arr[i]!=false){
			let li=elp.cloneNode(true);
			li.id="";
			spawns[i].prepend(readyLi(li));
		}
	}
}

function removeFromAll(event){
	var prev=this.parentNode.parentNode;
	if(!prev.classList.contains("custom-species")){
		var elp=document.getElementById(prev.getAttribute("value")),
		arr=elp.classList.value.split(" ");
		if(event.shiftKey){
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
	else{
		var elp=prev,
		arr=elm.npcList.querySelectorAll(`li.list-group-item[value="${elp.getAttribute("value")}"]`),
		_l=arr.length;
		if(event.shiftKey){
			for(let i=0;i<_l;i++){
				if(document.querySelector(`[data-hash="#${arr[i].parentNode.parentNode.id}"]`).parentNode.classList.contains("nav-link-sel")){
					arr[i].parentNode.removeChild(arr[i]);
				}
			}
		}
		else for(let i=0;i<_l;i++){
			arr[i].parentNode.removeChild(arr[i]);
		}
	}
}

function readyLi(li){
	li.querySelector(".species-group>.addToAll").addEventListener("click",addToAll);
	li.querySelector(".species-group>.removeFromAll").addEventListener("click",removeFromAll);
	li.querySelector("button.btn.species").addEventListener("click",removeEl);
	return li;
}