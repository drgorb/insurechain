/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function EthereumService($q) {

    var self = this;

    self.abi = [ { "constant": true, "inputs": [], "name": "getRequestCount", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "getCustomer", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "getClaim", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "serial", "type": "string" }, { "name": "amount", "type": "uint256" }, { "name": "claimType", "type": "string" } ], "name": "claimWarranty", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "getProduct", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "contractAddress", "type": "address" } ], "name": "updateCalculator", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getClaimCount", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "getEndDate", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "getRequest", "outputs": [ { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "isWarrantyValid", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "serial", "type": "string" }, { "name": "customer", "type": "address" }, { "name": "endDate", "type": "uint256" }, { "name": "price", "type": "uint256" } ], "name": "requestWarranty", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "type": "constructor" } ];
    self.dappId = "epam.hackathon";

    self.contractAddress = "0xad625CC94A26cDBe646044e375Cde44b72235D4c";

    self.web3 = web3;
    self.WarrantyContract = web3.eth.contract(self.abi).at(self.contractAddress);

    self.getInfo = function (serial) {
        return $q.all({
            isWarrantyValid: self.isWarrantyValid(serial),
            customer: self.getCustomer(serial),
            warrantyEndDate: self.getWarrantyEndDate(serial),
            product: self.getProduct(serial)
        });

    }

    self.getReportData = function (month) {
        return $q.all({
            requests: self.getRequestCount(),
            claims: self.getClaimCount()
        }).then(function (counts) {
            var getClaims = [];
            for (var i = 0; i < counts.claims; i++) {
                getClaims.push(self.getClaim(i));
            }
            var getRequests = [];
            for (var i = 0; i < counts.requests; i++) {
                getRequests.push(self.getRequest(i));
            }
            return $q.all({
                claims: $q.all(getClaims),
                requests: $q.all(getRequests)
            });
        }).then(function(results){
            var report = "entryType,productType,serial,pricePaid,claimDate,claimAmount,claimantId\n";
            results.claims.forEach(function (claim) {
                report += "claim," //entryType
                report += "," //productType
                report += claim[2].toString() + "," //productSerial
                report += "," //pricePaid
                report += (new Date(claim[3] * 1000)).toDateString() + "," //claimDate
                report += claim[1].toNumber() + "," //claimAmount
                report += claim[0].toString() + "\n" //claimantId
            });

            results.requests.forEach(function (request) {
                report += "request," //entryType
                report += request[3].toString() + "," //productType
                report += request[1].toString() + "," //productSerial
                report += request[7].toNumber() + "," //pricePaid
                report += "," //claimDate
                report += "," //claimAmount
                report += request[4].toString() + "\n" //retailer
            });

            return report;
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

    self.getProduct = function (serial) {
        var defer = $q.defer();

        self.WarrantyContract.getProduct(serial, function (err, result) {
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
                defer.resolve((new Date(result.toNumber() * 1000)).toDateString());
            }
        });

        return defer.promise;
    }

    self.requestWarranty = function (serial, owner, endDate, price) {
        var defer = $q.defer();
        price = parseInt(price);
        self.WarrantyContract.requestWarranty(serial, owner, endDate.getTime() / 1000, price, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    self.claimWarranty = function (serial, amount, claimType) {
        var defer = $q.defer();
        self.WarrantyContract.claimWarranty(serial, amount, claimType, function (err, result) {
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
