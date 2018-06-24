addEventListener("load",()=>{
	let els=document.querySelectorAll(".nav-link");
	const _l=els.length;
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
});

function dtTab(el){
	var hash=el.dataset.hash;
	{
		// style=document.getElementById("activeStyle"),
		let oldHash=location.hash,
		list=document.getElementById(hash.slice(1));
		document.querySelector(`[data-hash="${oldHash}"]`).classList.remove("show","active");
		document.getElementById(oldHash.slice(1)).classList.remove("active");
		el.classList.add("show","active");
		el.setAttribute("aria-hidden","false");
		list.setAttribute("aria-hidden","true");
		list.classList.add("active");
		list.classList.remove("fade");
		location.hash=hash;
		//style.innerHTML=style.innerHTML.replace(/active-[^{]+/,"active-"+hash.slice(1));
	}
	var li=document.querySelectorAll("#speciesList li"),
	_l=li.length;
	for(let i=0;i<_l;)li[i].setAttribute("aria-selected",li[i++].classList.contains("active-"+hash.slice(1)));
}

addEventListener("keydown",function(event){
	var active=document.activeElement;
	if(/input|textarea/i.test(active.tagName)||active.dataset.nav==="false")return;
	if(/^Arrow[ULDR]|^[wasd]$/i.test(event.key)){
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
						if(!li)return;
						li=li.previousSibling;
					}while(isValid(li));
					if(!li)return;
					to=li.querySelector(`[data-key="${key}"]`);
					break;
				case "arrowdown":
				case "s":
					li=selected;
					do{
						if(!li)return;
						li=li.nextSibling;
					}while(isValid(li));
					if(!li)return;
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
				default:
					console.warn("Key slipped: "+input);
					return;
			}
			if(li)delete selected.dataset.active;
			(li||selected).dataset.active=key;
			to.focus();
			function isValid(li){
				return!(li instanceof HTMLElement)||li.style.display==="none"||(li.classList.contains("hideMod")&&/^\s*null/.test(document.getElementById("activeStyle2").innerHTML));
			}
		}
	}
	else if(/^\d$/.test(event.key)){
		let n=event.key==0?10:event.key;
		if(event.altKey)n+10;
		let el=document.querySelector(`#npcTab>li:nth-of-type(${n})>a`);
		if(el)event.shiftKey?el.focus():el.click();
	}
	/*else if(/^F\d$/.test(event.key)){
		event.preventDefault();
		let n=Number(event.key.slice(1));
		if(event.altKey)n+12;
		let el=document.querySelector(`#npcTab>li:nth-of-type(${n})>a`);
		if(el)event.shiftKey?el.focus():el.click();
	}*/
	else if(!(event.altKey||event.ctrlKey)){
		let id;
		switch(event.key.toLowerCase()){
			case "f":
				id="speciesInput"
				break;
			case "o":
				id="searchOp"
				break;
		}
		if(id){
			document.getElementById(id).focus();
			return;
		}
		switch(event.key.toLowerCase()){
			case "r":
			case "scrolllock":
				id="RegExpS";
				break;
			case "delete":
				id="removeAll";
				break;
			case "-":
			case "_":
			case "backspace":
				id="removeVisible";
				break;
			case "=":
			case "+":
				id="addVisible";
				break;
			case "e":
				id="iexport";
				break;
			case "i":
			case "insert":
				id="imp";
				break;
			case " ":
			//case "end":
				id="download";
				break;
			default:
				return;
		}
		document.getElementById(id).click();
	}
});