var readData = angular.module('myApp.readJson',[]);

readData.controller('readJsonController', ['$scope','$http','$sce' ,function($scope,$http,$sce){
	$scope.showData = function(){
		var promise = $http.get('https://api.myjson.com/bins/4fcqf');
		promise.success(function(data){
			//console.log(data);
			console.log(data.prompt);
			for (var i = 0; i < data.prompt.length; i++) {
				$scope.control = data.prompt[i];
				if ($scope.control.dispType == 'textfield') {
						$scope.showtextfield = true;
						$scope.htmlContent = genText(data.prompt[i]);
				}
			}
		});
		promise.error(function(data,status,error,config){
			console.log("Its an error" , data);
		});
	};
	var genText = function(prompt) {
		var htmlContent = '<div>' + prompt.label+' : <input type="text" name='+prompt.label+'>' + '</div>';
		console.log('htmlContent : ' + htmlContent);
		return $sce.trustAsHtml(htmlContent);

	}
	

	$scope.showControls = function(){
		console.log(jsondata);
	}

}]);