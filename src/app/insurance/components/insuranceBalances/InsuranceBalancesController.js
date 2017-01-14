function RetailerBalanceController(
    $scope,
    $rootScope,
    EthereumBalancesService,
    TransactionService
) {

    $scope.balances = null;
    $scope.payment = null;

    EthereumBalancesService
        .getFullInsuranceBalances($rootScope.user)
        .then(function (balances) {
            $scope.balances = balances;
        })
        .catch(err);

    $scope.sendRequest = function(amount, balance) {
        TransactionService
            .startTransaction();

        EthereumBalancesService
            .increasePaymentsBalance(balance.address, $rootScope.user, amount)
            .then((info) => TransactionService.finishTransaction(info))
            .catch((err) => TransactionService.finishTransaction(err))
    };

    function err(err) {
        console.log(err);
    }
}
export default ['$scope', '$rootScope', 'EthereumBalancesService', 'TransactionService', RetailerBalanceController]
