function RetailerBalanceController(
    $scope,
    $rootScope,
    EthereumRetailersService,
    EthereumInsuranceService
) {

    EthereumRetailersService
        .getFullRetailerBalances($rootScope.user)
        .then(function (balances) {
            $scope.balances = balances;
        })
        .catch(function (err) {
            console.log(err);
        })
}
export default ['$scope', '$rootScope', 'EthereumRetailersService', 'EthereumInsuranceService', RetailerBalanceController]
