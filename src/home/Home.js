'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';

import HomeController from './controllers/HomeController'

const home = 'app.home';

angular.module(home, [
    ngRoute
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        template: require('./templates/HomeTemplate.html'),
        controller: ('HomeController', HomeController)
    });
}]);

export default home