"use strict";
addEventListener("load",()=>{
document.getElementById("speciesInput").addEventListener("keydown",function(event){
	if(event.key==="Tab"){
		event.preventDefault();
		var species=this.value;
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
	else if(event.key==="Enter"){
		event.preventDefault();
		console.log("run");
		let items=document.querySelectorAll('#speciesList li'),
		item;
		const _i=items.length;
		for(let i=0;i<_i;i++){
			if(items[i].style.display!=="none"&&(!items[i].classList.contains("hideMod")||/\s*null/.test(document.getElementById("activeStyle2").innerHTML))){
				item=items[i];
				break;
			}
		}
		if(event.shiftKey||event.ctrlKey)item.querySelector('[data-key="1"]').click();
		else item.querySelector('[data-key="0"]').click();
	}
});
});
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