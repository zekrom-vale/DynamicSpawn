"use strict";
var saveData;
const elm={};
document.getElementById("loading").style.width="1%";

window.addEventListener("load",()=>{
var load=document.getElementById("loading");
//--------------- Set Up References ---------------
if(elm.length>0)location.reload;
elm.npcTab=document.getElementById("npcTab");
elm.speciesList=document.getElementById("speciesList");
elm.npcList=document.getElementById("npcList");
Object.freeze(elm);
load.style.width="4%";
//--------------- Location ---------------
if(location.hash){
	let hash=location.hash;
	location.hash="npcGeneric";
	dtTab(document.querySelector(`[data-hash="${hash}"]`));
	location.hash=hash;
}
else location.hash="npcGeneric";
load.style.width="7%";
//--------------- Get Cookie Value ---------------
let c=getData("value");
if(c){
	let item=JSON.parse(c);
	for(let i in item)for(let n in item[i])setLi(i,item[i][n]);
}
load.style.width="12%";
//--------------- Filter ---------------
$("#speciesInput").on("keyup paste cut",filterFn);
document.getElementById("RegExp").addEventListener("change",filterFn)

//--------------- Tooltip ---------------
$('[data-toggle="tooltip"]').tooltip();
load.style.width="17%";
over("removeAll","Remove All",true);
load.style.width="20%";
over("removeVisible","Remove All Visible");
load.style.width="23%";
over("addVisible","Add All Visible");
load.style.width="25%";
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
load.style.width="40%";
{//--------------- Remove all ---------------
	document.getElementById("removeAll").addEventListener("click",event=>{
		if(event.ctrlKey)core(event);
		else alertModal(`Remove all items from the ${event.shiftKey?"selected":"current"} list${event.shiftKey?"(s)":""}?`,"This Cannot be undone!",{"resolve":[core,event]});
		function core(event){
			if(event.shiftKey){
				var sel=elm.npcTab.querySelectorAll("li.nav-link-sel>a"),
				_l=sel.length,
				hashs=[];
				for(let i=0;i<_l;i++){
					let hash=sel[i].dataset.hash;
					hashs[i]="active-"+hash.slice(1);
					$(`${hash}:First ul:First`).empty();
				}
				$("#speciesList li").removeClass(hashs.join(" "));
			}
			else{
				$("#speciesList li").removeClass("active-"+location.hash.slice(1));
				$(`${location.hash}:First ul:First`).empty();
			}
		}
	});
}
load.style.width="55%";
$('[data-toggle="popover"]').popover();
load.style.width="57%";
var mods=$("#mods>li");
load.style.width="60%";
{
	let activeMods=JSON.parse(getData("mods"));
	console.info(activeMods);
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
mods.on("click",function(){
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
load.style.width="65%";
{//--------------- Get Path ---------------
	let q=location.search.slice(1).split("&"),
	qi;
	for(let i in q)if(/^path=/i.test(q[i])){
		qi=decodeURIComponent(q[i].slice(5)+"\\");
		continue;
	}
	load.style.width="80%";
	let valid=/^[a-z]:((\\|\/)[^\\\/:*?"<>|]+)+(\\|\/)$/i.test(qi),
	sys=/System Path/.test(qi),
	el=document.getElementById("path");
	load.style.width="90%";
	if(valid&&!sys){
		el.value=qi;
		let inMod=/(\\|\/)steamapps(\\|\/)common(\\|\/)Starbound(\\|\/)mods(\\|\/)[^\\\/]+(\\|\/)?$/.test(qi),
		atMod=/(\\|\/)steamapps(\\|\/)common(\\|\/)Starbound(\\|\/)mods(\\|\/)?$/.test(qi);
		load.style.width="100%";
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
		load.style.width="100%";
		el.id+="2";
		el.value=sys?"Cannot Be a System URL":qi?"Invalid URL":e();
	}
}
document.body.removeChild(document.getElementById("load"));
document.getElementById("base").style.opacity="";
});

async function tour(){
	var end=()=>{setData("return","true",30);},
	s="species",
	l=" select",
	g=" groups",
	t="st-of-type",
	S="Shift click to";
	if(await setPopover("nav.navbar-dark","Global control buttons",`This apples to all ${s} in the${l}ed group.<br/>Shift:All${l}ed ${s+g}.`))return end();
	if(await setPopover("#searchOp","NPC Lookup Options","Chose what field you are looking up."))return end();
	if(await setPopover("#mods","Select the Mods you are Using","<h3>Do this First</h3><br/>Deselect all mods to see all mods.<br/>Custom species are ignored."))return end();
	var f;
	try{
		$("#side2").carousel(2);
	}catch(e){}
	if(await setPopover("#RegExpS","RegExp Toggle","Enable Regular Expressions.<br/>Quick guide on the right."))return end();
	if(await setPopover(`#${s}Label`,"NPC Lookup","Look up NPCs here.<br/>Press <kbd>Enter</kbd> to add a custom "+s))return end();
	if(await setPopover(`#${s}List`,"NPC List","All of the NPCs are displayed here, it will filter on the NPC Lookup."))return end();
	if(await setPopover(`#${s}List>li:fir${t}`,`Click the ${s} button to add to current group`,"Alt click to go to the mod page"))return end();
	if(await setPopover(`#${s}List>li:fir${t}>div>button:fir`+t,`Click to add to all${g}`,"${S} add to${l}ed${g}"))return end();
	if(await setPopover(`#${s}List>li:fir${t}>div>button:la`+t,`Click to remove from${g}`,`${S} remove from${l}ed${g}`))return end();
	if(await setPopover("#npcTab","NPC Groups",`Your${l}ion will end up below this click the tabs to switch${g}.<br/>${S+l} the tab.`))return end();
}

function setPopover(h,t,c,p="top"){
	var e=$(h),
	b="button";
	e.popover({
		title:t,
		content:`${c}
<div class="float-right">
<br/>
<${b} class="btn btn-primary" onclick="die('${h}')">Next</${b}>
<${b} class="btn btn-danger" onclick="die('${h}',true)">End</${b}>
<div>
<br/>`,
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

function filterFn(){
	v=document.getElementById("searchOp").value;
	if(document.getElementById("RegExp").checked){
		try{
			var v=new RegExp($(this).val(),"ig");
			$("#speciesList li, #npcList li").filter(function(){
				document.getElementById("speciesLabel").classList.remove("err");
				$(this).toggle(
					(v==0||v==1||v==1.5)&&v.test(this.firstChild.innerHTML)||
					(v==0||v==2||v==1.5)&&v.test(this.getAttribute("value"))||
					(v==0||v==4)&&v.test(this.dataset.author)||
					(v==0||v==3)&&v.test(this.dataset.mod)
				);
				$(this).toggle(v.test(this.getAttribute("value")));
		});
		}catch(e){
			document.getElementById("speciesLabel").classList.add("err");
		}
	}
	else{
		//https://www.w3schools.com/bootstrap4/bootstrap_filters.asp
		var value=$(this).val().toLowerCase().trim(),
		exists=txt=>txt?txt.toLowerCase().indexOf(value)>-1:false;
		$("#speciesList li,#npcList li").filter(function(){
			$(this).toggle(
				(v==0||v==1)&&exists(this.firstChild.innerHTML)||
				(v==0||v==2)&&exists(this.getAttribute("value"))||
				(v==0||v==4)&&exists(this.dataset.author)||
				(v==0||v==3)&&exists(this.dataset.mod)
			);
		});
		$("#mods li").filter(function(){
			$(this).toggle(exists(this.getAttribute("value")));
		});
	}
}