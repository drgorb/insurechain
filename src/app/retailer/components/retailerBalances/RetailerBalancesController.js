function RetailerBalanceController(
    $scope,
    $rootScope,
    EthereumBalancesService
) {

    EthereumBalancesService
        .getFullRetailerBalances($rootScope.user)
        .then(function (balances) {
            $scope.balances = balances;
        })
        .catch(function (err) {
            console.log(err);
        })
}
export default ['$scope', '$rootScope', 'EthereumBalancesService', RetailerBalanceController]
