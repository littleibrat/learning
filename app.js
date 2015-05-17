var app = angular.module('Routely', ['ngRoute', 'ngResource']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: 'partials/route-list.html',
      controller: 'MainCtrl'
    })
    .otherwise({
        redirectTo: 'home'
    });

  
}]);

app.factory('routes', ['$resource',
function($resource){
    return $resource('http://ulkkd6869c01.littleibrat.koding.io:3000/routes/:_id', {}, {
      query: {method:'GET',  params: {id: '@_id'}, isArray:true},
      delete: {method:'DELETE', params: {id: '@_id'}},
      update: {method:'PUT', isArray:true},
    });

}]);
app.factory('route', ['$resource',
function($resource){
    return $resource('http://ulkkd6869c01.littleibrat.koding.io:3000/routes/', {}, {
      show: {method:'GET', isArray:true},
      create: { method: 'POST', 
                isArray: false,
                headers: {'Content-Type':'application/x-www-form-urlencoded;' }
          
      }//, params: {name: '@name', description: '@description', upvotes: '@upvotes'}}
    });

}]);

app.controller('MainCtrl', [
'$scope',
'routes',
'route',
function($scope, routes, route){
 $scope.routes = route.show();
$scope.addRoute = function(newroute){
    if( !newroute.name || newroute.name === '') { return; }
    //console.log(newroute);
  route.create(//{
  $.param({
      //newroute
      name: newroute.name, 
      descrition: newroute.description,
      upvotes: 0
      })
      )
      //).$promise.then(function(){
        $scope.routes = route.show();  
      //});
      //);
  $scope.name = '';
  $scope.description = '';
   
};

$scope.deleteRoute = function(id){
     routes.delete({ _id: id }).$promise.then(function(){
        $scope.routes = route.show(); 
     });
    
   // });
};

$scope.incrementUpvotes = function(route) {
  route.upvotes += 1;
};

}]);

