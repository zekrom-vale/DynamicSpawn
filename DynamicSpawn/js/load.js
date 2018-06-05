"use strict";
var saveData;
const elm={};

window.addEventListener("load",()=>{
//--------------- Set Up References ---------------
if(elm.length>0)location.reload;
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
//--------------- Get Cookie Value ---------------
let c=getData("value");
if(c){
	let item=JSON.parse(c);
	for(let i in item)for(let n in item[i])setLi(i,item[i][n]);
}

//--------------- Tooltip ---------------
$('[data-toggle="tooltip"]').tooltip();
{//--------------- Tab list ---------------
	let els=document.querySelectorAll(".nav-link");
	const _l=els.length;
	for(let i=0;i<_l;i++)els[i].addEventListener("click",function(event){
		if(event.shiftKey){
			this.parentNode.classList.toggle('nav-link-sel');
			window.setTimeout(()=>{
				var hash=this.dataset.hash,
				style=document.getElementById("activeStyle");
				document.querySelector(`[data-hash="${location.hash}"]`).classList.add("show","active");
				this.classList.remove("active");
			},20);
		}
		else dtTab(this);
	},true);
}
$('[data-toggle="popover"]').popover();
{
	let activeMods=JSON.parse(getData("mods"));
	if(activeMods&&activeMods.length>0){
		let items=$("#mods>li"),
		_i=items.length,
		u=true;
		for(let i=0;i<_i;i++){
			if(!activeMods.includes(items[i].getAttribute("value"))){
				let el=$(`[data-mod="${items[i].getAttribute("value")}"]`),
				_e=el.length;
				for(let n=0;n<_e;n++)el[n].classList.add("hideMod");
			}
			else{
				u=false;
				items[i].classList.add("active");
			}
		}
		let el=document.getElementById("activeStyle2");
		if(u)el.innerHTML=el.innerHTML.replace(".hideMod","null");
		else el.innerHTML=el.innerHTML.replace("null",".hideMod");
	}
}
{//--------------- Get Path ---------------
	let q=location.search.slice(1).split("&"),
	qi;
	for(let i in q)if(/^path=/i.test(q[i])){
		qi=decodeURIComponent(q[i].slice(5)+"\\");
		continue;
	}
	let valid=/^[a-z]:((\\|\/)[^\\\/:*?"<>|]+)+(\\|\/)$/i.test(qi),
	sys=/System Path/.test(qi),
	el=document.getElementById("path");
	if(valid&&!sys){
		el.value=qi;
		let inMod=/(\\|\/)steamapps(\\|\/)common(\\|\/)Starbound(\\|\/)mods(\\|\/)[^\\\/]+(\\|\/)?$/.test(qi),
		atMod=/(\\|\/)steamapps(\\|\/)common(\\|\/)Starbound(\\|\/)mods(\\|\/)?$/.test(qi);
		if(atMod)popup("Warning: Local Component Should not be In the Root of Mods","warning",null,true);
		else if(!inMod)popup("Warning: Local Component Not in Starbound's Mod Folder","warning",null,true);
		if(!getData("return"))tour();
	}
	else{
		let e=()=>{
			alertModal("No path found","Would you like to download the local component of Dynamic Spawn?<br/>If not, you still can create a list for later",{
				"resolve":[()=>{location.assign("https://github.com/zekrom-vale/DynamicSpawn/tree/c%23")}],
				"reject":[()=>{
						document.getElementById("download").disabled=true;
						if(!getData("return"))tour();
					}]
			});
		}
		el.id+="2";
		el.value=sys?"Cannot Be a System URL":qi?"Invalid URL":e();
	}
}
document.body.removeChild(document.getElementById("load"));
});

async function tour(){
	popup("This site use localStorage to save your choices. <a href='https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API'>localStorage</a> is the modern version of cookies and is more secure. However, few sites use this feature.","warning","localStorage",true)
	var end=()=>{setData("return","true",30);},
	s="species",
	l=" select",
	g=" groups",
	t="st-of-type",
	S="Shift click to";
	if(await setPopover("nav.bg-dark","Global control buttons",`This apples to all ${s} in the${l}ed group.
	Shift:All${l}ed ${s+g}.`))return end();
	if(await setPopover("#mods","Select the Mods you are Using","<h4>Do this First</h4>Deselect all mods to see all mods.\nCustom species are ignored.","left"))return end();
	if(await setPopover("#searchOp","NPC Lookup Options","Chose what field you are looking up."))return end();
	if(await setPopover(`#${s}Label`,"NPC Lookup","Look up NPCs here.\nPress <kbd>Enter</kbd> to add a custom "+s))return end();
	var f;
	try{
		$("#side2").carousel(2);
	}catch(e){}
	if(await setPopover("#RegExpS","RegExp Toggle","Enable Regular Expressions.\nQuick guide on the right."))return end();
	if(await setPopover(`#${s}List`,"NPC List","All of the NPCs are displayed here, it will filter on the NPC Lookup."))return end();
	if(await setPopover(`#${s}List>li:fir${t}`,`Click the ${s} button to add to current group`,"Alt click to go to the mod page","left"))return end();
	if(await setPopover(`#${s}List>li:fir${t}>div>button:fir`+t,`Click to add to all${g}`,`${S} add to${l}ed${g}`,"right"))return end();
	if(await setPopover(`#${s}List>li:fir${t}>div>button:la`+t,`Click to remove from${g}`,`${S} remove from${l}ed${g}`,"right"))return end();
	if(await setPopover("#npcTab","NPC Groups",`Your${l}ion will end up below this click the tabs to switch${g}.
	${S+l} the tab.`,"top",true))return end();
}

function setPopover(h,t,c,p="top",l){
	var e=$(h),
	b="button",
	next=l?"":`<${b} class="btn btn-primary" onclick="die('${h}')">Next</${b}>`;
	e.popover({
		title:t,
		content:`${c}<div class="float-right">
${next}<${b} class="btn btn-danger" onclick="die('${h}',true)">End</${b}>
<div>
`,
		placement:p,
		html:true
	});
	e.popover("show");
	return new Promise(r=>{
		e[0].addEventListener("die",()=>r(false));
		e[0].addEventListener("dieExit",()=>r(true));
	});
}

var eventDie=new CustomEvent('die'),
eventExit=new CustomEvent('dieExit');
function die(el,exit){
	$(el).popover("dispose");
	document.querySelector(el).dispatchEvent(exit?eventExit:eventDie);
}

window.addEventListener("beforeunload",()=>{
	setData("value",JSON.stringify(getLi()),90);
	let val=document.querySelectorAll("#mods>li.active"),
	_v=val.length,
	arr=[];
	for(let i=0;i<_v;i++)arr[i]=val[i].getAttribute("value");
	setData("mods",JSON.stringify(arr,60));
});

function dtTab(el){
	var hash=el.dataset.hash,
	style=document.getElementById("activeStyle"),
	oldHash=location.hash,
	list=document.getElementById(hash.slice(1));
	document.querySelector(`[data-hash="${oldHash}"]`).classList.remove("show","active");
	document.getElementById(oldHash.slice(1)).classList.remove("active");
	el.classList.add("show","active");
	list.classList.add("active");
	list.classList.remove("fade");
	location.hash=hash;
	style.innerHTML=style.innerHTML.replace(/(active\-).+?\{/,`$1${hash.slice(1)}\{`);
}