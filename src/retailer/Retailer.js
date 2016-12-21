'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';

import RetailerController from './controllers/RetailerController'

const retailer = 'app.retailer';

angular.module(retailer, [
    ngRoute
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/retailer', {
        template: require('./templates/retailerTemplate.html'),
        controller: ('RetailerController', RetailerController)
    });
}]);

export default retailer
