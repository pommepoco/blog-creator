module.controller("BlogsCtrl", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    console.log("blogCtrl");
    $http.get("/blog")
      .success(function(data) {
        $scope.blogs = data.blogs;
        console.log($scope.blogs);
      }).error(function() {
        alert("une erreur c'est produite");
      });
  }
]);