import * as angular from "angular";
import {StateProvider, UrlService} from "angular-ui-router";
import {HomeController} from "./controller/homeController";

class Routes {

    public static $inject = ["$stateProvider", "$urlServiceProvider"];

    constructor($stateProvider: StateProvider, $urlServiceProvider: UrlService) {

        $urlServiceProvider.rules.otherwise("/");
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
