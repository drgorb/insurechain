/**
 * Created by Lukasz_Zygmanski on 23.12.2016.
 */

function UserService ($q, EthereumRoleService) {

    this.checkUser = function () {
        const defer = $q.defer ();
        const accs = web3.eth.accounts;
        if (!accs || accs.length == 0) {
            defer.reject('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly')
        } else {
            defer.resolve(accs[0])
        }

        return defer.promise;
    };

    this.checkRole = function (roleID, userRole) {
        let defer = $q.defer ();
        if(userRole != undefined) {
            (roleID == userRole) ? defer.resolve() : defer.reject();
        } else {
            this.checkUser()
                .then(function (address) {
                    return EthereumRoleService.getRole(address);
                })
                .then(function (role) {
                    (role.toNumber() == roleID) ? defer.resolve() : defer.reject();
                });
        }
        return defer.promise;
    };

    return this
}

export default ['$q', 'EthereumRoleService', UserService];
