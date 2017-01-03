import {retailerList} from '../../shared/mock/mockData';

function EthereumInsuranceService (EthereumHelperService, $q) {
    const insurechainContract = EthereumHelperService.insurechain;
    this.getInsurancesList = () => EthereumHelperService.toPromise(insurechainContract.insuranceCount).then((count) => {
        console.log(count.toNumber());
        const promises = [];
        for(let i = 0; i < count.toNumber(); i++) {
            promises.push(EthereumHelperService.toPromise(insurechainContract.getInsurance, i));
        }
        return $q.all(promises);
    });
    this.getRetailerList = (insurance) => $q.when (retailerList);
    this.regsiterInsurance = (name) => EthereumHelperService.toPromise(insurechainContract.createInsurance, name);
    this.setRequestStatus = (address, state) => EthereumHelperService.toPromise(insurechainContract.setInsuranceState, address, state);
    return this;
}

export default ['EthereumHelperService', '$q', EthereumInsuranceService]

