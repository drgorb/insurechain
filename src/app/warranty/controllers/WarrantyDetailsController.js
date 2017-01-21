function WarrantyDetailsController(
    $scope,
    $rootScope,
    $stateParams,
    $q,
    TransactionService,
    EthereumWarrantyService,
    NameService
) {
    TransactionService.startTransaction();
    $scope.showRetailerPart = ($rootScope.userRole === 1);
    $scope.claim = {
        amount: null,
        description: ''
    };
    $scope.showAddresses = false;

    EthereumWarrantyService
        .getWarranty($stateParams.id)
        .then(function (warranty) {
            $scope.warranty = warranty;
            $scope.allowCancelWarranty = ($rootScope.user === warranty.retailer && warranty.claimCount === 0);
            return $q.when(NameService.getUserEntity(1, warranty.retailer));
        })
        .then(entity => {
            $scope.warranty.retailerEntity = entity;
            return $q.when(NameService.getUserEntity(2,  $scope.warranty.insurance));
        })
        .then(entity => {
            $scope.warranty.insuranceEntity = entity;
            TransactionService.finishTransaction();
        })
        .catch(function(err) {
            TransactionService.finishTransaction(null, null, err);
        });

    $scope.createClaim = (warranty, claim) => {
        TransactionService.startTransaction();
        EthereumWarrantyService
            .createClaim(warranty.productInfo.ean, warranty.serial, warranty.insurance, claim.amount, claim.description)
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
    '$q',
    'TransactionService',
    'EthereumWarrantyService',
    'NameService',
    WarrantyDetailsController
]
