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
        }
    }
}

export default ['PermRoleStore', PermissionService]