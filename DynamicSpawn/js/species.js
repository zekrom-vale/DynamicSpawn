"use strict";
var saveData;

window.addEventListener("load",()=>{
	{//--------------- Get Path ---------------
		let q=location.search.replace(/^\?/,"").split("&"),
		qi;
		for(var i in q)if(/^path=/i.test(q[i])){
			qi=decodeURIComponent((q[i]+"\\").replace(/^path=/i,""));
			continue;
		}
		let valid=/^[a-z]:((\\|\/)[^\\\/:*?"<>|]+)+(\\|\/)$/i.test(qi),
		sys=/^[a-z]:(\\|\/)(\$[^\\\/]*|Temp|Recovery|Windows|Users|ProgramData|System Volume Information|Intel|PerfLogs|)(\\|\/)/.test(qi),
		inMod=/(\\|\/)steamapps(\\|\/)common(\\|\/)Starbound(\\|\/)mods(\\|\/)?$/.test(qi),
		el=document.getElementById("path");
		if(valid&&!sys){
			let e=()=>{
				popup("Warning: Local Component Not in Starbound's Mod Folder","warning");
				return qi;
			}
			el.value=inMod?qi:e();
		}
		else{
			let e=()=>{
				var c=confirm(`No path found
Would you like to download the local component of Dynamic Spawn?
If not, you still can create a list for later`);
				if(c)location.href="https://github.com/zekrom-vale/DynamicSpawn/tree/c%23"
				else document.getElementById("download").disabled=true;
			}
			el.value=sys?"Cannot Be a System URL":qi?"Invalid URL":e();
			el.id+="2";
		}
	}
	{//--------------- Generate speciesList ---------------
		if(location.hash){
			let hash=location.hash;
			location.hash="npcGeneric";
			dtTab(document.querySelector('[data-hash="'+hash+'"]'));
			location.hash=hash;
		}
		else location.hash="npcGeneric";
		var btnB=document.createElement("button");
			btnB.classList.add("btn");
		var li=document.createElement("li");
			li.classList.add("list-group-item");
		var btn=btnB.cloneNode();
			btn.setAttribute("onclick","modifyCont(this)");
			btn.style="width:50%;min-width:100px";
			btn.classList.add("btn-dark");
		var div=document.createElement("div");
			div.classList.add("btn-group","float-right");
			btnB.classList.add("btn-secondary");
			var all=btnB.cloneNode();
				all.setAttribute("onclick","addToAll(this)");
				all.innerHTML="Add to All";
				btnB.setAttribute("onclick","removeFromAll(this)");
				btnB.innerHTML="Remove from All";
			div.append(all,btnB);
		var arr=[];
		for(var i in species){
			arr[i]=li.cloneNode();
			arr[i].setAttribute("value",species[i]);
			arr[i].id=species[i];
			let b=btn.cloneNode();
				b.innerHTML=species[i];
			arr[i].append(b,div.cloneNode(true));
		}
		document.getElementById("speciesList").append(...arr);//Spread
	}
	//--------------- Get Cookie Value ---------------
	var c=getCookie("value");
	if(c){
		var item=JSON.parse(c);
		for(var i in item)for(var n in item[i])setLi(i,item[i][n]);
	}
	saveData=(function(){
		var a=document.createElement("a");
		document.body.appendChild(a);
		a.style="display:none";
		return function(data,fileName,t){
			let blob=new Blob([t?data:JSON.stringify(data)],{type:"octet/stream"}),
				url=window.URL.createObjectURL(blob);
			a.href=url;
			a.download=fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		};
		//https://jsfiddle.net/koldev/cW7W5/
	}());
	//--------------- Filter ---------------
	$("#speciesInput").on("keyup",function(){
		if(document.getElementById("RegExp").checked){
			console.log($(this).val())
			var v=new RegExp($(this).val(),"ig");
			console.log(v)
			$("#speciesList li, #npcList li").filter(function(){
				$(this).toggle(v.test(this.firstChild.innerHTML)||v.test(this.getAttribute("value")))
			});
		}
		else{
			//https://www.w3schools.com/bootstrap4/bootstrap_filters.asp
			var value=$(this).val().toLowerCase().replace(/^\s*|\s*$/g,""),
			exists=txt=>txt.toLowerCase().indexOf(value)>-1;
			$("#speciesList li, #npcList li").filter(function(){
				$(this).toggle(exists(this.firstChild.innerHTML||exists(this.getAttribute("value"))));
			});
		}
	});
	//--------------- Tooltip ---------------
	$('[data-toggle="tooltip"]').tooltip();
	$('#removeAll:First').popover({
		title:"Remove All Elements",
		content:"Normal:Active tab<br/>Shift:Selected tab<br/>Ctrl:No prompt",
		html:true,
		placement:"top",
		trigger:"hover"
	});
	{//--------------- Selection ---------------
		var els=document.querySelectorAll("li.nav-item"),
		l=els.length;
		for(var i=0;i<l;i++)els[i].addEventListener("click",function(event){
			if(event.shiftKey)this.classList.toggle('nav-link-sel');
		},true);
	}
	{//--------------- Tab list ---------------
		var els=document.querySelectorAll(".nav-link"),
		l=els.length;
		for(var i=0;i<l;i++)els[i].addEventListener("click",function(event){
			if(!event.shiftKey)dtTab(this);
			else window.setTimeout(()=>{
				var hash=this.dataset.hash,
				style=document.getElementById("activeStyle"),
				oldHash=location.hash;
				document.querySelector('[data-hash="'+oldHash+'"]').classList.add("show","active");
				this.classList.remove("active");
			},20);
		},true);
	}
	{//--------------- Remove all ---------------
		document.getElementById("removeAll").addEventListener("click",event=>{
			if(event.ctrlKey)core(event);
			else{
				alertModal(`Remove all items from the ${event.shiftKey?"selected":"current"} list${event.shiftKey?"(s)":""}?`,"This Cannot be undone!",{"resolve":[core,event]});
			}
			function core(event){
				if(event.shiftKey){
					var sel=$("#npcTab>li.nav-link-sel>a"),
					l=sel.length,
					hashs=[];
					for(var i=0;i<l;i++){
						let hash=sel[i].dataset.hash;
						hashs[i]="active-"+hash.replace("#","");
						$(`${hash}:First ul:First`).empty();
					}
					$(`#speciesList li`).removeClass(hashs.join(" "));
				}
				else{
					$(`#speciesList li`).removeClass("active-"+location.hash.replace("#",""));
					$(`${location.hash}:First ul:First`).empty();
				}
			}
		});
	}
});
function dtTab(el){
	var hash=el.dataset.hash,
	style=document.getElementById("activeStyle"),
	oldHash=location.hash,
	list=document.getElementById(hash.replace("#",""));
	document.querySelector('[data-hash="'+oldHash+'"]').classList.remove("show","active");
	document.getElementById(oldHash.replace("#","")).classList.remove("active");
	el.classList.add("show","active");
	list.classList.add("active");
	list.classList.remove("fade");
	location.hash=hash;
	style.innerHTML=style.innerHTML.replace(/(active\-).+?\{/,`$1${hash.replace("#","")}\{`);
}

function modifyCont(el){
	el=el.parentNode;
	let hash=location.hash;
	var css="active-"+hash.replace("#","");
	if(el.classList.contains(css)){
	var item=document.querySelector(`${hash} li[value=${el.getAttribute("value")}]`);
		item.parentNode.removeChild(item);
		el.classList.remove(css);
	}
	else{
		el.classList.add(css);
		var li=el.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		document.querySelector(hash+">ul").prepend(li);
	}
}

function addToAll(el){
	var elp=el.parentNode.parentNode,
	spawns=$("#npcList ul"),
	base=$("#npcList>div"),
	arr=[],
	_b=base.length;
	for(var i=0;_b>i;i++){
		if(elp.classList.contains("active-"+base[i].id))arr[i]=false;
		else elp.classList.add("active-"+base[i].id);
	}
	var _s=spawns.length;
	for(var i=0;_s>i;i++)if(arr[i]!=false){
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

function removeFromAll(el){
	el=el.parentNode.parentNode;
	var arr=el.classList.value.split(" ")
	for(var i in arr)if(arr[i].includes("active-")){
		let t=arr[i].replace("active-","");
		var item=document.querySelector(`#${t} [value=${el.getAttribute("value")}]`);
		if(item){
			item.parentNode.removeChild(item);
			el.classList.remove(arr[i]);
		}
	}
}

function download(){
//https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
	var ob=getLi(),
	arr=[],
	arrF=[],
	i=0,
	f=0;
	for(var n in ob){
		if(ob[n].length<1)arrF[f++]=++i;
		else if(f==0)arr[i++]=`${n}:${ob[n].join(",")}`;
	}
	if(f>0){
		for(var i in arrF)arrF[i]=document.querySelector(
		`#npcTab>li:nth-child(${arrF[i]})>a`).innerHTML.replace(/ <span class="badge badge-primary">.<\/span>$/,"");
		document.getElementById("modalCancel").style.display="none";
		alertModal("Cannot download!","No Species exist in "+arrF.join(", "),{"finally":[e]});
		function e(){
			document.getElementById("modalCancel").style.display="";
		}
		return;
	}
	document.getElementById("modalCancel").style.display="none";
	alertModal("Paste the copped value to the file name","Then continue the application",{"resolve":[s],"finally":[f]});
	function s(){
		var I=document.getElementById("path");
		if(I){
			I.disabled=false;
			I.value+="value.DyS.cosv";
			I.select();
			document.execCommand("copy");
			I.value=I.value.replace(/value\.DyS\.cosv$/i,"");
			I.disabled=true;
		}
		saveData(arr.join("\n"),"value.DyS.cosv");
	}
	function f(){
		document.getElementById("modalCancel").style.display="";
	}
}

function iimport(){
	var fr=new FileReader();
//medium.com/programmers-developers/convert-blob-to-string-in-javascript-944c15ad7d52
	fr.addEventListener('loadend',(txt)=>{
		txt=txt.srcElement.result;
		var item=JSON.parse(txt);
		for(var i in item)for(var n in item[i])setLi(i,item[i][n]);
	});
	try{
		files=document.getElementById("iimport").files;
		if(files.length<1)throw "No file selected";
		fr.readAsText(files[0]);
	}catch(err){
		popup("Import failure: "+err);
	}
}

function setLi(set,key){
	var el=document.getElementById(key);
	console.log(key,el)
	var css="active-"+set;
	if(!el.classList.contains(css)){
		el.classList.add(css);
		var li=el.cloneNode(true);
		li.setAttribute("onclick","removeEl(this)");
		li.id="";
		document.querySelector(`#${set}>ul`).appendChild(li);
	}
}

var iexport=()=>saveData(getLi(),"value.DyS.json");

function getLi(){
	var spawns=$("#npcList>div"),
	arr={},
	_s=spawns.length;
	for(var i=0;_s>i;i++){
		let id=spawns[i].id,
		items=$(`#${id} li`),
		_i=items.length;
		arr[id]=[];
		for(var n=0;_i>n;n++)arr[id][n]=items[n].getAttribute("value");
	}
	return arr;
}

function popup(mesage,type="danger",id){
	if(id)$(`#${id}:First`).remove();
	var div=document.createElement("div");
		div.classList.add("alert","alert-"+type,"alert-dismissible");
		div.innerHTML=mesage;
		if(id)div.id=id;
	var btn=document.createElement("button");
		btn.classList.add("close");
		btn.dataset.dismiss="alert";
		btn.innerHTML="&times;";
	div.appendChild(btn);
	document.getElementById("container").prepend(div);
	window.scrollTo(0,0);
}

window.addEventListener("beforeunload",()=>{
	document.cookie=`value=${JSON.stringify(getLi())};expires=${dayPlus(90).toUTCString()}`;
});

function getCookie(n){
	let ca=decodeURIComponent(document.cookie).split(';');
	n=new RegExp(`^\s*${n}=`);
	for(var i in ca)if(n.test(ca[i]))return ca[i].replace(n,"");
}

function dayPlus(a){
	let d=new Date();
	d.setTime(d.getTime()+(a*86400000));
	return d;
}
function alertModal(modalHead="",modalBody="",f){
	document.getElementById("modalHead").innerHTML=modalHead;
	document.getElementById("modalBody").innerHTML=modalBody;
	$("#modal:First").modal();
	var modal=new Promise((resolve,reject)=>{
		var ok=document.getElementById("modalOk"),
		cancel=document.getElementById("modalCancel"),
		x=document.getElementById("modalX"),
		rem=()=>{
			ok.removeEventListener("click",res);
			cancel.removeEventListener("click",rej);
			x.removeEventListener("click",rej);
		};
		var res=()=>{
			rem();	resolve();
		},
		rej=()=>{
			rem();	reject();
		};
		ok.addEventListener("click",res);
		cancel.addEventListener("click",rej);
		x.addEventListener("click",rej);
	});
	var fin=(function(){
		if(f["finally"]){
			if(f["finally"].length==1) return function(){	f["finally"][0]	};
			else return function(){	f["finally"][0](...f["finally"].slice(1))	};
		}
		else return function(){};
	}()),
	res=(function(){
		if(f.resolve){
			if(f.resolve.length==1)return function(){
				fin();	f.resolve[0]();
			}
			else return function(){
				fin();	f.resolve[0](...f.resolve.slice(1));
			}
		}
		return fin;
	}()),
	rej=(function(){
		if(f.reject){
			if(f.reject.length==1)return function(){
				fin();	f.reject[0]();
			}
			else return function(){
				fin();	f.reject[0](...f.reject.slice(1));
			}
		}
		return fin;
	}());
	if(f.resolve||f.reject||f["finally"])modal.then(res,rej);
}