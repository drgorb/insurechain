import {products, retailers, manufacturers, productTypes} from '../mock/mockData';
function WarrantyController($scope) {
    $scope.retailer = null;
    $scope.manufacturer = null;
    $scope.productType = null;

    $scope.retailers = retailers;
    $scope.manufacturers = manufacturers;
    $scope.productTypes = productTypes;
    $scope.products = products;

    $scope.goToProduct = function (product) {

    }

}
export default ['$scope', WarrantyController]