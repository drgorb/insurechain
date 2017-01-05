function AppController(
    $scope,
    $rootScope,
    $mdSidenav,
    UserService,
    $state,
    $interval,
    userAddress,
    userRole)
{
    $rootScope.userRole = userRole;
    $scope.user = userAddress;

    $scope.menu = [
        {
            link : 'app.home',
            title: 'Home',
            icon: 'dashboard',
            permissionRoles: ['UNDEFINED', 'RETAILER', 'INSURANCE', 'OWNER']
        },
        {
            link : 'app.insurance',
            title: 'Insurance',
            icon: 'dashboard',
            permissionRoles: ['OWNER']
        },
        {
            link : 'app.retailer',
            title: 'Retailer',
            icon: 'dashboard',
            permissionRoles: ['INSURANCE']
        },
        {
            link : 'app.warranty',
            title: 'Warranty',
            icon: 'dashboard',
            permissionRoles: ['UNDEFINED', 'RETAILER', 'INSURANCE', 'OWNER']
        }
    ];

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };


    function updateUser() {
        UserService
            .checkUser()
            .then(function (user) {
                if($scope.user !== user) {
                    $scope.user = user;
                    $state.reload();
                }
            })
    }
    $interval(updateUser, 3000);
}

export default [
    '$scope',
    '$rootScope',
    '$mdSidenav',
    'UserService',
    '$state',
    '$interval',
    'userAddress',
    'userRole',
    AppController
]