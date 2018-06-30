onmessage=function(e){
	postMessage(keyAction(e.data));
}

function keyAction(key){
	switch(key.toLowerCase()){
		case "r":
		case "scrolllock":
			return ["RegExpS","click"];
		case "delete":
			return ["removeAll","click"];
		case "-":
		case "_":
		case "backspace":
			return ["removeVisible","click"];
		case "=":
		case "+":
			return ["addVisible","click"];
		case "e":
			return ["iexport","click"];
		case "i":
		case "insert":
			return ["imp","click"];
		case " ":
		//case "end":
			return ["download","click"];
//
		case "f":
			return ["speciesInput","focus"];
		case "o":
			return ["searchOp","focus"];
	}
}