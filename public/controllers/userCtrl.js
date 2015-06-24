
module.controller("UserCtrl", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    console.log("userCtrl");
    $scope.user = {};
  	$scope.inscriptionSubmit = function() {
  		$http.post("/users", $scope.user)
	  		.success(function(data) {
	  			console.log(data);
	  		})
	  		.error(function(data) {
	  			console.log(data);
	  		});
  	};
  	
  }
]);