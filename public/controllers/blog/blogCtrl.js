module.controller("BlogCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    $rootScope.host = window.location.host;
    $scope.newPost = {};

    $rootScope.getCurBlog = function() {
      $http.get("/blog/current")
        .success(function(data) {
          _.remove(data.blog.articles, function(n) {
            return n === null;
          });
          $rootScope.blog = data.blog;

          console.log($rootScope.blog);
        }).error(function() {
          alert("une erreur c'est produite");
        })
    };

    // Commment CRUD
    $scope.addComment = function(article) {
      console.log(article);
      article.comments = {
        content: article.newComment,
        author: $rootScope.user
      };
      putBlog();
    };

    $scope.deleteComment = function(article, comment) {
      _.remove(article.comment, function(n) {
        return n._id === comment._id;
      });
      putBlog();
    };

    // Article CRUD
    $scope.postDelete = function(article) {
      _.remove($rootScope.blog.articles, function(n) {
        return n._id === article._id;
      });
      putBlog();
    };

    $scope.addPost = function() {
      $rootScope.blog.articles.push($scope.newPost);
      console.log($rootScope.blog);
      putBlog();
    };

    function putBlog() {
      $http.put("/blog/" + $scope.blog._id, $scope.blog)
        .success(function(data) {
          $rootScope.getCurBlog();
        } ).error(function() {
          alert("une erreur c'est produite");
        });
    }

    $rootScope.getCurBlog();
  }
]);