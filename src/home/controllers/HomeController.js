/**
 * Main App Controller for the Angular Material Starter App
 * @param ProductDataService
 * @param $mdSidenav
 * @constructor
 */
function HomeController($scope) {
    $scope.title = 'hello, this is home page!';
}
export default ['$scope', HomeController];