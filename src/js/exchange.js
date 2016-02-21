angular.module('exchange', ['ngVis'])
	.config(function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: '/html/exchange.html',
			controller: 'ExchangeCtrl'
		});
	})
	.controller('ExchangeCtrl', function ($scope, VisDataSet, ExchangeFactory) {
		$scope.currencyRegex = /^[0-9]*(?:\.[0-9]{2})?$/;
		$scope.input = {};
		$scope.graph = {
			data: {},
			options: {},
			events: {}
		};

		$scope.submit = function () {
			ExchangeFactory.getCurrentBestExchanges().then(function (data) {
				var edges = [], nodes = [];

				for(var i = 0; i < data.currencies.length; i++) {
					var id = data.currencies[i];
					nodes.push({
						id: id,
						label: ExchangeFactory.getLabel(id)
					});
				}

				for(var i = 0; i < data.exchanges.length; i++) {
					var exchange = data.exchanges[i];
					edges.push({
						from: exchange.from,
						to: exchange.to,
						label: exchange.rate,
						arrows: 'to'
					});
				}

				$scope.graph.data = {
					nodes: new VisDataSet(nodes),
					edges: new VisDataSet(edges)
				};
			});
		};
	})
	.factory('ExchangeFactory', function ($q) {
		return {
			getCurrentBestExchanges: function () {
				var deferred = $q.defer();

				setTimeout(function () {
					deferred.resolve({
						"currencies": [1, 2, 3, 4],
						"exchanges": [
							{ from: 1, to: 2, rate: 1.05 },
							{ from: 2, to: 4, rate: 0.979 },
							{ from: 4, to: 3, rate: 1.00323 },
							{ from: 3, to: 1, rate: 0.99 }
						]
					});
				}, 200);

				return deferred.promise;
			},
			getLabel: function (id) {
				switch(id) {
					case 1:
						return 'USD';
					case 2:
						return 'GBP';
					case 3:
						return 'EUR';
					case 4:
						return 'JPY';
				}
				return 'INV';
			}
		};
	})
;
