"use strict";
//requires CSP of `script-src 'unsafe-eval';` 
if(self.Worker){
var runWorker=(function(){
	var worker=new Worker("webWorker/worker.js"),
	queue=[],//pseudo-queue
	response,
	end=new CustomEvent("end");
	return(func,that,args)=>{//{a:1,b:2}
		var _q=queue.length;
		if(_q>0){
			queue[_q]={run:run.bind(_q,func,that,args),event:document.createElement("i")};
			return new Promise(r=>{
				queue[_q].event.addEventListener("end",event=>{
					r(response);
					queue[_q]=undefined;
				},{once:true});
			});
		}else{
			queue[0]=undefined;
			return new Promise(r=>{
				worker.postMessage([func,that,args]);
				worker.onerror=worker.onmessage=e=>{
					if(queue.length>1)queue[1].run();
					else queue=[];
					r(e.data||e);
				}
			});
		}
	}
	function run(func,that,args){
		worker.postMessage([func,that,args]);
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
	var runWorker=function(func){
		return new Promise(r=>{
			r(func());
		});
	}
}