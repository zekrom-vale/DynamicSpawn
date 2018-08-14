//Use defer
"use strict";
const CDATA={};
Object.defineProperties(CDATA,function(){
	var ___eval=node=>{
		//Use `data-attr` to set attributes
		if(node.dataset.attr)node.parentNode.setAttribute(node.dataset.attr,node.innerHTML);
		else node.parentNode.innerText=node.innerHTML;
		//Use `data-remove="false"` to prevent removal
		if(node.dataset.remove!="false")node.remove();
		else node.dataset.load=false;
	},
	___evalAuto=node=>___eval(
		typeof node==="string"?
			document.getElementById(node),
			node
	);
	return{
		//Use data-load="false" to prevent loading per script
		load:{
			value:query=>{
				const data=document.querySelectorAll('script[type="CDATA" i]:not([data-load="false" i])'+query),
				_d=data.length;
				for(let i=0;i<_d;)___eval(data[i++]);
			},
			writable:false
		},
		auto:{writable:true},
		get:{
			value:()=>document.querySelectorAll('script[type="CDATA" i]'),
			writable:false
		},
		eval:{
			value:node=>Array.isArray(node)?
				node.map(v=>___evalAuto(v)):
				___evalAuto(node)
			),
			writable:false
		}
	}
}());
Object.seal(CDATA);
//Use `<meta name="CDATA" content="manual">` to disable auto run.
//Set CDATA.auto to `true` to override
//Use data-auto="false" to prevent auto loading per script
if(
	CDATA.auto==true||
		CDATA.auto!=false&&
		!(/manual/i.test(document.querySelector('meta[name="CDATA" i]').getAttribute("content")))
){
	addEventListener("DOMContentLoaded",()=>{CDATA.load(':not([data-auto="false" i])')});
}