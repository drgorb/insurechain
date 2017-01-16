function WarrantyDetailsController($scope, $stateParams, EthereumWarrantyService) {

    $scope.product = null;

    EthereumWarrantyService
        .getWarranty($stateParams.id)
        .then(function (warranty) {
            $scope.warranty = warranty;
        })
        .catch(logError);


    function logError(err) {
        console.log(err);
    }
}
export default ['$scope', '$stateParams', 'EthereumWarrantyService', WarrantyDetailsController]
