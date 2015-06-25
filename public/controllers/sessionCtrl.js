
module.controller("sessionCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  "$q",
  function ($scope, $http, $location, $rootScope, $q) {
    console.log("SessionCtrl");
    window.rootScope = $rootScope;
    $rootScope.isAuth = $.cookie("auth") === "true";
    $scope.loginUser = {};

    // get the connected user
    $http.get("/session")
      .success(function(data) {
        $rootScope.user = data.user;
      }).error(function(data) {
        alert("Une erreur est survenu");
      });

    $scope.loginSubmit = function() {
      console.log($scope.loginUser);
      $http.post("/session", $scope.loginUser)
      .success(function(data) {
        $rootScope.isAuth = true;
        $rootScope.user = data.user;
        $location.path("/");
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.logout = function() {
      $http.delete("/session")
        .success(function() {
          $rootScope.isAuth = false;
        });
    };

    $rootScope.getSession = function() {
      $http.get("/session")
        .success(function(data) {
          console.log(data);

        }).error(function() {
          alert("Une erreur est survenue");
        });
    }
  }
  ]);