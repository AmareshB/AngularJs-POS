var readData = angular.module('myApp.readJson',[]);

readData.controller('readJsonController', ['$scope','$http','$sce' ,function($scope,$http,$sce){
	$scope.showData = function(){
		var result = $http.get('https://api.myjson.com/bins/12iz1');
		result.success(function(data){
			console.log(data.prompt);
			var htmlContent = '';
			for (var i = 0; i < data.prompt.length; i++) {
				htmlContent += genControls(data.prompt[i] , data);
			}
			$scope.htmlContent = $sce.trustAsHtml(htmlContent);
		});
		result.error(function(data,status,error,config){
			console.log("It's an error" , data);
		});
	};

	var genControls = function(prompt,responseData) {
		var control , htmlContent = '';
				control = prompt;
				if (control.dispType == 'textfield') {
					htmlContent = genText(prompt , responseData);
				} else if(control.dispType === 'radio') {
					htmlContent = genRadio(prompt , responseData);
				} else if (control.dispType === 'button') {
					htmlContent = genButton(prompt , responseData);
				}
			
		return htmlContent;	
	}
	var genText = function(prompt,responseData) {
		var htmlContent = '<div>' + prompt.label+' : <input type="text" name='+prompt.label+'>' + '</div>';
		if(prompt.target!== ''){
			var target = prompt.target;
			htmlContent += showTarget(target,responseData);
		}
		console.log('htmlContent : ' + htmlContent);
		return htmlContent;
	}

	var genRadio = function(prompt,responseData) {
		var htmlContent = '<h3 id ='+prompt.id+' >'+ prompt.content+'</h3>';
		var answer = prompt.answers.answer;
		for(var i =0; i< answer.length;i++) {
			console.log('No of answers');
			htmlContent += '<input type = "radio" id = "'+answer[i].id+'"name = "'+prompt.answers.id+
			'"value="'+answer[i].value+'"">'+answer[i].content+'</input><br/>';
		}

		if(prompt.target!== ''){
			var target = prompt.target;
			htmlContent += showTarget(target,responseData);
		}

  		return htmlContent;
	}

	var genButton = function(prompt,responseData){
		var htmlContent = '<input type = "button" id="'+prompt.id+'"value = "'+prompt.content+'">';

			if(prompt.target!== ''){	/*Change isempty check for target as its undefined sometimes*/
			var target = prompt.target;
			htmlContent += showTarget(target,responseData);
		}

		return htmlContent;
	}
	 var showTarget = function(target,responseData) {
	 	var targetHtmlContent = '';
	 	for (var i = 0; i < responseData.prompt.length; i++) {
	 		if(responseData.prompt[i].id === target ) {
	 			targetHtmlContent = genControls(responseData.prompt[i],responseData);
	 		}
	 	}
	 }

	$scope.showControls = function(){
		console.log(jsondata);
	}

}]);