"use strict";
if(self.Worker){
var worker=function(){
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
			queue[_q]={run:run.bind(_q,obj),event:document.createElement("i")};
			return new Promise(r=>{
				queue[_q].event.addEventListener("end",()=>{
					r(response);
					response=queue[_q]=undefined;
				},{once:true});
			});
		}
	};
	return{
		call:(func,that,args=[])=>___call(func,that,args,"call"),
		//requires CSP of `script-src 'unsafe-eval';`
		eval:(func,that,args={})=>___call(func,that,args,"eval"),
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
}();
}
else{
	console.warn("Web Worker not supported");
	{
		const script=document.createElement("script");
		script.src=document.currentScript.src.replace(/.+?\/.+?/,"")+"webWorker/worker.js";
		document.head.appendChild(script);
	}
	var worker=function(){
		const ___call=(func,that,args,act)=>new Promise(r=>{
			switch(act){
				case "call":
					r(worker.funcs[func].apply(that,args));
					break;
				case "eval":
					r(new Function(...Object.keys(args),func).apply(that,Object.values(args)));
			}
		});
		return{
			call:(func,that,args=[])=>___call(func,that,args,"call"),
			//requires CSP of `script-src 'unsafe-eval';`
			eval:(func,that,args={})=>___call(func,that,args,"eval"),
			save:(name,func,args=[])=>{
				worker.funcs[name]=new Function(...args,func);
			}
		}
	}();
}