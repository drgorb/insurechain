/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
import {insuranceList, retailerList} from "./mock-data";

function RetailersEthereumService ($q, $timeout, EthereumHelperService) {
    const insurechainContract = EthereumHelperService.insurechain;
    const toPromise = EthereumHelperService.toPromise;
    /**
     * in fact this creates the partner relation between the retailer and the insurance with a status 'Requested'
     * @param companyName
     * @param insurance
     * @returns {Function}
     */
    this.requestRegistration = (companyName, insurance) => {
        console.log ('requesting registration for ', companyName);
        return toPromise(insurechainContract.requestRegistration, companyName, insurance);
    };

    this.getRegistrationStatus = (insurance) => {
        const defer = $q.defer ();
        $timeout(function(){
            if(insurance === "0xc62e02ddc6c1a78ca63f144253e74c85ecb76b74"){
                defer.resolve(1)
            } else if(insurance === "0x607aae63a7d99e0207214248b9f663e55b465766"){
                defer.resolve(0)
            } else {
                defer.resolve(2)
            }
        }, 500);
        return defer.promise;
    };

    /**
     * set the status for a request. this function must be called by the insurance as the msg.sender is used to get the partnerRelation
     * @param retailer the address of the retailer who requested registration
     * @param status the status is a number with this meaning 0 = requested, 1 = Accepted, 2 = Rejected, 3 = Terminated
     * @returns {Function}
     */
    this.setRequestStatus = (retailer, status) => EthereumHelperService.toPromise(insurechainContract.setRequestState, retailer, status);

    this.getInsuranceId = () => $q.when(insuranceList);

    this.getRetailerList = (address) => {
        if(address == '0xc62e02ddc6c1a78ca63f144253e74c85ecb76b74') {
            return $q.when(retailerList)
        } else {
            return $q.when([]);
        }
    };

    return this;
}

export default ['$q', '$timeout', 'EthereumHelperService', RetailersEthereumService]
