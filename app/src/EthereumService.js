/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function EthereumService($q) {
    var self = this;

    // PUT YOUR CONTRACT'S ABI HERE
    self.abi = [ { "constant": false, "inputs": [ { "name": "serial", "type": "string" }, { "name": "owner", "type": "address" }, { "name": "endDate", "type": "uint256" } ], "name": "requestWarranty", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "contractAddress", "type": "address" } ], "name": "updateCalculator", "outputs": [], "payable": false, "type": "function" } ];
    self.dappId = "epam.hackathon";

    // PUT YOUR CONTRACT ADDRESS HERE
    self.contractAddress = "0xdE1c9799021fADe9909b420DA6C919943C6272b1";
    self.walletBar = new WalletBar({
        containerName:'#signInId',
        dappNamespace: self.dappId,
        blockchain: "morden"
    });

    self.web3 = new Web3();
    self.WarrantyContract;
    self.walletBar.applyHook(self.web3)
    .then(function() {
        self.WarrantyContract = self.web3.eth.contract(self.abi).at(self.contractAddress);
    })
    .catch(function(err) {
        console.log(err);
    });

    self.isWarrantyValid = function(serial) {
      var defer = $q.defer();

      self.WarrantyContract.isWarrantyValid(serial, function(err, result){
        if(err) {
          defer.reject(err);
        }else {
          defer.resolve(result);
        }
      });

      return defer.promise;
    }

    self.requestWarranty = function(serial, owner, endDate) {
      var defer = $q.defer();

      self.WarrantyContract.requestWarranty(serial, owner, enDate.getTime(), function(err, result){
        if(err) {
          defer.reject(err);
        }else {
          defer.resolve(result);
        }
      });

      return defer.promise;
    }

    return self;
}

export default ['$q', EthereumService ];
