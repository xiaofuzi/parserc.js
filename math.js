/*
* parser state
*/
function State(input){
	this.input = input;
	this.currentChar = input[0];
	this.pos = 0;
	this.state = false;
}

var statePT = State.prototype; 

statePT.advance = function(length){
	length = length || 1;
	this.pos += length;
	this.currentChar = this.input[this.pos];
	return this.currentChar ? true : false;
}

statePT.error = function(msg){
	throw Error(msg);
}

statePT.rest = function(){
	var input = this.input,
		pos = this.pos;
	if(this.pos < (input.length - 1)){
		return [].slice.call(input, pos);
	}else{
		this.error('Haven been to the end!');
	}
}


/*
* primitive
*/
function literal(c){
	return function(state){
		var currentChar = state.currentChar;
		if(currentChar == c){
			state.advance();
			return c;
		}else{
			return false;
		}
	}
}

function integer(){
	return function(state){
		var currentChar = state.currentChar;
		if(!isNaN(currentChar)){
			state.advance();
			return currentChar;
		}else{
			return false;
		}
	}
}

function or(parser0, parser1){
	return function(state){
		var result0 = parser0(state);
		if(result0){
			return result0;
		}

		var result1 = parser1(state);
		if(result1){
			return result1;
		}
		return false;
	}
}

function and(parser0, parser1){
	return function(state){
		var result0 = parser0(state);
		if(!result0){
			return result0;
		}

		var result1 = parser1(state);
		if(!result1){
			return result1;
		}
		return result0 + result1;
	}
}

function many(parser){
	return function many(state){
		var result = parser(state),
			matched = result;
		while(result){
			result = parser(state);
			if(result){
				matched += result;
			}
		}
		return matched;
	}
}

function integers(state){
	var parser = integer();
	return many(parser)(state);
}

function apply(fn, parser){
	return function(state){
		var result = parser(state);
		if(!result){
			return false;
		}else{
			return fn(result);
		}
	}
}

var parser = or(
			and(literal('a'), literal('b')),
			and(literal('c'), literal('b'))
			)
//var result = parser(new State('cbacbv'));
//console.log(result);

//var manyA = many(literal('A'));
//console.log(manyA(new State('AAAAccc')));
console.log(integers(new State('1234dfs')));
