function TransactionService ($rootScope, $mdDialog, $compile, $state, $interval) {

    this.showWidgetLoader = (elem, scope) => {
        let loaderElement = angular.element(`<div class="widget-loader" layout="row" layout-sm="column" layout-align="space-around">
            <md-progress-circular md-mode="indeterminate"></md-progress-circular>
        </div>`);
        let loader = $compile(loaderElement)(scope);
        elem.append(loader);
    };

    this.hideWidgetLoader = (elem) => {
        let loader = elem[0].querySelector('.widget-loader');
        loader.remove();
    };


    this.startTransaction = () => {
        $rootScope.showMainLoader = true;
    };
    function showInfo(info) {
        $mdDialog.show(
            $mdDialog.alert({})
                .clickOutsideToClose(true)
                .title('Transaction Result')
                .textContent(info)
                .ariaLabel('Transaction Result')
                .ok('Ok')
        );
    }

    this.finishTransaction = (info = false, reload = false, log = false) => {

        if(reload) {
            let attempts = 0;
            let stopVerify = null;
            const verifyTx = () => {
                attempts++;
                web3.eth.getTransactionReceipt(info, function(err,res) {
                    if(err){
                        $interval.cancel(stopVerify);
                        showInfo('error while executing the transaction ' + info + ':' + err);
                    }else {
                        if(res) {
                            showInfo('transaction ' + info + " successful");
                            $interval.cancel(stopVerify);
                            $rootScope.showMainLoader = false;
                            $state.reload();
                        } else if(attempts > 600) {
                            showInfo('transaction ' + info + " was needed included after 5 minutes");
                            $interval.cancel(stopVerify);
                            $rootScope.showMainLoader = false;
                            $state.reload();
                        }
                    }
                });
            };
            stopVerify = $interval(verifyTx, 1000);
        }else {
            $rootScope.showMainLoader = false;

            if(info) {
                showInfo(info);
            }

            if(log) {
                consoel.log(log)
            }
        }
    };

    return this;
}

export default ['$rootScope', '$mdDialog', '$compile', '$state','$interval', TransactionService];
