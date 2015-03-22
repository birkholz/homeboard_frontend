angular.module('homeboard')
    .factory('dataFactory', ['$http', '$localStorage', function($http, $localStorage) {

    var dataFactory = {
        'API_URL': 'http://107.170.232.37/api',
        'getHomes': function() {
            return $http.get(this.API_URL + '/homes/');
        },
        'getHome': function(id) {
            return $http.get(this.API_URL + '/homes/' + id + '/')
        },
        'insertHome': function(home) {
            return $http.post(this.API_URL + '/homes/', home);
        },
        'updateHome': function(home) {
            return $http.put(this.API_URL + '/homes/' + home.id + '/', home);
        },
        'deleteHome': function(id) {
            return $http.delete(this.API_URL + '/homes/' + id + '/')
        },
        'getChores': function() {
            return $http.get(this.API_URL + '/chores/?home=' + $localStorage.selected_home.id)
        },
        'getCompletedChores': function() {
            return $http.get(this.API_URL + '/chores/?completed=True&home=' + $localStorage.selected_home.id)
        },
        'insertChore': function(chore) {
            return $http.post(this.API_URL + '/chores/', chore)
        },
        'deleteChore': function(id) {
            return $http.delete(this.API_URL + '/chores/' + id + '/')
        },
        'updateChore': function(chore) {
            return $http.put(this.API_URL + '/chores/' + chore.id + '/', chore);
        },
        'getChore': function(id) {
            return $http.get(this.API_URL + '/chores/' + id + '/')
        }
    };

    return dataFactory;
}]);