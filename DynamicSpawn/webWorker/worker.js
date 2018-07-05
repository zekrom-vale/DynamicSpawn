"use strict";
{
	const funcs={
		synchronousWait:(t=1e+10)=>{for(let i=0;i<t;i++)continue;return 'done'},
		add:function(...n){return n.reduce((a,v)=>a+v)},
		subtract:function(...n){return n.reduce((a,v)=>a-v)},
		multiply:function(...n){return n.reduce((a,v)=>a*v)},
		divide:function(...n){return n.reduce((a,v)=>a/v)}
		//Other functions to be called
		//`script-src 'unsafe-eval';` not required to call
	};
	if(isWorker())onmessage=e=>{
		switch(e.data.act){
			case "save":
				funcs[e.data.name]=new Function(...e.data.args,e.data.func);
				break;
			case "call":
				postMessage(funcs[e.data.func].apply(e.data.that,e.data.args));
				break;
			case "eval":
				postMessage(new Function(...Object.keys(e.data.args),e.data.func).apply(e.data.that,Object.values(e.data.args)));
		}
	}
	else worker.funcs=funcs;
	function isWorker(){
		try{
			if(DedicatedWorkerGlobalScope)return true;
		}catch(e){return false;}
	}
}