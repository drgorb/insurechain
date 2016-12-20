import angular from 'angular';
import ngRoute from 'angular-route';
import ngMaterial from 'angular-material';

import '../style/app.css';

import productModule from './../product/Product'
import retailerModule from './../retailer/Retailer'

const appModule = 'app';

angular.module(appModule, [
  ngRoute,
  ngMaterial,
  productModule,
  retailerModule
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo: '/product'});
}])
.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('brown')
    .accentPalette('red');
});

export default appModule;