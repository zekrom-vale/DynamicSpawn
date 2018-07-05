"use strict";
if(self.Worker){
var worker=(function(){
	var response,
	queue=[];//pseudo-queue
	const worker=new Worker("webWorker/worker.js"),
	end=new CustomEvent("end"),
	___call=(func,that,args,act)=>{
		const _q=queue.length,
		obj={func:func,that:that,args:args,act:act};
		if(_q===0){
			queue[0]=undefined;
			return new Promise(r=>{
				worker.postMessage(obj);
				worker.onerror=worker.onmessage=e=>{
					if(queue.length>1)queue[1].run();
					else queue=[];
					r(e.data||e);
				}
			});
		}
		else{
			queue[_q]={run:run.bind(_q,name,that,args),event:document.createElement("i")};
			return new Promise(r=>{
				queue[_q].event.addEventListener("end",event=>{
					r(response);
					queue[_q]=undefined;
				},{once:true});
			});
		}
	};
	return{
		call:(func,that,args=[])=>{return ___call(func,that,args,"call")},
		eval:(func,that,args={})=>{return ___call(func,that,args,"eval")},
		//requires CSP of `script-src 'unsafe-eval';`
		save:(name,func,args=[])=>{
			worker.postMessage({func:func,args:args,name:name,act:"save"});
		}
	}
	function run(obj){
		worker.postMessage(obj);
		worker.onerror=worker.onmessage=e=>{
			response=e.data||e;
			queue[this].event.dispatchEvent(end);
			if(queue.length-1>this)queue[this+1].run();
			else queue=[];
		}
	}
})();
}
else{
	console.error("Web Worker not supported");
	var runWorker=function(func,that,args={}){
		return new Promise(r=>{
			r(new Function(...Object.keys(args),func).apply(that,Object.values(args)));
		});
	}
}
//await runWorker("for(let i=0;i<1e+10;i++)continue;return 'done'");