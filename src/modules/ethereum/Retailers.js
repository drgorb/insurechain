/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
import { retailers } from "./contract-definitions";
import { insauranceList, retailerList } from "./mock-data";

function RetailersEthereumService ($q, $timeout) {

    var self = this;
    self.abi = retailers.abi;
    self.contractAddress = retailers.address;

    self.dappId = 'insurechain.retailers'

    self.web3 = web3
    self.contract = web3.eth.contract (self.abi).at (self.contractAddress)

    /**
     * in fact this creates the partner relation between the retailer and the insurance with a status 'Requested'
     * @param companyName
     * @param insurance
     * @returns {Function}
     */
    self.requestRegistration = function(companyName, insurance) {
        console.log ('requesting registration for ', companyName)
        var defer = $q.defer()

        self.contract.requestRegistration(companyName, insurance, function (err, result) {
            if(err) {
                defer.reject(err)
            } else {
                defer.resolve(result)
            }
        })

        return defer.promise;
    }

    self.getRgistrationStatus = function (insurance) {
        var defer = $q.defer ();
        $timeout(function(){
            if(insurance === "0xc62e02ddc6c1a78ca63f144253e74c85ecb76b74"){
                defer.resolve(1)
            } else if(insurance === "0x607aae63a7d99e0207214248b9f663e55b465766"){
                defer.resolve(0)
            } else {
                defer.resolve(2)
            }
        }, 500)
        return defer.promise;
    }

    /**
     * set the status for a request. this function must be called by the insurance as the msg.sender is used to get the partnerRelation
     * @param retailer the address of the retailer who requested registration
     * @param status the status is a number with this meaning 0 = requested, 1 = Accepted, 2 = Rejected, 3 = Terminated
     * @returns {Function}
     */
    self.setRequestState = function(retailer, status) {
        var defer = $q.defer()

        self.contract.setRequestState(retailer, status, function (err, result) {
            if(err) {
                defer.reject(err)
            } else {
                defer.resolve(result)
            }
        })

        return defer.promise
    }

    self.getInsuranceId = function() {
        return $q.when(insauranceList)
    }

    self.getRetailerList = function () {
        return $q.when(retailerList)
    }

    return self
}

export default ['$q', '$timeout', RetailersEthereumService]
