onmessage=function(e){

var customNPC=(function(){
	var[li,btn,img,img2,div]=e.data.baseLi,
	el=li.cloneNode();
	el.classList.add("custom-species");
	var b=btn.cloneNode(),
	divM=div.cloneNode(1);
		divM.firstChild.classList.add("addToAll");
		divM.childNodes[1].classList.add("removeFromAll");
	var imgM=img.cloneNode();
		imgM.src="img/tab_other.png";
	var imgM2=img2.cloneNode();
		imgM2.src="img/tab_other_select.png";
		b.append(imgM,imgM2);
	return[el,b,imgM,imgM2,divM];
}());

postMessage([customNPC]);

}