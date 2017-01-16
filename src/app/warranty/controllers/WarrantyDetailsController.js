function WarrantyDetailsController($scope, $stateParams,TransactionService, EthereumWarrantyService) {
    TransactionService.startTransaction();
    EthereumWarrantyService
        .getWarranty($stateParams.id)
        .then(function (warranty) {
            $scope.warranty = warranty;
            TransactionService.finishTransaction();
        })
        .catch(function(err) {
            TransactionService.finishTransaction(null, null, err);
        });
}
export default ['$scope', '$stateParams', 'TransactionService', 'EthereumWarrantyService', WarrantyDetailsController]
