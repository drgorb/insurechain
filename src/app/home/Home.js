'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import HomeController from './controllers/HomeController';

import HelloComponent from './components/hello/HelloComponent';

const home = 'app.home';

angular.module(home, [
    uirouter
])
    .component(HelloComponent.name, HelloComponent.config)
    
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state({
            name: home,
            url: '',
            template: require('./templates/HomeTemplate.html'),
            controller: ('HomeController', HomeController)
        });

        $stateProvider.state({
            name: `${home}.undefined`,
            url: 'dashboard',
            template: require('./templates/HomeUndefinedTemplate.html'),
            data: {
                permissions: {
                    only: ['UNDEFINED'],
                    redirectTo: home
                }
            }
        });
        $stateProvider.state({
            name: `${home}.retailer`,
            url: 'dashboard-retailer',
            template: require('./templates/HomeRetailerTemplate.html'),
            data: {
                permissions: {
                    only: ['RETAILER'],
                    redirectTo: home
                }
            }
        });
        $stateProvider.state({
            name: `${home}.insurance`,
            url: 'dashboard-insurance',
            template: require('./templates/HomeInsuranceTemplate.html'),
            data: {
                permissions: {
                    only: ['INSURANCE'],
                    redirectTo: home
                }
            }
        });
        $stateProvider.state({
            name: `${home}.owner`,
            url: 'dashboard-owner',
            template: require('./templates/HomeOwnerTemplate.html'),
            data: {
                permissions: {
                    only: ['OWNER'],
                    redirectTo: home
                }
            }
        });

    }]);

export default home