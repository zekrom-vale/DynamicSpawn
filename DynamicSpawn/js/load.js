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
	const speciesList=document.querySelectorAll("#speciesList>li"),
	_s=speciesList.length;
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
		const index=item[i].split(",");
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
	const hash=location.hash;
	location.hash="npcGeneric";
	dtTab(document.querySelector(`[data-hash="${hash}"]`),true);
	location.hash=hash;
}
else location.hash="npcGeneric";
});

addEventListener("load",()=>{
{//--------------- Get Path ---------------
	const el=document.getElementById("path"),
	qi=getQueryString("path");
	let sys=(function(){return /System Path/i.test(qi);})();
	if(/^[a-z]:([\\\/][^\\\/:*?"<>|]+)+[\\\/]$/i.test(qi)&&!sys){
		el.value=qi;
		let arr=["warning",null,1],
		reg="[\\\/]steamapps[\\\/]common[\\\/]Starbound[\\\/]mods[\\\/]";
		if(new RegExp(reg+"?$").test(qi))info("Warning: Local Component Should not be In the Root of Mods",...arr);
		else if(!new RegExp(reg+'[^\\\/:*?"<>|]+[\\\/]?$').test(qi))info("Warning: Local Component Not in Starbound's Mod Folder",...arr);
		tourInit();
	}
	else{
		el.id+="2";
		el.value=sys?"Cannot Be a System URL":qi?"Invalid URL":(function(){
			let win=/Windows/.test(navigator.userAgent);
			alertModal("No path found",`Would you like to download the local component of Dynamic Spawn?<br/>If not, you still can create a list for later.${win?"":" <br/>Warning: the local component is compatable with Windows systems only."}`,{
				"resolve":[()=>{location.assign("https://github.com/zekrom-vale/DynamicSpawn/releases")}],
				"reject":[()=>{
						document.getElementById("download").disabled=true;
						tourInit();
					}]
			},"cancel");
		}());
	}
	function tourInit(){
		if(!getData("return"))document.head.appendChild(node("script",null,{src:"js/tour.js"}));
	}
}
if(/Edge|Trident/.test(navigator.userAgent))info(
	new nodes(
		"Edge is not fully supported, some functions ",
		new nodes(
			"will not ",
			node("u","work")
		).wrap("b"),
		". Explorer ",
		new nodes(
			"will not work ",
			node("u","at all")
		).wrap("b"),
		"! Due to the lack of modern scripting support."
	).contain(),
"danger",null,true);
document.getElementById("npcList").removeAttribute("aria-busy");
});

//--------------- Set Data ---------------
addEventListener("beforeunload",()=>{
	setData("value",JSON.stringify(encodeLi()),90);
	setData("mods",JSON.stringify(getMods()),60);
	function getMods(){
		const mods=document.querySelectorAll('#mods>li[aria-selected="true"]'),
		arr=[];
		const _m=mods.length;
		for(let i=0;i<_m;i++)arr[i]=mods[i].getAttribute("value");
		return arr;
	}
});

if('serviceWorker' in navigator)navigator.serviceWorker.register('/serviceWorker.js',{scope:'/'});
//https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers