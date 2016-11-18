// Load the custom app ES6 modules

import UsersDataService from 'src/users/services/UsersDataService';
import IpfsApiService from 'src/users/services/IpfsApiService';

import ObjectsList from 'src/users/components/list/ObjectsList';
import ObjectDetails from 'src/users/components/details/ObjectDetails';

// Define the Angular 'users' module

export default angular
    .module("users", ['ngMaterial'])

    .component(ObjectsList.name, ObjectsList.config)
    .component(ObjectDetails.name, ObjectDetails.config)

    .service("UsersDataService", UsersDataService)

    .service("ipfsApi", IpfsApiService);
;
