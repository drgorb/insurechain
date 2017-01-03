import {insurechain} from "./../../contractDefinitions";

function EthereumHelperService ($q, UserService) {

    this.insurechain = web3.eth.contract(insurechain.abi).at(insurechain.address);

    this.toPromise = function(contractFunc) {
        const defer = $q.defer();
        let args = Array.from(arguments).slice(1);
        args.push(this.callbackFn(defer));
        UserService.checkUser().then(() => {
           contractFunc.apply(this.insurechain, args)
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

    return this;
}

export default ['$q','UserService', EthereumHelperService]

