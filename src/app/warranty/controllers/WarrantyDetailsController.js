function WarrantyDetailsController($scope, $stateParams, EthereumWarrantyService) {

    $scope.product = null;

    EthereumWarrantyService
        .getWarranty($stateParams.id)
        .then(function (product) {
            console.dir(product);
            console.log(product.toString());
            $scope.product = product;
        })
        .catch(logError);

    $scope.warranty = {
        status: true,
        startDate: new Date(),
        endDate: new Date()
    };

    function logError(err) {
        console.log(err);
    }
}
export default ['$scope', '$stateParams', 'EthereumWarrantyService', WarrantyDetailsController]
