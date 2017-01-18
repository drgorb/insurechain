function HomeController($rootScope, $state) {
    switch($rootScope.userRole) {
        case 0 : {
            $state.go('app.home.undefined');
            return;
        }
        case 1 : {
            $state.go('app.home.retailer');
            return;
        }
        case 2 : {
            $state.go('app.home.insurance');
            return;
        }
        case 3 : {
            $state.go('app.home.owner');
            return;
        }
    }
}
export default ['$rootScope', '$state', HomeController]
