import angular from "angular";
import uirouter from "angular-ui-router";
import ngMaterial from "angular-material";
import ngMdIcons from "angular-material-icons";
import ngMaterialSidemenu from "angular-material-sidemenu";
import ngMessages from 'angular-messages'
import "!style!css!angular-material-sidemenu/dest/angular-material-sidemenu.css";
import "../style/app.scss";
import homeModule from "../modules/home/Home";
import productModule from "../modules/product/Product";
import retailerModule from "../modules/retailer/Retailer";
import warrantyModule from "../modules/warranty/Warranty";
import insuranceModule from "../modules/insurance/Insurance";
import AppController from "./controllers/AppController";

const appModule = 'app';

angular.module(appModule, [
    uirouter,
    ngMessages,
    ngMaterial,
    ngMdIcons,
    ngMaterialSidemenu,
    homeModule,
    productModule,
    retailerModule,
    warrantyModule,
    insuranceModule,
])
    .controller('AppController', AppController)
    .config(['$locationProvider', '$urlRouterProvider', function($locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    }])
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('red');
    });

export default appModule;