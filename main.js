define(['backbone', 'underscore', 'jquery', 'localstorage'], function (Backbone, _, $)
{
	const Collection = Backbone.Collection.extend({
		model: new Backbone.Model()
	,	localStorage: new Backbone.LocalStorage('Movies')
	});

	const Router = Backbone.Router.extend({
		initialize: function ()
		{
			const collection = new App.Collection();

			const selection = new App.views.SelectionView(collection);
			selection.render();
		}
	});

	const SelectionView = Backbone.View.extend({
		initialize: function ()
		{
			$('form').on('submit', this.addMovie);
		}

	,	el: '#selection'

	,	template: _.template($('#list').html())

	,	events: {
			'click #choose': 'chooseRandom'
		}

	,	addMovie: function (e)
		{
			e.preventDefault();
			console.log('Add button clicked', e)

		}

	,	chooseRandom: function (e)
		{
			e.preventDefault();
			// console.log('Choose button clicked')

			const random = this.collection.sample();
			console.log(random);

		}

	,	render: function ()
		{
			this.$el.html(this.template({test: 'Hello World', movies: []}));
			return this;
		}
	});

	const App = {
		Collection

	,	views: {
			SelectionView
		}

	,	Router
	};

	return App;
});
