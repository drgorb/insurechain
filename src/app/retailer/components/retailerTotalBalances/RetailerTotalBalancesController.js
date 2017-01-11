function RetailerTotalBalanceController(
    $scope,
    $rootScope,
    EthereumRetailersService
) {

    EthereumRetailersService
        .getRetailerTotalBalances($rootScope.user)
        .then(function (balances) {
            $scope.balances = balances;
            $scope.total = balances[0]-balances[1]-balances[2];
        })
        .catch(function (err) {
            console.log(err);
        })
}
export default ['$scope', '$rootScope', 'EthereumRetailersService', RetailerTotalBalanceController]
