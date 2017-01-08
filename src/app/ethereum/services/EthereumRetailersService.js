import {retailerList} from '../../shared/mock/mockData';

function EthereumRetailersService ($q, EthereumInsuranceService, EthereumHelperService) {
    const contract = EthereumHelperService.retailerManager;
    /**
     * in fact this creates the partner relation between the retailer and the insurance with a status 'Requested'
     * @param companyName
     * @param insurance
     * @returns {Function}
     */
    this.requestRegistration = (companyName, insurance) => {
        console.log ('requesting registration for ', companyName);
        return EthereumHelperService.toPromise(contract.requestRegistration, companyName, insurance);
    };

    /**
     * set the status for a request. this function must be called by the insurance as the msg.sender is used to get the partnerRelation
     * @param retailer the address of the retailer who requested registration
     * @param status the status is a number with this meaning 0 = requested, 1 = Accepted, 2 = Rejected, 3 = Terminated
     * @returns {Function}
     */
    this.setRequestStatus = (retailer, status) => EthereumHelperService.toPromise(contract.setRequestState, retailer, status);

    this.getInsuranceId = () => EthereumInsuranceService.getInsurancesList();

    this.getRetailerList = (address) => {
        return $q.when(retailerList);
    };


    return this;
}

export default ['$q','EthereumInsuranceService', 'EthereumHelperService', EthereumRetailersService]
