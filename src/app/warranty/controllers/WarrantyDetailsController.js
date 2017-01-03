import {products, retailers, manufacturers, productTypes} from '../mock/mockData';
function WarrantyDetailsController($scope) {
    $scope.product = products[0];

    $scope.warranty = {
        status: true,
        startDate: new Date(),
        endDate: new Date()
    }
}
export default ['$scope', WarrantyDetailsController]