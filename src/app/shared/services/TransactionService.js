function TransactionService ($rootScope, $mdDialog) {
    this.startTransaction = function () {
        $rootScope.showMainLoader = true;
    };

    this.finishTransaction = function (info) {
        $rootScope.showMainLoader = false;

        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Transaction Result')
                .textContent(info)
                .ariaLabel('Transaction Result')
                .ok('Ok')
        );
    };

    return this;
}

export default ['$rootScope', '$mdDialog', TransactionService];
