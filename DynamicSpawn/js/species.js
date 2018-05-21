"use strict";
window.addEventListener("load",()=>{
	//--------------- Generate speciesList ---------------
	location.hash="npcGeneric";
	var btnB=document.createElement("button");
		btnB.classList.add("btn");
	var li=document.createElement("li");
		li.classList.add("list-group-item");
	var btn=btnB.cloneNode();
		btn.setAttribute("onclick","modifyCont(this)");
		btn.style="width:50%;min-width:100px";
		btn.classList.add("btn-dark");
	var div=document.createElement("div");
		div.classList.add("btn-group","float-right");
		btnB.classList.add("btn-secondary");
		var all=btnB.cloneNode();
			all.setAttribute("onclick","addToAll(this)");
			all.innerHTML="Add to All";
			btnB.setAttribute("onclick","removeFromAll(this)");
			btnB.innerHTML="Remove from All";
		div.append(all,btnB);
	var arr=[];
	for(var i in species){
		arr[i]=li.cloneNode();
		arr[i].setAttribute("value",species[i]);
		arr[i].id=species[i];
		let b=btn.cloneNode();
			b.innerHTML=species[i];
		arr[i].append(b,div.cloneNode(true));
	}
	document.getElementById("speciesList").append(...arr);//Spread
	//--------------- Get Cookie Value ---------------
	var c=getCookie("value");
	if(c){
		var item=JSON.parse(c);
		for(var i in item)for(var n in item[i])setLi(i,item[i][n]);
	}
	saveData=(function(){
		var a=document.createElement("a");
		document.body.appendChild(a);
		a.style="display:none";
		return function(data,fileName,t){
			var json=(t)?data:JSON.stringify(data),
				blob=new Blob([json],{type:"octet/stream"}),
				url=window.URL.createObjectURL(blob);
			a.href=url;
			a.download=fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		};
		//https://jsfiddle.net/koldev/cW7W5/
	}());
	//--------------- Filter ---------------
	$("#speciesInput").on("keyup",function(){
		if(document.getElementById("RegExp").checked){
			console.log($(this).val())
			var v=new RegExp($(this).val(),"ig");
			console.log(v)
			$("#speciesList li, #npcList li").filter(function(){
				$(this).toggle(v.test(this.firstChild.innerHTML)||v.test(this.getAttribute("value")))
			});
		}
		else{
			//https://www.w3schools.com/bootstrap4/bootstrap_filters.asp
			var value=$(this).val().toLowerCase().replace(/^\s*|\s*$/g,""),
			exists=txt=>txt.toLowerCase().indexOf(value)>-1;
			$("#speciesList li, #npcList li").filter(function(){
				$(this).toggle(exists(this.firstChild.innerHTML||exists(this.getAttribute("value"))))
			});
		}
	});
	//--------------- Tooltip ---------------
	$('[data-toggle="tooltip"]').tooltip();
	//--------------- Get Path ---------------
	var q=location.search.replace(/^\?/,"").split("&");
	for(var i in q){
		if(/^path=/i.test(q[i])){
			q=q[i].replace(/^path=/i,"");
			continue;
		}
	}
	document.getElementById("path").value=q;
});

var saveData,
modifyCont=el=>{
	el=el.parentNode;
	let hash=location.hash;
	var css="active-"+hash.replace("#","");
	if(el.classList.contains(css)){
	var item=document.querySelector(`${hash} li[value=${el.getAttribute("value")}]`);
		item.parentNode.removeChild(item);
		el.classList.remove(css);
	}
	else{
		el.classList.add(css);
		var li=el.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		document.querySelector(hash+">ul").prepend(li);
	}
},

addToAll=el=>{
	var elp=el.parentNode.parentNode,
	spawns=$("#npcList ul"),
	base=$("#npcList>div"),
	arr=[],
	_b=base.length;
	for(var i=0;_b>i;i++){
		if(elp.classList.contains("active-"+base[i].id))arr[i]=false;
		else elp.classList.add("active-"+base[i].id);
	}
	var _s=spawns.length;
	for(var i=0;_s>i;i++)if(arr[i]!=false){
		let li=elp.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		spawns[i].prepend(li);
	}
},

