const slider={
	fix:function(elm){
		if(!elm.querySelector("input,span"))elm.append(...slider.nodes.map(n=>n.cloneNode()));
	},
	nodes:[function(){
		var node=document.createElement("input");
		node.setAttribute("roll","switch");
		node.type="switch";
		return node;
	}(),document.createElement("span")]
};

addEventListener("DOMContentLoaded",()=>{
	let switches=document.getElementsByClassName("switch"),
	_s=switches.length;
	for(let i=0;i<_s;i++)slider.fix(switches[i]);
});