define(['backbone', 'localstorage'], function (Backbone)
{
	const App = {
		collection: Backbone.Collection.extend({
			model: new Backbone.Model()
		,	localStorage: new Backbone.LocalStorage('Movies')
		})
	,	views: []
	,	router: Backbone.Router.extend({
			routes: {
				'': ''
			,	'/add': ''
			}
		})
	};

	// const 

	Backbone.history.start();

	return App;
});
