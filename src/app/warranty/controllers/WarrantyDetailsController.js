function WarrantyDetailsController(
    $scope,
    $rootScope,
    $stateParams,
    TransactionService,
    EthereumWarrantyService
) {
    TransactionService.startTransaction();
    $scope.showRetailerPart = ($rootScope.userRole === 1);
    $scope.claim = {
        amount: null,
        description: ''
    };
    EthereumWarrantyService
        .getWarranty($stateParams.id)
        .then(function (warranty) {
            $scope.warranty = warranty;
            $scope.allowCancelWarranty = ($rootScope.user === warranty.retailer);
            TransactionService.finishTransaction();
        })
        .catch(function(err) {
            TransactionService.finishTransaction(null, null, err);
        });

    $scope.createClaim = (warranty, claim) => {
        TransactionService.startTransaction();
        EthereumWarrantyService
            .cancelWarranty(warranty.productInfo.ean, warranty.serial, warranty.insurance, claim.amount, claim.description)
            .then((info) => TransactionService.finishTransaction(info, true))
            .catch((err) => TransactionService.finishTransaction(err))
    };

    $scope.cancelWarranty = (warranty) => {
        TransactionService.startTransaction();
        EthereumWarrantyService
            .cancelWarranty(warranty.productInfo.ean, warranty.serial, warranty.insurance)
            .then((info) => TransactionService.finishTransaction(info, true))
            .catch((err) => TransactionService.finishTransaction(err))
    };
}
export default [
    '$scope',
    '$rootScope',
    '$stateParams',
    'TransactionService',
    'EthereumWarrantyService',
    WarrantyDetailsController
]
