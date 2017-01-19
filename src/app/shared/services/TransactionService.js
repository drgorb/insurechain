function TransactionService ($rootScope, $mdDialog, $compile, $state, $interval) {

    let showInfo = (info, reload) => {
        $mdDialog.show(
            $mdDialog.alert({
                onRemoving: () => {
                    if(reload) {
                        $state.reload();
                    }
                }
            })
                .clickOutsideToClose(true)
                .title('Transaction Result')
                .textContent(info)
                .ariaLabel('Transaction Result')
                .ok('Ok')
        );
    };

    let actionsTranasction = (info = false, reload = false, log = false) => {
        $rootScope.showMainLoader = false;
        if(info) {
            showInfo(info, reload);
        }
        if(log) {
            consoel.log(log)
        }
    };

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

    this.finishTransaction = (info = false, reload = false, log = false) => {
        if(reload) {
            let attempts = 0;
            let stopVerify = null;
            const verifyTx = () => {
                attempts++;
                web3.eth.getTransactionReceipt(info, function(err,res) {
                    if(err){
                        $interval.cancel(stopVerify);
                        actionsTranasction(`Error while executing the transaction ${info}: ${err}`, false, info);
                    }else {
                        if(res) {
                            actionsTranasction(`transaction ${info} successful`, true, log);
                            $interval.cancel(stopVerify);
                        } else if(attempts > 600) {
                            showInfo('Transaction ' + info + " was needed included after 5 minutes");
                            $interval.cancel(stopVerify);
                        }
                    }
                });
            };
            stopVerify = $interval(verifyTx, 1000);
        }else {
            actionsTranasction(info, log)
        }
    };

    return this;
}

export default ['$rootScope', '$mdDialog', '$compile', '$state','$interval', TransactionService];
