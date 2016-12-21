function AppController($scope, $mdSidenav, $location) {

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.menu = [
        {
            link : 'home',
            title: 'Home',
            icon: 'dashboard'
        },
        {
            link : 'insurance',
            title: 'Insurance',
            icon: 'dashboard'
        },
        {
            link : 'retailer',
            title: 'Retailer',
            icon: 'dashboard'
        },
        {
            link : 'warranty ',
            title: 'Warranty',
            icon: 'dashboard'
        },
        {
            link : 'product',
            title: 'Product',
            icon: 'group'
        }
    ];

    $scope.user = web3.eth.accounts[0] || 'No active user';

    $scope.isActive = function(route) {
        return route === $location.path();
    }
}

export default ['$scope','$mdSidenav', '$location', AppController]