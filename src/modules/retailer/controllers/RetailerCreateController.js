function RetailerCreateController(EthereumRetailersService, $scope) {
    $scope.company = {
        companyName: '',
        selectedInsurance: '',
        insurances: []
    }

    EthereumRetailersService
        .getInsuranceId()
        .then(function(insurances) {
            $scope.company.insurances = insurances
        })
        .catch(function (err) {
            $scope.showToast(err)
        });

    $scope.sendRequest = function(company) {
        EthereumRetailersService
            .requestRegistration(company.companyName, company.selectedInsurance)
            .then(function (result) {
                $scope.showToast(result)
            })
            .catch(function (err) {
                $scope.showToast(err)
            })
    }
}
export default ['EthereumRetailersService', '$scope', RetailerCreateController]
