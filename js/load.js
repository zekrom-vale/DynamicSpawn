"use strict";var saveData;const elm={};function dtTab(e){var t=e.dataset.hash,a=document.getElementById("activeStyle"),o=location.hash,l=document.getElementById(t.slice(1));document.querySelector(`[data-hash="${o}"]`).classList.remove("show","active"),document.getElementById(o.slice(1)).classList.remove("active"),e.classList.add("show","active"),l.classList.add("active"),l.classList.remove("fade"),location.hash=t,a.innerHTML=a.innerHTML.replace(/active-.+?{/,`active-${t.slice(1)}{`)}addEventListener("load",()=>{if(elm.length>0)for(let e in elm)elm[e]=null;if(elm.npcTab=document.getElementById("npcTab"),elm.speciesList=document.getElementById("speciesList"),elm.npcList=document.getElementById("npcList"),Object.freeze(elm),location.hash){let e=location.hash;location.hash="npcGeneric",dtTab(document.querySelector(`[data-hash="${e}"]`)),location.hash=e}else location.hash="npcGeneric";let e=getData("value");if(e){let t=JSON.parse(e);for(let e in t)for(let a of t[e])setLi(e,a)}$('[data-toggle="tooltip"]').tooltip();{let e=document.querySelectorAll(".nav-link");const t=e.length;for(let a=0;a<t;a++)e[a].addEventListener("click",function(e){e.shiftKey?(this.parentNode.classList.toggle("nav-link-sel"),window.setTimeout(()=>{document.querySelector(`[data-hash="${location.hash}"]`).classList.add("show","active"),this.classList.remove("active")},20)):dtTab(this)},!0)}$('[data-toggle="popover"]').popover();{let e=JSON.parse(getData("mods"));if(e&&e.length>0){let t=$("#mods>li"),a=t.length,o=!1;for(let l=0;l<a;l++){let a=t[l].getAttribute("value");if(e.includes(a))o=!0,t[l].classList.add("active");else{let e=$(`[data-mod="${a}"]`),t=e.length;for(let a=0;a<t;a++)e[a].classList.add("hideMod")}}document.getElementById("activeStyle2").disabled=o}}{let e,a=location.search.slice(1).split("&"),o=document.getElementById("path"),l=/System Path/i.test(e);for(let t of a)if(/^path=/i.test(t)){e=decodeURIComponent(t.slice(5).replace(/\+/g,"%20")+"\\");continue}if(/^[a-z]:([\\\/][^\\\/:*?"<>|]+)+[\\\/]$/i.test(e)&&!l){o.value=e;let a=["warning",null,1],l="[\\/]steamapps[\\/]common[\\/]Starbound[\\/]mods[\\/]";new RegExp(l+"?$").test(e)?info("Warning: Local Component Should not be In the Root of Mods",...a):new RegExp(l+'[^\\/:*?"<>|]+[\\/]?$').test(e)||info("Warning: Local Component Not in Starbound's Mod Folder",...a),getData("return")||t()}else{let a=()=>{alertModal("No path found","Would you like to download the local component of Dynamic Spawn?<br/>If not, you still can create a list for later",{resolve:[()=>{location.assign("https://github.com/zekrom-vale/DynamicSpawn/releases")}],reject:[()=>{document.getElementById("download").disabled=!0,getData("return")||t()}]})};o.id+="2",o.value=l?"Cannot Be a System URL":e?"Invalid URL":a()}function t(){var e=document.createElement("script");e.src="js/tour.js",document.head.appendChild(e)}}document.body.removeChild(document.getElementById("load"))}),addEventListener("beforeunload",()=>{setData("value",JSON.stringify(getLi()),90);let e=document.querySelectorAll("#mods>.active"),t=e.length,a=[];for(let o=0;o<t;o++)a[o]=e[o].getAttribute("value");setData("mods",JSON.stringify(a,60))});