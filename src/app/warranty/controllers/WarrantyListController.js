function WarrantyListController($scope, $state, $stateParams, EthereumWarrantyService) {
    $scope.products = null;

    EthereumWarrantyService
        .getAllProducts()
        .then(function (products) {
            $scope.products = products;
        })
        .catch(logError);

    $scope.goToProduct = function (product) {
        $state.go('app.warranty.details', {id: product.serial});
    };

    function logError(err) {
        console.log(err);
    }
}
export default ['$scope','$state', '$stateParams', 'EthereumWarrantyService', WarrantyListController]