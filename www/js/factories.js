angular.module('homeboard')
    .factory('dataFactory', ['$http', function($http) {

    var dataFactory = {
        'API_URL': 'http://localhost:8000/api',
        'getHomes': function() {
            var dataFactory = this;
            return $http.get(this.API_URL + '/homes/');
        },
        'getHome': function(id) {
            var dataFactory = this;
            return $http.get(this.API_URL + '/homes/' + id + '/')
        },
        'insertHome': function(home) {
            var dataFactory = this;
            return $http.post(this.API_URL + '/homes/', home);
        },
        'updateHome': function(home) {
            var dataFactory = this;
            return $http.put(this.API_URL + '/homes/' + home.id + '/', home);
        },
        'deleteHome': function(id) {
            var dataFactory = this;
            return $http.delete(this.API_URL + '/homes/' + id + '/')
        }
    };

    return dataFactory;
}]);