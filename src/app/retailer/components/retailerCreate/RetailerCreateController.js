function RetailerCreateController($scope, EthereumRetailersService, TransactionService) {
    $scope.company = {
        companyName: '',
        selectedInsurance: '',
        insurances: []
    };

    EthereumRetailersService
        .getInsuranceId()
        .then(insurances => {
            $scope.company.insurances = insurances
        })
        .catch(err => {
            console.log(err)
        });

    $scope.sendRequest = function(company) {
        TransactionService.startTransaction();
        EthereumRetailersService
            .requestRegistration(company.companyName, company.selectedInsurance)
            .then(info => TransactionService.finishTransaction(info))
            .catch(err => TransactionService.finishTransaction(err))
    }
}
export default ['$scope', 'EthereumRetailersService', 'TransactionService', RetailerCreateController]
