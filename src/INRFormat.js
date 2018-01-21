class INRFormat{
	static init(input){
		input += ''
		let negativeNum
		let float = ''
		// is negative number
		if (input.charAt(0) === '-'){
	 		input = input.substr(1);
			negativeNum = true;
		}

		input = INRFormat.clearInput(input);

		let hasDot = input.indexOf(".");
		if (hasDot !== -1){
			let chunk = input.split(".");
			float = chunk[1];

			if (float.length > 0){
				input = chunk[0];
			}
		}

		let ret;
		if (float.length > 0){
			ret = INRFormat.addDashes(input) + "." + float;
		}else if (hasDot === true && float.length === 0){
			ret = INRFormat.addDashes(input.replace(".", "")) + ".";
		}else{
			ret = INRFormat.addDashes(input);
		}

		return  negativeNum ? '-' + ret : ret;
	}

	static isNumeric(str){
	    return /^\d+$/.test(str);
	}

	static clearInput(input){
		let ret = '';
		let firstDot = true;
		for (let i = 0, len = input.length; i < len; i++) {
		  let char = input.charAt(i);

		  // skip 0 at start
		  // if (ret.length == 0 && char === '0'){
		  // 	continue;
		  // }

		  if (INRFormat.isNumeric(char)){
		  	ret += char;
		  } else if(char === '.' && firstDot){
		  	ret += char;
		  	firstDot = false;
		  }
		}

		return ret;
	}

	

	static addDashes(input){
		if (input.length <= 3)
			return input;

		let hundred  = "," + input.substring(input.length-3);
		let rest = input.substring(0, input.length-3);

		return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + hundred;
	}
}


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
	module.exports = INRFormat.init;
}else{
	window.INRFormat = INRFormat.init;
}