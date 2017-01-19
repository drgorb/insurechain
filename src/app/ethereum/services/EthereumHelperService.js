import {insureChain, insuranceManager, retailerManager} from "./../../contractDefinitions";

function EthereumHelperService ($q, UserService) {

    this.insurechain = web3.eth.contract(insureChain.abi).at(insureChain.address);
    this.insuranceManager = web3.eth.contract(insuranceManager.abi).at(insuranceManager.address);
    this.retailerManager = web3.eth.contract(retailerManager.abi).at(retailerManager.address);

    this.insurechain.functionHashes = getFunctionHashes(insureChain.abi);
    this.insuranceManager.functionHashes = getFunctionHashes(insuranceManager.abi);
    this.retailerManager.functionHashes = getFunctionHashes(retailerManager.abi);

    this.toPromise = function(contractFunc) {
        const defer = $q.defer();
        let args = Array.from(arguments).slice(1);
        args.push(this.callbackFn(defer));
        UserService.checkUser().then(() => {
           contractFunc.apply(this, args)
        }).catch((err) => {
            console.log(err)
        });
        return defer.promise;
    };

    this.callbackFn = (defer) => (err, result) => {
        if(err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    };

    function getFunctionHashes (abi) {
        let hashes = {};
        for (let i = 0; i < abi.length; i++) {
            let item = abi[i];
            if (item.type != "function") continue;
            let inputs = item.inputs.map (function (input) {
                return input.type;
            });
            let signature = item.name + "(" + inputs.join (",") + ")";
            let hash = web3.sha3 (signature);
            console.log (item.name + ' = ' + hash.substring(0, 10));
            hashes[hash.substring(0, 10)] = {name: item.name, inputs: inputs};
        }
        return hashes;
    };

    this.getStatusName = status => {
        switch(status) {
            case 0 : return 'UNDEFINED';
            case 1 : return 'Requested';
            case 2 : return 'Accepted';
            case 3 : return 'Rejected';
            case 4 : return 'Terminated';
        }
    };

    return this;
}

export default ['$q','UserService', EthereumHelperService]

