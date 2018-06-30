"use strict";
addEventListener("load",()=>{
{//--------------- Filter ---------------
let prev;
$("#speciesInput").on("keyup paste cut",function(){
	if(event.key==="Tab"||event.key==="Enter")return;
	var searchWorker=new Worker("webWorker/search.js");
	searchWorker.onmessage=function(e){
		$(e.data.query).toggle(e.data.bool);
	}
	document.getElementById("body").setAttribute("aria-busy","true");
	if(document.getElementById("RegExp").checked){
		/*let elp=this.parentNode;
		try{
			var e=new RegExp($(this).val(),"ig");
			$("#speciesList li,#npcList li").filter(function(){
				let bool=(
					v[0]&&e.test(this.querySelector('button.species').innerText)||
					v[1]&&e.test(this.getValue())||
					v[3]&&e.test(this.dataset.author)||
					v[2]&&e.test(this.dataset.mod)
				)
				if(bool!=(this.style.display==="none"))$(this).toggle(bool);
			});
			elp.classList.remove("err");
			this.setAttribute("aria-invalid","false");
		}catch(e){
			elp.classList.add("err");
			this.setAttribute("aria-invalid","true");
		}*/
	}
	else{
		//https://www.w3schools.com/bootstrap4/bootstrap_filters.asp
		searchWorker.postMessage({
			v:document.getElementById("searchOp").value,
			value:$(this).val(),
			prev:prev
		});
		$("#speciesList li,#npcList li").filter(function(){
			let disp=this.style.display!=="none";
			searchWorker.postMessage({
				disp:disp,
				query:`#${this.parentNode.id||this.parentNode.parentNode.id} li[value="${this.getValue()}"]`,
				text:this.querySelector('button.species').innerText,
				value:this.getValue(),
				author:this.dataset.author,
				mod:this.dataset.mod,
				custom:this.classList.contains("custom-species")
			});
		});
		/*$("#mods li").filter(function(){
			$(this).toggle(exists(this.getValue()));
		});*/
		prev=$(this).val();
	}
	document.getElementById("body").removeAttribute("aria-busy");
});
}
//--------------- Remove All ---------------
document.getElementById("removeAll").addEventListener("click",event=>{
	let shift=event.shiftKey;
	if(event.ctrlKey)core(event);
	else alertModal(`Remove all items from the ${shift?"selected":"current"} list${shift?"(s)":""}?`,"This Cannot be undone!",{"resolve":[core,event]});
	function core(event){
		document.getElementById("npcList").setAttribute("aria-busy","true");
		if(shift){
			var sel=elm.npcTab.querySelectorAll(".nav-link-sel>a"),
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
			let li=$("#speciesList li"),
			_l=li.length;
			for(let i=0;i<_l;i++){
				li[i].classList.remove("active-"+location.hash.slice(1));
				li[i].setAttribute("aria-selected","false");
			}
			$(location.hash+":First ul:First").empty();
		}
		document.getElementById("npcList").removeAttribute("aria-busy");
	}
});

document.getElementById("removeVisible").addEventListener("click",function(event){
	var li=elm.speciesList.querySelectorAll("li"),
	_l=li.length;
	document.getElementById("npcList").setAttribute("aria-busy","true");
	if(event.shiftKey){
		var base=elm.npcTab.querySelectorAll(".nav-link-sel>a"),
		_b=base.length;
		for(let n=0;n<_b;n++){
			var css="active-"+base[n].dataset.hash.slice(1);
			for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
				li[i].classList.remove(css);
				li[i].setAttribute("aria-selected","false");
				let l=document.querySelector(base[n].dataset.hash+` [value="${li[i].getValue()}"]`);
				l.remove();
			}
		}
	}
	else{
		var hash=location.hash,
		css="active-"+hash.slice(1);
		for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
			li[i].classList.remove(css);
			li[i].setAttribute("aria-selected","false");
			let l=document.querySelector(hash+` [value="${li[i].getValue()}"]`);
			l.remove();
		}
	}
	document.getElementById("npcList").removeAttribute("aria-busy");
});

document.getElementById("addVisible").addEventListener("click",function(event){
	var li=elm.speciesList.querySelectorAll("li");
	const _l=li.length-1;
	document.getElementById("npcList").setAttribute("aria-busy","true");
	if(event.shiftKey){
		var base=elm.npcTab.querySelectorAll(".nav-link-sel>a"),
		uls=[],
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
		var hash=location.hash,
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
	document.getElementById("npcList").removeAttribute("aria-busy");
});

document.getElementById("iexport").addEventListener("click",()=>{
	var data=getLi(),
	mods=document.querySelectorAll('#mods>li[aria-selected="true"]');
	const _m=mods.length;
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
			var item=JSON.parse(txt.srcElement.result);
			for(let i in item)if(i!=="mods")for(let n of item[i])setLi(i,n);
			setMods(item.mods);
		},{once:true});
		fr.readAsText(document.getElementById("iimport").files[0]);
	});
}

document.getElementById("download").addEventListener("click",function(){
	var ob=getLi(),
	arr=[],arrF=[],
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