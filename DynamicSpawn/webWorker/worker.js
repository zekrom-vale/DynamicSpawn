const funcs={
	synchronousWait:(t=1e+10)=>{for(let i=0;i<t;i++)continue;return 'done'},
	add:function(){return[...arguments].reduce((a,v)=>a+v)},
	subtract:function(){return[...arguments].reduce((a,v)=>a-v)},
	multiply:function(){return[...arguments].reduce((a,v)=>a*v)},
	divide:function(){return[...arguments].reduce((a,v)=>a/v)}
	//Other functions to be called
};
onmessage=e=>{
	var func=funcs[e.data[0]]?funcs[e.data[0]]:new Function(...Array.isArray(e.data[2])?e.data[2]:Object.keys(e.data[2]),e.data[0]);
	if(e.data[3])funcs[e.data[3]]=func;
	else postMessage(func.apply(e.data[1],Array.isArray(e.data[2])?e.data[2]:Object.values(e.data[2])));
}