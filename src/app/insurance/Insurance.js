'use strict';

import angular from "angular";
import uirouter from "angular-ui-router";
import InsuranceController from "./controllers/InsuranceController";
import InsuranceCreateController from "./controllers/InsuranceCreateController";
import InsuranceConfirmationController from "./controllers/InsuranceConfirmationController";
import InsuranceCreateComponent from "./components/insuranceCreate/InsuranceCreateComponent";
import InsurancRegisteredComponent from "./components/insuranceRegistered/InsurancRegisteredComponent";
import InsuranceBalancesComponent from "./components/insuranceBalances/InsuranceBalancesComponent";
import InsuranceTotalBalancesComponent from "./components/insuranceTotalBalances/insuranceTotalBalancesComponent";
import EthereumInsuranceService from "../ethereum/services/EthereumInsuranceService";

const insurance = 'app.insurance';

angular.module(insurance, [
    uirouter
])
    .component(InsuranceCreateComponent.name, InsuranceCreateComponent.config)
    .component(InsuranceBalancesComponent.name, InsuranceBalancesComponent.config)
    .component(InsuranceTotalBalancesComponent.name, InsuranceTotalBalancesComponent.config)
    .component(InsurancRegisteredComponent.name, InsurancRegisteredComponent.config)

    .factory('EthereumInsuranceService', EthereumInsuranceService)

    .config(['$stateProvider', '$urlRouterProvider', '$mdToastProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('insurance', 'insurance.create');
        $stateProvider
            .state({
                name: insurance,
                url: '',
                template: require('./templates/InsuranceTemplate.html'),
                controller: ('InsuranceController', InsuranceController),
                redirect: `${insurance}.confirmation`
            })
            .state({
                name: `${insurance}.confirmation`,
                url: 'insurance',
                template: require('./templates/InsuranceConfirmationTemplate.html'),
                controller: ('InsuranceConfirmationController', InsuranceConfirmationController),
                data: {
                    permissions: {
                        only: ['OWNER'],
                        redirectTo: 'app.home'
                    }
                }
            })
            .state({
                name: `${insurance}.create`,
                url: 'insurance/create',
                template: require('./templates/InsuranceCreateTemplate.html'),
                controller: ('InsuranceCreateController', InsuranceCreateController),
                data: {
                    permissions: {
                        only: ['UNDEFINED'],
                        redirectTo: 'app.home'
                    }
                }
            });
    }]);

export default insurance;
