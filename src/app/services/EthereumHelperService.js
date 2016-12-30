import {insurechain} from "../../modules/ethereum/contract-definitions";

function EthereumService ($q, AppWeb3CheckService) {
    this.insurechain = web3.eth.contract (insurechain.abi).at (insurechain.contractAddress);

    this.toPromise = function(contractFunc) {
        const defer = $q.defer();
        let args = Array.from(arguments).slice(1);
        args.push(this.callbackFn(defer));
        return AppWeb3CheckService.userCheck().then(() => {
            contractFunc.apply(this, args);
            return defer.promise;
        });
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

export default ['$q', 'AppWeb3CheckService', EthereumService]

