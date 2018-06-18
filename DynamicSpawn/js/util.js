"use strict";
addEventListener("load",()=>{
saveData=(function(){
	var a=document.getElementById("save");
	return function(data,fileName,t){
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
	function dP(a){
		let d=new Date();
		return d.setTime(d.getTime()+(a*864e+5)).toUTCString();
	}
	getData=n=>{
		var ca=decodeURIComponent(document.cookie).split(';');
		const _n=n.length+1;
		n=new RegExp(`^${n}=`);
		for(let i of ca)if(n.test(i))return i.slice(_n);
	}
	setData=(v,s,e)=>{
		document.cookie=`${v}=${s};expires=${dP(e)}`;
	}
}

function alertModal(mh="",mb="",f){
	document.getElementById("modalHead").innerHTML=mh;
	document.getElementById("modalBody").innerHTML=mb;
	$("#modal:First").modal();
	var modal=new Promise((resolve,reject)=>{
		var ok=document.getElementById("modalOk"),
		cancel=document.getElementById("modalCancel"),
		x=document.getElementById("modalX"),
		rem=()=>{
			ok.removeEventListener("click",res);
			cancel.removeEventListener("click",rej);
			x.removeEventListener("click",rej);
		};
		var res=()=>{
			rem();	resolve();
		},
		rej=()=>{
			rem();	reject();
		};
		ok.addEventListener("click",res);
		cancel.addEventListener("click",rej);
		x.addEventListener("click",rej);
	});
	function fin(){
		if(f["finally"]){
			if(f["finally"].length===1)f["finally"][0]();
			else f["finally"][0](...f["finally"].slice(1));
		}
	}
	modal.then(()=>{
		if(f.resolve){
			fin();
			f.resolve[0](...f.resolve.slice(1));
			//if(f.resolve.length===1)f.resolve[0]();
			//else f.resolve[0](...f.resolve.slice(1));
		}
		else fin();
	},()=>{
		if(f.reject){
			fin();
			f.reject[0](...f.reject.slice(1));
			//if(f.reject.length===1)f.reject[0]();
			//else f.reject[0](...f.reject.slice(1));
		}
		else fin();
	});
}

function info(m,t="danger",id,loc){
	var div;
	if(id&&document.getElementById(id)){
		div=document.getElementById(id);
		div.classList.value="";
	}
	else{
		div=document.createElement("div");
			if(id)div.id=id;
		var btn=document.createElement("button");
			btn.classList.add("close");
			btn.dataset.dismiss="alert";
			btn.innerHTML="&times;";
		div.appendChild(btn);
		document.getElementById("container").prepend(div);
	}
		div.appendChild(typeof(m)=="string"?document.createTextNode(m):m);
		div.classList.add("alert","alert-"+t,"alert-dismissible");
	loc?div.classList.add("loc"):scrollTo(0,0);
}

HTMLElement.prototype.remove=function(){
	this.outerHTML="";
	//this.parentNode.removeChild(this);
}
HTMLElement.prototype.empty=function(){
	this.innerHTML="";
}
HTMLElement.prototype.getValue=function(){
	return this.getAttribute("value");
}
HTMLElement.prototype.removeClass=function(){
	this.classList.value="";
}