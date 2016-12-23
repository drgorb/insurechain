function AppController($scope, $mdSidenav, $location) {

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

    window.addEventListener('load', function() {

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            web3 = new Web3(web3.currentProvider);
        } else {
            console.log('No web3? You should consider trying MetaMask!')
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.user = web3.eth.accounts[0] || 'No active user';

        $scope.isActive = function(route) {
            return route === $location.path();
        }

    })
}

export default ['$scope','$mdSidenav', '$location', AppController]