import angular from 'angular';
import ngRoute from 'angular-route';
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import ngMaterialSidemenu from 'angular-material-sidemenu';

import '!style!css!angular-material-sidemenu/dest/angular-material-sidemenu.css'
import '../style/app.scss';

import homeModule from '../modules/home/Home';
import productModule from '../modules/product/Product';
import retailerModule from '../modules/retailer/Retailer';
import warrantyModule from '../modules/warranty/Warranty';
import insuranceModule from '../modules/insurance/Insurance';

import AppController from './controllers/AppController';

const appModule = 'app';

angular.module(appModule, [
  ngRoute,
  ngMaterial,
  ngMdIcons,
  ngMaterialSidemenu,
  homeModule,
  productModule,
  retailerModule,
  warrantyModule,
  insuranceModule
])
.controller('AppController', AppController)
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo: '/'});
}])
.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('brown')
    .accentPalette('red');
});

export default appModule;