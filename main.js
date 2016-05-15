define(['backbone', 'underscore', 'jquery', 'localstorage'], function (Backbone, _, $)
{
	const Collection = Backbone.Collection.extend({
		model: Backbone.Model
	,	localStorage: new Backbone.LocalStorage('Movies')
	,	initialize: function ()
		{
			const movies = this.fetchMovies();

			if (movies.length)
			{
				this.add(movies);
			}
		}

	,	fetchMovies: function ()
		{
			const moviesString = localStorage.getItem('movies');
			return JSON.parse(moviesString);
		}
	});

	const Router = Backbone.Router.extend({
		initialize: function ()
		{
			const collection = new App.Collection();
			const selection = new App.views.SelectionView({collection});
			selection.render();
		}
	});

	const SelectionView = Backbone.View.extend({
		initialize: function ()
		{
			$('form').on('submit', this.addMovie.bind(this));
			this.collection.on('add', this.render, this);
		}

	,	el: '#selection'

	,	template: _.template($('#list').html())

	,	events: {
			'click #choose': 'chooseRandom'
		}

	,	addMovie: function (e)
		{
			e.preventDefault();

			const formData = $(e.target).serializeArray();
			const movieName = formData[0].value;

			if (movieName)
			{
				const newModel = new Backbone.Model({name: movieName});
				this.collection.add(newModel);
				this.savetoStore();

				$('input[name=movie]').val('');
			}
		}

	,	savetoStore: function (collection)
		{
			const moviesString = JSON.stringify(this.collection.toJSON());
			localStorage.setItem('movies', moviesString);
		}

	,	chooseRandom: function (e)
		{
			e.preventDefault();

			const random = this.collection.sample();
			const movieName = random.get('name');
			this.render(movieName);
		}

	,	render: function (selection)
		{
			if (_.isObject(selection))
			{
				selection = null;
			}

			this.$el.html(this.template({
				selection: selection || ''
			,	movies: this.collection.toJSON()
			}));

			return this;
		}
	});

	const App = {
		Collection
	,	views: {SelectionView}
	,	Router
	};

	return App;
});
