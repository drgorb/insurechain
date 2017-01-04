import {products, retailers, manufacturers, productTypes} from '../mock/mockData';
function WarrantyDetailsController($scope, $stateParams, EthereumWarrantyService) {

    $scope.product = null;

    EthereumWarrantyService
        .getProduct($stateParams.id)
        .then(function (product) {
            $scope.product = product;
        })
        .catch(logError);

    $scope.warranty = {
        status: true,
        startDate: new Date(),
        endDate: new Date()
    };

    function logError(err) {
        console.log(err);
    }
}
export default ['$scope', '$stateParams', 'EthereumWarrantyService', WarrantyDetailsController]