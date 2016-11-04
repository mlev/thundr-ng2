import {HomeController} from "./controller/homeController";
import * as angular from "angular";
import {IStateProvider, IUrlRouterProvider} from "angular-ui-router";

class Routes {

    public static $inject = ["$stateProvider", "$urlRouterProvider"];

    constructor($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) {

        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("home", {
                controller: HomeController,
                controllerAs: "ctrl",
                templateUrl: "/static/templates/home.html",
                url: "/"
            });

    }
}

angular.module("app").config(Routes);
