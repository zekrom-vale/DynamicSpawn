"use strict";
addEventListener("load",()=>{
document.getElementById("speciesInput").addEventListener("keydown",function(event){
	if(event.key==="Tab"){
		event.preventDefault();
		var species=this.value,
		el=customSetUp(species),
		query=`#npcList li[value="${species}"]`;
		if(event.shiftKey)loop(".nav-link-sel>a");
		else if(event.ctrlKey)loop("li>.nav-link");
		else{
			let ul=document.querySelector(location.hash+">ul");
			if(!ul.querySelector(query))ul.prepend(readyLi(el));
		}
		function loop(els){
			els=$(els);
			const _l=els.length;
			for(let i=0;i<_l;i++){
				let ul=document.querySelector(els[i].dataset.hash+">ul");
				if(!ul.querySelector(query))ul.prepend(readyLi(el.cloneNode(1)));
			}
		}
	}
	else if(event.key==="Enter"){
		event.preventDefault();
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