
module.controller("sessionCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
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
      $http.delete("/session").success(function(data) {
        $rootScope.auth = false;
      });
    }
  }
  ]);