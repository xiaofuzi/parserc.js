var parser = require('../lib/parser'),
	state = require('../lib/state');


var operater = parser.any(
		[ 
			parser.literal("+"),
			parser.literal("-"),
			parser.literal("*"),
			parser.literal("/")
		]
	);
var expr = parser.add(
		[
			parser.integers(),
			parser.integers()
		]
	)

var mathState = state('12-9');
console.log(expr(mathState));
console.log(mathState.rest())