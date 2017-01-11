'use strict';

import angular from "angular";
import uirouter from "angular-ui-router";
import ngAria from "angular-aria";

import RetailerController from "./controllers/RetailerController";
import RetailerCreateController from "./controllers/RetailerCreateController";
import RetailerConfirmationController from "./controllers/RetailerConfirmationController";

import RetailerCreateComponent from './components/retailerCreate/RetailerCreateComponent';
import RetailerTotalBalancesComponent from './components/retailerTotalBalances/RetailerTotalBalancesComponent';
import RetailerBalancesComponent from './components/retailerBalances/RetailerBalancesComponent';
import RetailerAcceptedComponent from './components/retailerAccepted/RetailerAcceptedComponent';

import EthereumRetailersService from "../ethereum/services/EthereumRetailersService";


const retailer = 'app.retailer';

angular.module(retailer, [
    uirouter,
    ngAria,
])
    .component(RetailerCreateComponent.name, RetailerCreateComponent.config)
    .component(RetailerBalancesComponent.name, RetailerBalancesComponent.config)
    .component(RetailerTotalBalancesComponent.name, RetailerTotalBalancesComponent.config)
    .component(RetailerAcceptedComponent.name, RetailerAcceptedComponent.config)

    .factory('EthereumRetailersService', EthereumRetailersService)

    .config(['$stateProvider', '$urlRouterProvider', '$mdToastProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('retailer', 'retailer.create');
        $stateProvider
            .state({
                name: retailer,
                url: '',
                template: require('./templates/RetailerTemplate.html'),
                controller: ('RetailerController', RetailerController),
                redirect: `${retailer}.confirmation`
            })
            .state({
                name: `${retailer}.confirmation`,
                url: 'retailer',
                template: require('./templates/RetailerConfirmationTemplate.html'),
                controller: ('RetailerConfirmationController', RetailerConfirmationController),
                data: {
                    permissions: {
                        only: ['INSURANCE'],
                        redirectTo: 'app.home'
                    }
                }
            })
            .state({
                name: `${retailer}.create`,
                url: 'retailer/create',
                template: require('./templates/RetailerCreateTemplate.html'),
                controller: ('RetailerCreateController', RetailerCreateController),
                data: {
                    permissions: {
                        only: ['UNDEFINED'],
                        redirectTo: 'app.home'
                    }
                }
            })
    }]);

export default retailer
