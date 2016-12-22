function RetailerCreateController($scope) {
    $scope.title = 'hello, this is retailer creation page!';
    $scope.companyName = '';

    $scope.selectedInsurance = '';
    $scope.insurances = [
        {
            name: 'first insurance',
            id: 2
        },
        {
            name: 'other insurance',
            id: 4
        }

    ];

    $scope.querySearch = function (searchText) {
        console.log(searchText);
    }
}
export default ['$scope', RetailerCreateController];