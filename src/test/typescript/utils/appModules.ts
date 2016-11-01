namespace test {

    export class Modules {

        public static preventDefaultRouteInterceptor() {
            angular.mock.module("ui.router", ($urlRouterProvider: angular.ui.IUrlRouterProvider) => {
                $urlRouterProvider.deferIntercept();
            });
        }
    }
}
