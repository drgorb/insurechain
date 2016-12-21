'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';

import InsuranceController from './controllers/InsuranceController'

const insurance = 'app.insurance';

angular.module(insurance, [
    ngRoute
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/insurance', {
        template: require('./templates/InsuranceTemplate.html'),
        controller: ('InsuranceController', InsuranceController)
    });
}]);

export default insurance;