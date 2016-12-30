import {insurechain} from "../../modules/ethereum/contract-definitions";

function EthereumService ($q, AppWeb3CheckService) {
    this.insurechain = web3.eth.contract (insurechain.abi).at (insurechain.contractAddress);

    this.toPromise = (contractFunc) => {
        const defer = $q.defer();

        return AppWeb3CheckService.userCheck().then(() => {
            contractFunc(arguments, (err, result) => {
                if(err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });

            return defer.promise;
        });
    };

    return this;
}

export default ['$q', 'AppWeb3CheckService', EthereumService]

