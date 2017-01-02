import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import ngMaterialSidemenu from 'angular-material-sidemenu';
import ngMessages from 'angular-messages';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import {permission, uiPermission} from 'angular-permission';

import '!style!css!angular-material-sidemenu/dest/angular-material-sidemenu.css';
import '../style/app.scss';

import resolvers from './resolvers';

import AppController from './controllers/AppController';

import UserService from './services/UserService';
import PermissionService from './services/PermissionService';

import EthereumHelperService from './services/EthereumHelperService';
import EthereumRoleService from './services/EthereumRoleService';

import homeModule from '../modules/home/Home';
import productModule from '../modules/product/Product';
import warrantyModule from '../modules/warranty/Warranty';
import retailerModule from '../modules/retailer/Retailer';
import insuranceModule from '../modules/insurance/Insurance';


const appModule = 'app';

export default angular.module(appModule, [
    uirouter,
    ngMessages,
    ngAnimate,
    ngAria,
    ngMaterial,
    ngMdIcons,
    ngMaterialSidemenu,
    permission,
    uiPermission,
    homeModule,
    insuranceModule,
    retailerModule,
    productModule,
    warrantyModule,
])
    .factory('UserService', UserService)
    .factory('PermissionService', PermissionService)
    .factory('EthereumHelperService', EthereumHelperService)
    .factory('EthereumRoleService', EthereumRoleService)

    .config(['$locationProvider', '$urlRouterProvider' , '$stateProvider', function($locationProvider, $urlRouterProvider, $stateProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider.state({
            name: appModule,
            url: '/',
            template: require('./templates/AppTemplate.html'),
            controller: ('AppController', AppController),
            resolve: resolvers,
            redirect: homeModule
        });
        $urlRouterProvider.otherwise('/');
    }])
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('red');
    })
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .run(['$rootScope', '$state', 'PermissionService', function ($rootScope, $state, PermissionService) {
        $rootScope.$on('$stateChangeStart', function (event, to, params) {
            if(to.redirect) {
                event.preventDefault();
                $state.go(to.redirect, params, {
                    location: 'replace'
                })
            }
        });
        PermissionService.getPermission();
    }]);
