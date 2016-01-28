var _utils = module.exports = {};

/*
 * primitive types
 * string/number/boolean/null/undefined
 */
var isType = function(type) {
    return function(str) {
        if (typeof str === type) {
            return true;
        } else {
            return false;
        }
    }
}

_utils.isString = function(str) {
	return isType('string')(str);
}

_utils.isNumber = function(value) {
	return isType('number')(value);
}

_utils.isBool = function(value) {
	return isType('boolean')(value);
}

_utils.isUndefined = function(value) {
	return isType('undefined')(value);
}

_utils.isNull = function(value) {
	if(value === null){
		return true;
	}else{
		return false;
	}
}

/*
 * complex types
 * array/function
 */


 _utils.isArray = function(value){
 	return Array.isArray(value);
 }

 _utils.isFunc = function(value){
 	return isType('function')(value);	
 }




/*
* String type
*/
_utils.toArray = function(str){
	if(_utils.isNull(str) || _utils.isUndefined(str)){
		_utils.error(str + " is not a string!");
	}else{
		return [].slice.call(str);
	}
}


/*
* Error handler
*/
_utils.error = function(msg){
	throw Error(msg);
}

_utils.log = function(msg){
	console.log(msg);
}

