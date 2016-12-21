'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'ui-router-extras';

import RetailerController from './controllers/RetailerController'
import RetailerCreateController from './controllers/RetailerCreateController'

const retailer = 'app.retailer';

angular.module(retailer, [
    uirouter,
    'ct.ui.router.extras'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('retailer', 'retailer.create');
    $stateProvider
        .state({
            name: 'retailer',
            url: '/retailer',
            template: require('./templates/RetailerTemplate.html'),
            controller: ('RetailerController', RetailerController),
            deepStateRedirect: { default: { state: 'retailer.create' } }
        })
        .state({
            name: 'retailer.create',
            url: '/create',
            template: require('./templates/RetailerCreateTemplate.html'),
            controller: ('RetailerCreateController', RetailerCreateController)
        });
}]);

export default retailer
