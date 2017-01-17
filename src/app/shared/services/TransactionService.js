function TransactionService ($rootScope, $mdDialog, $compile, $state) {

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
        $rootScope.showMainLoader = false;

        if(info) {
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
        }

        if(log) {
            consoel.log(log)
        }
    };

    return this;
}

export default ['$rootScope', '$mdDialog', '$compile', '$state', TransactionService];
