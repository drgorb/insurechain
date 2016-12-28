var fs = require ("fs");
var crypto = require ('crypto');
var Web3 = require ("web3");
var _ = require ("lodash");
var $q = require ("q");

var web3 = new Web3 ();
web3.setProvider (new web3.providers.HttpProvider ('http://localhost:8646'));

console.log (web3.eth.getCompilers ());

var soliditySources = {
    insurechain: (fs.readFileSync ('contracts/Insurechain.sol') + ' '),
}

var contractTransactions = [];

var compiledContracts = {};

_.each (soliditySources, (source, name) => {
    compiledContracts[name] = web3.eth.compile.solidity (source);
    compiledContracts[name].contract = web3.eth.contract (compiledContracts[name].info.abiDefinition);
    var defer = $q.defer ();
    compiledContracts[name].contract.new ({
            from: "0x6d8B18F9b737160A73F536393C908FE89961E570",
            data: compiledContracts[name].code,
            value: 0,
            gas: 1000000
        },
        function (err, contract) {
            if (err) {
                defer.reject (err);
            } else {
                /*the callback is called twice, the second time with an address*/
                if (contract.address) {
                    contract.name = name;
                    defer.resolve (contract);
                }
            }
        });
    contractTransactions.push (defer.promise)
});

$q.all (contractTransactions)
    .then (function (results) {
        var json = "";
        var exports = "export {x";
        results.forEach (function (result) {
            if (result.name) {
                json += "\nvar " + result.name + " = " + JSON.stringify (
                        {
                            address: result.address,
                            abi: result.abi,
                            bytecode: compiledContracts[result.name].code
                        }) + ";";
                exports += ", " + result.name;
            } else {
                console.log (result.reason);
            }
        });
        exports = exports.replace ("x, ", "");
        console.log (json + "\n" + exports + "}");
        return json + "\n" + exports + "}";
    }).then (function (javascript) {
    fs.writeFile ("src/modules/ethereum/contract-definitions.js", javascript, (err) => {
        if (err) throw err;
        console.log ('It\'s saved!');
    });
});

