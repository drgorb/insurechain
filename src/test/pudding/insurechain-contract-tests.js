var fs = require ("fs");
var Web3 = require ("web3");
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var soliditySources = {
    retailers: (fs.readFileSync ('contracts/Retailers.sol') + ' ')
}

var compiledContracts = {};


    retailers: web3.eth.compile.solidity (soliditySources.retailers)




