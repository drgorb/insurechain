export default {
    name: 'productDetails',
    config: {
        bindings: {selected: '='},
        template: require('./ProductDetails.html'),
        controller: ['moment', 'EthereumService', '$log', '$scope', class ProductDetailsController {

            /**
             * Constructor
             *
             * @param $mdBottomSheet
             * @param $log
             */
            constructor(moment, contract, $log, $scope) {
                this.moment = moment
                this.contract = contract
                this.$log = $log
                this.self = this
            }

            requestWaranty(serial, customerId, endDate, price) {
                this.contract.requestWarranty(serial, customerId, new Date(endDate), price)
            }

            addRepair() {
                this.selected.claim = {
                    claimType: 'repair',
                    date: this.moment.format('YYYY-MM-DD'),
                    serial: this.selected.serial,
                    price: 100
                }
            }

            addReplacement() {
                this.selected.claim = {
                    claimType: 'replacement',
                    date: this.moment.format('YYYY-MM-DD'),
                    serial: this.selected.serial,
                    price: 100
                }
            }

            sendClaim() {
                var self = this
                this.contract.claimWarranty(this.selected.claim.serial, this.selected.claim.price, this.selected.claim.claimType)
                    .then(function() {
                        delete self.selected.claim
                    })
            }

            cancelClaim() {
                delete this.selected.claim
            }

        }]
    }
}
