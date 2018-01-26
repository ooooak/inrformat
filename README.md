# INRFormat
Indian number format

# node
	const inrformat = require('inrformat');

	console.log(inrformat('123.00')); // 123.00
	console.log(inrformat('123')); // 123
	console.log(inrformat('123456.00')); // 1,23,456.00


# Web
	<script src="dist/inrformat.mini.js"></script>

	console.log(inrformat('123.00')); // 123.00
	console.log(inrformat('123')); // 123
	console.log(inrformat('123456.00')); // 1,23,456.00
