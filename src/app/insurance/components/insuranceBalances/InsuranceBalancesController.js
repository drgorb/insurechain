function RetailerBalanceController(
    $scope,
    $rootScope,
    $element,
    EthereumBalancesService,
    TransactionService
) {
    TransactionService.showWidgetLoader($element, $scope);

    $scope.balances = null;
    $scope.payment = null;

    EthereumBalancesService
        .getFullInsuranceBalances($rootScope.user)
        .then(function (balances) {
            TransactionService.hideWidgetLoader($element);
            $scope.balances = balances;
        })
        .catch(err);

    $scope.sendRequest = function(amount, balance) {
        TransactionService
            .startTransaction();

        EthereumBalancesService
            .increasePaymentsBalance(balance.address, $rootScope.user, amount)
            .then((info) => TransactionService.finishTransaction(info, true))
            .catch((err) => TransactionService.finishTransaction(err))
    };

    function err(err) {
        console.log(err);
    }
}
export default ['$scope', '$rootScope', '$element', 'EthereumBalancesService', 'TransactionService', RetailerBalanceController]
