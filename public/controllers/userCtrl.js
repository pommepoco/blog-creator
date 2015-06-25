
module.controller("UserCtrl", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    console.log("userCtrl");
  	$http.get("/users")
			.success(function(data) {
				$scope.users = data.users;
			}).error(function(data) {
				console.log(data);
			});

		$scope.inscriptionSubmit = function() {
  		$http.post("/users", $scope.user)
	  		.success(function(data) {
					//$scope.users = data.users;
	  		})
	  		.error(function(data) {
	  			alert("Une erreur c'est produite.");
	  		});
  	};
  }
]);