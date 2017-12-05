var INRFormatLib = function(){};


INRFormatLib.prototype.is_numeric = function(str){
    return /^\d+$/.test(str);
}

// collect number and one dot. 
// filter out everything else
INRFormatLib.prototype.clearInput = function(input){
	var ret = '';
	var firstDot = true;
	for (var i = 0, len = input.length; i < len; i++) {
	  var char = input.charAt(i);

	  // skip 0 at start
	  if (ret.length == 0 && char === '0'){
	  	continue;
	  }

	  if (this.is_numeric(char)){
	  	ret += char;
	  } else if(char === '.' && firstDot){
	  	ret += char;
	  	firstDot = false;
	  }
	}

	return ret;
}

INRFormatLib.prototype.convert = function(input){
	// convert to string
	input += '';
	var negativeNum;
	var float = '';

	// is negative number
	if (input.charAt(0) === '-'){
 		input = input.substr(1);
		negativeNum = true;
	}

	input = this.clearInput(input);

	var hasDot = input.indexOf(".");
	if (hasDot !== -1){
		var chunk = input.split(".");
		float = chunk[1];

		if (float.length > 0){
			input = chunk[0];
		}
	}

	var ret;
	if (float.length > 0){
		ret = this.addDashes(input) + "." + float;
	}else if (hasDot === true && float.length === 0){
		// if has . at end then remove it while formatting number
		// but do attach it
		ret = this.addDashes(input.replace(".", "")) + ".";
	}else{
		ret = this.addDashes(input);
	}

	return  negativeNum ? '-' + ret : ret;
}
INRFormatLib.prototype.addDashes = function(input){
	if (input.length <= 3)
		return input;

	var hunder = "," + input.substring(input.length-3);
	var rest = input.substring(0, input.length-3);

	return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + hunder;


	// return input;
	 // +  + hunder

	return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
}


var INRFormat = function(input){
	var inr = new INRFormatLib();
	return inr.convert(input);
}
