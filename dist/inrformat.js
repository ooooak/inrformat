'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	var INRFormatLib = function () {
		function INRFormatLib() {
			_classCallCheck(this, INRFormatLib);
		}

		_createClass(INRFormatLib, null, [{
			key: 'init',
			value: function init(_input) {
				var sp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';

				var float = '';
				var input = INRFormatLib.clearInput(_input);
				var negative = input.charAt(0) === '-';
				if (negative) {
					input = input.substr(1);
				}

				var hasDot = input.indexOf(".") !== -1;
				if (hasDot) {
					var chunk = input.split(".");
					float = chunk[1];
					if (float.length > 0) {
						input = chunk[0];
					}
				}

				var ret = INRFormatLib.addDashes(input, sp);
				if (hasDot) {
					ret += ".";
				}
				if (float.length > 0) {
					ret += float;
				}

				return negative ? '-' + ret : ret;
			}
		}, {
			key: 'isNumeric',
			value: function isNumeric(str) {
				return (/^\d+$/.test(str)
				);
			}

			/**
    * @param String
    * Remove all the extra input
    *  "-" allowed at start
    *  "." only one allowed
    */

		}, {
			key: 'clearInput',
			value: function clearInput(input) {
				input += '';
				var ret = '';
				var firstDot = true;
				for (var i = 0, len = input.length; i < len; i++) {
					var char = input.charAt(i);
					if (char === '-' && ret.length === 0) {
						ret += char;
					} else if (INRFormatLib.isNumeric(char)) {
						ret += char;
					} else if (char === '.' && firstDot) {
						ret += char;
						firstDot = false;
					}
				}
				return ret;
			}
		}, {
			key: 'addDashes',
			value: function addDashes(input, sp) {
				if (input.length <= 3) return input;

				return input.substring(0, input.length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, sp) + sp + input.substring(input.length - 3);
			}
		}]);

		return INRFormatLib;
	}();

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = INRFormatLib.init;
	} else {
		window.inrformat = INRFormatLib.init;
	}
})();
