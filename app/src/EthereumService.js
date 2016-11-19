/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function EthereumService($q) {

    var self = this;

    self.abi = [ { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "getCustomer", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "serial", "type": "string" }, { "name": "customer", "type": "address" }, { "name": "endDate", "type": "uint256" } ], "name": "requestWarranty", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "contractAddress", "type": "address" } ], "name": "updateCalculator", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "getEndDate", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "serial", "type": "string" } ], "name": "isWarrantyValid", "outputs": [ { "name": "", "type": "bool", "value": true } ], "payable": false, "type": "function" }, { "inputs": [], "type": "constructor" } ];
    self.dappId = "epam.hackathon";

    self.contractAddress = "0xF65a613630e112cc2Fc0fB382770E3845b857105";
    self.walletBar = new WalletBar({
        containerName:'#signInId',
        dappNamespace: self.dappId,
        blockchain: "morden"
    });

    self.web3 = new Web3();
    self.WarrantyContract;
    self.waitForWallet = self.walletBar.applyHook(self.web3)
    .then(function() {
        self.WarrantyContract = self.web3.eth.contract(self.abi).at(self.contractAddress);
        return self.WarrantyContract;
    })
    .catch(function(err) {
        console.log(err);
    });

    function prepareForTransaction() {
      var account = self.walletBar.getCurrentAccount(); // get account selected in wallet bar
      if (!account) return alert("You must log in to transact");
      self.walletBar.createSecureSigner();
      return account;
    }

    self.getInfo = function(serial) {
      return self.waitForWallet.then(function() {
       return $q.all({
          isWarrantyValid: self.isWarrantyValid(serial),
          customer: self.getCustomer(serial),
          warrantyEndDate: self.getWarrantyEndDate(serial)
        });
     });
    }

    self.isWarrantyValid = function(serial) {
      console.log('is warranty valid');
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

    self.getCustomer = function(serial) {
      var defer = $q.defer();

      self.WarrantyContract.getCustomer(serial, function(err, result){
        if(err) {
          defer.reject(err);
        }else {
          defer.resolve(result);
        }
      });

      return defer.promise;
    }

    self.getWarrantyEndDate = function(serial) {
      var defer = $q.defer();

      self.WarrantyContract.getEndDate(serial, function(err, result){
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
      var account = prepareForTransaction();
      self.WarrantyContract.requestWarranty(serial, owner, endDate.getTime(),{from:account}, function(err, result){
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
