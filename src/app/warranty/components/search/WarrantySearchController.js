function WarrantySearchController($scope, $mdDialog, $stateParams) {
    $scope.showSearch = function (ev) {
        $mdDialog.show({
            contentElement: '#searchDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    if($stateParams.showSearch == 'true') {
        $scope.showSearch();
    }
}
export default ['$scope', '$mdDialog', '$stateParams', WarrantySearchController];