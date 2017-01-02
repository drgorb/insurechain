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
            template: require('./templates/WarrantyTemplate.html'),
            controller: ('WarrantyController', WarrantyController)
        });
        $stateProvider.state({
            name: `${warranty}.list`,
            url: '/product',
            template: require('./templates/WarrantyList.html'),
            controller: ('WarrantyController', WarrantyController)
        });
        $stateProvider.state({
            name: `${warranty}.details`,
            url: '/product/{id}',
            template: require('./templates/WarrantyDetails.html'),
            controller: ('WarrantyController', WarrantyController)
        });
    }]);

export default warranty
