import {insurechain} from './../contractDefinitions';

function EthereumRoleService($q) {
    let abi = insurechain.abi;
    let contractAddress = insurechain.address;
    let contract = web3.eth.contract (abi).at (contractAddress);

    return {
        getRole: (address) => {
            let defer = $q.defer();
            contract.getRole(address, (err, result) => {
                if(err) {
                    defer.reject(err)
                } else {
                    defer.resolve(result)
                }
            });
            return defer.promise;
        }
    }
}

export default ['$q', EthereumRoleService]