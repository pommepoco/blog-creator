
module.controller("SessionCtrl", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    console.log("userCtrl");
    $scope.user = {};
  	$http.post("/users").success(function(data) {
  		$scope.users = data;
  	});

  $scope.logout = function() {
    req.cookies.auth = null;
    $http.delete("/session").success(function(data) {
      $rootScope.auth = false;
    });
  };
]);