'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import InsuranceController from './controllers/InsuranceController';
import InsuranceCreateController from './controllers/InsuranceCreateController';
import InsuranceConfirmationController from './controllers/InsuranceConfirmationController';

import EthereumInsuranceService from '../ethereum/services/EthereumInsuranceService';

const insurance = 'app.insurance';

angular.module(insurance, [
    uirouter
])
    .factory('EthereumInsuranceService', EthereumInsuranceService)

    .config(['$stateProvider', '$urlRouterProvider', '$mdToastProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('insurance', 'insurance.create');
        $stateProvider
            .state({
                name: insurance,
                url: 'insurance',
                template: require('./templates/InsuranceTemplate.html'),
                controller: ('InsuranceController', InsuranceController),
                redirect: `${insurance}.create`
            })
            .state({
                name: `${insurance}.create`,
                url: '/create',
                template: require('./templates/InsuranceCreateTemplate.html'),
                controller: ('InsuranceCreateController', InsuranceCreateController),
                data: {
                    permissions: {
                        only: ['UNDEFINED', 'OWNER'],
                        redirectTo: 'app.home'
                    }
                }
            })
            .state({
                name: `${insurance}.confirmation`,
                url: '/confirmation',
                template: require('./templates/InsuranceConfirmationTemplate.html'),
                controller: ('InsuranceConfirmationController', InsuranceConfirmationController),
                data: {
                    permissions: {
                        only: ['OWNER'],
                        redirectTo: 'app.home'
                    }
                }
            });
    }]);

export default insurance;
