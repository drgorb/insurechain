export default {
    name: 'downloadReportData',
    config: {
        bindings: {selected: '='},
        template: require('./DownloadReportData.html'),
        controller: ['moment', 'EthereumService', 'FileSaverService', '$log', class DownloadReportDataController {

            /**
             * Constructor
             *
             * @param $mdBottomSheet
             * @param $log
             */
            constructor(moment, contract, fileSaver, $log) {
                this.$log = $log
                this.reportDate = moment.format('YYYY-MM')
                this.contract = contract
                this.fileSaver = fileSaver
            }

            getReportData() {
                var self = this
                this.contract.getReportData(this.reportDate).then(function(csvData) {
                    var blob = new Blob([csvData], {type: 'text/plain;charset=utf-8'})
                    self.fileSaver.saveAs(blob, 'dataFor' + self.reportDate + '.csv')
                })
            }
        }]
    }
}
