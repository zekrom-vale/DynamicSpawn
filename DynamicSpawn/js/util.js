"use strict";
addEventListener("load",()=>{
saveData=(function(){
	const a=document.getElementById("save");
	return(data,fileName,t)=>{
		let url=URL.createObjectURL(new Blob([t?data:JSON.stringify(data)],{type:"octet/stream"}));
		a.href=url;
		a.download=fileName;
		a.click();
		URL.revokeObjectURL(url);
	};
	//https://jsfiddle.net/koldev/cW7W5
}());
});
var getData,setData;
if(localStorage){
	getData=n=>localStorage.getItem(n);
	setData=(v,s)=>{localStorage.setItem(v,s);};
}
else{
	getData=n=>{
		var ca=decodeURIComponent(document.cookie).split(';');
		const _n=n.length+1;
		n=new RegExp(`^${n}=`);
		for(let i of ca)if(n.test(i))return i.slice(_n);
	}
	setData=(v,s,e=60)=>{
		document.cookie=v+`=${s};expires=`+(function(){
			let d=new Date();
			return d.setTime(d.getTime()+(e*864e+5)).toUTCString();
		}());
	}
}

function alertModal(mh,mb,f,focus="ok"){
	if(mh)document.getElementById("modalHead").innerHTML=mh;
	if(mb)document.getElementById("modalBody").innerHTML=mb;
	$("#modal:First").modal();
	var modal=new Promise((resolve,reject)=>{
		const ok=document.getElementById("modalOk"),
		cancel=document.getElementById("modalCancel"),
		x=document.getElementById("modalX"),
		rem=()=>{
			ok.removeEventListener("click",res);
			cancel.removeEventListener("click",rej);
			x.removeEventListener("click",rej);
			removeEventListener("keyup",keyRes);
		},
		res=()=>{
			rem();	resolve();
		},
		rej=()=>{
			rem();	reject();
		},
		keyRes=event=>{
			if(event.key==="Escape")x.click();
			else if(/Arrow[ULDR]/.test(event.key)){
				if(document.activeElement==cancel)ok.focus();
				else cancel.focus();
			}
		};
		if(focus==="ok")ok.focus();
		else if(focus==="cancel")cancel.focus();
		addEventListener("keyup",keyRes);
		ok.addEventListener("click",res);
		cancel.addEventListener("click",rej);
		x.addEventListener("click",rej);
	});
	function fin(){
		if(f["finally"])f["finally"][0](...f["finally"].slice(1));
	}
	modal.then(()=>{
		if(f.resolve){
			fin();
			f.resolve[0](...f.resolve.slice(1));
		}
		else fin();
	},()=>{
		if(f.reject){
			fin();
			f.reject[0](...f.reject.slice(1));
		}
		else fin();
	});
}

function info(m,t="danger",id,loc){
	var div=document.getElementById(id);
	if(div)div.classList.value=div.innerHTML="";
	else{
		div=document.createElement("div");
		if(id)div.id=id;
		div.setAttribute("roll","alert");
		document.getElementById("container").prepend(div);
	}
	div.appendChild(typeof m==="string"?
		document.createTextNode(m):
			Array.isArray(m)?node(...m):m
	);
	div.appendChild(node("button","&times;",{class:"close","data-dismiss":"alert"},true));
	div.classList.add("alert","alert-"+t,"alert-dismissible");
	loc?div.classList.add("loc"):scrollTo(0,0);
}

HTMLElement.prototype.empty=function(){
	this.innerHTML="";
}
HTMLElement.prototype.getValue=function(){
	return this.getAttribute("value");
}

function getQueryString(path,raw){
	const query=location.search.slice(1).split("&"),
	reg=new RegExp(`^${path}=`);
	path=path.length+1;
	for(let i of query)if(reg.test(i))return raw?i:decodeURIComponent(i.slice(path).replace(/\+/g,"%20"));
}