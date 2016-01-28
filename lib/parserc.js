var _utils = require('./helper/utils');

/*
 * combinator lib
 */

var parserc = module.exports = {};

/*
 * primitive
 */
parserc.literal = function(c) {
    return function(state) {
        var currentChar = state.currentChar;
        if (currentChar == c) {
            state.eat();
            state.success = true;
        }
        return state;
    }
}

parserc.integer = function() {
    return function(state) {
        var currentChar = state.currentChar;
        if (currentChar != ' ' && !isNaN(currentChar)) {
            state.eat();
            state.success = true;
        }
        return state;
    }
}

parserc.empty = function(parser) {
    return function(state) {
        if (state.input == '') {
            state.success = true;
        }else{
        	state.success = false;
        }
        return state;
    }
}

parserc.spaces = function() {
    return function(state) {
        parserc.many(parserc.literal(' '))(state);
        return state;
    }
}

parserc.or = function(parser0, parser1) {
    return function(state) {
        var result0 = parser0(state);
        if (result0.success) {
            return result0;
        }

        var result1 = parser1(state);
        if (result1.success) {
            return result1;
        }
        return state;
    }
}

/*
 * param {array}
 */
parserc.alternate = function() {
    var parserArr = _utils.toArray(arguments);
    return function(state) {
        var index = parserArr.length - 1;
        while (index >= 0) {
            var result = parserArr[index](state);
            if (result.success) {
                return result;
            } else {
                --index;
            }
        }
        return state;
    }
}

parserc.and = function(parser0, parser1) {
    return function(state) {
    	var currentState = state.currentState();
        var result0 = parser0(state);
        if (!result0.success) {
        	state.init(currentState);        	
            return result0;
        }
        //switch state.success
        state.initState();
        var result1 = parser1(state);
        if (!result1.success) {
        	state.init(currentState);
            return result1;
        }
        return state;
    }
}

/*
 * param {array}
 */
parserc.sequence = function() {
    var parserArr = _utils.toArray(arguments);
    return function(state) {
        var len = parserArr.length,
            index = 0,
            currentState = state.currentState();
        while (index < len) {
            if (!parserArr[index](state).success) {
                state.init(currentState);
                //not match
                return state;
            } else {
                state.initState();
                ++index;
            }
        }
        //matched
        state.success = true;
        return state;
    }
}


parserc.many = function(parser) {
    return function(state) {
        var currentState = state.currentState();
        var currentPos = state.pos;
        var result = parser(state);
        while (result.success) {
            state.initState();
            //console.log('many data02:', result.match, result.success);
            result = parser(result);
        }

        //is matched
        if (state.pos != currentPos) {
            state.success = true;
        }else{
        	state.init(currentState);

        }
        return state;
    }
}

parserc.integers = function() {
    var parserInt = parserc.integer();
    return function(state) {
        parserc.many(parserInt)(state);
        return state;
    }
}

parserc.zeromore = function(parser) {
    return function(state) {
        var result = parserc.many(parser)(state);
        console.log('zeromore:', state.success);
        if (!result.success) {
            state.success = true;
        }
        return state;
    }
}

parserc.apply = function(fn, parser) {
    return function(state) {
        var result = parser(state);
        if (!result.success) {
            return state;
        } else {
            return fn(result.match);
        }
    }
}
