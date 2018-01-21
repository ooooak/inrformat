'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INRFormatLib = function () {
	function INRFormatLib() {
		_classCallCheck(this, INRFormatLib);
	}

	_createClass(INRFormatLib, [{
		key: 'is_numeric',
		value: function is_numeric(str) {
			return (/^\d+$/.test(str)
			);
		}
	}, {
		key: 'clearInput',
		value: function clearInput(input) {
			var ret = '';
			var firstDot = true;
			for (var i = 0, len = input.length; i < len; i++) {
				var char = input.charAt(i);

				// skip 0 at start
				if (ret.length == 0 && char === '0') {
					continue;
				}

				if (this.is_numeric(char)) {
					ret += char;
				} else if (char === '.' && firstDot) {
					ret += char;
					firstDot = false;
				}
			}

			return ret;
		}
	}, {
		key: 'convert',
		value: function convert(input) {
			// convert to string
			input += '';
			var negativeNum = void 0;
			var float = '';

			// is negative number
			if (input.charAt(0) === '-') {
				input = input.substr(1);
				negativeNum = true;
			}

			input = this.clearInput(input);

			var hasDot = input.indexOf(".");
			if (hasDot !== -1) {
				var chunk = input.split(".");
				float = chunk[1];

				if (float.length > 0) {
					input = chunk[0];
				}
			}

			var ret = void 0;
			if (float.length > 0) {
				ret = this.addDashes(input) + "." + float;
			} else if (hasDot === true && float.length === 0) {
				// if has . at end then remove it while formatting number
				// but do attach it
				ret = this.addDashes(input.replace(".", "")) + ".";
			} else {
				ret = this.addDashes(input);
			}

			return negativeNum ? '-' + ret : ret;
		}
	}, {
		key: 'addDashes',
		value: function addDashes(input) {
			if (input.length <= 3) return input;

			var hundred = "," + input.substring(input.length - 3);
			var rest = input.substring(0, input.length - 3);

			return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + hundred;
		}
	}]);

	return INRFormatLib;
}();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = INRFormatLib;
} else {
	window.INRFormat = INRFormatLib;
}
