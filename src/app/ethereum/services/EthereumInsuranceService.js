import {retailerList} from '../../shared/mock/mockData';

function EthereumInsuranceService (EthereumHelperService, $q) {
    const contract = EthereumHelperService.insuranceManager;

    this.getInsurancesList = function() {
        return EthereumHelperService.toPromise(contract.insuranceCount).then((count) => {
            const promises = [];
            for(let i = 0; i < count.toNumber(); i++) {
                promises.push(EthereumHelperService.toPromise(contract.getInsurance, i));
            }
            return $q.all(promises);
        }).then((insurances) => {
            return insurances.map((insurance) => {
                return {
                    name: insurance[0],
                    address: insurance[1],
                    status: insurance[2].toNumber()
                };
            })
        });
    };

    this.getRetailerList = (insurance) => $q.when (retailerList);
    this.regsiterInsurance = (name) => EthereumHelperService.toPromise(contract.createInsurance, name);
    this.setRequestStatus = (address, state) => EthereumHelperService.toPromise(contract.setInsuranceState, address, state);
    return this;
}

export default ['EthereumHelperService', '$q', EthereumInsuranceService]

