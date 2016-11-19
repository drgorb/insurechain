/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function EthereumService($q) {

    var self = this;

    self.abi = [ { "constant": true, "inputs": [], "name": "getRequestCount", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "getCustomer", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "getClaim", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "serial", "type": "string" }, { "name": "amount", "type": "uint256" } ], "name": "claimWaranty", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "contractAddress", "type": "address" } ], "name": "updateCalculator", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getClaimCount", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "getEndDate", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "getRequest", "outputs": [ { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "isWarrantyValid", "outputs": [ { "name": "", "type": "bool", "value": true } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "serial", "type": "string" }, { "name": "customer", "type": "address" }, { "name": "endDate", "type": "uint256" }, { "name": "price", "type": "uint256" } ], "name": "requestWarranty", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "type": "constructor" } ];
    self.dappId = "epam.hackathon";

    self.contractAddress = "0x64910c65a13B08634D7263b5f06c0C67AfFf36Cf";

    self.web3 = web3;
    self.WarrantyContract = web3.eth.contract(self.abi).at(self.contractAddress);

    self.getInfo = function (serial) {
        return $q.all({
            isWarrantyValid: self.isWarrantyValid(serial),
            customer: self.getCustomer(serial),
            warrantyEndDate: self.getWarrantyEndDate(serial)
        });

    }

    self.getReportData = function (month) {
        return $q.all({
            requests: self.getRequestCount(),
            claims: self.getClaimCount()
        }).then(function (counts) {
            var getClaims = [];
            for (var i = 0; i < counts.claims; i++) {
                getClaims.push(self.getClaim(i))
            }
            var getRequests = [];
            for (var i = 0; i < counts.requests; i++) {
                getClaims.push(self.getRequest(i))
            }
            return $q.all({
                claims: $q.all(getClaims),
                requests: $q.all(getRequests)
            });
        }).then(function(results){
            var report = "productType,productName,serial,pricePaid,claimDate,claimAmount,claimantId\n";
            results.claims.forEach(function (claim) {
                report += "," //productType
                report += "," //productName
                report += claim.serial + "," //productSerial
            });
            return $q(function (resolve, reject) {
                resolve(report);
            });
        });


    }

    self.isWarrantyValid = function (serial) {
        console.log('is warranty valid');
        var defer = $q.defer();

        self.WarrantyContract.isWarrantyValid(serial, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    self.getCustomer = function (serial) {
        var defer = $q.defer();

        self.WarrantyContract.getCustomer(serial, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    self.getRequestCount = function () {
        var defer = $q.defer();

        self.WarrantyContract.getRequestCount(function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    self.getClaimCount = function () {
        var defer = $q.defer();

        self.WarrantyContract.getClaimCount(function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    self.getRequest = function (idx) {
        var defer = $q.defer();

        self.WarrantyContract.getRequest(idx, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    self.getClaim = function (idx) {
        var defer = $q.defer();

        self.WarrantyContract.getClaim(idx, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    self.getWarrantyEndDate = function (serial) {
        var defer = $q.defer();

        self.WarrantyContract.getEndDate(serial, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve((new Date(result.toNumber())).toDateString());
            }
        });

        return defer.promise;
    }

    self.requestWarranty = function (serial, owner, endDate) {
        var defer = $q.defer();
        self.WarrantyContract.requestWarranty(serial, owner, endDate.getTime() / 1000, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    return self;
}

export default ['$q', EthereumService];
