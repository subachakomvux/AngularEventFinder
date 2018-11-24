var app = angular.module('eventsApp');

app.factory('findEvent', ['$http',function($http) {
    var eventData = {
    getEvent: function (country) {
        var url = "https://app.ticketmaster.com/discovery/v2/events?apikey=JXtpFlqxxU0TA4VlpCKuRMBT18tiPDCs&countryCode=" + country;
        return $http.get(url)
            .then(function (data) {
                return data;
            })  
    }
};
return eventData;
}]);

app.factory('showEvent', ['$http',function($http) {
    var eventData = {
    getDetails: function (code) {
        var url = "https://app.ticketmaster.com/discovery/v2/events/" + code + ".json?apikey=JXtpFlqxxU0TA4VlpCKuRMBT18tiPDCs";
        return $http.get(url)
            .then(function (data) {
                return data;
            }) 
    }
};
return eventData;
}]);