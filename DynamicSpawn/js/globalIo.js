"use strict";
window.addEventListener("load",()=>{
//--------------- Filter ---------------
$("#speciesInput").on("keyup paste cut",function(){
	var v=document.getElementById("searchOp").value;
    v=[
        v==(0||1||1.5),
        v==(0||2||1.5),
        v%3==0,
        v%4==0
    ];
	if(document.getElementById("RegExp").checked){
		let elp=this.parentNode;
		try{
			var e=new RegExp($(this).val(),"ig");
			$("#speciesList li,#npcList li").filter(function(){
				$(this).toggle(
					v[0]&&e.test(this.firstChildocument.innerHTML)||
					v[1]&&e.test(this.getAttribute("value"))||
					v[3]&&e.test(this.dataset.author)||
					v[2]&&e.test(this.dataset.mod)
				);
				$(this).toggle(e.test(this.getAttribute("value")));
			});
			elp.classList.remove("err");
		}catch(e){
			elp.classList.add("err");
		}
	}
	else{
		//https://www.w3schools.com/bootstrap4/bootstrap_filters.asp
		var value=$(this).val().trim().toLowerCase(),
		exists=txt=>txt.toLowerCase().indexOf(value)>-1;
		$("#speciesList li,#npcList li").filter(function(){
			$(this).toggle(
				v[0]&&exists(this.firstChildocument.innerHTML)||
				v[1]&&exists(this.getAttribute("value"))||
				v[3]&&exists(this.dataset.author)||
				v[2]&&exists(this.dataset.mod)
			);
		});
		$("#mods li").filter(function(){
			$(this).toggle(exists(this.getAttribute("value")));
		});
	}
});

//--------------- Import ---------------
var fr=new FileReader();
document.getElementById("iimport").addEventListener("change",()=>{
	fr.addEventListener('loadend',txt=>{
		var item=JSON.parse(txt.srcElement.result);
		for(let i in item)for(let n of item[i])setLi(i,n);
	});
	fr.readAsText(document.getElementById("iimport").files[0]);
});

//--------------- Remove All ---------------
document.getElementById("removeAll").addEventListener("click",event=>{
	if(event.ctrlKey)core(event);
	else alertModal(`Remove all items from the ${event.shiftKey?"selected":"current"} list${event.shiftKey?"(s)":""}?`,"This Cannot be undone!",{"resolve":[core,event]});
	function core(event){
		if(event.shiftKey){
			var sel=elm.npcTab.querySelectorAll(".nav-link-sel>a"),
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
			$(location.hash+":First ul:First").empty();
		}
	}
});

document.getElementById("removeVisible").addEventListener("click",function(event){
	var li=elm.speciesList.querySelectorAll("li"),
	_l=li.length;
	if(event.shiftKey){
		var base=elm.npcTab.querySelectorAll(".nav-link-sel>a"),
		_b=base.length;
		for(let n=0;n<_b;n++){
			var css="active-"+base[n].dataset.hash.slice(1);
			for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
				li[i].classList.remove(css);
				let l=document.querySelector(base[n].dataset.hash+` [value="${li[i].getAttribute("value")}"]`);
				l.parentNode.removeChild(l);
			}
		}
	}
	else{
		var hash=location.hash,
		css="active-"+hash.slice(1);
		for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
			li[i].classList.remove(css);
			let l=document.querySelector(hash+` [value="${li[i].getAttribute("value")}"]`);
			l.parentNode.removeChild(l);
		}
	}
});

document.getElementById("addVisible").addEventListener("click",function(event){
	var li=elm.speciesList.querySelectorAll("li");
	const _l=li.length;
	if(event.shiftKey){
		var base=elm.npcTab.querySelectorAll(".nav-link-sel>a"),
		uls=[],
		css=[];
		const _b=base.length;
		for(let n=0;n<_b;){
			uls[n]=document.getElementById(base[n].dataset.hash.slice(1));
			css[n++]="active-"+uls[n].id.slice(1);
		}
		for(let s=0;s<_l;s++)if(li[s].style.display!=="none"){
			let LI=li[s].cloneNode(1);
			LI.id="";
			LI.classList.add(...css);
			for(let l in uls)if(!li[s].classList.contains(css[l])){
				li[s].classList.add(css[l]);
				uls[l].getElementsByTagName("ul")[0].prepend(readyLi(LI.cloneNode(1)));
			}
		}
	}
	else{
		var hash=location.hash,
		css="active-"+hash.slice(1);
		for(let i=0;i<_l;i++)if(!(li[i].classList.contains(css)||li[i].style.display==="none")){//!
			li[i].classList.add(css);
			let LI=li[i].cloneNode(1);
			LI.querySelector(".addToAll").addEventListener("click",addToAll);
			LI.querySelector(".removeFromAll").addEventListener("click",removeFromAll);
			LI.querySelector(".species").addEventListener("click",removeEl);
			LI.id="";
			document.querySelector(hash+">ul").prepend(readyLi(LI));
		}
	}
});

document.getElementById("iexport").addEventListener("click",()=>{saveData(getLi(),"value.DyS.json");})

document.getElementById("imp").addEventListener("click",()=>{document.getElementById("iimport").click()});

document.getElementById("download").addEventListener("click",function(){
	var ob=getLi(),
	arr=arrF=[],
	i=f=0;
	e=()=>{document.getElementById("modalCancel").style.display="";};
	for(let n in ob){
		if(ob[n].length<1)arrF[f++]=++i;
		else if(f===0)arr[i++]=n+`:"${ob[n].join(",")}"`;
	}
	document.getElementById("modalCancel").style.display="none";//!
	if(f>0){
		for(let i of arrF)i=elm.npcTab.querySelector(
		`li:nth-child(${i})>a`).innerHTML.replace(/ <span class="[^"]+">.<.span>$/,"");
		alertModal("Cannot download!","No Species exist in "+arrF.join(", "),{
			"finally":[e]
		});
	}
	else{
		alertModal("Paste the copped value to the file name","Then continue the application",{
			"resolve":[()=>{
				var I=document.getElementById("path");
				if(I){
					I.disabled=false;
					I.value+="value.DyS.cosv";
					I.select();
					document.execCommand("copy");
					I.value=I.value.replace(/value\.DyS\.cosv$/i,"");
					I.disabled=true;
				}
				saveData(arr.join("\n"),"value.DyS.cosv",true);
			}],
			"finally":[e]
		});
	}
});
});

function copyText(path){
	var el=document.querySelector(path);
	el.select();
	document.execCommand("copy");
}