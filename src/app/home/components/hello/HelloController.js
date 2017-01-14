function HellohController($scope, $q, UserService) {
    $scope.userData = {};

    UserService
        .checkUser()
        .then(function (address) {
            $scope.userData.address = address;
        });
}
export default ['$scope', '$q', 'UserService', HellohController];