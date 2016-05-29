const App = (function ()
{
	const selectContainer = $('#selection');
	const listHtml = $('#list').html();
	const titleHtml = $('#title').html();

	function init()
	{
		//Add movie handler
		$('form').on('submit', addMovie);

		//Load movies and title, then render
		const movies = fetchMovies();
		render(movies);

		//Load stored title if one present
		const currentTitle = localStorage.getItem('title') || 'Movie Chooser';
		$('.title').text(currentTitle);

		//Make the title editable when double-clicked
		$('.title').on('dblclick', function (e)
		{
			$(e.target).attr('contenteditable', true).focus();
		});

		//Save the new title when the title loses focus
		$('.title').blur(function (e)
		{
			const newTitle = $(e.target).text();
			const storedTitle = localStorage.getItem('title') || 'Movie Chooser';

			if (newTitle)
			{
				if (newTitle !== storedTitle)
				{
					localStorage.setItem('title', newTitle);
				}
			}
			else
			{
				$(e.target).text(storedTitle);
			}

			$(e.target).attr('contenteditable', false);
		});

		//If title is editable and Enter is pressed, save title
		$(document).keypress(function (e)
		{
			if (e.keyCode === 13) //Enter
			{
				e.preventDefault();

				if ($('.title').is(':focus'))
				{
					$('.title').blur();
				}
			}
		});
	}

	function fetchMovies()
	{
		const moviesString = localStorage.getItem('movies');
		return JSON.parse(moviesString) || [];
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

		const renderSelectView = _.template(listHtml);
		const html = renderSelectView({selection, movies});
		selectContainer.html(html);

		const title = localStorage.getItem('title') || 'Movie Chooser';
		const renderTitleView = _.template(titleHtml);
		const newTitle = renderTitleView({title});
		$(newTitle).prependTo('.container:first-child');

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
