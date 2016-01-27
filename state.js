module.exports = State;

/*
* parser state
*/
function State(input){
	this.input = input;
	this.currentChar = input[0];
	this.pos = 0;
	this.match = '';
	this.rest = '';
	this.success = false;
}

var statePT = State.prototype; 

statePT.advance = function(length){
	length = length || 1;
	this.pos += length;
	this.currentChar = this.input[this.pos];
	return this.currentChar ? true : false;
}

statePT.eat = function(){
	this.match += this.currentChar;
	this.advance();
}

statePT.error = function(msg){
	throw Error(msg);
}

statePT.rested = function(){
	var input = this.input,
		pos = this.pos;
	if(this.pos < (input.length - 1)){
		return this.rest = [].slice.call(input, pos);
	}else{
		this.error('Haven been to the end!');
	}
}
