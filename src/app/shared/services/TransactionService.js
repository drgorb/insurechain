function TransactionService ($rootScope, $mdDialog) {
    this.startTransaction = () => {
        $rootScope.showMainLoader = true;
    };

    this.finishTransaction = (info = false, reload = false, log = false) => {
        $rootScope.showMainLoader = false;

        if(info) {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Transaction Result')
                    .textContent(info)
                    .ariaLabel('Transaction Result')
                    .ok('Ok')
            );
        }

        if(log) {
            consoel.log(log)
        }
    };

    return this;
}

export default ['$rootScope', '$mdDialog', TransactionService];
