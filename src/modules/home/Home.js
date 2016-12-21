'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import HomeController from './controllers/HomeController'

const home = 'app.home';

angular.module(home, [
    uirouter
])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state({
        name: 'home',
        url: '/',
        template: require('./templates/HomeTemplate.html'),
        controller: ('HomeController', HomeController)
    });
}]);

export default home