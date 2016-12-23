function AppController($scope, $mdSidenav, AppWeb3CheckService, $state, $interval) {

    $scope.menu = [
        {
            link : 'home',
            title: 'Home',
            icon: 'dashboard'
        },
        {
            link : 'insurance',
            title: 'Insurance',
            icon: 'dashboard'
        },
        {
            link : 'retailer',
            title: 'Retailer',
            icon: 'dashboard'
        },
        {
            link : 'warranty ',
            title: 'Warranty',
            icon: 'dashboard'
        },
        {
            link : 'product',
            title: 'Product',
            icon: 'group'
        }
    ];

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };


    function updateUser() {
        AppWeb3CheckService
            .userCheck()
            .then(function (user) {
                $scope.user = user;
                if($scope.user !== user) {
                    $state.reload();
                }
            })
            .catch(function (err) {
                alert(err)
            });
    }
    updateUser();
    $interval(updateUser, 3000);
}

export default [
    '$scope',
    '$mdSidenav',
    'AppWeb3CheckService',
    '$state',
    '$interval',
    AppController
]