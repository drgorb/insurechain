function WarrantyCreateController($scope, TransactionService, EthereumWarrantyService) {
    $scope.warrantyCreate = {
        insurance: null,
        productManufacturer: null,
        productName: null,
        productSerialNumber: null,
        productId: null,
        price: null,
        startDate: new Date(),
        endDate: new Date(),
        insurances: null,
    };

    EthereumWarrantyService
        .getRegisteredInsurances()
        .then(insurances => {
            $scope.warrantyCreate.insurances = insurances
        })
        .catch(err => {
            console.log(err)
        });

    $scope.createWarranty = function (warranty) {
        TransactionService.startTransaction();
        EthereumWarrantyService
            .createWarranty(warranty)
            .then(info => TransactionService.finishTransaction(info))
            .catch(err => TransactionService.finishTransaction(err))
    };
}
export default ['$scope', 'TransactionService', 'EthereumWarrantyService', WarrantyCreateController]