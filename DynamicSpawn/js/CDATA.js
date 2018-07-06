//Use async and defer
addEventListener("DOMContentLoaded",()=>{
	const data=document.querySelectorAll('script[type="CDATA"]'),
	_d=data.length;
	for(let i=0;i<_d;){
		let node=data[i++];
		node.parentNode.innerText=node.innerHTML;
		node.remove();
	}
},{once:true});