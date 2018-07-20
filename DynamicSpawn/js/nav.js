addEventListener("load",()=>{
	const els=document.querySelectorAll(".nav-link"),
	_l=els.length;
	for(let i=0;i<_l;i++){
		els[i].addEventListener("click",tabInteract,true);
		els[i].addEventListener("keyup",tabEnter,true);
	}
	function tabInteract(event){
		if(event.shiftKey){
			this.parentNode.classList.toggle('nav-link-sel');
			setTimeout(()=>{
				document.querySelector(`[data-hash="${location.hash}"]`).classList.add("show","active");
				this.classList.remove("active");
			},20);
		}
		else dtTab(this);
	}
	function tabEnter(event){
		if(event.key==="Enter"){
			dtTab(this);
			this.focus();
		}
	}
	$("input").on("keydown",unfocus);
	function unfocus(event){
		if(event.key==="Escape"){
			event.preventDefault();
			this.blur();
		}
	}
});

function dtTab(el,load){
	const hash=el.dataset.hash;
	{
		const oldHash=location.hash,
		list=document.getElementById(hash.slice(1));
		document.querySelector(`[data-hash="${oldHash}"]`).classList.remove("show","active");
		{
			const old=document.getElementById(oldHash.slice(1))
			old.classList.remove("active");
			old.setAttribute("aria-hidden","true");
		}
		el.classList.add("show","active");
		list.setAttribute("aria-hidden","false");
		list.classList.add("active");
		list.classList.remove("fade");
		location.hash=hash;
	}
	const li=document.querySelectorAll("#speciesList li"),
	_l=li.length;
	for(let i=0;i<_l;)li[i].setAttribute("aria-selected",li[i++].classList.contains("active-"+hash.slice(1)));
	if(!load)search.call($("#speciesInput"),{},true);
}

{
	const navWorker=new Worker("webWorker/nav.js");
	navWorker.onmessage=e=>{
		let act=e.data;
		if(act){
			event.preventDefault();
			document.getElementById(act[0])[act[1]||"click"]();
		}
	}
	//addEventListener("keydown",e=>{console.log(e.key)});
	addEventListener("keydown",function(event){
		const active=document.activeElement;
		if(/input|textarea/i.test(active.tagName)||active.dataset.nav==="false")return;
		if(/^Arrow[ULDR]|^[wasdWASD]$/.test(event.key)){
			event.preventDefault();
			if(event.shiftKey)move.call(document.querySelector("#npcList>.active>ul"),event.key);
			else move.call(document.getElementById("speciesList"),event.key);
			function move(input){
				var selected=document.activeElement,
				key,to,li;
				{
					let active=this.querySelector("[data-active]");
					if(this.contains(selected)){
						key=selected.dataset.key||0;
						while(selected.tagName!=="LI")selected=selected.parentNode;
						if(active)delete active.dataset.active;
					}
					else{
						selected=active||this.querySelector("li:first-of-type");
						key=selected.dataset.active||selected.dataset.key||0;
					}
				}
				switch(input.toLowerCase()){
					case "arrowup":
					case "w":
						li=selected;
						do{
							li=li.previousSibling;
							if(!li)return;
						}while(isValid(li));
						to=li.querySelector(`[data-key="${key}"]`);
						break;
					case "arrowdown":
					case "s":
						li=selected;
						do{
							li=li.nextSibling;
							if(!li)return;
						}while(isValid(li));
						to=li.querySelector(`[data-key="${key}"]`);
						break;
					case "arrowright":
					case "d":
						key=(key+1)%3;
						to=selected.querySelector(`[data-key="${key}"]`);
						break;
					case "arrowleft":
					case "a":
						key=(key+2)%3;//(v-1)%m==(v-1+m)%m (For positive values)
						to=selected.querySelector(`[data-key="${key}"]`);
						break;
					default:return;
				}
				if(li)delete selected.dataset.active;
				(li||selected).dataset.active=key;
				to.focus();
				function isValid(li){
					return!(li instanceof HTMLElement)||li.style.display==="none"||(li.classList.contains("hideMod")&&/^\s*null/.test(document.getElementById("activeStyle2").innerHTML));
				}
			}
		}
		else if(/^Page[UD]|^(Home|End|[zxZX])$/.test(event.key)){
			event.preventDefault();
			const mods=document.getElementById("mods")
			let to,
			key=mods.querySelector('li[data-selected="true"]');
			const selected=mods.contains(active)?active:key||mods.querySelector("li:first-of-type");
			switch(event.key.toLowerCase()){
				case "pageup":
				case "x":
					to=selected;
					do{
						to=to.previousSibling;
						if(!to)return;
					}while(isValid(to))
					break;
				case "pagedown":
				case "z":
					to=selected;
					do{
						to=to.nextSibling;
						if(!to)return;
					}while(isValid(to))
					break;
				case "home":
					to=mods.querySelector("li:first-of-type");
					break;
				case "end":
					to=mods.querySelector("li:last-of-type");
					break;
				default:return;
			}
			if(key)delete key.dataset.selected;
			to.dataset.selected=true;
			to.focus();
			function isValid(li){
				return!(li instanceof HTMLElement)||li.style.display==="none";
			}
		}
		else if(/^\d$/.test(event.key)){
			let n=event.key==0?10:event.key;
			if(event.altKey)n+=10;
			const el=document.querySelector(`#npcTab>li:nth-of-type(${n})>a`);
			if(el)event.shiftKey?el.focus():el.click();
		}
		else if(!(event.altKey||event.ctrlKey)){
			navWorker.postMessage(event.key);
		}
	});
}