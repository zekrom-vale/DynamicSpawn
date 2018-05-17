var species=[
"Attarran",
"Canids",
"Eevee",
"Indix",
"Umbreon",
"agaran",
"albinopenguin",
"alicorn",
"alpaca",
"apex",
"arachne",
"argonian",
"avali",
"avian",
"avikan",
"avonian",
"batpony",
"blattra",
"bunnykin",
"callistan",
"cat",
"catus",
"changeling",
"chicken",
"clownkin",
"cryoguin",
"demon",
"dragon",
"droden",
"eeveetwo",
"elunite",
"everis",
"familiar",
"felin",
"fenerox",
"floran",
"gardevan",
"glitch",
"greckan",
"gyrusen",
"human",
"hylotl",
"inkling",
"kazdra",
"kemono",
"kineptic",
"lamia",
"lombax_pointed",
"lombax_striped",
"manicpenguin",
"mantizi",
"moogle",
"munari",
"neko",
"nightar",
"ningen",
"novakid",
"ooze",
"orcana",
"pegasus",
"peglaci",
"penguin",
"pengvolt",
"phantasm",
"phox",
"plaguin",
"ponex",
"pony",
"puffin",
"pygs",
"pyroguin",
"robopenguin",
"rockhopperpenguin",
"rodentia",
"saturn",
"scorsheep",
"sergal",
"shade",
"shadow2",
"skath",
"skelekin",
"slimeperson",
"su_gem",
"tauren",
"terrakin",
"tirastrolls",
"trink",
"troll",
"unicorn",
"vampyric",
"vanillapenguin",
"vespoid",
"viera",
"vulpes",
"wasphive",
"webber",
"woggle",
"zombie"
]

function populateSpecies(){
	location.hash="npcGeneric";
	var li=document.createElement("li");
	li.classList.add("list-group-item");
	var btn=document.createElement("button");
	var arr=[];
	for(var i in species){
		arr[i]=li.cloneNode(li);
		arr[i].setAttribute("onclick","modifyCont(this)");
		arr[i].setAttribute("value",species[i]);
		arr[i].innerHTML=species[i]+'<button type="button" class="btn btn-secondary float-right" onclick="addToAll(this)">Add to All</button>';
		arr[i].id=species[i];
	}
	document.getElementById("speciesList").append(...arr);//Spread
}

function modifyCont(el){
	console.log(el);
	var css="active-"+location.hash.replace("#","");
	if(el.classList.contains(css)){
		var item=document.querySelector(location.hash+" li[value="+el.getAttribute("value")+"]");
		item.parentNode.removeChild(item);
		el.classList.remove(css);
		return;
	}
	el.classList.add(css);
	var li=el.cloneNode(true);
	li.setAttribute("onclick","removeEl(this)");
	li.id="";
	document.querySelector(location.hash+">ul").prepend(li);
}

function addToAll(el){
	el=el.parentNode;
	var spawns=document.querySelectorAll("#npcList>div:not("+location.hash+")>ul"),
	base=document.querySelectorAll("#npcList>div:not("+location.hash+")");
	for(var i=0; spawns.length>i;i++){
		if(el.classList.contains("active-"+base[i].id))continue;
		el.classList.add("active-"+base[i].id);
		let li=el.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		spawns[i].prepend(li);
	}
}

function removeEl(el){
	document.getElementById(el.getAttribute("value")).classList.remove("active-"+location.hash.replace("#",""));
	el.parentNode.removeChild(el);
}

function updateHash(el){
	var hash=el.hash;
	location.hash=hash;
	var style=document.getElementById("activeStyle");
	style.innerHTML=style.innerHTML.replace(/\.active\-.+?\{/,".active-"+hash.replace("#","")+"{");
}