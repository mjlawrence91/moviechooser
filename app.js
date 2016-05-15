const App = (function ()
{
	const selectContainer = $('#selection');
	const tplHtml = $('#list').html();

	function init()
	{
		$('form').on('submit', addMovie);

		const movies = fetchMovies();
		render(movies);
	}

	function fetchMovies()
	{
		const moviesString = localStorage.getItem('movies');
		return JSON.parse(moviesString);
	}

	function savetoStore(newMovie)
	{
		const movieList = fetchMovies();
		const isUnique = _.isEmpty(movieList.filter(movie => movie.name === newMovie.name));

		if (isUnique)
		{
			movieList.push(newMovie);

			const moviesString = JSON.stringify(movieList);
			localStorage.setItem('movies', moviesString);
		}
	}

	function render(movies, selection)
	{
		selection = selection || 'Click Choose to select random idea...';

		const renderSelectView = _.template(tplHtml);
		const html = renderSelectView({selection, movies});
		selectContainer.html(html);

		if (movies.length)
		{
			$('#choose').click(chooseRandom);
			$('a.remove').click(removeMovie);
		}
	}

	function addMovie(e)
	{
		if (e) e.preventDefault();

		const formData = $(e.target).serializeArray();
		const movieName = formData[0].value;

		if (movieName)
		{
			const newModel = {name: movieName};
			savetoStore(newModel);

			$('input[name=movie]').val('');
			render(fetchMovies());
		}
	}

	function chooseRandom(e)
	{
		if (e) e.preventDefault();

		const movies = fetchMovies();

		const rand = Math.floor(Math.random() * movies.length);
		const {name} = movies[rand];

		render(movies, name);
	}

	function removeMovie(e)
	{
		if (e) e.preventDefault();

		const movieToDelete = $(e.target).parent().prev().html();
		removeFromStore({name: movieToDelete});
		render(fetchMovies());
	}

	function removeFromStore(movieToDelete)
	{
		const movies = fetchMovies();
		const moviesWithoutRemoved = _(movies).reject(movie => movie.name === movieToDelete.name);

		const moviesString = JSON.stringify(moviesWithoutRemoved);
		localStorage.setItem('movies', moviesString);
	}

	return {
		init
	,	fetchMovies
	,	render
	,	savetoStore
	,	removeFromStore
	,	chooseRandom
	};
})();

$(document).ready(App.init);
