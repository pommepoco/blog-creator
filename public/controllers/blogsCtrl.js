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
      $scope.blogs.forEach(function(blog, index, array) {
        if (_.isArray(blog.managers)) {
          blog.managers.forEach(function (manager, mIndex, mArray) {
            if (
              _.isObject(manager)
              && manager.username
              && $rootScope.user
              && $rootScope.user.username
              && manager.username === $rootScope.user.username)
              myblogs.push(blog);
          });
        }
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
        getBlog();
      }).error(function(data) {
        console.log(data);
        alert("une erreur est survenu");
      });
    };
    }
]);