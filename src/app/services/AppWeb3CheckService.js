/**
 * Created by Lukasz_Zygmanski on 23.12.2016.
 */

function appWeb3UserCheckService ($q) {
    return {
        userCheck: function () {
            let defer = $q.defer ();
            web3.eth.getAccounts(function (err, accs) {
                if (err != null) {
                    defer.reject('There was an error fetching your accounts.')
                } else if (accs.length == 0) {
                    defer.reject('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly')
                } else {
                    defer.resolve(accs[0])
                }
            });
            return defer.promise;
        }
    };
}

export default ['$q', appWeb3UserCheckService];