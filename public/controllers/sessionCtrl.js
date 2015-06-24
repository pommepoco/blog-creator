
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
        console.log(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.logout = function() {
      console.log("il y passe");
      var name = null; 
      var deferred = $q.defer();
      $http.delete("/session").success(function(data) {
        $rootScope.auth = false;
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  }
  ]);