import _ from 'underscore';

function EthereumBalancesService ($q, EthereumHelperService, EthereumInsuranceService, EthereumRetailersService) {
    const insuranceManager = EthereumHelperService.insuranceManager;
    const retailerManager = EthereumHelperService.retailerManager;

    const self = this;

    function returnBalances(balances, data) {
        return balances.map(function (balance, index) {
            return {
                name: data[index].name,
                address: data[index].address,
                balance,
                total: balance[0]-balance[1]-balance[2]
            }
        })
    }

    this.getRetailerBalances = (retailerAddress, insuranceAddress) => EthereumHelperService.toPromise(retailerManager.getRetailerBalances, retailerAddress, insuranceAddress);

    this.getFullRetailerBalances = retailerAddress => {
        let promises = [];
        let insurancesArr = [];
        return EthereumInsuranceService
            .getRegisteredInsurances()
            .then(function (insurances) {
                insurancesArr = insurances;
                insurances.forEach(elem => {
                    promises.push(self.getRetailerBalances(retailerAddress, elem.address));
                });
                return $q.all(promises);
            })
            .then(balances => {
                return returnBalances(balances, insurancesArr);
            });
    };

    this.getFullInsuranceBalances = (insuranceAddress) => {
        let promises = [];
        let retailerArr = [];
        return EthereumRetailersService
            .getRetailerList(insuranceAddress)
            .then(function (retailer) {
                retailerArr = retailer;
                retailer.forEach(elem => {
                    promises.push(self.getRetailerBalances(elem.address, insuranceAddress));
                });
                return $q.all(promises);
            })
            .then(balances => {
                return returnBalances(balances, retailerArr);
            });
    };

    this.getRetailerTotalBalances = (retailerAddress) => EthereumHelperService.toPromise(retailerManager.getRetailerTotalBalances, retailerAddress);

    this.getInsuranceTotalBalance = (insuranceAddress) =>  EthereumHelperService.toPromise(insuranceManager.getInsuranceBalance, insuranceAddress);

    this.increasePaymentsBalance = (retailerAddress, insuranceAddress, amount) =>  EthereumHelperService.toPromise(retailerManager.increasePaymentsBalance, retailerAddress, insuranceAddress, amount);

    return this;
}

export default ['$q', 'EthereumHelperService', 'EthereumInsuranceService', 'EthereumRetailersService', EthereumBalancesService]
