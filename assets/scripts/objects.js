const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (searchMovie = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';
    const movieFilter = !searchMovie ? movies : movies.filter(movie => movie.info.title.includes(searchMovie));

    movieFilter.forEach((movie) => {
        const movieEl = document.createElement('li');
        const { info, ...otherProp } = movie;
        console.log(otherProp)
        let text = movie.getFormattedTitle() + '-';

        for (const key in info) {
            if (key !== 'title') {
                text = text + `${key}:${info[key]}`
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);
    });
};
// const movieRander = () => {
//     const movieList
// }

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (
        title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === ''
    ) {
        return;
    }

    const newMovie = {
        info: {
            title,
            [extraName]: extraValue
        },
        id: Math.random(),
        getFormattedTitle: function() {
            return this.info.title.toUpperCase();
        }
    };

    movies.push(newMovie);
    renderMovies();
};

const searchMovieHnadler = () => {
    const searchTerm = document.getElementById('filter-title').value;
    renderMovies(searchTerm);
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHnadler);