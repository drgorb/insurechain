function RetailerAcceptedController(
    $scope,
    $rootScope,
    EthereumRetailersService
) {
    EthereumRetailersService
        .getRetailerList($rootScope.user)
        .then(function (retailers) {
            console.log(retailers);
            $scope.retailers = retailers;
        })
}
export default ['$scope', '$rootScope', 'EthereumRetailersService', RetailerAcceptedController]

