const funcs={
	//loop:function(){for(let i=0;i<1e+10;i++)continue;return 'done'}
	//Other functions to be called
};
onmessage=e=>{
	var func=funcs[e.data[0]]?funcs[e.data[0]]:new Function(...Object.keys(e.data[2]),e.data[0]);
	if(e.data[4])postMessage(func.apply(e.data[1],Object.values(e.data[2])));
	else postMessage("saved");
	if(e.data[3])funcs[e.data[3]]=func;
}