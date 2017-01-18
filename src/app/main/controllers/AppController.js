
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
    NameService)
{
    $rootScope.userRole = userRole;
    $rootScope.userRoleName = PermissionService.getUserRoleName(userRole);
    $rootScope.user = userAddress;

    NameService.getUserEntity(userRole, userAddress).then((entity) => {
        $rootScope.entity = entity;
    });

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
    AppController
]
