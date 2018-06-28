if(self.Worker){
var runWorker=(function(){
	var worker=new Worker("webWorker/worker.js"),
	queue=[],//pseudo-queue
	//end=new CustomEvent("end"),
	response;
	return func=>{
		var _q=queue.length;
		if(_q>0){
			queue[_q]={run:run.bind(_q,func)};
			return new Promise(r=>{
				queue[_q].addEventListener("end",event=>{
					r(event.response);
					queue[_q]=undefined;
				},{once:true});
			});
		}else{
			queue[0]=undefined;
			return new Promise(r=>{
				worker.postMessage(func);
				worker.onerror=worker.onmessage=e=>{
					if(queue.length>1)queue[1].run();
					else queue=[];
					r(e.data||e);
				}
			});
		}
	}
	function run(func){
		worker.postMessage(func);
		worker.onerror=worker.onmessage=e=>{
			queue[this].dispatchEvent(new CustomEvent("end",{response:e.data||e}));
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