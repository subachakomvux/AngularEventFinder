var app = angular.module('eventsApp');

app.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.event = function (country) {
        $location.path('/search-event/' + country);
    }

}]);

app.controller('EventCtrl', ['$scope', '$routeParams', '$location', 'findEvent',function ($scope, $routeParams, $location, findEvent) {
    var newCountry = $routeParams.countryCode;
    findEvent.getEvent(newCountry)
        .then(function (output) {
            $scope.printCountry = output.data._embedded.events[0]._embedded.venues[0].country.name;
            var count = (output.data._embedded.events).length; // find number of results returned
            $scope.countryName = newCountry;
            $scope.displayData = [];
            /* for each result data object, copy corresponding result into an array */
            for (var i = 0; i < count; i++) {
                $scope.displayData[i] = output.data._embedded.events[i];
            }
        });
    $scope.sendEvent = function (InputId) {
        $location.path('/show-event/' + InputId);
    }
}]);
app.controller('EventResultsCtrl', ['$scope', '$routeParams', '$location', 'showEvent', function ($scope, $routeParams, $location, showEvent) {
    var newEvent = $routeParams.eventId;
    showEvent.getDetails(newEvent)
        .then(function (output) {
            $scope.printName = output.data.name;
            $scope.printUrl = output.data.url;
            $scope.printInfo = output.data.info;
            $scope.printNote = output.data.pleaseNote;
            $scope.printDate = output.data.dates.start.localDate;
            $scope.printTime = output.data.dates.start.localTime;
            
           
            // store values of latitude and longitude in session storage, to send to maps.html
            sessionStorage.lat = output.data._embedded.venues[0].location.latitude;
            sessionStorage.lon = output.data._embedded.venues[0].location.longitude;
            // print the venue name, city name and state name
            $scope.printVenue = output.data._embedded.venues[0].name;
            $scope.printCity = output.data._embedded.venues[0].city.name;
            $scope.printCountry = output.data._embedded.venues[0].country.name;
            // store country code in variable to access find_events.html from list_events.html  
            $scope.storeCountryCode = output.data._embedded.venues[0].country.countryCode;
            // print all images
            var count = output.data.images.length;
            $scope.printImage = [];
            for (var i = 0; i < count; i++) {
                $scope.printImage[i] = output.data.images[i];
            }
            $scope.printMinPrice = output.data.priceRanges[0].min;
            $scope.printMaxPrice = output.data.priceRanges[0].max;
            $scope.printCurrency = output.data.priceRanges[0].currency;
            if ($scope.printMinPrice === $scope.printMaxPrice) {
                $scope.printMinPrice = "";
            }
            else {
                $scope.printMaxPrice = "-" + $scope.printMaxPrice;
            }

        });
        $scope.sendEventAgain = function () {
            $location.path('/search-event/' + $scope.storeCountryCode);
        }
}]);