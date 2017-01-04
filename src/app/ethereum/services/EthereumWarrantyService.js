import {retailerList} from '../../shared/mock/mockData';
import {products} from '../../warranty/mock/mockData'
import _ from 'underscore';

function EthereumWarrantyService (EthereumHelperService, EthereumInsuranceService, $q) {
    const insurechainContract = EthereumHelperService.insurechain;

    this.getRetailerList = (insurance) => $q.when(retailerList);
    this.getAllProducts = (retailer) => $q.when(products);
    this.getProduct = (product) => {
        let elem = _.findWhere(products, {'serial': product});
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
        console.log(warranty);
    };

    return this;
}

export default ['EthereumHelperService', 'EthereumInsuranceService', '$q', EthereumWarrantyService]

