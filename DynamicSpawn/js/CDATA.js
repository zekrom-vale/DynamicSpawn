//Use async and defer
"use strict";
addEventListener("DOMContentLoaded",()=>{
	const data=document.querySelectorAll('script[type="CDATA"]'),
	_d=data.length;
	for(let i=0;i<_d;){
		let node=data[i++];
		if(node.dataset.attr)node.parentNode.setAttribute(node.dataset.attr,node.innerHTML);
		else node.parentNode.innerText=node.innerHTML;
		node.remove();
	}
},{once:true});