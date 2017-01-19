
function AppController(
    $q,
    $scope,
    $rootScope,
    $mdSidenav,
    UserService,
    $state,
    $interval,
    userAddress,
    userRole,
    PermissionService,
    NameService,
    EthereumHelperService,
    $http,
    SolidityCoderService,
    FileSaverService)
{
    $rootScope.userRole = userRole;
    $rootScope.userRoleName = PermissionService.getUserRoleName(userRole);
    $rootScope.user = userAddress;

    let self = this;
    self.ethHelper = EthereumHelperService;
    self.coder = SolidityCoderService;
    self.$http = $http;
    self.fileSaver = FileSaverService;

    $q.when(NameService.getUserEntity(userRole, userAddress)).then((entity) => {
        $rootScope.entity = entity;
    });

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.getCsv = function() {
        let getTxPromises = (contract) => {
            const defPromise = $q.defer();
            let url = "https://testnet.etherscan.io/api?module=account&action=txlist&address=" + contract.address +
                "&startblock=0&endblock=99999999&sort=asc&apikey=MWFJ3KMBWDBV22IC5HE6B66KAVY1CPZIU8";
            $http ({
                method: 'GET',
                url: url
            }).then (function successCallback (response) {
                console.log (response);
                let promises = [];
                response.data.result.forEach ((res) => {
                    const defer = $q.defer ();
                    promises.push (defer.promise);
                    web3.eth.getBlock (res.blockNumber, (err, block) => {
                        if (err) defer.reject ();
                        else {
                            let blockTime = new Date (block.timestamp * 1000);
                            let blockTimeFormatted = blockTime.getDate () + "." + (blockTime.getMonth () + 1) + "." + blockTime.getFullYear ();
                            blockTimeFormatted += " " + blockTime.getHours () + ":" + blockTime.getMinutes () + ":" + blockTime.getSeconds ();

                            let funcDef = contract.functionHashes[res.input.substring (0, 10)];
                            let inputData = self.coder.decodeParams (funcDef.inputs, res.input.substring (10));
                            defer.resolve (blockTimeFormatted + ";" + funcDef.name + ";" + inputData.map ((item) => item.toString ()).join (";"));
                        }
                    });
                });
                defPromise.resolve(promises);
            }, function errorCallback (response) {
                console.log (response);
            });
            return defPromise.promise;
        }

        let promiseBuilder = [];
        promiseBuilder.push(getTxPromises(self.ethHelper.insurechain));
        promiseBuilder.push(getTxPromises(self.ethHelper.insuranceManager));
        promiseBuilder.push(getTxPromises(self.ethHelper.retailerManager));

        $q.all(promiseBuilder).then((promisesArrays) => {
            let promises = promisesArrays[0].concat(promisesArrays[1]).concat(promisesArrays[2]);

            $q.all (promises).then ((logs) => {
                let blob = new Blob ([logs.join ("\n")], {type: 'text/plain;charset=utf-8'})
                self.fileSaver.saveAs (blob, 'allTransactions.csv')
            });
        });

    }

    function updateUser() {
        UserService
            .checkUser()
            .then(function (user) {
                if($scope.user !== user) {
                    $scope.user = user;
                    $state.go('app.home', {}, {reload: true});
                }
            })
    }
    $interval(updateUser, 3000);
}

export default [
    '$q',
    '$scope',
    '$rootScope',
    '$mdSidenav',
    'UserService',
    '$state',
    '$interval',
    'userAddress',
    'userRole',
    'PermissionService',
    'NameService',
    'EthereumHelperService',
    '$http',
    'SolidityCoderService',
    'FileSaverService',
    AppController
]
