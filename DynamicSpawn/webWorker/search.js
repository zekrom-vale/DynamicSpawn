var loop;
onmessage=e=>{
	if(e.data.init){
		if(e.data.RegExp){
			loop=init(e);
			throw "RegExp";
		}
		else{
			loop=init(e);
			throw "done";
		}
	}
	else loop(e);
}

function init(e){
	var v=e.data.v,
	prev=e.data.prev,
	value=e.data.value,
	match=0;
	if(!e.data.RegExp){
		value=value.trim().toLowerCase(),
		match=prev?
			value.indexOf(prev)!==-1?
				1:prev.indexOf(value)?
					-1:0
			:0;
	}
	v=[
		v==0||v==1||v==1.5,
		v==0||v==2||v==1.5,
		v%3==0,
		v%4==0
	];
	return(function(){
		var exists=e.data.RegExp?
			txt=>value.test(txt)
			:txt=>txt.toLowerCase().indexOf(value)!==-1;
		return e=>{
			if(!(e.data.disp&&match===-1||!e.data.disp&&match===1)){
				let bool=v[0]&&exists(e.data.text);
				if(!e.data.custom){
					bool=(
						bool||
						v[1]&&exists(e.data.value)||
						v[3]&&exists(e.data.author)||
						v[2]&&exists(e.data.mod)
					);
				}
				if(bool!=e.data.disp)postMessage({query:e.data.query,bool:bool});
			}
		}
	})();
}