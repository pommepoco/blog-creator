module.controller("BlogsCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    console.log("blogsCtrl");
    $rootScope.host = window.location.host;

    // Get all blogs
    $http.get("/blog")
      .success(function(data) {
        $scope.blogs = data.blogs;
      }).error(function() {
        alert("une erreur c'est produite");
      });

    // Add blog
    $scope.addBlog = function() {
      console.log($rootScope.user);
      $scope.newBlog.managers = [$rootScope.user];
      $http.post("/blog", $scope.newBlog)
        .success(function (data) {
          console.log(data);
        }).error(function (data) {
          alert("Une erreur est survenu");
        });
      };

    // Remove blog
    $scope.deleteBlog = function(blogId) {
      $http.delete("/blog/" + blogId).success(function(data) {
        console.log(data);
        $http.get("/blog")
          .success(function(data) {
            $scope.blogs = data.blogs;
          }).error(function() {
            alert("une erreur c'est produite");
          });
      }).error(function(data) {
        console.log(data);
        alert("une erreur est survenu");
      });
    };
    }
]);