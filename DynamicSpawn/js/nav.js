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

document.getElementById("speciesList").addEventListener("keydown",function(event){
	//Will not work with caret browsing mode
	//https://support.mozilla.org/en-US/questions/974774
	var selected=document.activeElement,
	key=selected.dataset.key||0,
	to,li;
	if(this.contains(selected)){
		while(selected.tagName!="LI")selected=selected.parentNode;
	}
	switch(event.key){
		case "ArrowUp":
			li=selected;
			do{
				li=li.previousSibling;
				console.log(li);
			}while(!(li instanceof HTMLElement)||li.style.display=="none");
			if(!li)return;
			to=li.querySelector(`[data-key="${key}"]`);
			break;
		case "ArrowDown":
			li=selected;
			do{
				li=li.nextSibling;
			}while(!(li instanceof HTMLElement)||li.style.display=="none");
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
	console.log(to);
	if(li)delete selected.dataset.active;
	(li||selected).dataset.active=key;
	to.focus();
});

});