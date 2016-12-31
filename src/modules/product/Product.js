'use strict';

import angular from "angular";
import uirouter from "angular-ui-router";
import moment from "moment";
import ProductDataService from "./services/ProductDataService";
import FileSaverService from "./services/FileSaverService";
import ProductList from "./components/list/ProductList";
import ProductDetails from "./components/details/ProductDetails";
import DownloadReportData from "./components/downloadReport/DownloadReportData";

import EthereumService from "../../app/services/EthereumService";
import RetailersEthereumService from "../../app/services/EthereumRetailersService";

import ProductController from "./controllers/ProductController";

const warranty = 'app.warranty';

angular.module(warranty, [
    uirouter
])
    .factory('EthereumService', EthereumService)
    .factory('RetailersEthereumService', RetailersEthereumService)
    .factory('moment', moment)

    .service("ProductDataService", ProductDataService)
    .service("FileSaverService", FileSaverService)

    .component(ProductList.name, ProductList.config)
    .component(ProductDetails.name, ProductDetails.config)
    .component(DownloadReportData.name, DownloadReportData.config)
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state({
            name: warranty,
            url: '/warranty',
            template: require('./templates/productTemplate.html'),
            controller: ('ProductController', ProductController),
            controllerAs: 'app'
        });
    }]);

export default warranty
