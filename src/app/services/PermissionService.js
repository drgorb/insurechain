function PermissionService(PermRoleStore) {
    return {
        getPermission: function (userRole) {
            PermRoleStore
                .defineManyRoles({
                    'UNDEFINED': () => userRole == 0,
                    'RETAILER': () => userRole == 1,
                    'INSURANCE': () => userRole == 2,
                    'OWNER': () => userRole == 3,
            });
        }
    }
}

export default ['PermRoleStore', PermissionService]