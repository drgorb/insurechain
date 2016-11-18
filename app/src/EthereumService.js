/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function EthereumService() {
    // PUT YOUR CONTRACT'S ABI HERE
    var abi = [{"constant":true,"inputs":[],"name":"red","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"voteRed","type":"bool"}],"name":"vote","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getEntitlement","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"blue","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
    var dappId = "epam.hackathon";

    // PUT YOUR CONTRACT ADDRESS HERE
    var contractAddress = "0x8fc748ffeb1e5b624b1dd4eae76b2b16695d68ba";

    var walletBar = new WalletBar({
        dappNamespace: dappId,
        blockchain: "morden"
    });

    var web3 = new Web3();
    var WarrantyContract;
    walletBar.applyHook(web3)
    .then(function() {
        WarrantyContract = web3.eth.contract(abi).at(contractAddress);
    })
    .catch(function(err) {
        console.log(err);
    });

    
}

export default [ EthereumService ];
