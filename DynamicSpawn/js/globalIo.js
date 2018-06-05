"use strict";
window.addEventListener("load",()=>{


//--------------- Filter ---------------
$("#speciesInput").on("keyup paste cut",function(){
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
});

//--------------- Import ---------------
var fr=new FileReader();
document.getElementById("iimport").addEventListener("change",()=>{
//medium.com/programmers-developers/convert-blob-to-string-in-javascript-944c15ad7d52
	fr.addEventListener('loadend',txt=>{
		txt=txt.srcElement.result;
		var item=JSON.parse(txt);
		for(let i in item)for(let n in item[i])setLi(i,item[i][n]);
	});
	fr.readAsText(document.getElementById("iimport").files[0]);
});

//--------------- Remove All ---------------
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

document.getElementById("removeVisible").addEventListener("click",function(event){
	var li=elm.speciesList.querySelectorAll("li.list-group-item"),
	_l=li.length;
	if(event.shiftKey){
		var base=elm.npcTab.querySelectorAll("li.nav-link-sel>a"),
		_b=base.length;
		for(let n=0;n<_b;n++){
			var css="active-"+base[n].dataset.hash.slice(1);
			for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
				li[i].classList.remove(css);
				let l=document.querySelector(`${base[n].dataset.hash} [value="${li[i].getAttribute("value")}"]`);
				l.parentNode.removeChild(l);
			}
		}
	}
	else{
		var hash=location.hash,
		css="active-"+hash.slice(1);
		for(let i=0;i<_l;i++)if(li[i].classList.contains(css)&&li[i].style.display!=="none"){
			li[i].classList.remove(css);
			let l=document.querySelector(`${hash} [value="${li[i].getAttribute("value")}"]`);
			l.parentNode.removeChild(l);
		}
	}
});

document.getElementById("addVisible").addEventListener("click",function(event){
	var li=elm.speciesList.querySelectorAll("li.list-group-item");
	const _l=li.length;
	if(event.shiftKey){
		var base=elm.npcTab.querySelectorAll("li.nav-link-sel>a"),
		uls=[],
		css=[];
		const _b=base.length;
		for(let n=0;n<_b;n++){
			uls[n]=document.getElementById(base[n].dataset.hash.slice(1));
			css[n]="active-"+uls[n].id.slice(1);
		}
		for(let s=0;s<_l;s++)if(li[s].style.display!=="none"){
			let LI=li[s].cloneNode(true);
			LI.id="";
			LI.classList.add(...css);
			for(let l in uls)if(!li[s].classList.contains(css[l])){
				li[s].classList.add(css[l]);
				let clone=LI.cloneNode(true);
				uls[l].getElementsByTagName("ul")[0].prepend(clone);
			}
		}
	}
	else{
		var hash=location.hash,
		css="active-"+hash.slice(1);
		for(let i=0;i<_l;i++)if(!(li[i].classList.contains(css)||li[i].style.display==="none")){
			li[i].classList.add(css);
			let LI=li[i].cloneNode(true);
			LI.setAttribute("onclick","removeEl(this)");
			LI.id="";
			document.querySelector(hash+">ul").prepend(LI);
		}
	}
});

document.getElementById("iexport").addEventListener("click",()=>{saveData(getLi(),"value.DyS.json");})

document.getElementById("imp").addEventListener("click",()=>{document.getElementById("iimport").click();});

document.getElementById("download").addEventListener("click",function(){
//https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
	var ob=getLi(),
	arr=[],
	arrF=[],
	i=0,
	f=0;
	for(let n in ob){
		if(ob[n].length<1)arrF[f++]=++i;
		else if(f===0)arr[i++]=`${n}:"${ob[n].join(",")}"`;
	}
	if(f>0){
		for(let i in arrF)arrF[i]=elm.npcTab.querySelector(
		`li:nth-child(${arrF[i]})>a`).innerHTML.replace(/ <span class="badge badge-primary">.<\/span>$/,"");
		document.getElementById("modalCancel").style.display="none";
		alertModal("Cannot download!","No Species exist in "+arrF.join(", "),{"finally":[e]});
		function e(){
			document.getElementById("modalCancel").style.display="";
		}
	}
	else{
		document.getElementById("modalCancel").style.display="none";
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
			"finally":[()=>{document.getElementById("modalCancel").style.display="";}]
		});
	}
});
});

function copyText(path){
	var el=document.querySelector(path);
	el.select();
	document.execCommand("copy");
}