function AppController(
    $scope,
    $mdSidenav,
    UserService,
    PermissionService,
    $state,
    $interval,
    userAddress,
    userRole)
{

    console.log(userRole);
    $scope.user = userAddress;

    PermissionService.getPermission(userRole);

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
            permissionRoles: ['UNDEFINED', 'OWNER']
        },
        {
            link : 'app.retailer',
            title: 'Retailer',
            icon: 'dashboard',
            permissionRoles: ['UNDEFINED', 'RETAILER', 'INSURANCE', 'OWNER']
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
    '$mdSidenav',
    'UserService',
    'PermissionService',
    '$state',
    '$interval',
    'userAddress',
    'userRole',
    AppController
]