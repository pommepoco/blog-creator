module.controller("BlogCtrl", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    $rootScope.host = window.location.host;
    console.log("BlogCtrl");
    $http.get("/blog/current")
      .success(function(data) {
        $scope.blog = data.blog;
      }).error(function() {
        alert("une erreur c'est produite");
      });
    $scope.addPost = function() {
      $scope.blog.articles.push($scope.newPost);
      $http.put("/blog", $scope.blog)
        .success().error(function() {
          alert("une erreur c'est produite");
        });
    }
  }
]);