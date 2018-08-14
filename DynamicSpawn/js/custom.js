"use strict";
addEventListener("load",()=>{
document.getElementById("speciesInput").addEventListener("keydown",function(event){
	if(event.key==="Tab"){
		event.preventDefault();
		const species=this.value,
		el=customSetUp(species),
		query=`#npcList li[value="${species}"]`;
		if(event.shiftKey)loop(".nav-link-sel>a");
		else if(event.ctrlKey)loop("li>.nav-link");
		else{
			const ul=document.querySelector(location.hash+">ul");
			if(!ul.querySelector(query))ul.prepend(readyLi(el));
		}
		function loop(els){
			els=$(els);
			const _l=els.length;
			for(let i=0;i<_l;i++){
				const ul=document.querySelector(els[i].dataset.hash+">ul");
				if(!ul.querySelector(query))ul.prepend(readyLi(el.cloneNode(1)));
			}
		}
	}
	else if(event.key==="Enter"){
		event.preventDefault();
		const items=document.querySelectorAll('#speciesList li'),
		_i=items.length;
		let item;
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
const customNPC=(function(){
	const[li,btn,img,img2,div]=baseLi,
	el=li.cloneNode();
	el.classList.add("custom-species");
	const b=btn.cloneNode(),
	divM=div.cloneNode(1);
		divM.firstChild.classList.add("addToAll");
		divM.childNodes[1].classList.add("removeFromAll");
	const imgM=img.cloneNode();
		imgM.src="img/tab_other.png";
	const imgM2=img2.cloneNode();
		imgM2.src="img/tab_other_select.png";
		b.append(imgM,imgM2);
	return[el,b,imgM,imgM2,divM];
}());
function customSetUp(specie){
	const[li,btn,img,img2,div]=customNPC,
	el=li.cloneNode();
	el.setAttribute("value",specie);
	const b=btn.cloneNode();
		b.innerHTML="Custom: "+specie;
		b.append(img.cloneNode(),img2.cloneNode());
	const div2=div.cloneNode(1);
	el.append(b,div2);
	return el;
}