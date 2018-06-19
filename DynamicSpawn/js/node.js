"use strict";
function node(type,txt,attr,html){
	var el=document.createElement(type);
	html?el.innerHTML=txt:el.innerText=txt;
	var event=attr.addEventListener||attr.event||attr.eventListener;
	if(event)for(let i in event){
		if(Array.isArray(event[i]))el.addEventListener(i,...event[i]);
		else el.addEventListener(i,event[i]);
	}
	for(let i in attr)if(!/(inner)?(HTML|[tT]ext)/.test(i))el.setAttribute(i,attr[i]);
	return el;
}

function nodeNS(namespace,type,txt,attr,html){
	var el=document.createElementNS(namespace,type);
	html?el.innerHTML=txt:el.innerText=txt;
	for(let i in attr)if(!/(inner)?(HTML|[tT]ext)|NS/.test(i))el.setAttributeNS(namespace,i,attr[i]);
	return el;
}

class nodes{
	constructor(){
		var arr=[],
		n=0;
		for(let a of arguments){
			if(a.nodeType)arr[n++]=a;
			else if(a instanceof(nodes||nodesNS))for(let p in a.arr)arr[n++]=a.arr[p];
			else if(typeof a=="object")for(let p in a){
				if(a[p].nodeType)arr[n++]=a[p];
				else if(typeof a[p]=="object"){
					if(Array.isArray(a[p]))for(let q of a[p])arr[n++]=createNode(q,p);
					else arr[n++]=createNode(a[p],p);
				}
				else arr[n++]=document.createTextNode(a[p]);
			}
			else arr[n++]=document.createTextNode(a);
		}
		this.arr=arr;
		this.length=arr.length;
		function createNode(node,i){
			var txt,
			html;
			if(typeof node=="object"){
				html=node.innerHTML||node.HTML;
				txt=html||node.text||node.innerText;
			}
			else txt=node;
			return node.NS?new nodeNS(node.NS,i,txt,node,!!html):new node(i,txt,node,!!html);
		}
	}
	wrap(parent,attr){
		if(typeof parent==("string"||"number"||"boolean"))parent=new node(parent,undefined,attr)
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	wrapNS(namespace,parent){
		if(typeof parent==("string"||"number"||"boolean"))parent=new nodeNS(namespace,parent,undefined,attr);
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	attribute(obj){
		for(let i of this.arr)for(let n in obj)i.setAttribute(n,obj[n]);
		this.wrap(this.parent);
	}
	attributeNS(namespace,obj){
		for(let i of this.arr)for(let n in obj)i.setAttributeNS(namespace,n,obj[n]);
		this.wrap(this.parent);
	}
	types(){
		var arr=[],
		nodes=this.arr;
		for(let i in nodes){
			if(nodes[i] instanceof HTMLElement)arr[i]=nodes[i].nameName;
			else arr[i]=NodeNumberLower[nodes[i].nodeType];
		}
		return arr;
	}
	typesReduced(){
		return[...new Set(this.types())];
	}
}
const NodeNumber={},
NodeNumberLower={};
for(let i in Node){
	NodeNumber[Node[i]]=i;
	NodeNumberLower[Node[i]]=i.replace(/_/g," ").toLowerCase();
}
Object.freeze(NodeNumber);
Object.freeze(NodeNumberLower);
//node.prototype.valueOf=function(){return this.node||this.arr}

class nodesNS{
	constructor(namespace){
		var arr=[],
		n=0,
		arg=Array.prototype.slice.call(arguments,1);
		for(let a of arg){
			if(a.nodeType)arr[n++]=a;
			else if(a instanceof(nodes||nodesNS))for(let p in a.arr)arr[n++]=a.arr[p];
			else if(typeof a=="object") for(let p in a){
				if(a[p].nodeType)arr[n++]=a[p];
				else if(typeof a[p]=="object"){
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
			if(typeof node=="object"){
				html=node.innerHTML||node.HTML;
				txt=html||node.text||node.innerText;
			}
			else txt=node;
			return new nodeNS(node.NS||namespace,i,txt,node,!!html);
		}
	}
	wrap(parent){
		if(typeof parent==("string"||"number"||"boolean"))parent=new nodeNS(this.namespace,parent,undefined,attr);
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	wrapNoNS(parent){
		if(typeof parent==("string"||"number"||"boolean"))parent=new node(parent,undefined,attr);
		for(let i in attr)parent.setAttribute(i,attr[i]);
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	wrapNS(namespace,parent){
		if(typeof parent==("string"||"number"||"boolean"))parent=new nodeNS(namespace,parent,undefined,attr);
		for(let i in attr)parent.setAttributeNS(namespace,i,attr[i]);
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	attributeNoNS(obj){
		for(let i of this.arr)for(let n in obj)i.setAttribute(n,obj[n]);
		this.wrapNoNS(this.parent);
	}
	attributeNS(namespace,obj){
		for(let i of this.arr)for(let n in obj)i.setAttributeNS(namespace,n,obj[n]);
		this.wrapNoNS(this.parent);
	}
	attribute(obj){
		this.attributeNS(this.namespace,obj);
	}
}

/*new nodes(
	{
		p:[
			{innerHTML:1,id:"firstP"},
			2,
			3
		],
		a:{
			innerHTML:2,
			src:"url2",
			NS:"https://uri.suff/path"
		}
	},
	new node("p","s"),//new is optional for node
	new nodes({p:[1,2,3,4]}),//using .arr is automatically handled
	//new is required for nodes
	"text node",
	"innerHTML".node("p",{id:"last:div>p"}),
	new node("pnode".node("p"),"text").wrap("div")
).wrap("div");*/