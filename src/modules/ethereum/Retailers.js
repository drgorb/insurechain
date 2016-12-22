/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function RetailersEthereumService($q) {
    var self = this

    self.abi = [{
        'constant': false,
        'inputs': [{'name': 'retailer', 'type': 'address'}, {'name': 'status', 'type': 'uint8'}],
        'name': 'setRequestState',
        'outputs': [],
        'payable': false,
        'type': 'function'
    }, {
        'constant': false,
        'inputs': [{'name': 'companyName', 'type': 'string'}, {'name': 'insurance', 'type': 'address'}],
        'name': 'requestRegistration',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': false,
        'type': 'function'
    }, {
        'constant': false,
        'inputs': [],
        'name': 'kill',
        'outputs': [],
        'payable': false,
        'type': 'function'
    }, {
        'constant': false,
        'inputs': [],
        'name': 'Owned',
        'outputs': [],
        'payable': false,
        'type': 'function'
    }, {
        'anonymous': false,
        'inputs': [{'indexed': true, 'name': 'companyName', 'type': 'string'}, {
            'indexed': false,
            'name': 'retailerAddress',
            'type': 'address'
        }, {'indexed': true, 'name': 'insurance', 'type': 'address'}],
        'name': 'RetailerRequest',
        'type': 'event'
    }, {
        'anonymous': false,
        'inputs': [{'indexed': true, 'name': 'retailer', 'type': 'address'}, {
            'indexed': true,
            'name': 'insurance',
            'type': 'address'
        }, {'indexed': false, 'name': 'status', 'type': 'uint8'}],
        'name': 'StatusChanged',
        'type': 'event'
    }]

    self.insauranceList = [
        {
            name: 'Zurich insurance',
            address: '1'
        },
        {
            name: 'Allianz',
            address: '2'
        },
        {
            name: 'Vaudoise',
            address: '3'
        }
    ]

    self.retailerList = [
        {
            name: 'Company name 1',
            address: '1',
            status: 0
        },
        {
            name: 'Company name 2',
            address: '2',
            status: 2
        },
        {
            name: 'Company name 3',
            address: '3',
            status: 0
        },
        {
            name: 'Company name 4',
            address: '4',
            status: 2
        },
        {
            name: 'Company name 5',
            address: '5',
            status: 2
        },
        {
            name: 'Company name 6',
            address: '6',
            status: 3
        }
    ]

    self.dappId = 'insurechain.retailers'

    self.contractAddress = '0xEBc67246B1F0e28c061029Bb2e21964589c7318A'

    self.web3 = web3
    self.contract = web3.eth.contract (self.abi).at (self.contractAddress)

    /**
     * in fact this creates the partner relation between the retailer and the insurance with a status 'Requested'
     * @param companyName
     * @param insurance
     * @returns {Function}
     */
    self.requestRegistration = function(companyName, insurance) {
        console.log ('requesting registration for ', companyName)
        var defer = $q.defer()

        self.contract.requestRegistration(companyName, insurance, function (err, result) {
            if(err) {
                defer.reject(err)
            } else {
                defer.resolve(result)
            }
        })

        return defer.promise
    }

    /**
     * set the status for a request. this function must be called by the insurance as the msg.sender is used to get the partnerRelation
     * @param retailer the address of the retailer who requested registration
     * @param status the status is a number with this meaning 0 = requested, 1 = Accepted, 2 = Rejected, 3 = Terminated
     * @returns {Function}
     */
    self.setRequestState = function(retailer, status) {
        var defer = $q.defer()

        self.contract.setRequestState(retailer, status, function (err, result) {
            if(err) {
                defer.reject(err)
            } else {
                defer.resolve(result)
            }
        })

        return defer.promise
    }

    self.getInsuranceId = function() {
        return $q.when(self.insauranceList)
    }

    self.getRetailerList = function () {
        return $q.when(self.retailerList)
    }

    return self
}

export default ['$q', RetailersEthereumService]
