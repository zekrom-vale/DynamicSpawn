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
		if("#"+set===location.hash)el.setAttribute("aria-selected","true");
		var li=el.cloneNode(1);
		delete li.querySelector(".species").dataset.toggle;
		delete li.id;
		document.querySelector(`#${set}>ul`).appendChild(readyLi(li));
	}
}

function getLi(){
	var spawns=document.querySelectorAll("#npcList>div"),
	obj={},
	_s=spawns.length;
	//Web Worker
	for(let i=0;_s>i;i++){
		let id=spawns[i].id,
		items=spawns[i].querySelectorAll('li[roll="button"]'),
		_i=items.length;
		if(_i>0){
			obj[id]=[];
			for(let n=0;_i>n;n++)obj[id][n]=items[n].getValue();
		}
	}
	return obj;
}

function encodeLi(){
	var spawns=document.querySelectorAll("#npcList>div"),
	obj={},
	arr=[],
	inv={},
	_s=spawns.length;
	//Web Worker
	for(let i=0;_s>i;i++){
		let id=spawns[i].id,
		items=spawns[i].querySelectorAll('li'),
		_i=items.length;
		if(_i>0){
			obj[id]=getKey(items[0]).toString(36);
			for(let n=1;_i>n;n++)obj[id]+=","+getKey(items[n]).toString(36);
		}
	}
	function getKey(item){
		let value=item.getValue();
		if(typeof inv[value]==="undefined"){
			let _a=inv[value]=arr.length;
			arr[_a]=value;
			return _a;
		}
		else return inv[value];
	}
	obj.key=arr;
	return obj;
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

function readyLi(li){
	li.querySelector(".addToAll").addEventListener("click",addToAll);
	li.querySelector(".removeFromAll").addEventListener("click",removeFromAll);
	li.querySelector(".species").addEventListener("click",removeEl);
	return li;
}
//Web Worker End