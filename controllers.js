var routeControllers = angular.module('routeControllers', []);

routeControllers.controller('MainCtrl', [
'$scope',
'routes',
function($scope, routes){
 $scope.routes = routes.query();
$scope.addRoute = function(newroute){
    if( !newroute.name || newroute.name === '') { return; }
    //console.log(newroute);
  $scope.route = new routes();
  $scope.route = angular.copy(newroute);
  routes.save($scope.route, function(){
      //Save the record
  }).$promise.then(function(){
        $scope.routes = routes.query(); 
          $scope.name = '';
        $scope.description = '';
      });
};

$scope.deleteRoute = function(id){
     routes.delete({ _id: id }).$promise.then(function(){
        $scope.routes = routes.query(); 
     });
};

//$scope.editRouteView = function(id){
 //   $location.path('/route/' + id);
//};

$scope.incrementUpvotes = function(id) {
      $scope.route = routes.save({_id:id, action:'upvote'}, function(){
  }).$promise.then(function(){
       $scope.routes = routes.query(); 
  });
};


}]);

routeControllers.controller('RouteCreateCtrl', [
'$scope',
'$routeParams',
'routes',
'$filter',
'$window',
function($scope, $routeParams, routes, $filter, $window){
    if ($routeParams.id){
        
        $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
        
        $scope.route = routes.get({_id:$routeParams.id}, function(route) {
        
        route.plannedDate = route.plannedDate === null ? null : new Date($filter('date')(route.plannedDate, 'shortDate'));
        });
  
      $scope.header = "Edit";
      $scope.buttonText = "Save";
      
    
      
      
      
    } else {
        $scope.date = new Date();
        $scope.header = "Create";
        $scope.buttonText = "Create";
    }
 $scope.check = function(route){
     //console.log($scope.route);
       if(route._id){
           saveRoute($scope.route);
       }else{
           addRoute(route);
       }
   }
    
function addRoute(route){
    if( !route.name || route.name === '') { return; }
    //console.log(newroute);
  $scope.newroute = new routes();
  $scope.newroute = angular.copy(route);
  routes.save($scope.newroute, function(){
      //Save the record
  }).$promise.then(function(){
       $window.location.href = '#/Home';
       // $scope.routes = routes.query(); 
        //  $scope.name = '';
       // $scope.description = '';
      });
}

    function saveRoute(route){
       //console.log("this: ", route);
    var routely = angular.copy(route);
    var theid = routely._id;
    //console.log(routely.plannedDate);
    routely.plannedDate = routely.plannedDate === null ? null : new Date($filter('date')(routely.plannedDate, 'shortDate'));
    //console.log(routely.plannedDate);
    routely.updated_at = new Date();
    delete routely._id;
    //delete routely.updated_at;
    //console.log(theid);
    
    routes.save({ _id : theid, action:'edit' }, routely).$promise.then(function(){
        //$scope.message = "Saved!"; 
        $window.location.href = '#/Home';
    });
    }

}]);
