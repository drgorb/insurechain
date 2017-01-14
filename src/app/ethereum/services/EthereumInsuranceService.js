import _ from 'underscore';

function EthereumInsuranceService (EthereumHelperService, $q) {
    const contract = EthereumHelperService.insuranceManager;

    function mapInsurance(insurance) {
        return {
            name: insurance[0],
            address: insurance[1],
            status: insurance[2].toNumber(),
            statusName: EthereumHelperService.getStatusName(insurance[2].toNumber()),
        };
    }

    this.getInsurancesList = function() {
        return EthereumHelperService.toPromise(contract.insuranceCount).then((count) => {
            const promises = [];
            for(let i = 0; i < count.toNumber(); i++) {
                promises.push(EthereumHelperService.toPromise(contract.getInsurance, i));
            }
            return $q.all(promises);
        }).then((insurances) => insurances.map(mapInsurance));
    };

    this.getInsurance = function(insuranceAddress) {
        return EthereumHelperService.toPromise(contract.getInsuranceByAddress, insuranceAddress).then(mapInsurance);
    };

    this.getRegisteredInsurances = () => {
        return this.getInsurancesList()
            .then(function (insurances) {
                return _.where(insurances, {'status': 2});
            })
    };

    this.regsiterInsurance = (name) => EthereumHelperService.toPromise(contract.createInsurance, name);

    this.setRequestStatus = (address, state) => EthereumHelperService.toPromise(contract.setInsuranceState, address, state);

    return this;
}

export default ['EthereumHelperService', '$q', EthereumInsuranceService]
