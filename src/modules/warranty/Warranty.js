'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import WarrantyController from './controllers/WarrantyController';

const warranty = 'app.warranty';

angular.module(warranty, [
    uirouter
])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state({
            name: warranty,
            url: 'warranty',
            template: require('./templates/warrantyTemplate.html'),
            controller: ('WarrantyController', WarrantyController)
        });
        $stateProvider.state({
            name: `${warranty}.list`,
            url: '/product',
            template: require('./templates/warrantyList.html'),
            controller: ('WarrantyController', WarrantyController)
        });
        $stateProvider.state({
            name: `${warranty}.details`,
            url: '/product/{id}',
            template: require('./templates/warrantyDetails.html'),
            controller: ('WarrantyController', WarrantyController)
        });
    }]);

export default warranty
