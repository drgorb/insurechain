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
        .catch(function (err) {
            console.log(err);
        })

    $scope.sendRequest = function(payment, balance) {
        console.log(payment, balance.address);
    }
}
export default ['$scope', '$rootScope', 'EthereumBalancesService', RetailerBalanceController]
