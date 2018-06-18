"use strict";
String.prototype.textNode=function(){
	return document.createTextNode(this);
}
Boolean.prototype.node=String.prototype.node=Number.prototype.node=function(el,att={},nodes=[],option){
	el=document.createElement(el);
	el.innerText=this;
	for(let i in att)el.setAttribute(i,att[i]);
	el.append(...nodes);
	return el;
}

Boolean.prototype.checkbox=function(value){
	let el=document.createElement("input");
	el.type="checkbox";
	if(value)el.value=value;
	if(this)el.setAttribute("checked","checked");
	return el;
}

class node{
	constructor(){
		var arr=[],
		n=0;
		for(let a of arguments){
			if(a.nodeType)arr[n++]=a;
			else if(typeof a==("string"||"number"||"boolean"))arr[n++]=document.createTextNode(a);
			else for(let p in a){
				if(a[p].nodeType)arr[n++]=a[p];
				else if(typeof a[p]==("string"||"number"||"boolean"))arr[n++]=document.createTextNode(a);
				else{
					if(Array.isArray(a[p]))for(let q of a[p])arr[n++]=createa[p](q,p);
					else arr[n++]=createa[p](a[p],p);
				}
			}
		}
		this.arr=arr;
		this.length=arr.length;
		
	}
	wrap(parent,attr){
		if(typeof parent==("string"||"number"||"boolean"))parent=document.createElement(parent);
		for(let i in attr)parent.setAttribute(i,attr[i]);
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	wrapNS(namespace,parent){
		if(typeof parent==("string"||"number"||"boolean"))parent=document.createElementNS(namespace,parent);
		for(let i in attr)parent.setAttributeNS(namespace,i,attr[i]);
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	attribute(obj){
		for(let i in this.arr)for(let n in obj)this.arr[i].setAttribute(n,obj[n]);
	}
	attributeNS(namespace,obj){
		for(let i in this.arr)for(let n in obj)this.arr[i].setAttributeNS(namespace,n,obj[n]);
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

function createNode(node,i){
	var el=node.NS?document.createElementNS(node.NS,i):document.createElement(i);
	if(typeof node=="object"){
		let html=node.innerHTML||node.HTML,
		txt=node.text||node.innerText;
		if(html)el.innerHTML=html;
		if(txt)el.innerText=txt;
		for(let q in node)if(!/(inner)?(HTML|[tT]ext)|NS/.test(q))el.setAttribute(q,node[q]);
	}
	else el.innerHTML=node;
	return el;
}

class nodeNS{
	constructor(namespace){
		var arr=[],
		n=0,
		arg=Array.prototype.slice.call(arguments,1);
		for(let a of arg){
			if(a.nodeType)arr[n++]=a;
			else if(typeof a==("string"||"number"||"boolean"))arr[n++]=document.createTextNode(a);
			else for(let p in a){
				if(a[p].nodeType)arr[n++]=a[p];
				else if(typeof a[p]==("string"||"number"||"boolean"))arr[n++]=document.createTextNode(a);
				else{
					if(Array.isArray(a[p]))for(let q of a[p])arr[n++]=createNodeNS(namespace,q,p);
					else arr[n++]=createNodeNS(namespace,a[p],p);
				}
			}
		}
		this.arr=arr;
		this.namespace=namespace;
		this.length=arr.length;
	}
	wrap(parent){
		if(typeof parent==("string"||"number"||"boolean"))parent=document.createElementNS(this.namespace,parent);
		for(let i in attr)parent.setAttributeNS(this.namespace,i,attr[i]);
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	wrapNoNS(parent){
		if(typeof parent==("string"||"number"||"boolean"))parent=document.createElement(parent);
		for(let i in attr)parent.setAttribute(i,attr[i]);
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	wrapNS(namespace,parent){
		if(typeof parent==("string"||"number"||"boolean"))parent=document.createElementNS(namespace,parent);
		for(let i in attr)parent.setAttributeNS(namespace,i,attr[i]);
		parent.append(...this.arr);
		this.node=parent;
		return parent;
	}
	attributeNoNS(obj){
		for(let i in this.arr)for(let n in obj)this.arr[i].setAttribute(n,obj[n]);
	}
	attributeNS(namespace,obj){
		for(let i in this.arr)for(let n in obj)this.arr[i].setAttributeNS(namespace,n,obj[n]);
	}
	attribute(obj){
		this.attributeNS(this.namespace,obj);
	}
}

function createNodeNS(namespace,node,i){
	var el=document.createElementNS(node.NS||namespace,i);
	if(typeof node=="object"){
		let html=node.innerHTML||node.HTML,
		txt=node.text||node.innerText;
		if(html)el.innerHTML=html;
		if(txt)el.innerText=txt;
		for(let q in node)if(!/(inner)?(HTML|[tT]ext)|NS/.test(q))el.setAttributeNS(node.NS||namespace,q,node[q]);
	}
	else el.innerHTML=node;
	return el;
}

/*new node(
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
	"s".node("p"),
	new node({p:[1,2,3,4]}).arr,
	"text node",
	"innerHTML".node("p",{id:"lastP"})
).warp("div");*/