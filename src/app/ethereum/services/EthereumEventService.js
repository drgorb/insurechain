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

    return this;
}

export default ['$q', 'EthereumHelperService', 'EthereumInsuranceService', 'EthereumRetailersService', EthereumEventService]