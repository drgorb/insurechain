function RetailerAcceptedController(
    $scope,
    $rootScope,
    EthereumRetailersService,
    TransactionService
) {
    TransactionService.startTransaction();
    EthereumRetailersService
        .getRetailerList($rootScope.user)
        .then(function (retailers) {
            TransactionService.finishTransaction(retailers);
            $scope.retailers = retailers;
        })
}
export default ['$scope', '$rootScope', 'EthereumRetailersService','TransactionService', RetailerAcceptedController]

