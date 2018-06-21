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
		if(event.key=="Enter"){
			dtTab(this);
			this.focus();
		}
	}
}

document.getElementById("body").addEventListener("keydown",function(event){
	if(event.shiftKey)move.call(document.querySelector("#npcList>div.active>ul"),event.key);
	else move.call(document.getElementById("speciesList"),event.key);
	function move(input){
		var selected=this.querySelector("[data-active]")||this.querySelector("li:first-of-type"),//document.activeElement,
		key=selected.dataset.active||selected.dataset.key||0,
		to,li;
		switch(input){
			case "ArrowUp":
				li=selected;
				do{
					if(!li)return;
					li=li.previousSibling;
				}while(isValid(li));
				if(!li)return;
				to=li.querySelector(`[data-key="${key}"]`);
				break;
			case "ArrowDown":
				li=selected;
				do{
					if(!li)return;
					li=li.nextSibling;
				}while(isValid(li));
				if(!li)return;
				to=li.querySelector(`[data-key="${key}"]`);
				break;
			case "ArrowRight":
				key=(key+1)%3;
				to=selected.querySelector(`[data-key="${key}"]`);
				break;
			case "ArrowLeft":
				key=(key-1)%3;
				to=selected.querySelector(`[data-key="${key}"]`);
				break;
		}
		if(to){
			if(li)delete selected.dataset.active;
			(li||selected).dataset.active=key;
			to.focus();
		}
		function isValid(li){
			return !(li instanceof HTMLElement)||li.style.display=="none"||(li.classList.contains("hideMod")&&/^\s*null/.test(document.getElementById("activeStyle2").innerHTML));
		}
	}
});

});