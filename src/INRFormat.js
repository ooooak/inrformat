(function(){
class INRFormatLib{
	static init(_input, sp = ','){
		let float = '';
		let input = INRFormatLib.clearInput(_input)
		let negative = (input.charAt(0) === '-');
		if (negative){
	 		input = input.substr(1);
		}

		let hasDot = (input.indexOf(".") !== -1);
		if (hasDot){
			let chunk = input.split(".");			
			float = chunk[1];
			if (float.length > 0){
				input = chunk[0];
			}
		}

		let ret = INRFormatLib.addDashes(input, sp);
		if (hasDot){
			ret += ".";
		} 
		if(float.length > 0){
			ret += float;
		}

		return  negative ? ('-' + ret) : ret;
	}

	static isNumeric(str){
	    return /^\d+$/.test(str);
	}

	/**
	 * @param String
	 * Remove all the extra input
	 *  "-" allowed at start
	 *  "." only one allowed
	 */
	static clearInput(input){
		input += '';
		let ret = '';
		let firstDot = true;
		for (let i = 0, len = input.length; i < len; i++) {
			let char = input.charAt(i);
			if (char === '-' && ret.length === 0){
				ret += char;
			}else if (INRFormatLib.isNumeric(char)){
				ret += char;
			} else if(char === '.' && firstDot){
				ret += char;
				firstDot = false;
			}
		}
		return ret;
	}

	static addDashes(input, sp){
		if (input.length <= 3)
			return input;
		
		return input.substring(0, input.length-3)
					.replace(/\B(?=(\d{2})+(?!\d))/g, sp) 
					+ sp + input.substring(input.length-3);
	}
}


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
	module.exports = INRFormatLib.init;
}else{
	window.INRFormat = INRFormatLib.init;
}
})();