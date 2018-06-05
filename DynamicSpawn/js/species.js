"use strict";
function setLi(set,key){
	var el=document.getElementById(key),
	css="active-"+set;
	if(!el){
		var el=customSetUp(key);
		let ul=document.querySelector(`#${set}>ul`);
		if(!ul.querySelector(`#npcList li[value="${key}"]`))ul.prepend(el);
	}
	else if(!el.classList.contains(css)){
		el.classList.add(css);
		var li=el.cloneNode(true);
		li.querySelector("button.btn.species").dataset.toggle="";
		li.querySelector(".species-group>.addToAll").addEventListener("click",addToAll);
		li.querySelector(".species-group>.removeFromAll").addEventListener("click",removeFromAll);
		li.querySelector("button.btn.species").addEventListener("click",removeEl);
		li.id="";
		document.querySelector(`#${set}>ul`).appendChild(li);
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