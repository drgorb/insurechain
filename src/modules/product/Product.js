'use strict';

import angular from "angular";
import uirouter from "angular-ui-router";
import moment from "moment";
import ProductDataService from "./services/ProductDataService";
import FileSaverService from "./services/FileSaverService";
import ProductList from "./components/list/ProductList";
import ProductDetails from "./components/details/ProductDetails";
import DownloadReportData from "./components/downloadReport/DownloadReportData";
import EthereumService from "./../ethereum/EthereumService";
import RetailersEthereumService from "./../ethereum/Retailers";
import ProductController from "./controllers/ProductController";

const product = 'app.product';

angular.module(product, [
    uirouter
])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state({
        name: 'product',
        url: '/product',
        template: require('./templates/productTemplate.html'),
        controller: ('ProductController', ProductController),
        controllerAs: 'app'
    });
}])
.factory('EthereumService', EthereumService)
.factory('RetailersEthereumService', RetailersEthereumService)
.factory('moment', moment)

.service("ProductDataService", ProductDataService)
.service("FileSaverService", FileSaverService)

.component(ProductList.name, ProductList.config)
.component(ProductDetails.name, ProductDetails.config)
.component(DownloadReportData.name, DownloadReportData.config);

export default product
