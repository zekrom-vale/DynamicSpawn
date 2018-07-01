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
	dtTab(document.querySelector(`[data-hash="${hash}"]`),true);
	location.hash=hash;
}
else location.hash="npcGeneric";
//--------------- Species Cookie Value ---------------
{
	let speciesList=document.querySelectorAll("#speciesList>li"),
	_s=speciesList.length;
	for(let i=0;i<_s;i++){
		speciesList[i].setAttribute("aria-posinset",i+1);
		speciesList[i].setAttribute("aria-setsize",_s);
	}
}
let c=getData("value");
if(c){
	let item=JSON.parse(c);
	for(let i in item)if(i!=="key"){
		let index=item[i].split(",");
		i="npc"+i;
		for(let n in index)setLi(i,item.key[parseInt(index[n],36)]);
	}
}

//--------------- Tooltip ---------------
$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();
setMods(JSON.parse(getData("mods")));
{//--------------- Get Path ---------------
	let el=document.getElementById("path"),
	q=location.search.slice(1).split("&"),
	qi,
	//Web Worker
	sys=(function(){return /System Path/i.test(qi);})();
	for(let i of q)if(/^path=/i.test(i)){
		qi=decodeURIComponent(i.slice(5).replace(/\+/g,"%20")+"\\");
		continue;
	}//		Return v
	if(/^[a-z]:([\\\/][^\\\/:*?"<>|]+)+[\\\/]$/i.test(qi)&&!sys){//Web Worker End
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
		var script=document.createElement("script");
		script.src="js/tour.js";
		document.head.appendChild(script);
	}
}
document.getElementById("load").remove();
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
