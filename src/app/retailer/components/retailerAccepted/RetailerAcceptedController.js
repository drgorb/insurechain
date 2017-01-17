function RetailerAcceptedController(
    $scope,
    $rootScope,
    $element,
    TransactionService,
    EthereumRetailersService
) {

    TransactionService.showWidgetLoader($element, $scope);
    EthereumRetailersService
        .getRetailerList($rootScope.user)
        .then(function (retailers) {
            TransactionService.hideWidgetLoader($element);
            $scope.retailers = retailers;
        })
}
export default [
    '$scope',
    '$rootScope',
    '$element',
    'TransactionService',
    'EthereumRetailersService',
    RetailerAcceptedController
]

