import * as angular from "angular";
import * as _ from "lodash";
import {AppUtils} from "./service/appUtils";

class IeCacheFix {

    constructor($httpProvider: ng.IHttpProvider) {

        // Initialize http get header defaults if required
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get["If-Modified-Since"] = 0;

    }
}

function TemplateCacheBuster($provide: ng.auto.IProvideService) {

    const CACHE_BUST = Date.now().toString();
    const templateFactoryDecorator = ($delegate) => {

        const fromUrl = angular.bind($delegate, $delegate.fromUrl);
        $delegate.fromUrl = (url, params) => {

            // Check is to avoid breaking AngularUI ui-bootstrap-tpls.js: "uib/template/accordion/accordion-group.html"
            if (_.isString(url) && url.indexOf("uib/template/") === -1) {
                url = AppUtils.cacheBustUrl(url, CACHE_BUST);
            }

            return fromUrl(url, params);
        };
        return $delegate;
    };

    $provide.decorator("$templateFactory", ["$delegate", templateFactoryDecorator]);
}

angular.module("app")
    .config(IeCacheFix)
    .config(TemplateCacheBuster);
