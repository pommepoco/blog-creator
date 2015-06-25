module.controller("BlogsCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    console.log("blogCtrl");
    $rootScope.host = window.location.host;

    // Get all blogs
    $http.get("/blog")
      .success(function(data) {
        $scope.blogs = data.blogs;
        console.log($scope.blogs);
      }).error(function() {
        alert("une erreur c'est produite");
      });

    // Add blog
    $scope.addBlog = function() {
      $http.post("/blog", $scope.newBlog)
        .success(function (data) {
          console.log(data);
        }).error(function (data) {
          alert("Une erreur est survenu");
        });
      }
    }
]);