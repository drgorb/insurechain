export default {
    userAddress: ['UserService', function (UserService) {
      return UserService.checkUser()
          .then(function (address) {
              return address;
          })
    }],
    userRole : ['UserService', 'EthereumRoleService', function (UserService, EthereumRoleService) {
        return UserService.checkUser()
            .then(function (address) {
                return EthereumRoleService.getRole(address);
            })
            .then(function (role) {
                return role.c[0];
            })
    }]
}