
module.controller("sessionCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  "httpq",
  function ($scope, $http, $location, $rootScope, httpq) {
    console.log("SessionCtrl");
    $scope.user = {};
    $http.post("/users").success(function(data) {
      $scope.users = data;
      $rootScope.isAuth = document.cookie.auth;
    }).error(function(data) {
      console.log(data);
    });

    $scope.loginSubmit = function() {
      $http.post("/session", $scope.user)
      .success(function(data) {
        console.log(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.logout = function() {
      console.log("il y passe");
      httpq.delete("/session").then(function(data) {
        console.log(data);
        $rootScope.auth = false;
      });
    }
  }
  ]);