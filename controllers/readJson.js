var readData = angular.module('myApp.readJson',[]);

readData.controller('readJsonController', ['$scope','$http' ,function($scope,$http){
	$scope.showData = function(){
		var promise = $http.get('https://api.myjson.com/bins/4fcqf');

	promise.success(function(data){
		//console.log(data);
		console.log(data.prompt);
		for (var i = 0; i < data.prompt.length; i++) {
			$scope.control = data.prompt[i];
			if ($scope.control.dispType == 'textfield') {
					$scope.showtextfield = true;
			}
		}
	});
	promise.error(function(data,status,error,config){
		console.log("Its an error" , data);
	});


	};
	

	$scope.showControls = function(){
		console.log(jsondata);
	}

}]);