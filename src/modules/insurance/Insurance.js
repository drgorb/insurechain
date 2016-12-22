'use strict';

import angular from "angular";
import uirouter from "angular-ui-router";
import InsuranceController from "./controllers/InsuranceController";

const insurance = 'app.insurance';

angular.module(insurance, [
    uirouter
])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state({
        name: 'insurance',
        url: '/insurance',
        template: require('./templates/InsuranceTemplate.html'),
        controller: ('InsuranceController', InsuranceController)
    });
}]);

export default insurance;