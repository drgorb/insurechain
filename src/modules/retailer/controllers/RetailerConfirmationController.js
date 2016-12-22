function RetailerConfirmationController(RetailersEthereumService, $scope) {
    RetailersEthereumService
        .getRetailerList()
        .then(function(retailers) {
            $scope.retailers = retailers
        })

    $scope.filterStatus = '';

    $scope.statuses = [
        {
            name: 'All',
            value: ''
        }, {
            name: 'Requested',
            value: 0
        }, {
            name: 'Accepted',
            value: 1
        }, {
            name: 'Rejected',
            value: 2
        }, {
            name: 'Terminated',
            value: 3
        }
    ];

    $scope.setRequestState = function (retailer, status) {
        RetailersEthereumService
            .setRequestState(retailer, status)
            .then(function (info) {
                console.log(info, 'ok')
            })
            .catch(function (err) {
                consol.log(err, 'nok')
            })
    }
}
export default ['RetailersEthereumService', '$scope', RetailerConfirmationController]

