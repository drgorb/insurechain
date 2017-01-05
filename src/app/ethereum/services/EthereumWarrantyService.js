import {retailerList} from '../../shared/mock/mockData';
import {products} from '../../warranty/mock/mockData'
import _ from 'underscore';

function EthereumWarrantyService (EthereumHelperService, EthereumInsuranceService, $q) {
    const insurechainContract = EthereumHelperService.insurechain;

    this.getRetailerList = (insurance) => $q.when(retailerList);
    this.getAllProducts = () => $q.when(products);
    this.getProduct = (serial) => {
        let elem = _.findWhere(products, {'serial': serial});
        const defer = $q.defer ();
        if(elem) {
            defer.resolve(elem);
        } else {
            defer.reject(err);
        }
        return defer.promise;
    };
    this.getRegisteredInsurances = () => {
        return EthereumInsuranceService
            .getInsurancesList()
            .then(function (insurances) {
                return _.where(insurances, {'status': 2});
            })
    };
    this.createWarranty = (warranty) => {
        return EthereumHelperService
            .toPromise(insurechainContract.createWarranty,
                warranty.productId,
                warranty.productSerialNumber,
                warranty.insurance,
                warranty.startDate.getTime(),
                warranty.endDate.getTime(),
                warranty.price
            );
    };

    return this;
}

export default ['EthereumHelperService', 'EthereumInsuranceService', '$q', EthereumWarrantyService]

