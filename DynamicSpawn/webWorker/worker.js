onmessage=e=>{
	var func=new Function(...Object.keys(e.data[2]||{}),e.data[0]);
	postMessage(func.apply(e.data[1],Object.values(e.data[2]||{})));
}