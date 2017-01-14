function InsuranceRegisteredController(EthereumInsuranceService, $scope) {
    EthereumInsuranceService
        .getRegisteredInsurances()
        .then(function (insurances) {
            $scope.insurances = insurances;
        })
}
export default ['EthereumInsuranceService', '$scope', InsuranceRegisteredController]
