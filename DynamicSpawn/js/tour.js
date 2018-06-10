"use strict";
async function tour(){
	info("This site use localStorage to save your choices. <a href='https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API'>localStorage</a> is the modern version of cookies and is more secure. However, few sites use this feature.","warning","localStorage",true);
	var E=()=>{setData("return","true",50);}
	if(await sP("nav.bg-dark","Global control buttons","This apples to all species in the selected group.\nShift:All selected species groups."))return E();
	if(await sP("#mods","Select the Mods you are Using","<h4>Do this First</h4>Deselect all mods to see all mods.\nCustom species are ignoredocument.","left"))return E();
	if(await sP("#searchOp","NPC Lookup Options","Chose what field you are looking up."))return E();
	if(await sP("#speciesLabel","NPC Lookup","Look up NPCs here.\nPress <kbd>Enter</kbd> to add a custom species."))return E();
	try{
		$("#side2").carousel(2);
	}catch(e){}
	if(await sP("#RegExpS","RegExp Toggle","Enable Regular Expressions.\nQuick guide on the right."))return E();
	if(await sP("#speciesList","NPC List","All of the NPCs are displayed here, it will filter on the NPC Lookup."))return E();
	if(await sP("#speciesList>li:first-of-type","Click the species button to add to current group","Alt click to go to the mod page","left"))return E();
	if(await sP("#speciesList>li:first-of-type button:first-of-type","Click to add to all groups","Shift click to add to selected groups","right"))return E();
	if(await sP("#speciesList>li:first-of-type button:last-of-type","Click to remove from groups","Shift click to remove from selected groups","right"))return E();
	if(await sP("#npcTab","NPC Groups","Your selection will E up below this click the tabs to switch groups.\nShift click to select the tab.","top",true))return E();
});

function sP(h,t,c,p="top",l){
	var e=$(h),
	next=l?"":`<button class="btn btn-primary" id="dieN">Next</button>`;
	e.popover({
		title:t,
		content:`${c}<div class="float-right">
${next}<button class="btn btn-danger" id="dieE">End</button>
<div>
`,
		placement:p,
		html:true
	});
	e.popover("show");
	let btn=document.querySelector(".popover #dieE");
	if(btn)btn.addEventListener("click",()=>{die(h,1)});
	btn=document.querySelector(".popover #dieN");
	if(btn)btn.addEventListener("click",()=>{die(h)});
	return new Promise(r=>{
		e[0].addEventListener("die",r);
		e[0].addEventListener("dieExit",()=>r(1));
	});
}

var eD=new CustomEvent('die'),
eE=new CustomEvent('dieExit');
function die(el,exit){
	$(el).popover("dispose");
	document.querySelector(el).dispatchEvent(exit?eE:eD);
}