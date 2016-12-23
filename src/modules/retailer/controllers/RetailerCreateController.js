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
        .catch(function (err) {
            $scope.showToast(err)
        });

    $scope.sendRequest = function(company) {
        RetailersEthereumService
            .requestRegistration(company.companyName, company.selectedInsurance)
            .then(function (result) {
                $scope.showToast(result)
            })
            .catch(function (err) {
                $scope.showToast(err)
            })
    }
}
export default ['RetailersEthereumService', '$scope', RetailerCreateController]
