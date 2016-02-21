angular.module('app', ['ngRoute', 'exchange'])
	.config(function ($locationProvider) {
		$locationProvider.html5Mode(true);
	})
;
