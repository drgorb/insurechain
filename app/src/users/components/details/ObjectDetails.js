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

            requestWaranty(serial, customerId, endDate, price) {
                this.contract.requestWarranty(serial, customerId, new Date(endDate), price);
            }

            addRepair() {
                this.claim = {
                    claimType: "repair",
                    date: this.moment.format("YYYY-MM-DD"),
                    serial: this.selected.serial,
                    price: 100
                };
            }

            addReplacement() {
                this.claim = {
                    claimType: "replacement",
                    date: this.moment.format("YYYY-MM-DD"),
                    serial: this.selected.serial,
                    price: 100
                };
            }

            sendClaim() {
                var self = this;
                this.contract.claimWarranty(this.claim.serial, this.claim.price, this.claim.claimType)
                    .then(function () {
                        delete self.claim;
                    });
            }

        }]
    }
};


