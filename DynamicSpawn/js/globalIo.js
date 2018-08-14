"use strict";
addEventListener("DOMContentLoaded",()=>{
//--------------- Filter ---------------
$("#speciesInput").on("keyup paste cut",search);

//--------------- Remove All ---------------
document.getElementById("removeAll").addEventListener("click",event=>{
	const shift=event.shiftKey;
	if(event.ctrlKey)core(event);
	else alertModal(`Remove all items from the ${shift?"selected":"current"} list${shift?"(s)":""}?`,"This Cannot be undone!",{"resolve":[core,event]});
	function core(event){
		elm.npcList.setAttribute("aria-busy","true");
		if(shift){
			const sel=elm.npcTab.querySelectorAll(".nav-link-sel>a"),
			_l=sel.length,
			hashs=[];
			for(let i=0;i<_l;i++){
				let hash=sel[i].dataset.hash;
				hashs[i]="active-"+hash.slice(1);
				$(`${hash}:First ul:First`).empty();
			}
			let li=$("#speciesList li");
			_l=li.length;
			for(let i=0;i<_l;i++){
				li[i].classList.remove(...hashs);
				li[i].setAttribute("aria-selected","false");
			}
		}
		else{
			const li=$("#speciesList li"),
			_l=li.length;
			for(let i=0;i<_l;i++){
				li[i].classList.remove("active-"+location.hash.slice(1));
				li[i].setAttribute("aria-selected","false");
			}
			$(location.hash+":First ul:First").empty();
		}
		elm.npcList.removeAttribute("aria-busy");
	}
});

document.getElementById("removeVisible").addEventListener("click",function(event){
	const li=elm.speciesList.querySelectorAll("li"),
	_l=li.length;
	elm.npcList.style.display="none";
	elm.npcList.setAttribute("aria-busy","true");
	if(event.shiftKey){
		const base=elm.npcTab.querySelectorAll(".nav-link-sel>a"),
		_b=base.length;
		for(let n=0;n<_b;n++){
			const css="active-"+base[n].dataset.hash.slice(1);
			for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
				li[i].classList.remove(css);
				li[i].setAttribute("aria-selected","false");
				document.querySelector(base[n].dataset.hash+` [value="${li[i].getValue()}"]`).remove();
			}
		}
	}
	else{
		const hash=location.hash,
		css="active-"+hash.slice(1);
		for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
			li[i].classList.remove(css);
			li[i].setAttribute("aria-selected","false");
			document.querySelector(hash+` [value="${li[i].getValue()}"]`).remove();
		}
	}
	elm.npcList.style.display="";
	elm.npcList.removeAttribute("aria-busy");
});

document.getElementById("addVisible").addEventListener("click",function(event){
	var li=elm.speciesList.querySelectorAll("li");
	const _l=li.length-1;
	elm.npcList.style.display="none";
	elm.npcList.setAttribute("aria-busy","true");
	if(event.shiftKey){
		const base=elm.npcTab.querySelectorAll(".nav-link-sel>a");
		var uls=[],
		css=[];
		const _b=base.length;
		for(let n=0;n<_b;){
			uls[n]=document.getElementById(base[n].dataset.hash.slice(1));
			css[n]="active-"+uls[n++].id
		}
		for(let s=_l;s>=0;s--)if(li[s].style.display!=="none"){
			li[s].setAttribute("aria-selected","true");
			let LI=li[s].cloneNode(1);
			delete LI.id;
			LI.classList.add(...css);
			for(let l in uls)if(!li[s].classList.contains(css[l])){
				li[s].classList.add(css[l]);
				uls[l].getElementsByTagName("ul")[0].prepend(readyLi(LI.cloneNode(1)));
			}
		}
	}
	else{
		const hash=location.hash,
		css="active-"+hash.slice(1);
		for(let i=_l;i>=0;i--)if(!(li[i].classList.contains(css)||li[i].style.display==="none")){//!
			li[i].classList.add(css);
			li[i].setAttribute("aria-selected","true");
			let LI=li[i].cloneNode(1);
			LI.querySelector(".addToAll").addEventListener("click",addToAll);
			LI.querySelector(".removeFromAll").addEventListener("click",removeFromAll);
			LI.querySelector(".species").addEventListener("click",removeEl);
			delete LI.id;
			document.querySelector(hash+">ul").prepend(readyLi(LI));
		}
	}
	elm.npcList.style.display="";
	elm.npcList.removeAttribute("aria-busy");
});

document.getElementById("iexport").addEventListener("click",()=>{
	const data=getLi(),
	mods=document.querySelectorAll('#mods>li[aria-selected="true"]'),
	_m=mods.length;
	if(_m>0){
		data.mods=[];
		for(let i=0;i<_m;i++)data.mods[i]=mods[i].getAttribute("value");
	}
	saveData(data,"value.DyS.json");
})

document.getElementById("imp").addEventListener("click",()=>{document.getElementById("iimport").click()});
{//--------------- Import ---------------
	let fr=new FileReader();
	document.getElementById("iimport").addEventListener("change",()=>{
		fr.addEventListener('loadend',txt=>{
			elm.npcList.style.display="none";
			elm.npcList.setAttribute("aria-busy","true");
			var item=JSON.parse(txt.srcElement.result);
			for(let i in item)if(i!=="mods")for(let n of item[i])setLi(i,n);
			setMods(item.mods);
			elm.npcList.style.display="";
			elm.npcList.removeAttribute("aria-busy");
		},{once:true});
		fr.readAsText(document.getElementById("iimport").files[0]);
	});
}

document.getElementById("download").addEventListener("click",function(){
	const ob=getLi();
	var arr=[],arrF=[],
	i=0,f=0,
	e=()=>{document.getElementById("modalCancel").style.display="";};
	for(let n in ob){
		if(ob[n].length<1&&ob!=="npcROC")arrF[f++]=++i;
		else if(f===0)arr[i++]=n+`:"${ob[n].join(",")}"`;
	}
	document.getElementById("modalCancel").style.display="none";//!
	if(f>0){
		for(let i in arrF)arrF[i]=elm.npcTab.querySelector(
		`li:nth-child(${arrF[i]})>a`).innerText;
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