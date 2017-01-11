function InsuranceCreateController(EthereumInsuranceService, $scope) {
    $scope.insurance = {
        insuranceId: '',
        insuranceAddress: '',
        insuranceName: ''
    };

    $scope.sendRequest = function(insurance) {
        EthereumInsuranceService
            .regsiterInsurance(insurance.insuranceName)
            .then(function (result) {
                $scope.showToast(result)
            })
            .catch(function (err) {
                $scope.showToast(err)
            })
    }
}
export default ['EthereumInsuranceService', '$scope', InsuranceCreateController]
