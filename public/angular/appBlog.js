/**
 * Created by hugoarru on 20/05/15.
 */
var module = angular.module("blog-creator", ['ngRoute']);

module.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/blog/home.html',
        controller: 'BlogCtrl'
      })
      .when("/login", {
        templateUrl: "/templates/login.html",
        controller: "UserCtrl"
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

module.filter('reverse', function() {
  return function(items) {
    if (items)
    return items.slice().reverse();
  };
});