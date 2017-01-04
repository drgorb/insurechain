function WarrantyController($scope, $state, EthereumRetailersService) {
    $scope.retailer = null;

    $scope.retailers = null;
    $scope.products = null;

    EthereumRetailersService
        .getRetailerList()
            .then(function (retailers) {
                $scope.retailers = retailers;
            })
            .catch(logError);

    $scope.showManufacturer = function (address) {
        $state.go('app.warranty.list', {retailer: address});
    };

    function logError(err) {
        console.log(err);
    }
}
export default ['$scope','$state' , 'EthereumRetailersService', WarrantyController]