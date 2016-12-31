'use strict';

import angular from "angular";
import uirouter from "angular-ui-router";
import ngAria from "angular-aria";

import RetailerController from "./controllers/RetailerController";
import RetailerCreateController from "./controllers/RetailerCreateController";
import RetailerConfirmationController from "./controllers/RetailerConfirmationController";

import EthereumRetailersService from "../../app/services/EthereumRetailersService";


const retailer = 'app.retailer';

angular.module(retailer, [
    uirouter,
    ngAria,
])
    .factory('EthereumRetailersService', EthereumRetailersService)
    .config(['$stateProvider', '$urlRouterProvider', '$mdToastProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('retailer', 'retailer.create');
        $stateProvider
            .state({
                name: retailer,
                url: 'retailer',
                template: require('./templates/RetailerTemplate.html'),
                controller: ('RetailerController', RetailerController),
                redirect: `${retailer}.create`
            })
            .state({
                name: `${retailer}.create`,
                url: '/create',
                template: require('./templates/RetailerCreateTemplate.html'),
                controller: ('RetailerCreateController', RetailerCreateController),
                data: {
                    permissions: {
                        only: ['UNDEFINED', 'RETAILER', 'INSURANCE', 'OWNER'],
                        redirectTo: 'app.home'
                    }
                }
            })
            .state({
                name: `${retailer}.confirmation`,
                url: '/confirmation',
                template: require('./templates/RetailerConfirmationTemplate.html'),
                controller: ('RetailerConfirmationController', RetailerConfirmationController),
                data: {
                    permissions: {
                        only: ['INSURANCE', 'OWNER'],
                        redirectTo: 'app.home'
                    }
                }
            })
    }])

export default retailer
