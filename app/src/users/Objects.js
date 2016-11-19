// Load the custom app ES6 modules

import ObjectsDataService from 'src/users/services/ObjectsDataService';
import FileSaverService from 'src/users/services/FileSaverService';

import ObjectsList from 'src/users/components/list/ObjectsList';
import ObjectDetails from 'src/users/components/details/ObjectDetails';

import DownloadReportData from 'src/users/components/reportDownload/DownloadReportData';

// Define the Angular 'users' module

export default angular
    .module("objects", ['ngMaterial'])

    .component(ObjectsList.name, ObjectsList.config)
    .component(ObjectDetails.name, ObjectDetails.config)
    .component(DownloadReportData.name, DownloadReportData.config)

    .service("ObjectsDataService", ObjectsDataService)
    .service("FileSaverService", FileSaverService);

