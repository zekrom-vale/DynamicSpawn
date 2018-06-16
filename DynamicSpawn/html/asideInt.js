"use strict";
function whenViable(el,cal,options,rem=true){
	try{
		var observer=new IntersectionObserver((entries,observer)=>{
			if(entries[0].isIntersecting){
				cal(entries[0].target);
				if(rem)observer.unobserve(entries[0].target);
			}
		},options);
		observer.observe(el);
	}catch(e){
		cal(el,e);
	}
};

whenViable(document.getElementById("side"),target=>{
	$.get("html/aside.html",null,d=>{
		target.innerHTML=d;
		document.getElementById("modCopyBtn").addEventListener("click",()=>copyText('#modCopy'));
	},"html");
},{root:document.body,threshold:1});