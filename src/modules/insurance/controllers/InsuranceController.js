function InsuranceController($mdToast, $scope) {
    $scope.showToast = function(info) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(info)
                .position('bottom right')
                .hideDelay(3000)
        );
    }
}
export default ['$mdToast', '$scope', InsuranceController]
