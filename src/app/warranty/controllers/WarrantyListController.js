function WarrantyListController($scope, $state, TransactionService, EthereumWarrantyService) {
    TransactionService.startTransaction();
    $scope.productSearch = '';
    EthereumWarrantyService
        .getAllWarranty()
        .then(function (products) {
            $scope.products = products;
            TransactionService.finishTransaction();
        })
        .catch(function(err) {
            TransactionService.finishTransaction(null, null, err);
        });

    $scope.goToProduct = function (product) {
        $state.go('app.warranty.details', {id: product.index});
    };
}
export default ['$scope','$state', 'TransactionService', 'EthereumWarrantyService', WarrantyListController]