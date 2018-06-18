"use strict";
addEventListener("load",()=>{
document.getElementById("speciesInput").addEventListener("keyup",function(event){
	var species=this.value;
	if(event.key==="Enter"){
		let el=customSetUp(this.value);
		if(event.shiftKey){
			let els=$(".nav-link-sel>a"),
			_l=els.length;
			for(let i=0;i<_l;i++){
				let ul=document.querySelector(els[i].dataset.hash+">ul");
				if(!ul.querySelector(`#npcList li[value="${species}"]`))ul.prepend(readyLi(el.cloneNode(1)));
			}
		}
		else if(event.ctrlKey){
			let els=$("li>.nav-link"),
			_l=els.length;
			for(let i=0;i<_l;i++){
				let ul=document.querySelector(els[i].dataset.hash+">ul");
				if(!ul.querySelector(`#npcList li[value="${species}"]`))ul.prepend(readyLi(el.cloneNode(1)));
			}
		}
		else{
			let ul=document.querySelector(location.hash+">ul");
			if(!ul.querySelector(`#npcList li[value="${species}"]`))ul.prepend(readyLi(el));
		}
	}
});
});

var customNPC=(function(){
	var[li,btn,img,img2,div]=baseLi,
	el=li.cloneNode();
	el.classList.add("custom-species");
	var b=btn.cloneNode(),
	divM=div.cloneNode(1);
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
	var div2=div.cloneNode(1);
	el.append(b,div2);
	return el;
}