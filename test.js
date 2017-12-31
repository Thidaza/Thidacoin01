const Web3 = require('web3');
const web3test = new Web3('http://localhost:8545');

console.log(web3test);
console.log(Web3.providers);

//web3test.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

web3test.eth.getAccounts(function(err, res){
    console.log(err, res)
})