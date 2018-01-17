(function(window, document, angular, $) {
    'use strict';

    angular
        .module('starwars', [
            'ngRoute',
            'googlechart'
        ])

    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/dashboard'
            })
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .otherwise({
                templateUrl: 'app/static/html/error.html'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })

    .config(function($logProvider) {
        $logProvider.debugEnabled(true);
    })

    .run(function($rootScope, $location, $http, $log) {
        $log.info('Running starwars', $rootScope);
    })

})(window, document, window.angular, window.jQuery);
