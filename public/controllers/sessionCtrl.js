
module.controller("sessionCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  "$q",
  function ($scope, $http, $location, $rootScope, $q) {
    console.log("SessionCtrl");
    $rootScope.user = {};
    window.rootScope = $rootScope;
    $rootScope.isAuth = $.cookie("auth") === "true";

    // get the connected user
    $http.get("/session")
      .success(function(data) {
        $rootScope.user = data;
      }).error(function(data) {
        alert("Une erreur est survenu");
      });

    $scope.loginSubmit = function() {
      $http.post("/session", $scope.user)
      .success(function(data) {
        $rootScope.isAuth = true;
        console.log(data);
        $rootScope.user = {};
        $location.path("/");
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.logout = function() {
      $http.get("/session")
        .success(function() {
          $rootScope.isAuth = false;
        });
    }
  }
  ]);