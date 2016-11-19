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

    self.contractAddress = "0xC27a02556661134ea38A2FdC82906D855842E4C6";
    self.walletBar = new WalletBar({
        containerName: '#signInId',
        dappNamespace: self.dappId,
        blockchain: "morden"
    });

    self.web3 = new Web3();
    self.WarrantyContract;
    self.waitForWallet = self.walletBar.applyHook(self.web3)
        .then(function () {
            self.WarrantyContract = self.web3.eth.contract(self.abi).at(self.contractAddress);
            return self.WarrantyContract;
        })
        .catch(function (err) {
            console.log(err);
        });

    function prepareForTransaction() {
        var account = self.walletBar.getCurrentAccount(); // get account selected in wallet bar
        if (!account) return alert("You must log in to transact");
        self.walletBar.createSecureSigner();
        return account;
    }

    self.getInfo = function (serial) {
        return self.waitForWallet.then(function () {
            return $q.all({
                isWarrantyValid: self.isWarrantyValid(serial),
                customer: self.getCustomer(serial),
                warrantyEndDate: self.getWarrantyEndDate(serial)
            });
        });
    }

    self.getReportData = function (month) {
        return $q.all({
            requests: self.getRequestCount(),
            claims: self.getClaimCount()
        }).then(function (counts) {
            var getClaims = [];
            for (var i = 0; i < counts.claims; i++) {
                getClaims.push(self.WarrantyContract.getClaim(idx, function (err, result) {
                        if (err) {
                            defer.reject(err);
                        } else {
                            defer.resolve(result);
                        }
                    })
                )
            }
            var getRequests = [];
            for (var i = 0; i < counts.requests; i++) {
                getClaims.push(self.WarrantyContract.getRequest(idx, function (err, result) {
                        if (err) {
                            defer.reject(err);
                        } else {
                            defer.resolve(result);
                        }
                    })
                )
            }
            return $q.all({
                claims: getClaims,
                requests: getRequests
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
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    self.requestWarranty = function (serial, owner, endDate) {
        var defer = $q.defer();
        var account = prepareForTransaction();
        self.WarrantyContract.requestWarranty(serial, owner, endDate.getTime() / 1000, {from: account}, function (err, result) {
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
