module.controller("BlogsCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    console.log("blogsCtrl");
    $scope.newBlog = {};
    $rootScope.host = window.location.host;

    window.newBlog = $scope.newBlog;
    // Get all blogs
    getBlog();
    function getBlog() {
      $http.get("/blog")
        .success(function (data) {
          $scope.blogs = data.blogs;
        }).error(function () {
          alert("une erreur c'est produite");
        });
    }

    $scope.getMyBlogs = function() {
      var myblogs = [];
      if (!$scope.blogs) return [];
      $scope.blogs.forEach(function(element, index, array) {
        if (element.managers)
          element.managers.forEach(function(mElement, mIndex, mArray) {
            if (mElement && mElement.username && mElement.username === $rootScope.user.username)
              myblogs.push(element);
          });
      });
      return myblogs;
    };

    $scope.subdomainValid = function() {
      if (!$scope.newBlog.subDomain) return;
      $scope.newBlog.subDomain = decodeURI($scope.newBlog.subDomain);
      $scope.newBlog.subDomain = encodeURI($scope.newBlog.subDomain);
    };

    // Add blog
    $scope.addBlog = function() {
      $scope.newBlog.managers = [$rootScope.user];
      $http.post("/blog", $scope.newBlog)
        .success(function (data) {
          getBlog();
          $scope.newBlog = {};
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
            getBlog();
          }).error(function() {
            alert("une erreur est survenu");
          });
      }).error(function(data) {
        console.log(data);
        alert("une erreur est survenu");
      });
    };
    }
]);