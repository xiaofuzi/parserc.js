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

statePT.init = function(state){
	this.currentChar = state.currentChar || (this.input)[0];
	this.pos = state.pos || 0;
	this.match = state.match || '';
	this.rest = state.rest || '';
	this.success = state.success || false;
}

statePT.currentState = function(){
	var state = {};
	state.currentChar = this.currentChar;
	state.pos = this.pos;
	state.match = this.match;
	state.rest = this.rest;
	state.success = this.success;

	return state;
}

statePT.initState = function(){
	this.success = false;
}

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
		return this.rest = String.prototype.substring.call(input, pos);
	}else{
		this.error('Haven been to the end!');
	}
}



module.exports = function(input){
	return new State(input);
}

