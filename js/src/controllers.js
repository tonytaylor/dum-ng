function PhoneListCtrl($scope, $http) {
	$http.get('data/phones.json').success(function (data) {
		$scope.phones = data;
	});
	$scope.orderProp = 'age';
}
