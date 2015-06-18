
module.controller("UserCtrl", [
  "$scope",
  "$rootScope",
  "$cookies",
  "$cookieStore",
  "$http",
  "$location",
  function ($scope, $rootScope, $cookies, $cookieStore, $http, $location) {
    $scope.login = {
      email: "",
      password: ""
    };
    $scope.newUser = {};
    $scope.register = function() {
      $.post("/users", $scope.newUser, function(data) {
        if (data.res === true) {
          $cookieStore.put("auth", true);
          window.location.hash = "#/";
        }
        else if (data.error) {
          // TODO switch for error messages
          alert(data.error.message);
        }
      });
    };
    $scope.logout = function() {
      $http.delete("/session").success(function(data) {
        $cookieStore.put("auth", false);
        $rootScope.auth = false;
      });
    };
    if ($location.path() === "/logout") $scope.logout();
    else if (($location.path() === "/login" || $location.path() === "/register")) {
      $http.get("/session").success(function(data) {
        $rootScope.auth = data;
        if (data.authentificated) {
          window.location.hash = "#/";
        }
      });
    }
    $scope.sendLogin = function() {
      $.post("/session", $scope.login, function (data) {
        console.log(data);
        if (data.user.authentificated === true) {
          $rootScope.auth = data;
          window.location.hash = "#/";
        }
      });
    };
  }
]);