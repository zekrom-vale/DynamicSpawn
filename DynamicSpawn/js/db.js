//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
//Database set up
var db;
/*window.addEventListener("load",()=>{
	DBsetUp(name,value,items,f)
	//localStorage.setItem("n",n+1);
});*/
/*
var obj={
	a:2,
	b:{
		c:3,
		f:{
			a:1
		}
	},
	c:[
		1,
		2,
		{
			w:2,
			q:3
		}
	]
};
*/
function DBsetUp(name,value,key,items,f){
	//name=the index used to associate with
	
	//value=the incremental value of the database
	
	//key=if items is an array of deep keys or not
	
	//items=an object of the basic construction of the items
	//Assumes that any ending array will be multiEntry
	
	//f={success:[function,...],error:[function,...]}
	//where f.success[0](result,...) and f.error[0](...)
	
	//Cannot use dynamic sizes of arrays not at the end
	var request=window.indexedDB.open(name,value);
	if(f.error)request.addEventListener("error",()=>{
		if(f.error.length===1)f.error[0]();
		else f.error[0](...f.error.slice(1));
	});
	if(f.success)request.addEventListener("success",()=>{
		if(f.success.length===1)f.success[0](request.result);
		else f.success[0](request.result,...f.success.slice(1));
	});
	request.addEventListener("upgradeneeded",db=>{
		db=db.target.result;
		var store=db.createObjectStore(name,{keyPath:name+"id",autoIncrement:true});
		if(key){
			let keys=getDeepKeys(items);
			for(var i in keys)store.createIndex(items[i],items[i],{unique:true,multiEntry:/\d$/.test(keys)});
		}
		else for(var i in items)store.createIndex(items[i],items[i],{unique:true,multiEntry:/\d$/.test(items)});
	});
}

function dbAddData(name,value,element,f){
	if(element)element.preventDefault();
	var transaction=db.transaction([name],'readwrite');
	store=transaction.objectStore(name);
	var request=objectStore.add(value);
	request.addEventListener("success",()=>{
		if(f.success.length===1)f.success[0]();
		else f.success[0](...f.success.slice(1));
	});
	transaction.addEventListener("complete",()=>{
		if(f.complete.length===1)f.complete[0](request.result);
		else f.complete[0](request.result,...f.complete.slice(1));
		
		var store=db.transaction(name).objectStore(name);
		store.openCursor().addEventListener("success",(storage)=>{
			var arr=[];
			if(storage){
				arr.push(storage.value);
				storage.continue();
			}
			if(f.display.length===1)f.display[0](arr);
			else f.display[0](arr,...f.display.slice(1));
		});
	});
	transaction.addEventListener("error",()=>{
		f.error()
	});
}

function getDeepKeys(obj,key,d="/"){
	if(typeof(obj)!=="object")return null;
	var arr=[];
	for(let i in obj){
		if(typeof(obj[i])==="object")arr=arr.concat(getDeepKeys(obj[i],key?key+d+i:i));
		else arr.push(key?key+d+i:i);
	}
	return arr;
}

function objectFlatten(obj,key,d="/"){
	if(typeof(obj)!=="object")return null;
	var arr={};
	for(let i in obj){
		if(typeof(obj[i])==="object"){
			let o=objectFlatten(obj[i],key?key+d+i:i);
			for(let n in o)arr[n]=o[n];
		}
		else arr[key?key+d+i:i]=obj[i];
	}
	return arr;
}

function objectDimensionalize(obj,d="/"){
	//All arrays returned as array like objects
	var arr={};
	for(let i in obj){
		let I=i.split(d);
		if(arr[I[0]])arr[I[0]].push([obj[i],I.slice(1)]);
		else arr[I[0]]=[[obj[i],I.slice(1)]];
	}
	for(let i in arr)arr[i]=objectDimensionalizeCore(arr[i]);
	return arr;
}

function objectDimensionalizeCore(objs){
	var arr={};
	for(let i in objs){
		let value=objs[i][0],
		I=objs[i][1];
		if(typeof(I)==="object"&&I.length>0){
			if(arr[I[0]])arr[I[0]].push([value,I.slice(1)]);
			else arr[I[0]]=[[value,I.slice(1)]];
		}
		else return value;
	}
	for(let i in arr)arr[i]=objectDimensionalizeCore(arr[i]);
	return arr;
}

var obj={
'a/b':0,
'a/d':12,
'b':"f",
'c/s/w/0':0,
'c/s/w/1':1,
'c/s/w/2':2,
'c/s/q':0
}

console.log(objectDimensionalize(obj));

function objectGetValue(obj,key,d="/"){
	if(typeof(obj)!=="object")return undefined;
	key=key.split(d);
	return objectGetValueCore(obj[key[0]],key.slice(1));
}
function objectGetValueCore(obj,key){
	if(typeof(key)==="object"&&key.length>0){
		return obj?objectGetValueCore(obj[key[0]],key.slice(1)):undefined;
	}
	return obj;
}

function addData(obj){
	
}