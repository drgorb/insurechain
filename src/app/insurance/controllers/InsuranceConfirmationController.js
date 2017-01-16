function InsuranceConfirmationController($scope, TransactionService, EthereumInsuranceService) {
    TransactionService.startTransaction();

    $scope.insurances = [];

    EthereumInsuranceService
        .getInsurancesList()
        .then(function(insurances) {
            $scope.insurances = insurances;
            TransactionService.finishTransaction();
        })
        .catch(function(err) {
            TransactionService.finishTransaction(null, null, err);
        });

    $scope.filterStatus = '';

    $scope.statuses = [
        {
            name: 'All',
            value: ''
        }, {
            name: 'Requested',
            value: 1
        }, {
            name: 'Accepted',
            value: 2
        }, {
            name: 'Rejected',
            value: 3
        }, {
            name: 'Terminated',
            value: 4
        }
    ];

    $scope.setRequestStatus = function (insurance, status) {
        TransactionService.startTransaction();
        EthereumInsuranceService
            .setRequestStatus(insurance, status)
            .then(function (info) {
                TransactionService.finishTransaction(info);
            })
            .catch(function (err) {
                TransactionService.finishTransaction(err);
            })
    };

    $scope.showAcceptButton = function (status) {
        return (status!=2);
    };

    $scope.showRejectButton = function (status) {
        return (status!=3);
    }
}
export default ['$scope', 'TransactionService', 'EthereumInsuranceService', InsuranceConfirmationController]

