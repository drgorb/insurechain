'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';

import WarrantyController from './controllers/WarrantyController'

const warranty = 'app.warranty';

angular.module(warranty, [
    ngRoute
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/warranty', {
        template: require('./templates/WarrantyTemplate.html'),
        controller: ('WarrantyController', WarrantyController)
    });
}]);

export default warranty;