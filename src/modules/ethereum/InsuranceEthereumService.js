import {retailerList} from "./mock-data";

function InsuranceEthereumService (EthereumHelperService, $q) {
    const insurechainContract = EthereumHelperService.insurechain;
    this.getInsurancesList = () => EthereumHelperService.toPromise(insurechainContract.insuranceCount).then((count) => {
        const promises = [];
        for(let i = 0; i < count; i++) {
            promises.push(EthereumHelperService.toPromise(insurechainContract.getInsurance, i));
        }
        return $q.all(promises);
    });
    this.getRetailerList = (insurance) => $q.when (retailerList);
    this.regsiterInsurance = (name) => EthereumHelperService.toPromise(insurechainContract.createInsurance, name);
    this.setRequestStatus = (address, state) => EthereumHelperService.toPromise(insurechainContract.setInsuranceState, address, state);
    return this;
}

export default ['EthereumHelperService', '$q', InsuranceEthereumService]

