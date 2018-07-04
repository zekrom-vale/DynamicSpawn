"use strict";
const searchWorker=new Worker("webWorker/search.js");
searchWorker.onmessage=e=>{
	$(e.data.query).toggle(e.data.bool);
}
searchWorker.onerror=e=>{
	if(/(done|RegExp)/.test(e.message)){
		e.preventDefault();
		const el=/override:true/.test(e.message)?
			$("#npcList>div.active li"):
			$("#speciesList li,#npcList>div.active li");
		if(/done/.test(e.message))el.filter(function(){
			searchWorker.postMessage({
				disp:this.style.display!=="none",
				query:`#${this.parentNode.id||this.parentNode.parentNode.id} li[value="${this.getValue()}"]`,
				text:this.querySelector('button.species').innerText,
				value:this.getValue(),
				author:this.dataset.author,
				mod:this.dataset.mod,
				custom:this.classList.contains("custom-species")
			});
		});
		else if(/RegExp/.test(e.message))el.filter(function(){
			searchWorker.postMessage({
				disp:this.style.display!=="none",
				query:`#${this.parentNode.id||this.parentNode.parentNode.id} li[value="${this.getValue()}"]`,
				text:this.querySelector('button.species').innerText,
				value:this.getValue(),
				author:this.dataset.author,
				mod:this.dataset.mod,
				custom:this.classList.contains("custom-species")
			});
		});
		$("#mods li").filter(function(){
			searchWorker.postMessage({
				disp:this.style.display!=="none",
				query:`#mods li[value="${this.getValue()}"]`,
				mod:this.getValue(),
				isMod:true
			});
		});
	}
}

var search=(function(){
	var prev;
	return function(event,override){
		if(event.key==="Tab"||event.key==="Enter")return;
		document.getElementById("body").setAttribute("aria-busy","true");
		if(document.getElementById("RegExp").checked){
			let e;
			const elp=this.parentNode;
			try{
				searchWorker.postMessage({
					v:document.getElementById("searchOp").value,
					value:new RegExp($(this).val(),"ig"),
					prev:0,
					init:true,
					RegExp:true,
					override:override
				});
				elp.classList.remove("err");
				this.setAttribute("aria-invalid","false");
			}catch(e){
				elp.classList.add("err");
				this.setAttribute("aria-invalid","true");
			}
		}
		else{
			searchWorker.postMessage({
				v:document.getElementById("searchOp").value,
				value:$(this).val(),
				prev:override?0:prev,
				init:true,
				override:override
			});
			prev=$(this).val();
		}
		document.getElementById("body").removeAttribute("aria-busy");
	}
})();