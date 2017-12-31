const SHA256 = require('crypto-js/sha256');
const express = require('express');
const app = express();
const Web3 = require("web3");
const web3test = new Web3("http://localhost:8545");

class Block{
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.nonce = 0;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		//import SHA256 npm install --save crypto-js
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log(this.nonce);
		console.log("Block mined: " + this.hash);
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 1;
	}

	createGenesisBlock(){
		return new Block(0, "01/01/2017", "Genesis Thidacoins", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		//newBlock.hash = newBlock.calculateHash();
		newBlock.mineBlock(this.difficulty);
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

console.log('Mining block #1...');
thidaCoin.addBlock(new Block(1, "01/01/2018", {amount:2}));

console.log('Mining block #2...');
thidaCoin.addBlock(new Block(2, "02/01/2018", {amount:3}));

console.log('Mining block #3...');
thidaCoin.addBlock(new Block(3, "03/01/2018", {amount:4}));


app.get("/", (req, res) => {
  	res.sendFile("D:/01_Projects/00_Thidacoins/00_Project01/public/index.html");
});

app.get("/ajax-request", (req, res) => {
	web3test.eth.getAccounts(function(error, addresses) {
    	if(error == null) res.send(JSON.stringify(addresses));
  	});
});

app.listen(3002);
