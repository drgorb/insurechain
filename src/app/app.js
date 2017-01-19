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

import AppController from './main/controllers/AppController';

import UserService from './shared/services/UserService';
import NameService from './shared/services/NameService';
import TransactionService from './shared/services/TransactionService';

import PermissionService from './main/services/PermissionService';
import FileSaverService from "./main/services/FileSaverService";
import SolidityCoderService from "./main/services/SolidityCoderService";

import EthereumHelperService from './ethereum/services/EthereumHelperService';
import EthereumRoleService from './ethereum/services/EthereumRoleService';
import EthereumWarrantyService from './ethereum/services/EthereumWarrantyService';
import EthereumBalancesService from './ethereum/services/EthereumBalancesService';
import EthereumEventService from './ethereum/services/EthereumEventService'

import LoaderComponent from './shared/components/loader/LoaderComponent';
import MenuComponent from "./main/components/menu/MenuComponent";

import homeModule from './home/Home';
import warrantyModule from './warranty/Warranty';
import retailerModule from './retailer/Retailer';
import insuranceModule from './insurance/Insurance';
import eventModule from './event/Event';

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
    warrantyModule,
    eventModule
])
    .factory('EthereumHelperService', EthereumHelperService)
    .factory('EthereumRoleService', EthereumRoleService)
    .factory('EthereumWarrantyService', EthereumWarrantyService)
    .factory('EthereumBalancesService', EthereumBalancesService)
    .factory('EthereumEventService', EthereumEventService)

    .factory('TransactionService', TransactionService)
    .factory('PermissionService', PermissionService)
    .factory('UserService', UserService)
    .factory('NameService', NameService)

    .service('FileSaverService', FileSaverService)
    .service('SolidityCoderService', SolidityCoderService)

    .component(LoaderComponent.name, LoaderComponent.config)
    .component(MenuComponent.name, MenuComponent.config)

    .config(['$locationProvider', '$urlRouterProvider' , '$stateProvider', function($locationProvider, $urlRouterProvider, $stateProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider.state({
            name: appModule,
            url: '/',
            template: require('./main/templates/AppTemplate.html'),
            controller: ('AppController', AppController),
            resolve: resolvers,
            redirect: homeModule
        });
        $urlRouterProvider.otherwise('/');
    }])
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
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
