
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
    $rootScope.user = {};
    $scope.loginUser = {};

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
        .success(function(data) {
          $rootScope.isAuth = false;
          $rootScope.getSession();
        });
    };

    $rootScope.getSession = function() {
      $http.get("/session")
        .success(function(data) {
          console.log(data);
          $rootScope.user = data.user === null ? {} : data.user;
          $rootScope.user.id = $rootScope.user._id;
          delete $rootScope.user._id;
          if ($location.path() === "/register")
            $location.path("/");
          $rootScope.isAuth = data.authentificated !== undefined ? data.authentificated : false;
          console.log(data, $rootScope.isAuth);
        }).error(function() {
          alert("Une erreur est survenue");
        });
    };

    // get the connected user
    $rootScope.getSession();
  }
  ]);