module.controller("BlogsCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    console.log("blogCtrl");
    $rootScope.host = window.location.host;
    $http.get("/blog")
      .success(function(data) {
        $scope.blogs = data.blogs;
        console.log($scope.blogs);
      }).error(function() {
        alert("une erreur c'est produite");
      });
  }
]);