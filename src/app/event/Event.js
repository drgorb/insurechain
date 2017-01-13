'use strict';

import angular from "angular";
import uirouter from "angular-ui-router";

import EventController from './controllers/EventController';
import EventListController from './controllers/EventListController';

const event = 'app.event';

angular.module(event, [
    uirouter,
])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state({
                name: event,
                url: '',
                template: require('./templates/EventTemplate.html'),
                controller: ('EventController', EventController),
                redirect: `${event}.list`
            });
        $stateProvider
            .state({
                name: `${event}.list`,
                url: 'event',
                template: require('./templates/EventListTemplate.html'),
                controller: ('EventListController', EventListController)
            })
    }]);

export default event
