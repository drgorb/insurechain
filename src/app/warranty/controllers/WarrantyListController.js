function WarrantyListController($scope, $state, $stateParams, EthereumWarrantyService) {
    $scope.products = null;

    EthereumWarrantyService
        .getAllWarranty()
        .then(function (products) {
            console.log(products);
            $scope.products = products;
        })
        .catch(logError);

    $scope.goToProduct = function (product) {
        $state.go('app.warranty.details', {id: 1});
    };

    function logError(err) {
        console.log(err);
    }
}
export default ['$scope','$state', '$stateParams', 'EthereumWarrantyService', WarrantyListController]