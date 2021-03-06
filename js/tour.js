"use strict";
if(/firefox/i.test(navigator.userAgent)){
	info(new nodes(
		"Caret browsing mode interferes with keyboard navigation on this page, turn it off with ",
		node("kbd","F7"),
		". More info at ",
		node("a","Mozilla Support.",{
			href:"https://support.mozilla.org/en-US/questions/974774"
		})
	).contain(),
	"warning");
}

const sP=(function(){
	const dN=new CustomEvent("dN"),
	dE=new CustomEvent("dE"),
	die=(el,exit)=>{
		el=$(el);
		el.popover("dispose");
		el[0].dispatchEvent(exit?dE:dN);
	};
	return n=>{//Automatically includes the local scopes
		if(n.func)n.func();
		var e=$(n.h);
		e.popover({
			title:n.title,
			content:n.cont+`<div class="float-right">
${n.last?"":'<button class="btn btn-primary" id="dieN" data-nav="false">Next</button>'}<button class="btn btn-danger" id="dieE" data-nav="false">End</button>
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
		}{
			let end=document.getElementById("dieE");
			end.addEventListener("click",()=>{die(n.h,1)});
			if(n.last)end.focus();
			else{
				let next=document.getElementById("dieN");
				next.addEventListener("click",()=>{die(n.h)});
				next.focus();
			}
		}
		addEventListener("keyup",{handleEvent:escape,h:n.h});//Accepts an object and calls handleEvent
		return new Promise(r=>{
			e[0].addEventListener("dN",()=>{
				r(0);
				removeEventListener("keyup",escape);
			});
			e[0].addEventListener("dE",()=>{
				r(1);
				removeEventListener("keyup",escape);
			});
		});
	}
	function escape(event){
		if(event.key==="Escape")die(this.h,1);
	};
})();

(async function(){
	info(
		new nodes(
			"Although, no personal information is stored, this site use localStorage to save your choices, and cookies as a fallback. ",
			node("a","localStorage",{
				href:"https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API"
			}),
			" is the modern version of cookies and is more secure.",
			node("abbr","*",{title:"This is not as secure as server side information, but is incomparable with GitHub sites (A static server)."}),
			" However, few sites use this feature."
		).contain(),
	"warning","localStorage",true);
	const tours=[{
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
	addEventListener("keyup",move);
	for(let n of tours)if(await sP(n))break;
	removeEventListener("keyup",move);
	setData("return","true",50);
	function move(event){
		if(/Arrow(Righ|Lef)t/.test(event.key)){
			var active=document.activeElement;
			if(document.querySelector("div.popover-body").contains(active)){
				if(active.id==="dieN")document.getElementById("dieE").focus();
				else{
					let dieN=document.getElementById("dieN");
					if(dieN)dieN.focus();
				}
			}
		}
	}
})();