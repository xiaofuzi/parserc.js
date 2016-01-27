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



module.exports = function(input){
	return new State(input);
}

