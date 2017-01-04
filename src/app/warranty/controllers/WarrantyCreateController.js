function WarrantyCreateController($scope, EthereumWarrantyService) {
    $scope.warrantyCreate = {
        insurance: null,
        productManufacturer: null,
        productName: null,
        productSerialNumber: null,
        price: null,
        startDate: new Date(),
        endDate: new Date(),
        insurances: null,
    };

    EthereumWarrantyService
        .getRegisteredInsurances()
        .then(function (insurances) {
            $scope.warrantyCreate.insurances = insurances;
        })
        .catch(logError);

    $scope.createWarranty = function (warranty) {
        console.log(warranty)
    };

    function logError(err) {
        console.log(err);
    }
}
export default ['$scope', 'EthereumWarrantyService', WarrantyCreateController]