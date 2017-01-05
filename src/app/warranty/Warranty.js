'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import WarrantyController from './controllers/WarrantyController';
import WarrantyListController from './controllers/WarrantyListController'
import WarrantyDetailsController from './controllers/WarrantyDetailsController';
import WarrantyCreateController from './controllers/WarrantyCreateController';

import WarrantySearchComponent from './components/search/WarrantySearchComponents';

const warranty = 'app.warranty';

angular.module(warranty, [
    uirouter
])
    .component(WarrantySearchComponent.name, WarrantySearchComponent.config)

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state({
            name: warranty,
            url: 'warranty?showSearch',
            template: require('./templates/WarrantyTemplate.html'),
            controller: ('WarrantyController', WarrantyController),
            redirect: `${warranty}.list`
        });
        $stateProvider.state({
            name: `${warranty}.list`,
            url: '',
            template: require('./templates/WarrantyListTemplate.html'),
            controller: ('WarrantyListController', WarrantyListController)
        });
        $stateProvider.state({
            name: `${warranty}.create`,
            url: '/create',
            template: require('./templates/WarrantyCreateTemplate.html'),
            controller: ('WarrantyCreateController', WarrantyCreateController),
            data: {
                permissions: {
                    only: ['RETAILER'],
                    redirectTo: 'app.home'
                }
            }
        });
        $stateProvider.state({
            name: `${warranty}.details`,
            url: '/product/{id}',
            template: require('./templates/WarrantyDetailsTemplate.html'),
            controller: ('WarrantyDetailsController', WarrantyDetailsController)
        });
    }]);

export default warranty
