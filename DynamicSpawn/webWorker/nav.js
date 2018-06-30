onmessage=function(e){
	postMessage(keyAction(e.data));
}

function keyAction(key){
	switch(key.toLowerCase()){
		case "r":
		case "scrolllock":
			return ["RegExpS"];
		case "delete":
			return ["removeAll"];
		case "-":
		case "_":
		case "backspace":
			return ["removeVisible"];
		case "=":
		case "+":
			return ["addVisible"];
		case "e":
			return ["iexport"];
		case "i":
		case "insert":
			return ["imp"];
		case " ":
		//case "end":
			return ["download"];
//
		case "f":
			return ["speciesInput","focus"];
		case "o":
			return ["searchOp","focus"];
	}
}