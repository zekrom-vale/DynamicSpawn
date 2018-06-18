"use strict";
(async function(){
	{
		info(
			new node(
				"This site use localStorage to save your choices, and cookies as a fallback. ",
				"localStorage".node("a",{
					href:"https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API"
				}),
				" is the modern version of cookies and is more secure. However, few sites use this feature."
			).wrap("p"),
		"warning","localStorage",true);
	}
	var tours=[{
		h:"nav.bg-dark",
		title:"Global control buttons",
		cont:"This apples to all species in the selected group.\nShift:All selected species groups."
	},{
		h:"#mods",
		title:"Select the Mods you are Using",
		cont:"<h4>Do this First</h4>Deselect all mods to see all mods.\nCustom species are ignored.",
		pos:"left"
	},{
		h:"#searchOp",
		title:"NPC Lookup Options",
		cont:"Chose what field you are looking up."
	},{
		h:"#speciesLabel",
		title:"NPC Lookup",
		cont:"Look up NPCs here.\nPress <kbd>Enter</kbd> to add a custom species."
	},{
		func:()=>{try{$("#side2").carousel(2);}catch(e){}},
		h:"#RegExpS",
		title:"RegExp Toggle",
		cont:"Enable Regular Expressions.\nQuick guide on the right."
	},{
		h:"#speciesList",
		title:"NPC List",
		cont:"All of the NPCs are displayed here, it will filter on the NPC Lookup."
	},{
		h:"#speciesList>li:first-of-type",
		title:"Click the species button to add to current group",
		cont:"Alt click to go to the mod page",
		pos:"left"
	},{
		h:"#speciesList>li:first-of-type button:first-of-type",
		title:"Click to add to all groups",
		cont:"Shift click to add to selected groups",
		pos:"right"
	},{
		h:"#speciesList>li:first-of-type button:last-of-type",
		title:"Click to remove from groups",
		cont:"Shift click to remove from selected groups",
		pos:"right"
	},{
		h:"#npcTab",
		title:"NPC Groups",
		cont:"Your selection will end up below this, click the tabs to switch groups.\nShift click to select the tab.",
		last:true
	}];
	for(let n of tours)if(await sP(n))break;
	setData("return","true",50);
})();

function sP(n){
	if(n.func)n.func();
	var e=$(n.h),
	e.popover({
		title:n.title,
		content:`${n.cont}<div class="float-right">
${n.last?"":'<button class="btn btn-primary" id="dieN">Next</button>'}
<button class="btn btn-danger" id="dieE">End</button>
<div>
`,
		placement:n.pos||"top",
		html:true
	});
	e.popover("show");
	{
		let pop=document.querySelectorAll(".popover");
		const _p=pop.length;
		for(let i=0;i<_p;i++)if(!pop[i].querySelector("#dieE"))pop[i].remove();
	}
	let btn=document.getElementById("dieE");
	if(btn)btn.addEventListener("click",()=>{die(n.h,1)});
	btn=document.getElementById("dieN");
	if(btn)btn.addEventListener("click",()=>{die(n.h)});
	return new Promise(r=>{
		e[0].addEventListener("dN",()=>r(0));
		e[0].addEventListener("dE",()=>r(1));
	});
}

var dN=new CustomEvent("dN"),
dE=new CustomEvent("dE");
function die(el,exit){
	$(el).popover("dispose");
	document.querySelector(el).dispatchEvent(exit?dE:dN);
}