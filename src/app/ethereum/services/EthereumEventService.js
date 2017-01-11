function EthereumEventService ($q, EthereumHelperService, EthereumInsuranceService, EthereumRetailersService) {
    const insuranceManager = EthereumHelperService.insuranceManager;
    const retailerManager = EthereumHelperService.retailerManager;

    const self = this;

    this.insuranceStatusChanged = () => {
        let insuranceStatusChangedEvt = insuranceManager.InsuranceStatusChanged();
        insuranceStatusChangedEvt.watch(function(error, result){
            if (!error)
                console.log(result);
        });
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

    this.getAllEvents = () => {
        let retailerManagerAll = retailerManager.allEvents();
        let insuranceManagerAll = insuranceManager.allEvents();

        retailerManagerAll.watch(function(error, event){
            if (!error)
                console.log(event);
        });

        retailerManagerAll.get(function(error, event){
            if (!error)
                console.log(event, 'retailerManagerAll');
        });

        insuranceManagerAll.watch(function(error, event){
            if (!error)
                console.log(event);
        });

        insuranceManagerAll.get(function(error, event){
            if (!error)
                console.log(event, 'insuranceManagerAll');
        });
    };

    return this;
}

export default ['$q', 'EthereumHelperService', 'EthereumInsuranceService', 'EthereumRetailersService', EthereumEventService]
