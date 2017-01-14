function PermissionService(PermRoleStore) {
    return {
        getPermission: function () {
            PermRoleStore
                .defineManyRoles({
                    'UNDEFINED': ['UserService', '$rootScope', (UserService , $rootScope) => UserService.checkRole(0, $rootScope.userRole)],
                    'RETAILER': ['UserService', '$rootScope', (UserService, $rootScope) => UserService.checkRole(1, $rootScope.userRole)],
                    'INSURANCE': ['UserService', '$rootScope', (UserService, $rootScope) => UserService.checkRole(2, $rootScope.userRole)],
                    'OWNER': ['UserService', '$rootScope', (UserService, $rootScope) => UserService.checkRole(3, $rootScope.userRole)]
                });
        },
        getUserRoleName: function(userRole) {
            switch(userRole) {
                case 0 : return 'UNDEFINED';
                case 1 : return 'RETAILER';
                case 2 : return 'INSURANCE';
                case 3 : return 'OWNER';
            }
        }
    }
}

export default ['PermRoleStore', PermissionService]
