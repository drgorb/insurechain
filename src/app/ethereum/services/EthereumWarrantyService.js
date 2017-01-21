import {productList} from "../../warranty/mock/mockData";
import _ from "underscore";

function EthereumWarrantyService (EthereumHelperService, EthereumInsuranceService, EthereumRetailersService, $q) {
    const insureChain = EthereumHelperService.insurechain;

    let self = this;

    function getWarrantyStatus(statusIdx) {
        if(!statusIdx){
            return 'Undefined';
        }
        switch(statusIdx) {
            case 1: return 'Created';
            case 2: return 'Confirmed';
            case 3: return 'Canceled;';
            default: return 'Undefined';
        }
    }

    function getDetailedInfo(warranty, index) {
        const productInfo = getProductInfo(warranty[6]);
        return Object.assign({}, {
            retailer: warranty[0],
            insurance: warranty[1],
            startDate: warranty[2].toNumber() * 1000,
            endDate: warranty[3].toNumber() * 1000,
            status: getWarrantyStatus(warranty[4].toNumber()),
            statusIndex: warranty[4].toNumber(),
            policyNumber: warranty[5],
            productId: warranty[6],
            serial: warranty[7],
            warrantyPrice: warranty[8].toNumber(),
            claimCount: warranty[9].toNumber(),
            index
        }, {productInfo});
    }

    function getProductInfo(ean) {
        return productList.find(value => value.ean === ean);
    }

    this.getRetailerList = (insurance) => EthereumRetailersService.getRetailerList(insurance);

    this.getAllWarranty = () => {
        return EthereumHelperService.toPromise(insureChain.warrantyCount).then((count) => {
            const promises = [];
            for(let i = 0; i < count.toNumber(); i++) {
                promises.push(self.getWarranty(i));
            }
            return $q.all(promises);
        }).then(warranties => warranties
            .filter(warranty => warranty.statusIndex === 1 || warranty.statusIndex === 2));
    };

    this.getWarranty = (index) => {
        return EthereumHelperService.toPromise(insureChain.getWarrantyByIndex, index)
            .then(warranty => {
                return getDetailedInfo(warranty, index)
            });
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
            .toPromise(insureChain.createWarranty,
                warranty.productId,
                warranty.productSerialNumber,
                warranty.insurance,
                parseInt(warranty.startDate.getTime() / 1000),
                parseInt(warranty.endDate.getTime() / 1000),
                warranty.price
            );
    };

    this.cancelWarranty = (productId, serialNumber, insuranceAddress) => {
        console.log('canceling warranty ' + productId + ":" + serialNumber);
        return EthereumHelperService.toPromise(insureChain.cancelWarranty, productId, serialNumber, insuranceAddress);
    };

    this.createClaim = (productId, serialNumber, insurance, amount, description) => EthereumHelperService.toPromise(insureChain.createClaim, productId, serialNumber, insurance, amount, description);

    return this;
}

export default ['EthereumHelperService', 'EthereumInsuranceService', 'EthereumRetailersService', '$q', EthereumWarrantyService]
