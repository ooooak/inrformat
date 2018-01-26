const INRFormat = require('./inrformat')
const INRFormatCompressed = require('../dist/inrformat')
const INRFormatCompressedMini = require('../dist/inrformat.mini')
const assert = require('assert')

let tests = [
		['', ""],
		[0, "0"],
		["00", "00"],
		["-00", "-00"],
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
	let src = INRFormat(input)
	let cmp = INRFormatCompressed(input)
	let mini = INRFormatCompressedMini(input)

	assert.equal(src, expected, `[src] expected: ${expected}, Found: ${src}`);	
	assert.equal(cmp, expected, `[compressed] expected: ${expected}, Found: ${cmp}`);	
	assert.equal(mini, expected, `[mini] expected: ${expected}, Found: ${mini}`);	
})


tests.forEach((item) => {
	let input = '1245678.00';
	let expected = '12.45.678.00';
	assert.equal(INRFormat(input, '.'), expected, `[mini] expected: ${expected}, Found: ${mini}`);	
})