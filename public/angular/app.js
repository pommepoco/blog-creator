/**
 * Created by hugoarru on 20/05/15.
 */
var module = angular.module("blog-creator", ['ngRoute']);

module.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/home.html',
        controller: 'UserCtrl'
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