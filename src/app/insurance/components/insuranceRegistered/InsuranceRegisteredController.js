function InsuranceRegisteredController($scope, $element, TransactionService, EthereumInsuranceService) {
    TransactionService.showWidgetLoader($element, $scope);

    EthereumInsuranceService
        .getRegisteredInsurances()
        .then(function (insurances) {
            TransactionService.hideWidgetLoader($element);
            $scope.insurances = insurances;
        });
}
export default ['$scope', '$element','TransactionService', 'EthereumInsuranceService', InsuranceRegisteredController]
