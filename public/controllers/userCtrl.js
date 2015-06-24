
module.controller("UserCtrl", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    console.log("userCtrl");
    $scope.user = {};
  	$http.post("/users").success(function(data) {
  		$scope.users = data;
  	});
  	$scope.inscriptionSubmit = function() {
  		$http.post("/users", $scope.user)
	  		.success(function(data) {
	  			console.log(data);
	  		})
	  		.error(function(data) {
	  			console.log(data);
	  		});
  	};
  	$scope.loginSubmit = function() {
  		$http.post("/session", $scope.user)
	  		.success(function(data) {
	  			console.log(data);
	  		})
	  		.error(function(data) {
	  			console.log(data);
	  		});
  	};
  }
]);