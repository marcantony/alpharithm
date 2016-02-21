angular.module('exchange', ['ngVis'])
	.config(function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: '/html/exchange.html',
			controller: 'ExchangeCtrl'
		});
	})
	.controller('ExchangeCtrl', function ($scope) {
		$scope.in = {};
	})
;
