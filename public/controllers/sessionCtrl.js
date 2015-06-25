
module.controller("sessionCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  "$q",
  function ($scope, $http, $location, $rootScope, $q) {
    console.log("SessionCtrl");
    $scope.user = {};
    window.rootScope = $rootScope;
    $rootScope.isAuth = $.cookie("auth") === "true";

    $scope.loginSubmit = function() {
      $http.post("/session", $scope.user)
      .success(function(data) {
        $rootScope.isAuth = true;
        console.log(data);
        $scope.user = {};
        $location.path("/");
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.logout = function() {
      var defered = $q.defer();
      $http.get("/session")
        .success(function() {
          $rootScope.isAuth = false;
        });
    }
  }
  ]);