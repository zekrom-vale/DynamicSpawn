"use strict";function copyText(e){document.querySelector(e).select(),document.execCommand("copy")}window.addEventListener("load",()=>{$("#speciesInput").on("keyup paste cut",function(){var e,t,l,i=document.getElementById("searchOp").value;if(i=[1==i,2==i,i%3==0,i%4==0],document.getElementById("RegExp").checked){let t=this.parentNode;try{e=new RegExp($(this).val(),"ig"),$("#speciesList li,#npcList li").filter(function(){$(this).toggle(i[0]&&e.test(this.firstChildocument.innerHTML)||i[1]&&e.test(this.getAttribute("value"))||i[3]&&e.test(this.dataset.author)||i[2]&&e.test(this.dataset.mod)),$(this).toggle(e.test(this.getAttribute("value")))}),t.classList.remove("err")}catch(e){t.classList.add("err")}}else t=$(this).val().trim().toLowerCase(),l=(e=>e.toLowerCase().indexOf(t)>-1),$("#speciesList li,#npcList li").filter(function(){$(this).toggle(i[0]&&l(this.firstChildocument.innerHTML)||i[1]&&l(this.getAttribute("value"))||i[3]&&l(this.dataset.author)||i[2]&&l(this.dataset.mod))}),$("#mods li").filter(function(){$(this).toggle(l(this.getAttribute("value")))})});var t=new FileReader;document.getElementById("iimport").addEventListener("change",()=>{t.addEventListener("loadend",e=>{var t=JSON.parse(e.srcElement.result);for(let e in t)for(let l of t[e])setLi(e,l)}),t.readAsText(document.getElementById("iimport").files[0])}),document.getElementById("removeAll").addEventListener("click",e=>{function t(e){if(e.shiftKey){var t=elm.npcTab.querySelectorAll(".nav-link-sel>a"),l=t.length,i=[];for(let e=0;e<l;e++){let l=t[e].dataset.hash;i[e]="active-"+l.slice(1),$(`${l}:First ul:First`).empty()}$("#speciesList li").removeClass(i.join(" "))}else $("#speciesList li").removeClass("active-"+location.hash.slice(1)),$(location.hash+":First ul:First").empty()}e.ctrlKey?t(e):alertModal(`Remove all items from the ${e.shiftKey?"selected":"current"} list${e.shiftKey?"(s)":""}?`,"This Cannot be undone!",{resolve:[t,e]})}),document.getElementById("removeVisible").addEventListener("click",function(e){var t,l,i,s,n=elm.speciesList.querySelectorAll("li"),a=n.length;if(e.shiftKey){l=(t=elm.npcTab.querySelectorAll(".nav-link-sel>a")).length;for(let e=0;e<l;e++){i="active-"+t[e].dataset.hash.slice(1);for(let l=0;l<a;l++)if(n[l].classList.contains(i)&&"none"!==n[l].style.display){n[l].classList.remove(i);let s=document.querySelector(t[e].dataset.hash+` [value="${n[l].getAttribute("value")}"]`);s.parentNode.removeChild(s)}}}else{i="active-"+(s=location.hash).slice(1);for(let e=0;e<a;e++)if(n[e].classList.contains(i)&&"none"!==n[e].style.display){n[e].classList.remove(i);let t=document.querySelector(s+` [value="${n[e].getAttribute("value")}"]`);t.parentNode.removeChild(t)}}}),document.getElementById("addVisible").addEventListener("click",function(e){var t,l,i,s,n=elm.speciesList.querySelectorAll("li");const a=n.length;if(e.shiftKey){l=[],i=[];const e=(t=elm.npcTab.querySelectorAll(".nav-link-sel>a")).length;for(let s=0;s<e;)l[s]=document.getElementById(t[s].dataset.hash.slice(1)),i[s++]="active-"+l[s].id.slice(1);for(let e=0;e<a;e++)if("none"!==n[e].style.display){let t=n[e].cloneNode(1);t.id="",t.classList.add(...i);for(let s in l)n[e].classList.contains(i[s])||(n[e].classList.add(i[s]),l[s].getElementsByTagName("ul")[0].prepend(readyLi(t.cloneNode(1))))}}else{i="active-"+(s=location.hash).slice(1);for(let e=0;e<a;e++)if(!n[e].classList.contains(i)&&"none"!==n[e].style.display){//!
n[e].classList.add(i);let t=n[e].cloneNode(1);t.querySelector(".addToAll").addEventListener("click",addToAll),t.querySelector(".removeFromAll").addEventListener("click",removeFromAll),t.querySelector(".species").addEventListener("click",removeEl),t.id="",document.querySelector(s+">ul").prepend(readyLi(t))}}}),document.getElementById("iexport").addEventListener("click",()=>{saveData(getLi(),"value.DyS.json")}),document.getElementById("imp").addEventListener("click",()=>{document.getElementById("iimport").click()}),document.getElementById("download").addEventListener("click",function(){var t=getLi(),l=arrF=[],i=f=0;e=(()=>{document.getElementById("modalCancel").style.display=""});for(let e in t)t[e].length<1?arrF[f++]=++i:0===f&&(l[i++]=e+`:"${t[e].join(",")}"`);//!
if(document.getElementById("modalCancel").style.display="none",f>0){for(let e of arrF)e=elm.npcTab.querySelector(`li:nth-child(${e})>a`).innerHTML.replace(/ <span class="[^"]+">.<.span>$/,"");alertModal("Cannot download!","No Species exist in "+arrF.join(", "),{finally:[e]})}else alertModal("Paste the copped value to the file name","Then continue the application",{resolve:[()=>{var e=document.getElementById("path");e&&(e.disabled=!1,e.value+="value.DyS.cosv",e.select(),document.execCommand("copy"),e.value=e.value.replace(/value\.DyS\.cosv$/i,""),e.disabled=!0),saveData(l.join("\n"),"value.DyS.cosv",!0)}],finally:[e]})})});