"use strict";
var iexport=()=>saveData(getLi(),"value.DyS.json");

function download(){
//https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
	var ob=getLi(),
	arr=[],
	arrF=[],
	i=0,
	f=0;
	for(var n in ob){
		if(ob[n].length<1)arrF[f++]=++i;
		else if(f===0)arr[i++]=`${n}:"${ob[n].join(",")}"`;
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
	
	
	alertModal("Paste the copped value to the file name","Then continue the application",{
		"resolve":[
			()=>{
				var I=document.getElementById("path");
				if(I){
					I.disabled=false;
					I.value+="value.DyS.cosv";
					I.select();
					document.execCommand("copy");
					I.value=I.value.replace(/value\.DyS\.cosv$/i,"");
					I.disabled=true;
				}
				saveData(arr.join("\n"),"value.DyS.cosv",true);
			}
		],"finally":[
			()=>{document.getElementById("modalCancel").style.display="";}
		]
	});
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