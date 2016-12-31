import {insurechain} from "./../contractDefinitions";

function EthereumHelperService ($q) {

    let self = this;
    this.insurechain = web3.eth.contract (insurechain.abi).at (insurechain.contractAddress);

    this.toPromise = function(contractFunc) {
        const defer = $q.defer();
        let args = Array.from(arguments).slice(1);
        console.log(self);
        args.push(self.callbackFn(defer));
        console.log(args);
        contractFunc.apply(this, args);
        return defer.promise;
    };

    this.callbackFn = (defer) => (err, result) => {
        if(err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    };

    return this;
}

export default ['$q', EthereumHelperService]

