import {retailerList} from '../../shared/mock/mockData';
import {products} from '../../warranty/mock/mockData'
import _ from 'underscore';

function EthereumWarrantyService (EthereumHelperService, $q) {
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

    return this;
}

export default ['EthereumHelperService', '$q', EthereumWarrantyService]

