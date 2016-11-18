export default {
    name: 'objectDetails',
    config: {
        bindings: {selected: '='},
        templateUrl: 'src/users/components/details/ObjectDetails.html',
        controller: ['moment', 'EthereumService', '$log', class ObjectDetailsController {

            /**
             * Constructor
             *
             * @param $mdBottomSheet
             * @param $log
             */
            constructor(moment, contract, $log) {
                this.moment = moment;
                this.contract = contract;
                this.$log = $log;
            }

            isWarantyValid(serial) {
                return this.contract.isWarrantyValid(serial);
            }

            requestWaranty(serial, customerId, endDate){
                this.contract.requestWarranty(serial, customerId, endDate);
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


