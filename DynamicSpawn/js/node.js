"use strict";
function node(type,txt,attr,html,reg=/(inner)?(HTML|[tT]ext)|event(Listener)?/){
	if(typeof attr!="object")attr={};
	var el=nodejsZ.nodeCore(document.createElement(type),txt,attr,html);
	for(let i in attr)if(!reg.test(i))el.setAttribute(i,attr[i]);
	return el;
}

function nodeNS(namespace,type,txt,attr,html,reg=/(inner)?(HTML|[tT]ext)|namespace|NS|event(Listener)?/){
	if(typeof attr!="object")attr={};
	var el=nodejsZ.nodeCore(document.createElementNS(namespace,type),txt,attr,html);
	for(let i in attr)if(!reg.test(i))el.setAttributeNS(namespace,i,attr[i]);
	return el;
}

const nodejsZ={};
nodejsZ.nodeCore=function(el,txt,attr,html){
	if(txt)html?el.innerHTML=txt:el.innerText=txt;
	var event=attr.event||attr.eventListener;
	if(event)for(let i in event){
		if(Array.isArray(event[i]))el.addEventListener(i,...event[i]);
		else el.addEventListener(i,event[i]);
	}
	return el;
}

nodejsZ.wrapPre=function(argn){
	return typeof argn==="string"?[argn,undefined]:argn;
}

class nodesCore{
	___attribute(namespace,obj){
		if(namespace)for(let i of this.arr){
			try{for(let n in obj)i.setAttributeNS(namespace,n,obj[n]);}catch(e){}
		}
		else for(let i of this.arr){
			try{for(let n in obj)i.setAttribute(n,obj[n]);}catch(e){}
		}
		if(this.node){
			var top=this.node.querySelector('[data-topnodestack="true"]')||this.node;
			top.innerHTML="";
			top.append(...this.arr);
		}
	}
	wrapNS(){//[namespace,parent,attr]||parent
		var stack;
		for(let n in arguments){
			let [parent,attr]=nodejsZ.wrapPre([arguments[n][1],arguments[n][2]]);
			if(!parent instanceof HTMLElement){
				if(arguments[n][0])parent=new nodeNS(arguments[n][0],parent,undefined,attr);
				else new node(parent,undefined,attr);
			}
			if(stack){
				parent.append(stack);
				stack=parent;
			}
			else{
				parent.dataset.topnodestack="true";
				parent.append(...this.arr);
				stack=parent;
			}
		}
		this.node=stack;
		//delete (stack.querySelector('[data-topnodestack="true"]')||stack).dataset.topnodestack;
		return stack;
	}
	wrapNSDefault(namespace){//namespace,[parent,attr]||parent
		var stack,
		_a=arguments.length;
		for(let n=1;n<_a;n++){
			let [parent,attr]=nodejsZ.wrapPre(arguments[n]);
			if(!parent instanceof HTMLElement)parent=new nodeNS(namespace,parent,undefined,attr);
			if(stack){
				parent.append(stack);
				stack=parent;
			}
			else{
				parent.dataset.topnodestack="true";
				parent.append(...this.arr);
				stack=parent;
			}
		}
		this.node=stack;
		//delete (stack.querySelector('[data-topnodestack="true"]')||stack).dataset.topnodestack;
		return stack;
	}
}

