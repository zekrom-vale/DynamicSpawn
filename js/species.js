"use strict";
function setLi(set,key){
	const el=document.getElementById(key),
	css="active-"+set;
	if(!el){
		const el=customSetUp(key),
		ul=document.querySelector(`#${set}>ul`);
		if(!ul.querySelector(`#npcList li[value="${key}"]`))ul.prepend(readyLi(el));
	}
	else if(!el.classList.contains(css)){
		el.classList.add(css);
		if("#"+set===location.hash)el.setAttribute("aria-selected","true");
		const li=el.cloneNode(1);
		delete li.querySelector(".species").dataset.toggle;
		delete li.id;
		document.querySelector(`#${set}>ul`).appendChild(readyLi(li));
	}
}

function getLi(){
	const spawns=document.querySelectorAll("#npcList>div"),
	_s=spawns.length,
	obj={};
	for(let i=0;_s>i;i++){
		const id=spawns[i].id,
		items=spawns[i].querySelectorAll('li'),
		_i=items.length;
		if(_i>0){
			obj[id]=[];
			for(let n=0;_i>n;n++)obj[id][n]=items[n].getValue();
		}
	}
	return obj;
}

function encodeLi(){
	const spawns=document.querySelectorAll("#npcList>div"),
	obj={},
	arr=[],
	inv={},
	_s=spawns.length;
	for(let i=0;_s>i;i++){
		const id=spawns[i].id.slice(3),
		items=spawns[i].querySelectorAll('li'),
		_i=items.length;
		if(_i>0){
			obj[id]=getKey(items[0]).toString(36);
			for(let n=1;_i>n;n++)obj[id]+=","+getKey(items[n]).toString(36);
		}
	}
	function getKey(item){
		const value=item.getValue();
		if(typeof inv[value]==="undefined"){
			const _a=inv[value]=arr.length;
			arr[_a]=value;
			return _a;
		}
		else return inv[value];
	}
	obj.key=arr;
	return obj;
}

var baseLi=(function(){
	const btnB=node("button",null,{class:"btn"}),
	btn=btnB.cloneNode();
		btn.classList.add("btn-dark","species");
	const div=node("div",null,{class:"btn-group species-group"})
		btnB.classList.add("btn-secondary");
		const all=btnB.cloneNode();
			all.innerHTML="Add to All";
			btnB.innerHTML="Remove from All";
		div.append(all,btnB);
	return[
		node("li",null,{class:"list-group-item"}),
		btn,
		node("img",null,{class:"off"}),
		node("img",null,{class:"on"}),
		div
	];
}());

function readyLi(li){
	li.querySelector(".addToAll").addEventListener("click",addToAll);
	li.querySelector(".removeFromAll").addEventListener("click",removeFromAll);
	li.querySelector(".species").addEventListener("click",removeEl);
	return li;
}

function setMods(mods){
	if(mods&&mods.length>0){
		const items=$("#mods>li"),
		_i=items.length;
		var disable=false;
		for(let i=0;i<_i;i++){
			const val=items[i].getValue();
			if(mods.includes(val)){
				disable=true;
				items[i].classList.add("active");
			}
			else{
				const el=$(`[data-mod="${val}"]`),
				_e=el.length;
				for(let n=0;n<_e;n++)el[n].classList.add("hideMod");
			}
		}
		document.getElementById("activeStyle2").disabled=disable;
	}
}