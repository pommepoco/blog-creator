
module.controller("UserCtrl", [
  "$scope",
  "$http",
  "$location",
	"$rootScope",
  function ($scope, $http, $location, $rootScope) {
    console.log("userCtrl");
  	$http.get("/users")
			.success(function(data) {
				$scope.users = data.users;
			}).error(function(data) {
				console.log(data);
			});

		console.log($rootScope.isAuth);

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