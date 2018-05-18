var saveData,
species=[
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
	var arr=[];
	for(var i in species){
		arr[i]=li.cloneNode(li);
		arr[i].setAttribute("value",species[i]);
		arr[i].innerHTML=
`<button onclick="modifyCont(this)" class="btn btn-dark" style="width:50%;min-width:100px">
	${species[i]}
</button>
<div class="btn-group float-right">
	<button type="button" class="btn btn-secondary" onclick="addToAll(this)">
		Add to All
	</button>
	<button type="button" class="btn btn-secondary" onclick="removeFromAll(this)">
		Remove from All
	</button>
</div>`;
		arr[i].id=species[i];
	}
	document.getElementById("speciesList").append(...arr);//Spread
	saveData=(function(){
		var a=document.createElement("a");
		document.body.appendChild(a);
		a.style="display:none";
		return function (data,fileName,t){
			var json=(t)?data:JSON.stringify(data),
				blob=new Blob([json],{type:"octet/stream"}),
				url=window.URL.createObjectURL(blob);
			a.href=url;
			a.download=fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		};
		//https://jsfiddle.net/koldev/cW7W5/
	}());
}

function modifyCont(el){
	el=el.parentNode;
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
	var elp=el.parentNode.parentNode,
	spawns=document.querySelectorAll("#npcList>div>ul"),
	base=document.querySelectorAll("#npcList>div");
	for(var i=0;base.length>i;i++){
		if(elp.classList.contains("active-"+base[i].id)){
			spawns[i]=null;
		}
		elp.classList.add("active-"+base[i].id);
	}
	for(var i=0;spawns.length>i;i++){
		if(spawns[i]==null)continue;
		let li=elp.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		spawns[i].prepend(li);
	}
}

function removeEl(el){
	var elp=el.parentNode;
	document.getElementById(el.getAttribute("value")).classList.remove("active-"+location.hash.replace("#",""));
}

function updateHash(el){
	var hash=el.hash;
	location.hash=hash;
	var style=document.getElementById("activeStyle");
	style.innerHTML=style.innerHTML.replace(/\.active\-.+?\{/,".active-"+hash.replace("#","")+"{");
}

function removeFromAll(el){
	el=el.parentNode.parentNode;
	var arr=el.classList.value.split(" ")
	for(var i in arr){
		if(!arr[i].includes("active-"))continue;
		let t=arr[i].replace("active-","");
		var item=document.querySelector("#"+t+" [value="+el.getAttribute("value")+"]");
		if(!item)continue;
		item.parentNode.removeChild(item);
		el.classList.remove(arr[i]);
	}
}

function download(){
	var ob=getLi()
	for(var i in ob){
		ob[i]=ob[i].join(",");
	}
	console.log("dwnld");
	//----------
	var xhr=new XMLHttpRequest();
	xhr.open("POST",'DynamicSpawn.pak',true);
	xhr.setRequestHeader("Content-type",'text/plain;charset=ASCII');
	xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("data").innerHTML=data;
			var blob=new Blob([xhr.response], {type: "octet/stream"});
			saveData(blob,'DynamicSpawnTest.pak',true);
		}
	}
	xhr.responseType="arraybuffer";
	xhr.send();
	//----------
}

function iimport(){
	var fr=new FileReader();
//medium.com/programmers-developers/convert-blob-to-string-in-javascript-944c15ad7d52
	fr.addEventListener('loadend',(txt)=>{
		txt=txt.srcElement.result;
		console.log(txt);
		var item=JSON.parse(txt);
		for(var i in item){for(var n in item[i]){
			setLi(i,item[i][n]);
		}}
	});
	try{
		files=document.getElementById("iimport").files;
		if(files.length<1)throw "No file selected";
		fr.readAsText(files[0]);
	}catch(err){
		popup("Import failure: "+err)
	}
}

function setLi(set,key){
	el=document.getElementById(key);
	var css="active-"+set;
	if(el.classList.contains(css))return;
	el.classList.add(css);
	var li=el.cloneNode(true);
	li.setAttribute("onclick","removeEl(this)");
	li.id="";
	document.querySelector("#"+set+">ul").prepend(li);
}

function iexport(){
	saveData(getLi(),"export.DyS.json");
}

function getLi(){
	var spawns=document.querySelectorAll("#npcList>div"),
	arr={};
	for(var i=0;spawns.length>i;i++){
		let id=spawns[i].id,
		items=document.querySelectorAll("#"+id+" li");
		arr[id]=[]
		for(var n=0;items.length>n;n++){
			arr[id][n]=items[n].getAttribute("value");
		}
	}
	return arr;
}

function popup(mesage,type="danger"){
	var div=document.createElement("div");
	div.classList.add("alert","alert-"+type,"alert-dismissible")
	div.innerHTML=mesage;
	var btn=document.createElement("button");
	btn.classList.add("close")
	btn.setAttribute("data-dismiss","alert")
	btn.innerHTML="&times;"
	div.appendChild(btn);
	document.body.prepend(div);
}