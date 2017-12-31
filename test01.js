//const SHA256 = require('C:/Program Files/nodejs/node_modules/crypto-js/sha256');

class Block{
	constructor(index, timestamp, data){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
	}
}

let thida = new Block(0,1,2);
console.log(thida.timestamp);