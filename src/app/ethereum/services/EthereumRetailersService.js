
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

    this.getRetailerList = function(insuranceAddress) {
        return EthereumHelperService.toPromise(contract.retailerCount).then((count) => {
            const promises = [];
            for(let i = 0; i < count.toNumber(); i++) {
                promises.push(EthereumHelperService.toPromise(contract.getRetailer, i, insuranceAddress));
            }
            return $q.all(promises);
        }).then((retailers) => {
            return retailers.map((retailer) => {
                return {
                    address: retailer[0],
                    name: retailer[1],
                    status: retailer[2].toNumber(),
                    insuranceStatus: retailer[3].toNumber()
                };
            })
        });
    };


    return this;
}

export default ['$q','EthereumInsuranceService', 'EthereumHelperService', EthereumRetailersService]
