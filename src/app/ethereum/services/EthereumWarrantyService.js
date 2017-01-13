import {productList} from '../../warranty/mock/mockData'
import _ from 'underscore';

function EthereumWarrantyService (EthereumHelperService, EthereumInsuranceService, EthereumRetailersService, $q, $http) {
    const insureChain = EthereumHelperService.insurechain;

    function getDetailedInfo(ean) {
        
    }

    this.getRetailerList = (insurance) => EthereumRetailersService.getRetailerList(insurance);

    this.getAllWarranty = () => {
        return EthereumHelperService.toPromise(insureChain.warrantyCount).then((count) => {
            const promises = [];
            for(let i = 0; i < count.toNumber(); i++) {
                promises.push(EthereumHelperService.toPromise(insureChain.getWarrantyByIndex, i));
            }
            return $q.all(promises);
        }).then(warranties => {
            return warranties
        });
    };

    this.getWarranty = (index) => EthereumHelperService.toPromise(insureChain.getWarrantyByIndex, index);
    
    this.getRegisteredInsurances = () => {
        return EthereumInsuranceService
            .getInsurancesList()
            .then(function (insurances) {
                return _.where(insurances, {'status': 2});
            })
    };

    this.createWarranty = (warranty) => {
        return EthereumHelperService
            .toPromise(insureChain.createWarranty,
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

export default ['EthereumHelperService', 'EthereumInsuranceService', 'EthereumRetailersService', '$q', '$http', EthereumWarrantyService]

