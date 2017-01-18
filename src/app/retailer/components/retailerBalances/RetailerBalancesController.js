function RetailerBalanceController(
    $scope,
    $rootScope,
    $element,
    TransactionService,
    EthereumBalancesService
) {
    TransactionService.showWidgetLoader($element, $scope);
    EthereumBalancesService
        .getFullRetailerBalances($rootScope.user)
        .then(function (balances) {
            TransactionService.hideWidgetLoader($element);
            $scope.balances = balances;
        })
        .catch(function (err) {
            console.log(err);
        })
}
export default ['$scope', '$rootScope', '$element', 'TransactionService', 'EthereumBalancesService', RetailerBalanceController]
