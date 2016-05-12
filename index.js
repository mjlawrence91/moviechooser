require.config({
	baseUrl: '/'
,	waitSeconds: 0
,	paths: {
		'jquery': 'https://code.jquery.com/jquery-2.2.3.min'
	,	'backbone': 'http://backbonejs.org/backbone-min'
	,	'localstorage': 'https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min'
	,	'underscore': 'http://underscorejs.org/underscore-min'
	,	'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'
	}
,	shim: {
		'bootstrap': ['jquery']
	,	'backbone': {
			deps: ['jquery', 'underscore']
		,	exports: 'Backbone'
		}
	,	'localstorage': {
			deps: ['backbone']
		,	exports: 'Store'
		}
	}
});

require(['main'], function (App)
{
	window.App = App;
});
