'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import WarrantyController from './controllers/WarrantyController';
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
            controller: ('WarrantyController', WarrantyController)
        });
        $stateProvider.state({
            name: `${warranty}.list`,
            url: '/product',
            template: require('./templates/WarrantyListTemplate.html'),
            controller: ('WarrantyController', WarrantyController)
        });
        $stateProvider.state({
            name: `${warranty}.details`,
            url: '/product/{id}',
            template: require('./templates/WarrantyDetailsTemplate.html'),
            controller: ('WarrantyDetailsController', WarrantyDetailsController)
        });
        $stateProvider.state({
            name: `${warranty}.create`,
            url: '/create',
            template: require('./templates/WarrantyCreateTemplate.html'),
            controller: ('WarrantyCreateController', WarrantyCreateController)
        });
    }]);

export default warranty
