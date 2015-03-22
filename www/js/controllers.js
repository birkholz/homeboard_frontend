angular.module('homeboard.controllers', [])

    .controller('AppCtrl', function ($localStorage, $scope, djangoAuth, $state) {
        $scope.doLogout = function() {
            djangoAuth.logout()
                .then(function() {
                    $state.transitionTo('login');
                });
        };
        $scope.homeSelected = function() {
              return typeof $localStorage.selected_home !== 'undefined'
        }
    })

    .controller('HomesCtrl', function ($scope, dataFactory, $ionicPopup, $localStorage) {
        dataFactory.getHomes()
            .success(function(homes) {
                $scope.homes = homes;
            });
        $scope.selectHome = function(home) {
            if (typeof $localStorage.selected_home !== 'undefined' && $localStorage.selected_home.id == home.id)
                delete $localStorage.selected_home;
            else
                $localStorage.selected_home = home
        };
        $scope.isSelected = function(home) {
            if (typeof $localStorage.selected_home === 'undefined')
                return false;
            return $localStorage.selected_home.id == home.id
        };
        $scope.confirmDeleteHome = function(home) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Home',
                template: 'Are you sure you want to delete \''+home.title+'\'?<br/>This operation is irreversible!'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    if (typeof $localStorage.selected_home !== 'undefined' && $localStorage.selected_home.id == home.id)
                        delete $localStorage.selected_home;
                    dataFactory.deleteHome(home.id)
                        .then(function(data) {
                            dataFactory.getHomes()
                                .success(function(homes) {
                                    $scope.homes = homes;
                                });
                        }, function(data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: data
                            });
                            alertPopup.then(function(res){})
                        })
                }
            })
        }
    })

    .controller('LoginCtrl', function ($scope, djangoAuth, Validate, $state) {
        $scope.model = {'username': '', 'password': ''};
        $scope.complete = false;
        $scope.login = function (formData) {
            $scope.errors = [];
            Validate.form_validation(formData, $scope.errors);
            if (!formData.$invalid) {
                djangoAuth.login($scope.model.username, $scope.model.password)
                    .then(function (data) {
                        $scope.model = {'username': '', 'password': ''};
                        $state.transitionTo('app.homes')
                    }, function (data) {
                        $scope.errors = data;
                    });
            }
        }
    })

    .controller('ChoresCtrl', function ($scope, dataFactory, $ionicPopup) {
        dataFactory.getChores()
            .success(function(chores) {
                $scope.chores = chores;
            });

        $scope.confirmDeleteChore = function(chore) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Chore',
                template: 'Are you sure you want to delete \''+chore.title+'\'?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    dataFactory.deleteChore(chore.id)
                        .then(function(data) {
                            dataFactory.getChores()
                                .success(function(chores) {
                                    $scope.chores = chores;
                                });
                        }, function(data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: data
                            });
                            alertPopup.then(function(res){})
                        })
                }
            })
        }
    })

    .controller('ChoreCreateCtrl', function($scope, $state, Validate, dataFactory, $localStorage){
        $scope.model = {
            'home': $localStorage.selected_home.id,
            'title': '',
            'description': ''
        };
        $scope.create = function (formData) {
            $scope.errors = [];
            Validate.form_validation(formData, $scope.errors);
            if (!formData.$invalid) {
                dataFactory.insertChore($scope.model)
                    .then(function(data) {
                        $scope.model = {
                            'home': $localStorage.selected_home.id,
                            'title': '',
                            'description': ''
                        };
                        $state.transitionTo('app.chores')
                    }, function(data) {
                       $scope.errors = data;
                    });
            }
        }
    })

    .controller('ChoreUpdateCtrl', function ($scope, $stateParams, dataFactory, Validate, $state) {
        dataFactory.getChore($stateParams.choreId)
            .success(function(chore){
                $scope.chore = chore
            });

        $scope.update = function (formData) {
            $scope.errors = [];
            Validate.form_validation(formData, $scope.errors);
            if (!formData.$invalid) {
                dataFactory.updateChore($scope.chore)
                    .then(function(data) {
                        $state.transitionTo('app.chores')
                    }, function(data) {
                       $scope.errors = data;
                    });
            }
        }
    })
//    .controller('HomeCtrl', function ($scope, $stateParams, dataFactory) {
//        dataFactory.getHome($stateParams.homeId)
//            .success(function(home){
//                $scope.home = home
//            })
//    })

    .controller('HomeCreateCtrl', function($scope, $state, Validate, dataFactory){
        $scope.model = {'title': ''};
        $scope.create = function (formData) {
            $scope.errors = [];
            Validate.form_validation(formData, $scope.errors);
            if (!formData.$invalid) {
                dataFactory.insertHome($scope.model)
                    .then(function(data) {
                        $scope.model = {'title': ''};
                        $state.transitionTo('app.homes')
                    }, function(data) {
                       $scope.errors = data;
                    });
            }
        }
    })

    .controller('HomeUpdateCtrl', function ($scope, $stateParams, dataFactory, Validate, $state) {
        dataFactory.getHome($stateParams.homeId)
            .success(function(home){
                $scope.home = home
            });

        $scope.update = function (formData) {
            $scope.errors = [];
            Validate.form_validation(formData, $scope.errors);
            if (!formData.$invalid) {
                dataFactory.updateHome($scope.home)
                    .then(function(data) {
                        $state.transitionTo('app.homes')
                    }, function(data) {
                       $scope.errors = data;
                    });
            }
        }
    })
;
