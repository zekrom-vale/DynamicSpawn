"use strict";
window.addEventListener("load",()=>{
document.getElementById("speciesInput").addEventListener("keyup",function(event){
	var species=this.value;
	if(event.key==="Enter"){
		var el=customSetUp(document.getElementById("speciesInput").value);
		if(event.shiftKey){
			let els=$("li.nav-link-sel>a.nav-link"),
			_l=els.length;
			for(let i=0;i<_l;i++){
				let ul=document.querySelector(els[i].dataset.hash+">ul");
				if(!ul.querySelector(`#npcList li[value="${species}"]`))ul.prepend(readyLiC(el.cloneNode(true)));
			}
		}
		else if(event.ctrlKey){
			let els=$("li>a.nav-link"),
			_l=els.length;
			for(let i=0;i<_l;i++){
				let ul=document.querySelector(els[i].dataset.hash+">ul");
				if(!ul.querySelector(`#npcList li[value="${species}"]`))ul.prepend(readyLiC(el.cloneNode(true)));
			}
		}
		else{
			let ul=document.querySelector(location.hash+">ul");
			if(!ul.querySelector(`#npcList li[value="${species}"]`))ul.prepend(readyLiC(el));
		}
	}
});
});

var customNPC=(function(){
	var[li,btn,img,img2,div]=baseLi,
	el=li.cloneNode();
	el.classList.add("custom-species");
	var b=btn.cloneNode();
	var divM=div.cloneNode(true);
		divM.firstChild.classList.add("addToAll");
		divM.childNodes[1].classList.add("removeFromAll");
	var imgM=img.cloneNode();
		imgM.src="img/tab_other.png";
	var imgM2=img2.cloneNode();
		imgM2.src="img/tab_other_select.png";
		b.append(imgM,imgM2);
	return[el,b,imgM,imgM2,divM];
}());

function customSetUp(specie){
	var[li,btn,img,img2,div]=customNPC,
	el=li.cloneNode();
	el.setAttribute("value",specie);
	var b=btn.cloneNode();
		b.innerHTML="Custom: "+specie;
		b.append(img.cloneNode(),img2.cloneNode());
	var div2=div.cloneNode(true);
	el.append(b,div2);
	return el;
}

function modifyContC(){
	var el=this.parentNode;
	el.parentNode.removeChild(el);
}

function addToAllC(event){
	var elp=this.parentNode.parentNode,
	spawns=elm.npcList.getElementsByTagName("ul"),
	base=elm.npcList.getElementsByTagName("div"),
	arr=[];
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
		spawns[i].prepend(readyLiC(li));
	}
}

function removeFromAllC(event){
	var elp=this.parentNode.parentNode,
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

function readyLiC(li){
	li.querySelector(".species-group>.addToAll").addEventListener("click",addToAllC);
	li.querySelector(".species-group>.removeFromAll").addEventListener("click",removeFromAllC);
	li.querySelector("button.btn.species").addEventListener("click",modifyContC);
	return li;
}