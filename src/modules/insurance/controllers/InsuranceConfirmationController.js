function InsuranceConfirmationController(InsuranceEthereumService, $scope) {

    $scope.insurances = [];

    InsuranceEthereumService
        .getInsurancesList()
        .then(function(insurances) {
            $scope.insurances = insurances;
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
        InsuranceEthereumService
            .setRequestStatus(insurance, status)
            .then(function (info) {
                $scope.showToast(info)
            })
            .catch(function (err) {
                console.log(err)
                $scope.showToast(err)
            })
    }

    $scope.showAcceptButton = function (status) {
        return (status!=2);
    }

    $scope.showRejectButton = function (status) {
        return (status!=3);
    }
}
export default ['InsuranceEthereumService', '$scope', InsuranceConfirmationController]

