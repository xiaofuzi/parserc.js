/*
* combinator lib
*/

var parserc = module.exports = {};

/*
* primitive
*/
parserc.literal = function(c){
	return function(state){
		var currentChar = state.currentChar;
		if(currentChar == c){
			state.eat();
			state.success = true;
		}
		return state;
	}
}

parserc.integer = function(){
	return function(state){
		var currentChar = state.currentChar;
		if(!isNaN(currentChar)){
			state.eat();
			state.success = true;
		}
		return state;
	}
}

parserc.or = function(parser0, parser1){
	return function(state){
		var result0 = parser0(state);
		if(result0.success){
			return result0;
		}

		var result1 = parser1(state);
		if(result1.success){
			return result1;
		}
		return state;
	}
}

/*
* param {array}
*/
parserc.any = function(parserArr){
	return function(state){
		var index = parserArr.length - 1;
		while(index >= 0){
			var result = parserArr[index](state);
			if(result.success){
				return result; 
			}else{
				--index;
			}
		}
		return state;
	}
}

parserc.and = function(parser0, parser1){
	return function(state){
		var result0 = parser0(state);
		if(!result0.success){
			return result0;
		}

		var result1 = parser1(state);
		if(!result1.success){
			return result1;
		}
		return result0 + result1;
	}
}

parserc.add = function(parserArr){
	return function(state){
		var length = parserArr.length - 1,
			i = 0;
		var result = '';
		while(i <= length){
			var temp = parserArr[i](state);
			if(!temp){
				return false; 
			}else{
				result += temp;
				++i;
			}
		}
		return result;
	}
}

parserc.many = function(parser){
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

parserc.integers = function(){
	var parser = this.integer();
	return function(state){
		this.many(parser)(state);
	}
}

parserc.apply = function(fn, parser){
	return function(state){
		var result = parser(state);
		if(!result){
			return false;
		}else{
			return fn(result);
		}
	}
}