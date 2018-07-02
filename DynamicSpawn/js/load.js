"use strict";
var saveData;
const elm={};

addEventListener("DOMContentLoaded",()=>{
//--------------- Set Up References ---------------
if(elm.length>0)for(let i in elm)elm[i]=null;
elm.npcTab=document.getElementById("npcTab");
elm.speciesList=document.getElementById("speciesList");
elm.npcList=document.getElementById("npcList");
Object.freeze(elm);
{
	let speciesList=document.querySelectorAll("#speciesList>li");
	const _s=speciesList.length;
	for(let i=0;i<_s;){
		speciesList[i].setAttribute("aria-setsize",_s);
		speciesList[i].setAttribute("aria-posinset",++i);
	}
}
//--------------- Species Cookie Value ---------------
let item=getData("value");
if(item){
	item=JSON.parse(item);
	for(let i in item)if(i!=="key"){
		let index=item[i].split(",");
		i="npc"+i;
		for(let n in index)setLi(i,item.key[parseInt(index[n],36)]);
	}
}
setMods(JSON.parse(getData("mods")));
//--------------- Tooltip ---------------
$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();
//--------------- Location ---------------
if(location.hash){
	let hash=location.hash;
	location.hash="npcGeneric";
	dtTab(document.querySelector(`[data-hash="${hash}"]`),true);
	location.hash=hash;
}
else location.hash="npcGeneric";
});

addEventListener("load",()=>{
{//--------------- Get Path ---------------
	let el=document.getElementById("path"),
	q=location.search.slice(1).split("&"),
	qi,
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
			},"cancel");
		}
		el.id+="2";
		el.value=sys?"Cannot Be a System URL":qi?"Invalid URL":e();
	}
	function tourInit(){
		document.head.appendChild(node("script",null,{src:"js/tour.js"}));
	}
}
if(/Edge/.test(navigator.userAgent))info("Edge is not fully supported","danger",null,true);
document.getElementById("npcList").removeAttribute("aria-busy");
});

//--------------- Set Data ---------------
addEventListener("beforeunload",()=>{
	setData("value",JSON.stringify(encodeLi()),90);
	setData("mods",JSON.stringify(getMods()),60);
	function getMods(){
		var mods=document.querySelectorAll('#mods>li[aria-selected="true"]'),
		arr=[];
		const _m=mods.length;
		for(let i=0;i<_m;i++)arr[i]=mods[i].getAttribute("value");
		return arr;
	}
});

if('serviceWorker' in navigator){
//https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
	navigator.serviceWorker.register('/serviceWorker.js',{scope:'/'});
}