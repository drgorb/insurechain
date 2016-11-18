export default {
    name: 'objectDetails',
    config: {
        bindings: {selected: '='},
        templateUrl: 'src/users/components/details/ObjectDetails.html',
        controller: ['moment', '$log', class ObjectDetailsController {

            /**
             * Constructor
             *
             * @param $mdBottomSheet
             * @param $log
             */
            constructor(moment, $log) {
                this.moment = moment;
                this.$log = $log;
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


