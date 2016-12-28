'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import InsuranceController from './controllers/InsuranceController';
import InsuranceCreateController from './controllers/InsuranceCreateController';
import InsuranceConfirmationController from './controllers/InsuranceConfirmationController';

import InsuranceEthereumService from './../ethereum/Insurances';

const insurance = 'app.insurance';

angular.module(insurance, [
    uirouter
])
.factory('InsuranceEthereumService', InsuranceEthereumService)
.config(['$stateProvider', '$urlRouterProvider', '$mdToastProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('insurance', 'insurance.create');
    $stateProvider
        .state({
            name: 'insurance',
            url: '/insurance',
            template: require('./templates/InsuranceTemplate.html'),
            controller: ('InsuranceController', InsuranceController),
            deepStateRedirect: { default: 'insurance.create' }
        })
        .state({
            name: 'insurance.create',
            url: '/create',
            template: require('./templates/InsuranceCreateTemplate.html'),
            controller: ('InsuranceCreateController', InsuranceCreateController)
        })
        .state({
            name: 'insurance.confirmation',
            url: '/confirmation',
            template: require('./templates/InsuranceConfirmationTemplate.html'),
            controller: ('InsuranceConfirmationController', InsuranceConfirmationController)
        })
}]);

export default insurance;