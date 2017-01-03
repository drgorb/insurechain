import {products, retailers, manufacturers, productTypes} from '../mock/mockData';
function WarrantyController($scope, $state) {
    $scope.retailer = null;
    $scope.manufacturer = null;
    $scope.productType = null;

    $scope.retailers = retailers;
    $scope.manufacturers = manufacturers;
    $scope.productTypes = productTypes;
    $scope.products = products;

    $scope.goToProduct = function (product) {
        $state.go('app.warranty.details', {id:1});
    }

}
export default ['$scope','$state', WarrantyController]