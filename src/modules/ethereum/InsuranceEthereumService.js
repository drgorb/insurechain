import {insurechain} from "./contract-definitions";
import {insauranceList, retailerList} from "./mock-data";

function InsuranceEthereumService ($q) {

    var self = this;
    self.abi = insurechain.abi;
    self.contractAddress = insurechain.address;

    self.dappId = 'insurechain.retailers'

    self.web3 = web3
    self.contract = web3.eth.contract (self.abi).at (self.contractAddress)

    self.getInsurancesList = function () {
        return $q.when (insauranceList);
    }

    self.getRetailerList = function (insurance) {
        return $q.when (retailerList);
    }

    self.regsiterInsurance = function(name) {
        var defer = $q.defer()

        self.contract.createInsurance(name, function (err, result) {
            if(err) {
                defer.reject(err)
            } else {
                defer.resolve(result)
            }
        })

        return defer.promise;
    }
    self.setRequestStatus = function (address, state) {
        alert('work');
        var defer = $q.defer()
        self.contract.setInsuranceState(address, state, function (err, result) {
            if(err) {
                defer.reject(err)
            } else {
                defer.resolve(result)
            }
        })

        return defer.promise;
    }

    return self
}

export default ['$q', InsuranceEthereumService]

