export default {
    name: 'objectDetails',
    config: {
        bindings: {selected: '='},
        templateUrl: 'src/users/components/details/ObjectDetails.html',
        controller: ['moment', 'EthereumService', '$log', '$scope', class ObjectDetailsController {

            /**
             * Constructor
             *
             * @param $mdBottomSheet
             * @param $log
             */
            constructor(moment, contract, $log, $scope) {
                this.moment = moment;
                this.contract = contract;
                this.$log = $log;
                this.self = this;
            }

            requestWaranty(serial, customerId, endDate){
                this.contract.requestWarranty(serial, customerId, new Date(endDate));
            }

            addRepair() {
                this.repair = {
                    date: this.moment.format("YYYY-MM-DD"),
                    price: 100
                };
            }

            addReplacement() {
                this.replacement = {
                    date: this.moment.format("YYYY-MM-DD"),
                    price: 100
                };
            }

        }]
    }
};