class nodes extends nodesCore{
	constructor(){
		super();
		var arr=[],
		n=0;
		for(let a of arguments){
			if(a.nodeType)arr[n++]=a;
			else if(a instanceof nodesCore)for(let p in a.arr)arr[n++]=a.arr[p];
			else if(typeof a==="object")for(let p in a){
				if(a[p].nodeType)arr[n++]=a[p];
				else if(typeof a[p]==="object"){
					if(Array.isArray(a[p]))for(let q of a[p])arr[n++]=createNode(q,p);
					else arr[n++]=createNode(a[p],p);
				}
				else arr[n++]=document.createTextNode(a[p]);
			}
			else arr[n++]=document.createTextNode(a);
		}
		this.arr=arr;
		this.length=arr.length;
		function createNode(el,i){
			var txt,
			html;
			if(typeof el==="object"){
				html=el.innerHTML||el.HTML;
				txt=html||el.text||el.innerText;
			}
			else txt=el;
			return el.NS?new nodeNS(el.NS||el.namespace,i,txt,el,!!html):new node(i,txt,el,!!html);
		}
	}
	wrap(){//[parent,attr]||parent
		var stack;
		for(let n in arguments){
			let [parent,attr]=nodejsZ.wrapPre(arguments[n]);
			if(!(parent instanceof HTMLElement))parent=new node(parent,undefined,attr);
			if(stack){
				parent.append(stack);
				stack=parent;
			}
			else{
				parent.dataset.topnodestack="true";
				parent.append(...this.arr);
				stack=parent;
			}
		}
		this.node=stack;
		//delete (stack.querySelector('[data-topnodestack="true"]')||stack).dataset.topnodestack;
		return stack;
	}
	attribute(obj){
		this.___attribute(undefined,obj);
	}
	attributeNS(namespace,obj){
		this.___attribute(namespace,obj);
	}
	types(){
		var arr=[],
		nodes=this.arr;
		for(let i in nodes){
			if(nodes[i] instanceof HTMLElement)arr[i]=nodes[i].nameName;
			else arr[i]=nodeTypeLower(nodes[i]);
		}
		return arr;
	}
	typesReduced(){
		return[...new Set(this.types())];
	}
}
var nodeType,nodeTypeLower;
{
	const NodeNumber={},
	NodeNumberLower={};
	for(let i in Node){
		NodeNumber[Node[i]]=i;
		NodeNumberLower[Node[i]]=i.replace(/_/g," ").toLowerCase();
	}
	nodeType=el=>NodeNumber[el.nodeType];
	nodeTypeLower=el=>nodeTypeLower[el.nodeType];
}

class nodesNS extends nodesCore{
	constructor(namespace){
		super();
		var arr=[],
		n=0,
		arg=Array.prototype.slice.call(arguments,1);
		for(let a of arg){
			if(a.nodeType)arr[n++]=a;
			else if(a instanceof nodesCore)for(let p in a.arr)arr[n++]=a.arr[p];
			else if(typeof a==="object") for(let p in a){
				if(a[p].nodeType)arr[n++]=a[p];
				else if(typeof a[p]==="object"){
					if(Array.isArray(a[p]))for(let q of a[p])arr[n++]=createNodeNS(namespace,q,p);
					else arr[n++]=createNodeNS(namespace,a[p],p);
				}
				else arr[n++]=document.createTextNode(a[p]);
			}
			else arr[n++]=document.createTextNode(a);
		}
		this.arr=arr;
		for(let i in arr)this[i]=arr[i];
		this.namespace=namespace;
		this.length=arr.length;
		function createNodeNS(namespace,node,i){
			var txt,
			html;
			if(typeof node==="object"){
				html=node.innerHTML||node.HTML;
				txt=html||node.text||node.innerText;
			}
			else txt=node;
			return new nodeNS(node.NS||namespace,i,txt,node,!!html);
		}
	}
	wrapNoNS(){//[parent,attr]||parent
		var stack;
		for(let n in arguments){
			let [parent,attr]=nodejsZ.wrapPre(arguments[n]);
			if(!(parent instanceof HTMLElement))parent=new node(parent,undefined,attr);
			if(stack){
				parent.append(stack);
				stack=parent;
			}
			else{
				parent.dataset.topnodestack="true";
				parent.append(...this.arr);
				stack=parent;
			}
		}
		this.node=stack;
		//delete (stack.querySelector('[data-topnodestack="true"]')||stack).dataset.topnodestack;
		return stack;
	}
	wrap(){
		return this.wrapNSDefault(this.namespace,...arguments);
	}
	attributeNoNS(obj){
		this.___attribute(undefined,obj);
	}
	attributeNS(namespace,obj){
		this.___attribute(namespace,obj);
	}
	attribute(obj){
		this.___attribute(this.namespace,obj);
	}
}

/*new nodes(
	{
		p:[
			{innerHTML:"<a href='about:blank>text</a> Outer text'",id:"firstP"},
			2,
			3
		],
		a:{
			innerText:2,
			src:"url2",
			NS:"https://uri.suff/path"
		}
	},
	new node("p","s"),//new is optional for node
	new nodes({p:[1,2,3,4]}),//using .arr is automatically handled
	//new is required for nodes
	"text node"
).wrap(["div"],["span"]);*/

/*new nodes(
	new nodes(
		{p:[
			1,
			2,
			3,
			4,
			5
		],
		a:{text:"link",href:"about:blank"}
		}
	).wrap("div")
).wrap("div");*/