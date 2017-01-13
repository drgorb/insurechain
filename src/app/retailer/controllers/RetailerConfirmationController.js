function RetailerConfirmationController($scope, TransactionService, EthereumRetailersService) {

    EthereumRetailersService
        .getRetailerList(web3.eth.accounts[0])
        .then(function(retailers) {
            $scope.retailers = retailers;
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

    $scope.setRequestStatus = function (retailer, status) {
        TransactionService.startTransaction();
        EthereumRetailersService
            .setRequestStatus(retailer, status)
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
    };
}
export default ['$scope', 'TransactionService', 'EthereumRetailersService', RetailerConfirmationController]

