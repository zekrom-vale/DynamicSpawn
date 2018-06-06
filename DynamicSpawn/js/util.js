"use strict";
window.addEventListener("load",()=>{
saveData=(function(){
	var a=document.getElementById("save");
	return function(data,fileName,t){
		let url=window.URL.createObjectURL(new Blob([t?data:JSON.stringify(data)],{type:"octet/stream"}));
		a.href=url;
		a.download=fileName;
		a.click();
		window.URL.revokeObjectURL(url);
	};
	//https://jsfiddle.net/koldev/cW7W5
}());
});

var getData,setData;
if(localStorage){
	getData=n=>{return localStorage.getItem(n);};
	setData=(v,s)=>{localStorage.setItem(v,s);}
}
else{
	function dayPlus(a){
		let d=new Date();
		d.setTime(d.getTime()+(a*86400000));
		return d.toUTCString();
	}
	getData=(n)=>{
		var ca=decodeURIComponent(document.cookie).split(';');
		const _n=n.length;
		n=new RegExp(`^${n}=`);
		for(let i in ca)if(n.test(ca[i]))return ca[i].slice(_n+1);
	}
	setData=(v,s,e)=>{
		document.cookie=`${v}=${s};expires=${dayPlus(e)}`;
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
			if(f.resolve.length===1)f.resolve[0]();
			else f.resolve[0](...f.resolve.slice(1));
		}
		else fin();
	},()=>{
		if(f.reject){
			fin();
			if(f.reject.length===1)f.reject[0]();
			else f.reject[0](...f.reject.slice(1));
		}
		else fin();
	});
}

function popup(m,t="danger",id,loc){
	if(id)$(`#${id}:First`).remove();
	var div=document.createElement("div");
		div.classList.add("alert","alert-"+t,"alert-dismissible");
		div.innerHTML=m;
		if(id)div.id=id;
	var btn=document.createElement("button");
		btn.classList.add("close");
		btn.dataset.dismiss="alert";
		btn.innerHTML="&times;";
	if(loc)div.classList.add("loc");
	else window.scrollTo(0,0);
	div.appendChild(btn);
	document.getElementById("container").prepend(div);
}