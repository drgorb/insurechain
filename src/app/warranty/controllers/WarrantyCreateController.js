import {products, retailers, manufacturers, productTypes} from '../mock/mockData';
import {insuranceList} from '../../shared/mock/mockData'
function WarrantyCreateController($scope) {
    $scope.warrantyCreate = {
        insurance: null,
        productManufacturer: null,
        productName: null,
        productSerialNumber: null,
        price: null,
        startDate: new Date(),
        endDate: new Date(),
        insurances: insuranceList,
    }
}
export default ['$scope', WarrantyCreateController]