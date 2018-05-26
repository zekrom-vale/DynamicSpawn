"use strict";
var saveData;

window.addEventListener("load",()=>{
{//--------------- Get Path ---------------
	let q=location.search.slice(1).split("&"),
	qi;
	for(var i in q)if(/^path=/i.test(q[i])){
		qi=decodeURIComponent(q[i].slice(5)+"\\");
		continue;
	}
	let valid=/^[a-z]:((\\|\/)[^\\\/:*?"<>|]+)+(\\|\/)$/i.test(qi),
	sys=/System Path/.test(qi),
	inMod=/(\\|\/)steamapps(\\|\/)common(\\|\/)Starbound(\\|\/)mods(\\|\/)[^\\\/]+(\\|\/)?$/.test(qi),
	el=document.getElementById("path");
	if(valid&&!sys){
		let e=()=>{
			popup("Warning: Local Component Not in Starbound's Mod Folder","warning");
			return qi;
		}
		el.value=inMod?qi:e();
	}
	else{
		let e=()=>{
			alertModal("No path found","Would you like to download the local component of Dynamic Spawn?<br/>If not, you still can create a list for later",{
				"resolve":[()=>{location.href="https://github.com/zekrom-vale/DynamicSpawn/tree/c%23"}],
				"reject":[()=>{document.getElementById("download").disabled=true;}]
			});
		}
		el.id+="2";
		el.value=sys?"Cannot Be a System URL":qi?"Invalid URL":e();
	}
}
{//--------------- Generate speciesList ---------------
	if(location.hash){
		let hash=location.hash;
		location.hash="npcGeneric";
		dtTab(document.querySelector('[data-hash="'+hash+'"]'));
		location.hash=hash;
	}
	else location.hash="npcGeneric";
	let [li,btn,div]=baseLi,
	arr=[];
	for(var i in species){
		arr[i]=li.cloneNode();
		arr[i].setAttribute("value",species[i]);
		arr[i].id=species[i];
		let b=btn.cloneNode();
			b.innerHTML=species[i];
		arr[i].append(b,div.cloneNode(true));
	}
	document.getElementById("speciesList").append(...arr);//Spread
}
//--------------- Get Cookie Value ---------------
let c=getCookie("value");
if(c){
	let item=JSON.parse(c);
	for(var i in item)for(var n in item[i])setLi(i,item[i][n]);
}
//--------------- Filter ---------------
$("#speciesInput").on("keyup",function(){
	if(document.getElementById("RegExp").checked){
		var v=new RegExp($(this).val(),"ig");
		$("#speciesList li, #npcList li").filter(function(){
			$(this).toggle(v.test(this.firstChild.innerHTML)||v.test(this.getAttribute("value")))
		});
	}
	else{
		//https://www.w3schools.com/bootstrap4/bootstrap_filters.asp
		var value=$(this).val().toLowerCase().trim(),
		exists=txt=>txt.toLowerCase().indexOf(value)>-1;
		$("#speciesList li, #npcList li").filter(function(){
			$(this).toggle(exists(this.firstChild.innerHTML||exists(this.getAttribute("value"))));
		});
	}
});
//--------------- Tooltip ---------------
$('[data-toggle="tooltip"]').tooltip();
over("removeAll","Remove All",true);
over("removeVisible","Remove All Visible");
over("addVisible","Add All Visible");
{//--------------- Selection ---------------
	let els=document.querySelectorAll("li.nav-item"),
	_l=els.length;
	for(var i=0;i<_l;i++)els[i].addEventListener("click",function(event){
		if(event.shiftKey)this.classList.toggle('nav-link-sel');
	},true);
}
{//--------------- Tab list ---------------
	let els=document.querySelectorAll(".nav-link"),
	_l=els.length;
	for(var i=0;i<_l;i++)els[i].addEventListener("click",function(event){
		if(!event.shiftKey)dtTab(this);
		else window.setTimeout(()=>{
			var hash=this.dataset.hash,
			style=document.getElementById("activeStyle");
			document.querySelector(`[data-hash="${location.hash}"]`).classList.add("show","active");
			this.classList.remove("active");
		},20);
	},true);
}
{//--------------- Remove all ---------------
	document.getElementById("removeAll").addEventListener("click",event=>{
		if(event.ctrlKey)core(event);
		else{
			alertModal(`Remove all items from the ${event.shiftKey?"selected":"current"} list${event.shiftKey?"(s)":""}?`,"This Cannot be undone!",{"resolve":[core,event]});
		}
		function core(event){
			if(event.shiftKey){
				var sel=$("#npcTab>li.nav-link-sel>a"),
				_l=sel.length,
				hashs=[];
				for(var i=0;i<_l;i++){
					let hash=sel[i].dataset.hash;
					hashs[i]="active-"+hash.slice(1);
					$(`${hash}:First ul:First`).empty();
				}
				$(`#speciesList li`).removeClass(hashs.join(" "));
			}
			else{
				$(`#speciesList li`).removeClass("active-"+location.hash.slice(1));
				$(`${location.hash}:First ul:First`).empty();
			}
		}
	});
}
});