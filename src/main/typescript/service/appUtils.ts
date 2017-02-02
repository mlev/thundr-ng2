import * as angular from "angular";

export class AppUtils {

    constructor(private $log: ng.ILogService) {
    }

    public static cacheBustUrl(sourceUrl: string, cacheBuster?: string) {
        let bust = cacheBuster;

        if (_.isNil(bust)) {
            bust = Date.now().toString();
        }

        let url = sourceUrl;
        if (_.isString(url)) {
            url += (url.indexOf("?") === -1 ? "?" : "&");
            url += "v=" + bust;
        }
        return url;
    }
}

angular.module("app").service("appUtils", AppUtils);
