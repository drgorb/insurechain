import retailers from "./contract-definitions";
import insauranceList from "./mock-data";
import retailerList from "./mock-data";

function RetailersEthereumService ($q, $timeout) {

    var self = this;
    self.abi = retailers.abi;
    self.contractAddress = retailers.address;

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
        self.insauranceList.push({name: name, address: address, status: 0});
        return $q.when(true);
    }
}

export default ['$q', RetailersEthereumService]

