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
		atMod=/(\\|\/)steamapps(\\|\/)common(\\|\/)Starbound(\\|\/)mods(\\|\/)?$/.test(qi)
		if(atMod)popup("Warning: Local Component Should not be In the Root of Mods","warning",null,true);
		else if(!inMod)popup("Warning: Local Component Not in Starbound's Mod Folder","warning",null,true);
		
	}
	else{
		let e=()=>{
			alertModal("No path found","Would you like to download the local component of Dynamic Spawn?<br/>If not, you still can create a list for later",{
				"resolve":[()=>{location.assign("https://github.com/zekrom-vale/DynamicSpawn/tree/c%23")}],
				"reject":[()=>{document.getElementById("download").disabled=true;}]
			});
		}
		el.id+="2";
		el.value=sys?"Cannot Be a System URL":qi?"Invalid URL":e();
	}
}
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
//--------------- Filter ---------------
$("#speciesInput").on("keyup paste cut",filterFn);
document.getElementById("RegExp").addEventListener("change",filterFn)

//--------------- Tooltip ---------------
$('[data-toggle="tooltip"]').tooltip();
over("removeAll","Remove All",true);
over("removeVisible","Remove All Visible");
over("addVisible","Add All Visible");
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
$('[data-toggle="popover"]').popover();
});

window.addEventListener("beforeunload",()=>{
	setData("value",JSON.stringify(getLi()),90);
});

function filterFn(){
	if(document.getElementById("RegExp").checked){
		try{
			var v=new RegExp($(this).val(),"ig");
			$("#speciesList li, #npcList li").filter(function(){
				document.getElementById("speciesLabel").classList.remove("err");
				$(this).toggle(v.test(this.firstChild.innerHTML)||v.test(this.getAttribute("value")));
		});
		}catch(e){
			document.getElementById("speciesLabel").classList.add("err");
		}
	}
	else{
		//https://www.w3schools.com/bootstrap4/bootstrap_filters.asp
		var value=$(this).val().toLowerCase().trim(),
		exists=txt=>txt.toLowerCase().indexOf(value)>-1;
		$("#speciesList li,#npcList li").filter(function(){
			$(this).toggle(exists(this.firstChild.innerHTML)||exists(this.getAttribute("value")));
		});
	}
}