function RetailerCreateController(RetailersEthereumService, $scope) {
    $scope.title = 'hello, this is retailer creation page!'
    $scope.company = {
        companyName: '',
        selectedInsurance: '',
        insurances: []
    }

    RetailersEthereumService
        .getInsuranceId()
        .then(function(insurances) {
            $scope.company.insurances = insurances
        })

    $scope.sendRequest = function(company) {
        RetailersEthereumService
            .requestRegistration(company.companyName, company.selectedInsurance)
    }
}
export default ['RetailersEthereumService', '$scope', RetailerCreateController]
