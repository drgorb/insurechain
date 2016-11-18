/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function EthereumService() {
    var self = this;

    // PUT YOUR CONTRACT'S ABI HERE
    self.abi = [{"constant":true,"inputs":[],"name":"red","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"voteRed","type":"bool"}],"name":"vote","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getEntitlement","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"blue","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
    self.dappId = "epam.hackathon";

    // PUT YOUR CONTRACT ADDRESS HERE
    self.contractAddress = "0x8fc748ffeb1e5b624b1dd4eae76b2b16695d68ba";
    console.log('creating wallet bar');
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

    return self;
}

export default [ EthereumService ];