removeEl=el=>{
	var elp=el.parentNode;
	document.getElementById(el.getAttribute("value")).classList.remove("active-"+location.hash.replace("#",""));
},

updateHash=el=>{
	var hash=el.hash,
	style=document.getElementById("activeStyle");
	location.hash=hash;
	style.innerHTML=style.innerHTML.replace(/active\-.+?\{/,`active-${hash.replace("#","")}\{`);
},

removeFromAll=el=>{
	el=el.parentNode.parentNode;
	var arr=el.classList.value.split(" ")
	for(var i in arr)if(arr[i].includes("active-")){
		let t=arr[i].replace("active-","");
		var item=document.querySelector(`#${t} [value=${el.getAttribute("value")}]`);
		if(item){
			item.parentNode.removeChild(item);
			el.classList.remove(arr[i]);
		}
	}
},

download=()=>{
	var ob=getLi(),
	xhr=new XMLHttpRequest();
	for(var i in ob)ob[i]=ob[i].join(",");
	xhr.open("POST",'core.zip',true);
	xhr.setRequestHeader("Content-type",'text/plain;charset=ASCII');
	xhr.setRequestHeader("Access-Control-Allow-Origin","*");
	xhr.onreadystatechange=()=>{
		if(xhr.readyState===4&&xhr.status===200){
			saveData(xhr.response,'DynamicSpawnTest.pak',true);
		}
	}
	xhr.responseType="arraybuffer";
	xhr.send();
},

iimport=()=>{
	var fr=new FileReader();
//medium.com/programmers-developers/convert-blob-to-string-in-javascript-944c15ad7d52
	fr.addEventListener('loadend',(txt)=>{
		txt=txt.srcElement.result;
		var item=JSON.parse(txt);
		for(var i in item)for(var n in item[i])setLi(i,item[i][n]);
	});
	try{
		files=document.getElementById("iimport").files;
		if(files.length<1)throw "No file selected";
		fr.readAsText(files[0]);
	}catch(err){
		popup("Import failure: "+err);
	}
},

setLi=(set,key)=>{
	var el=document.getElementById(key);
	console.log(key,el)
	var css="active-"+set;
	if(!el.classList.contains(css)){
		el.classList.add(css);
		var li=el.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		document.querySelector(`#${set}>ul`).appendChild(li);
	}
},

iexport=()=>{
//https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
	var input=document.getElementById("path");
	input.disabled=false;
	input.select();
	console.log(document.execCommand("copy"));
	input.disabled=true;
	return saveData(getLi(),"value.DyS.json");
},

getLi=()=>{
	var spawns=$("#npcList>div"),
	arr={},
	_s=spawns.length;
	for(var i=0;_s>i;i++){
		let id=spawns[i].id,
		items=$(`#${id} li`),
		_i=items.length;
		arr[id]=[];
		for(var n=0;_i>n;n++)arr[id][n]=items[n].getAttribute("value");
	}
	return arr;
},

popup=(mesage,type="danger")=>{
	var div=document.createElement("div");
		div.classList.add("alert","alert-"+type,"alert-dismissible");
		div.innerHTML=mesage;
	var btn=document.createElement("button");
		btn.classList.add("close");
		btn.dataset.dismiss="alert";
		btn.innerHTML="×";
	div.appendChild(btn);
	document.body.prepend(div);
},

removeAll=()=>{
	if(confirm("Remove all items from the current list?\nThis Cannot be undone!")){
		$(`#speciesList li`).removeClass("active-"+location.hash.replace("#",""));
		$(`${location.hash}:First ul:First`).empty();
	}
};

window.addEventListener("beforeunload",()=>{
	document.cookie=`value=${JSON.stringify(getLi())};expires=${dayPlus(90).toUTCString()}`;
});

function getCookie(n){
	let ca=decodeURIComponent(document.cookie).split(';');
	console.info(document.cookie);
	n=new RegExp(`^\s*${n}=`);
	for(var i in ca){
		if(n.test(ca[i])){
			return ca[i].replace(n,"");
		}
	}
}

function dayPlus(a){
	var d=new Date();
	d.setTime(d.getTime()+(a*86400000));
	return d;
}