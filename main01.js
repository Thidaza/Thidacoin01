const SHA256 = require('C:/Program Files/nodejs/node_modules/crypto-js/sha256');

class Block{
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		//import SHA256 npm install --save crypto-js
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0, "01/01/2017", "Genesis Thidacoins", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid(){
		for(let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true;
	}
}

let thidaCoin = new Blockchain();
thidaCoin.addBlock(new Block(1, "01/01/2018", {amount:2}));
thidaCoin.addBlock(new Block(2, "02/01/2018", {amount:3}));
thidaCoin.addBlock(new Block(3, "03/01/2018", {amount:4}));

console.log(JSON.stringify(thidaCoin, null, 10));

console.log('Is blockchain valid? ' + thidaCoin.isChainValid());

thidaCoin.chain[1].data = {amount:100};
thidaCoin.chain[1].data = thidaCoin.chain[1].calculateHash();

console.log('Is blockchain valid? ' + thidaCoin.isChainValid());

//console.log(thidaCoin[1].data);
//console.log(JSON.stringify(thidaCoin, null, 4));
