onmessage=e=>{
	var v=e.data.v,
	value=e.data.value.trim().toLowerCase(),
	prev=e.data.prev,
	match=prev?
		value.indexOf(prev)!==-1?
			1:prev.indexOf(value)?
				-1:0
		:0;
	v=[
		v==0||v==1||v==1.5,
		v==0||v==2||v==1.5,
		v%3==0,
		v%4==0
	];
	function exists(txt){
		return txt.toLowerCase().indexOf(value)!==-1;
	}
	self.onmessage=function(e){
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
}