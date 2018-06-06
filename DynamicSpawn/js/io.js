"use strict";
window.addEventListener("load",()=>{
$("#mods>li").on("click",function(){
	this.classList.toggle("active");
	var items=$("#mods>li"),
	_i=items.length,
	u=true;
	for(let i=0;i<_i;i++){
		let el=$(`[data-mod="${items[i].getAttribute("value")}"]`),
		_e=el.length,
		v;
		if(items[i].classList.contains("active")){
			v=false;
			u=false;
		}
		else v=true;
		for(let n=0;n<_e;n++)el[n].classList.toggle("hideMod",v);
	}
	let el=document.getElementById("activeStyle2");
	if(u)el.innerHTML=el.innerHTML.replace(".hideMod","null");
	else el.innerHTML=el.innerHTML.replace("null",".hideMod");
	
});

$("#speciesList .species").on("click",modifyCont);
$("#speciesList .species-group>.addToAll").on("click",addToAll);
$("#speciesList .species-group>.removeFromAll").on("click",removeFromAll);

});