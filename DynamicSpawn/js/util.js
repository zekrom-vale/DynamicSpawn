"use strict";
window.addEventListener("load",()=>{
saveData=(function(){
	var a=document.getElementById("save");
	return function(data,fileName,t){
		let blob=new Blob([t?data:JSON.stringify(data)],{type:"octet/stream"}),
			url=window.URL.createObjectURL(blob);
		a.href=url;
		a.download=fileName;
		a.click();
		window.URL.revokeObjectURL(url);
	};
	//https://jsfiddle.net/koldev/cW7W5/
}());
});

function getCookie(n){
	let ca=decodeURIComponent(document.cookie).split(';');
	n=new RegExp(`^\s*${n}=`);
	for(var i in ca)if(n.test(ca[i]))return ca[i].slice(n.length);
}

function dayPlus(a){
	let d=new Date();
	d.setTime(d.getTime()+(a*86400000));
	return d.toUTCString();
}
function alertModal(modalHead="",modalBody="",f){
	document.getElementById("modalHead").innerHTML=modalHead;
	document.getElementById("modalBody").innerHTML=modalBody;
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

function popup(mesage,type="danger",id){
	if(id)$(`#${id}:First`).remove();
	var div=document.createElement("div");
		div.classList.add("alert","alert-"+type,"alert-dismissible");
		div.innerHTML=mesage;
		if(id)div.id=id;
	var btn=document.createElement("button");
		btn.classList.add("close");
		btn.dataset.dismiss="alert";
		btn.innerHTML="&times;";
	div.appendChild(btn);
	document.getElementById("container").prepend(div);
	window.scrollTo(0,0);
}

function over(l,a,e){
	$(`#${l}:First`).popover({
		title:a+" Elements",
		content:`Normal:Active tab<br/>Shift:Selected tab(s)${e?"<br/>Ctrl:No prompt":""}`,
		html:true,
		placement:"top",
		trigger:"hover"
	});
}