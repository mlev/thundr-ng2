import * as angular from "angular";

export class PromiseUtil {

    private $rootScope: ng.IScope;
    private $http: ng.IHttpService;
    private $httpBackend: ng.IHttpBackendService;

    public static resolve(promise) {
        return new PromiseUtil().resolvePromiseResult(promise, false);
    }

    public static resolveError(promise) {
        return new PromiseUtil().resolvePromiseResult(promise, true);
    }

    private injectVariables() {
        angular.mock.inject((_$rootScope_: ng.IScope, _$http_: ng.IHttpService, _$httpBackend_: ng.IHttpBackendService) => {
            this.$rootScope = _$rootScope_;
            this.$http = _$http_;
            this.$httpBackend = _$httpBackend_;
        });
    }

    private resolvePromiseResult(promise, expectError) {
        let result = null;
        this.injectVariables();

        promise.then(
            response => {
                expect(false).toEqual(!!expectError, "Promise was resolved - expected rejection");
                result = response;
            },
            error => {
                expect(true).toEqual(!!expectError, "Promise was rejected - expected success " + error.message);
                result = error;
            });

        this.$rootScope.$apply();
        if (this.$http.pendingRequests.length) {
            this.$httpBackend.flush();
        }

        return result;
    }
}