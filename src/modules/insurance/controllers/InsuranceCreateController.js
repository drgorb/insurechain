function InsuranceCreateController(InsuranceEthereumService, $scope) {
    $scope.insurance = {
        insuranceId: '',
        insuranceAddress: '',
        insuranceName: ''
    }

    $scope.sendRequest = function(insurance) {

        console.log(insurance.insuranceName, insurance.insuranceAddress)
        InsuranceEthereumService
            .regsiterInsurance(insurance.insuranceName, insurance.insuranceAddress)
            .then(function (result) {
                $scope.showToast(result)
            })
            .catch(function (err) {
                $scope.showToast(err)
            })
    }
}
export default ['InsuranceEthereumService', '$scope', InsuranceCreateController]
