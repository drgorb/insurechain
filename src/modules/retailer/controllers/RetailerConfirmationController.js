function RetailerConfirmationController(RetailersEthereumService, $scope) {

    RetailersEthereumService
        .getRetailerList(web3.eth.accounts)
        .then(function(retailers) {
            $scope.retailers = retailers;
        });

    $scope.filterStatus = 0;

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

    $scope.setRequestStatus = function (retailer, status) {
        RetailersEthereumService
            .setRequestStatus(retailer, status)
            .then(function (info) {
                $scope.showToast(info)
            })
            .catch(function (err) {
                console.log(err)
                $scope.showToast(err)
            })
    }

    $scope.showAcceptButton = function (status) {
        return (status!=1);
    }

    $scope.showRejectButton = function (status) {
        return (status!=2);
    }
}
export default ['RetailersEthereumService', '$scope', RetailerConfirmationController]

