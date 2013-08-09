function PhoneListCtrl ($scope, $http) {
	$http.get('data/phones.json').success(function (data) {
		$scope.phones = data;
	});
	$scope.orderProp = 'age';
}

function PhoneDetailCtrl ($scope, $routeParams, $http) {
	$http.get('data/' + $routeParams.phoneId + '.json').success(function (data) {
		$scope.phone = data;
	});
	//$scope.phoneId = $routeParams.phoneId;
}
