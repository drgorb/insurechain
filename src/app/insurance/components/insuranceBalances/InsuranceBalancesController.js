function RetailerBalanceController(
    $scope,
    $rootScope,
    EthereumBalancesService,
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
        EthereumBalancesService
            .increasePaymentsBalance(balance.address, $rootScope.user, amount)
            .then(function (info) {
                console.log(info)
            })
            .catch(err);
    };

    function err(err) {
        console.log(err);
    }
}
export default ['$scope', '$rootScope', 'EthereumBalancesService', RetailerBalanceController]
