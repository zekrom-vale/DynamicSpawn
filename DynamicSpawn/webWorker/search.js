"use strict";
var loop;
onmessage=e=>{
	if(e.data.init){
		if(e.data.RegExp){
			loop=init(e.data);
			throw "RegExp override:"+!!e.data.override;
		}
		else{
			loop=init(e.data);
			throw "done override:"+!!e.data.override;
		}
	}
	else loop(e.data);
}

function init(data){
	const prev=data.prev;
	var value=data.value,
	v=data.v,
	match=0;
	if(!data.RegExp){
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
		const exists=data.RegExp?
			txt=>value.test(txt):txt=>txt.toLowerCase().indexOf(value)!==-1;
		return data=>{
			if(!(data.disp&&match===-1||!data.disp&&match===1)){
				let bool;
				if(data.isMod)bool=exists(data.mod);
				else{
					bool=v[0]&&exists(data.text);
					if(!data.custom){
						bool=(
							bool||
							v[1]&&exists(data.value)||
							v[3]&&exists(data.author)||
							v[2]&&exists(data.mod)
						);
					}
				}
				if(bool!=data.disp)postMessage({query:data.query,bool:bool});
			}
		}
	})();
}