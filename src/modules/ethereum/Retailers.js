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
            address: '0x95262f78c646178416c123dbeef2a286d41a27e8'
        },
        {
            name: 'Allianz',
            address: '0xc62e02ddc6c1a78ca63f144253e74c85ecb76b74'
        },
        {
            name: 'Mobiliar',
            address: '0x607aae63a7d99e0207214248b9f663e55b465766'
        }
    ]

    self.retailerList = [
        {
            name: 'Digitec',
            address: '0x3b06274c18e8a188c24f64dd4793f1027c1f3123',
            status: 0
        },
        {
            name: 'Interdiscount',
            address: '0xce2db460f2c86b5b66bfb2815d5ee476e61584ac',
            status: 2
        },
        {
            name: 'M-Electronics',
            address: '0xb3b499b3a1f35d1b413e8fb17d0134ed11c650cc',
            status: 0
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
