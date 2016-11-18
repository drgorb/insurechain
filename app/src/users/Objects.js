// Load the custom app ES6 modules

import ObjectsDataService from 'src/users/services/ObjectsDataService';
import IpfsApiService from 'src/users/services/IpfsApiService';

import ObjectsList from 'src/users/components/list/ObjectsList';
import ObjectDetails from 'src/users/components/details/ObjectDetails';

// Define the Angular 'users' module

export default angular
    .module("objects", ['ngMaterial'])

    .component(ObjectsList.name, ObjectsList.config)
    .component(ObjectDetails.name, ObjectDetails.config)

    .service("ObjectsDataService", ObjectsDataService)

    .service("ipfsApi", IpfsApiService);
;
