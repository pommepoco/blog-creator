/**
 * Created by hugoarru on 20/05/15.
 */
var module = angular.module("WarGame", ['ngRoute', 'ngCookies']);

module.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/home.html',
        controller: 'GameCtrl'
      })
      .when("/login", {
        templateUrl: "/templates/login.html",
        controller: "UserCtrl"
      })
      .when("/game/:id", {
        templateUrl: "/templates/game.html",
        controller: "GameCtrl"
      })
      .when("/register", {
        templateUrl: "/templates/register.html",
        controller: "UserCtrl"
      })
      .when("/logout", {
        templateUrl: "/templates/logout.html",
        controller: "UserCtrl"
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);