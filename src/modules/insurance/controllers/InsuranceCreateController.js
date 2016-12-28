function InsuranceCreateController(InsuranceEthereumService, $scope) {
    $scope.insurance = {
        insuranceId: '',
        insuranceAddress: '',
        insuranceName: ''
    }

    $scope.sendRequest = function(insurance) {
        InsuranceEthereumService
            .regsiterInsurance(insurance.insuranceName)
            .then(function (result) {
                $scope.showToast(result)
            })
            .catch(function (err) {
                $scope.showToast(err)
            })
    }
}
export default ['InsuranceEthereumService', '$scope', InsuranceCreateController]
