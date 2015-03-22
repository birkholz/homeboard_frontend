angular.module('homeboard', ['ionic', 'homeboard.controllers', 'ngStorage', 'ngCookies'])

    .run(function ($ionicPlatform, $rootScope, $localStorage, $state, $http, $stateParams) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;
            var blockLoggedIn = toState.data.blockLoggedIn;

            // if the page requires login and the user isn't, redirect to login
            if (requireLogin && typeof $localStorage.token === 'undefined') {
                event.preventDefault();
                $state.transitionTo('login')
            }
            // if the page requires login, we have the token, but the header isn't set, set the header
            else if (requireLogin && typeof $localStorage.token !== 'undefined' &&
                typeof $http.defaults.headers.common.Authorization === 'undefined') {
                    $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.token;
            }
            // if a logged in user attempts to go to a logged-out only page, it redirects away
            if (blockLoggedIn && typeof $localStorage.token !== 'undefined') {
                event.preventDefault();
                $state.transitionTo('app.homes');
            }
        })
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl',
                data: {
                    requireLogin: false,
                    blockLoggedIn: true
                }
            })

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl',
                data: {
                    requireLogin: true,
                    blockLoggedIn: false
                }
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html"
                    }
                }
            })

            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html"
                    }
                }
            })
            .state('app.homes', {
                url: "/homes",
                views: {
                    'menuContent': {
                        templateUrl: "templates/homes.html",
                        controller: 'HomesCtrl'
                    }
                }
            })

            .state('app.home_create', {
                url: "/home/create",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home_create.html",
                        controller: 'HomeCreateCtrl'
                    }
                }
            })

            .state('app.home_update', {
                url: "/home/:homeId/update",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home_update.html",
                        controller: 'HomeUpdateCtrl'
                    }
                }
            })

            .state('app.chores', {
               url: "/chores",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chores.html",
                        controller: 'ChoresCtrl'
                    }
                }
            })

            .state('app.chore_create', {
                url: "/chore/create",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chore_create.html",
                        controller: 'ChoreCreateCtrl'
                    }
                }
            })

            .state('app.chore_update', {
                url: "/chore/:choreId/update",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chore_update.html",
                        controller: 'ChoreUpdateCtrl'
                    }
                }
            })
        ;

//            .state('app.home', {
//                url: "/homes/:homeId",
//                views: {
//                    'menuContent': {
//                        templateUrl: "templates/home.html",
//                        controller: 'HomeCtrl'
//                    }
//                }
//            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/homes');
    });
