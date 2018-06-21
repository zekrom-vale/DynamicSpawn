"use strict";
var saveData;
const elm={};

addEventListener("load",()=>{
//--------------- Set Up References ---------------
if(elm.length>0)for(let i in elm)elm[i]=null;
elm.npcTab=document.getElementById("npcTab");
elm.speciesList=document.getElementById("speciesList");
elm.npcList=document.getElementById("npcList");
Object.freeze(elm);
//--------------- Location ---------------
if(location.hash){
	let hash=location.hash;
	location.hash="npcGeneric";
	dtTab(document.querySelector(`[data-hash="${hash}"]`));
	location.hash=hash;
}
else location.hash="npcGeneric";
//--------------- Species Cookie Value ---------------
let c=getData("value");
if(c){
	let item=JSON.parse(c);
	for(let i in item)for(let n in item[i])setLi(i,item[i][n]);
}

//--------------- Tooltip ---------------
$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();
{//--------------- Get Mods ---------------
	let mods=JSON.parse(getData("mods"));
	if(mods&&mods.length>0){
		let items=$("#mods>li"),
		_i=items.length,
		disable=false;
		for(let i=0;i<_i;i++){
			let val=items[i].getValue();
			if(mods.includes(val)){
				disable=true;
				items[i].classList.add("active");
			}
			else{
				let el=$(`[data-mod="${val}"]`),
				_e=el.length;
				for(let n=0;n<_e;n++)el[n].classList.add("hideMod");
			}
		}
		document.getElementById("activeStyle2").disabled=disable;
	}
}
{//--------------- Get Path ---------------
	let q=location.search.slice(1).split("&"),
	qi,
	el=document.getElementById("path"),
	sys=(function(){return /System Path/i.test(qi);})();
	for(let i of q)if(/^path=/i.test(i)){
		qi=decodeURIComponent(i.slice(5).replace(/\+/g,"%20")+"\\");
		continue;
	}
	if(/^[a-z]:([\\\/][^\\\/:*?"<>|]+)+[\\\/]$/i.test(qi)&&!sys){
		el.value=qi;
		let arr=["warning",null,1],
		reg="[\\\/]steamapps[\\\/]common[\\\/]Starbound[\\\/]mods[\\\/]";
		if(new RegExp(reg+"?$").test(qi))info("Warning: Local Component Should not be In the Root of Mods",...arr);
		else if(!new RegExp(reg+'[^\\\/:*?"<>|]+[\\\/]?$').test(qi))info("Warning: Local Component Not in Starbound's Mod Folder",...arr);
		if(!getData("return"))tourInit();
	}
	else{
		let e=()=>{
			alertModal("No path found","Would you like to download the local component of Dynamic Spawn?<br/>If not, you still can create a list for later",{
				"resolve":[()=>{location.assign("https://github.com/zekrom-vale/DynamicSpawn/releases")}],
				"reject":[()=>{
						document.getElementById("download").disabled=true;
						if(!getData("return"))tourInit();
					}]
			});
		}
		el.id+="2";
		el.value=sys?"Cannot Be a System URL":qi?"Invalid URL":e();
	}
	function tourInit(){
		var script=document.createElement("script");
		script.src="js/tour.js";
		document.head.appendChild(script);
	}
}
document.getElementById("load").remove();
});

//--------------- Set Data ---------------
addEventListener("beforeunload",()=>{
	setData("value",JSON.stringify(getLi()),90);
	let val=document.querySelectorAll("#mods>.active"),
	_v=val.length,
	arr=[];
	for(let i=0;i<_v;i++)arr[i]=val[i].getValue();
	setData("mods",JSON.stringify(arr,60));
});

function dtTab(el){
	var hash=el.dataset.hash;
	{
		// style=document.getElementById("activeStyle"),
		let oldHash=location.hash,
		list=document.getElementById(hash.slice(1));
		document.querySelector(`[data-hash="${oldHash}"]`).classList.remove("show","active");
		document.getElementById(oldHash.slice(1)).classList.remove("active");
		el.classList.add("show","active");
		list.classList.add("active");
		list.classList.remove("fade");
		location.hash=hash;
		//style.innerHTML=style.innerHTML.replace(/active-[^{]+/,"active-"+hash.slice(1));
	}
	var li=document.querySelectorAll("#speciesList li"),
	_l=li.length;
	for(let i=0;i<_l;)li[i].setAttribute("aria-selected",li[i++].classList.contains("active-"+hash.slice(1)));
}