const INRFormat = require('./INRFormat')
const assert = require('assert')

let tests = [
		['', ""],
		[0, "0"],
		["00", "00"],
		["000", "000"],
		["0000", "0,000"],
		[10000, "10,000"],
		[100000, "1,00,000"],
		[-100000, "-1,00,000"],
		[-1000, "-1,000"],
		[-100, "-100"],
		[-1, "-1"],
		[-0, "0"],
		[100000, "1,00,000"],
		[-100000, "-1,00,000"],
		[-123.22, "-123.22"],
		["hello world", ""],
		["   ", ""],
		[" 0.2  ", "0.2"],
		[" -0.2  ", "-0.2"],
]

tests.forEach((item) => {
	let input = item[0]
	let expected = item[1]
	let val = INRFormat(input)
	assert.equal(val,expected, `expected: ${expected}, Found: ${val}`);
	
})


