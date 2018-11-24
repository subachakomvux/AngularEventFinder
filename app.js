var app = angular.module('eventsApp',['ngRoute']);

app.config(function($routeProvider,$locationProvider) {
  $routeProvider
  .when('/', {
      templateUrl : 'template/home_event.html',
      controller : 'HomeCtrl'
  })
  .when('/search-event/:countryCode', {
      templateUrl : 'template/find_events.html',
      controller: 'EventCtrl'
  })
  
  .when('/show-event/:eventId', {
      templateUrl : 'template/list_events.html',
      controller: 'EventResultsCtrl'
  })
  .when
});