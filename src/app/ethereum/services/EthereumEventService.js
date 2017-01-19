function EthereumEventService ($q, EthereumHelperService, EthereumInsuranceService, EthereumRetailersService) {
    const insuranceManager = EthereumHelperService.insuranceManager;
    const retailerManager = EthereumHelperService.retailerManager;

    const self = this;

    const insuranceStatusChangedEvt = insuranceManager.InsuranceStatusChanged({}, { fromBlock: 0, toBlock: 'latest' });

    this.watchInsuranceStatusChanged = (fn) => {
        insuranceStatusChangedEvt.watch(fn);
    };

    this.getInsuranceStatusChanged = () => {
        let defer = $q.defer();
        insuranceStatusChangedEvt.get(function(error, result){
            if (!error) {
                defer.resolve(result);
            } else {
                defer.reject(err);
            }
        });
        return defer.promise;
    };

    this.retailerStatusChanged = () => {
        let retailerStatusChangedEvt = retailerManager.RetailerStatusChanged();
        retailerStatusChangedEvt.watch(function(error, result){
            if (!error)
                console.log(result);
        });
    };

    this.retailerRequest = () => {
        let retailerRequestEvt = retailerManager.RetailerRequest();
        retailerRequestEvt.watch(function(error, result){
            if (!error)
                console.log(result);
        });
    };

    return this;
}

export default ['$q', 'EthereumHelperService', 'EthereumInsuranceService', 'EthereumRetailersService', EthereumEventService]