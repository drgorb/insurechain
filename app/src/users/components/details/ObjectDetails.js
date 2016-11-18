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
                var self = this;
                contract.getInfo(this.selected.serial).then(function (info) {
                    self.isWarrantyValid = info.isWarrantyValid;
                    self.selected.warrantyEndDate = info.warrantyEndDate;
                    self.selected.customerId = info.customer;
                })
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


