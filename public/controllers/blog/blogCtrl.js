module.controller("BlogCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    $rootScope.host = window.location.host;
    $http.get("/blog/current")
      .success(function(data) {
        $scope.blog = data.blog;
      }).error(function() {
        alert("une erreur c'est produite");
      });

    // Get connected user
    $http.get("/session", function(data) {
      $scope.user = data;
    });

    // Commment CRUD
    $scope.addComment = function(article) {
      article.comment = {
        content: article.newComment

      };
    };

    $scope.deleteComment = function(article, comment) {
      _.remove(article.comment, function(n) {
        return n._id === comment._id;
      });
      putBlog();
    };

    // Article CRUD
    $scope.postDelete = function(article) {
      _.remove($scope.blog.articles, function(n) {
        return n._id === article._id;
      });
      putBlog();
    };

    $scope.addPost = function() {
      $scope.blog.articles.push($scope.newPost);
      putBlog();
    };

    function putBlog() {
      $http.put("/blog/" + $scope.blog._id, $scope.blog)
        .success(function(data) {
        } ).error(function() {
          alert("une erreur c'est produite");
        });
    }
  }
]);