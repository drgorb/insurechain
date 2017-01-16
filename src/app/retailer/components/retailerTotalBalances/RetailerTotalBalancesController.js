function RetailerTotalBalanceController(
    $scope,
    $rootScope,
    $element,
    TransactionService,
    EthereumBalancesService
) {
    TransactionService.showWidgetLoader($element, $scope);
    EthereumBalancesService
        .getRetailerTotalBalances($rootScope.user)
        .then(function (balances) {
            TransactionService.hideWidgetLoader($element);
            $scope.balances = balances;
            $scope.total = balances[0]-balances[1]-balances[2];
        })
        .catch(function (err) {
            console.log(err);
        })
}
export default [
    '$scope',
    '$rootScope',
    '$element',
    'TransactionService',
    'EthereumBalancesService',
    RetailerTotalBalanceController
]
