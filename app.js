var app = angular.module('myApp',[]);

app.controller('testController', ['$scope', function($scope){
	$scope.change = function(){
		console.log('hello model',$scope.hello);
	}
	
}])
