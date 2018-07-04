"use strict";
//requires CSP of `script-src 'unsafe-eval';` 
if(self.Worker){
var worker=(function(){
	const worker=new Worker("webWorker/worker.js"),
	end=new CustomEvent("end");
	var response,
	queue=[];//pseudo-queue
	return{
		eval:(func,that,args={})=>{
			const _q=queue.length;
			if(_q>0){
				queue[_q]={run:run.bind(_q,func,that,args,undefined,true),event:document.createElement("i")};
				return new Promise(r=>{
					queue[_q].event.addEventListener("end",event=>{
						r(response);
						queue[_q]=undefined;
					},{once:true});
				});
			}else{
				queue[0]=undefined;
				return new Promise(r=>{
					worker.postMessage([func,that,args,undefined,true]);
					worker.onerror=worker.onmessage=e=>{
						if(queue.length>1)queue[1].run();
						else queue=[];
						r(e.data||e);
					}
				});
			}
		},
		save:(name,func,args=[])=>{
			worker.postMessage([func,undefined,args,name,false]);
		},
		call:(func,that,args=[])=>{
			const _q=queue.length;
			if(_q>0){
				queue[_q]={run:run.bind(_q,func,that,args,undefined,true),event:document.createElement("i")};
				return new Promise(r=>{
					queue[_q].event.addEventListener("end",event=>{
						r(response);
						queue[_q]=undefined;
					},{once:true});
				});
			}else{
				queue[0]=undefined;
				return new Promise(r=>{
					worker.postMessage([func,that,args,undefined,true]);
					worker.onerror=worker.onmessage=e=>{
						if(queue.length>1)queue[1].run();
						else queue=[];
						r(e.data||e);
					}
				});
			}
		}
	}
	function run(func,that,args,save,Run){
		worker.postMessage([func,that,args,save,Run]);
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