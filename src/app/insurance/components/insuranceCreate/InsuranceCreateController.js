function InsuranceCreateController($scope, EthereumInsuranceService, TransactionService) {
    $scope.insurance = {
        insuranceId: '',
        insuranceAddress: '',
        insuranceName: ''
    };

    $scope.sendRequest = function(insurance) {
        TransactionService.startTransaction();
        EthereumInsuranceService
            .registerInsurance(insurance.insuranceName)
            .then(info => TransactionService.finishTransaction(info))
            .catch(err => TransactionService.finishTransaction(err))
    }
}
export default ['$scope', 'EthereumInsuranceService', 'TransactionService', InsuranceCreateController]
