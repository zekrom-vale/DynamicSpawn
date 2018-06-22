addEventListener("load",()=>{


{//--------------- Tab list ---------------
	let els=document.querySelectorAll(".nav-link");
	const _l=els.length;
	for(let i=0;i<_l;i++){
		els[i].addEventListener("click",tabInteract,true);
		els[i].addEventListener("keydown",tabEnter,true);
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
}
});

addEventListener("keydown",function(event){
	if(!/input|textarea/i.test(document.activeElement.tagName)){
		if(event.shiftKey)move.call(document.querySelector("#npcList>div.active>ul"),event.key);
		else move.call(document.getElementById("speciesList"),event.key);
		function move(input){
			var selected=document.activeElement,
			key,to,li;
			if(this.contains(selected)){
				key=selected.dataset.key||0;
				while(selected.tagName!=="LI"){
					selected=selected.parentNode;
				}
				delete this.querySelector("[data-active]").dataset.active;
			}
			else{
				selected=this.querySelector("[data-active]")||this.querySelector("li:first-of-type");
				key=selected.dataset.active||selected.dataset.key||0;
			}
			switch(input){
				case "ArrowUp":
				case "w":
					li=selected;
					do{
						if(!li)return;
						li=li.previousSibling;
					}while(isValid(li));
					if(!li)return;
					to=li.querySelector(`[data-key="${key}"]`);
					break;
				case "ArrowDown":
				case "s":
					li=selected;
					do{
						if(!li)return;
						li=li.nextSibling;
					}while(isValid(li));
					if(!li)return;
					to=li.querySelector(`[data-key="${key}"]`);
					break;
				case "ArrowRight":
				case "d":
					key=(key+1)%3;
					to=selected.querySelector(`[data-key="${key}"]`);
					break;
				case "ArrowLeft":
				case "a":
					key=(key+2)%3;//(v-1)%m==(v-1+m)%m (For positive values)
					to=selected.querySelector(`[data-key="${key}"]`);
			}
			if(to){
				if(li)delete selected.dataset.active;
				(li||selected).dataset.active=key;
				to.focus();
			}
		}
		function isValid(li){
			return!(li instanceof HTMLElement)||li.style.display==="none"||(li.classList.contains("hideMod")&&/^\s*null/.test(document.getElementById("activeStyle2").innerHTML));
		}
	}
});