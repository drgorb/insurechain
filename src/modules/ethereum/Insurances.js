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

    self.regsiterInsurance = function(name, address) {
        console.log(name, address);
        insauranceList.push({name: name, address: address, status: 0});
        return $q.when(true);
    }

    return self
}

export default ['$q', InsuranceEthereumService]

