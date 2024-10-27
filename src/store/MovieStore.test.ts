import MovieStore from './MovieStore';

describe('MovieStore', () => {
  it('loads popular movies', async () => {
    await MovieStore.loadPopularMovies(1);
    expect(MovieStore.movies.length).toBeGreaterThan(0);
  });

  it('edits a movie', () => {
    const movie = {
      id: 1,
      title: 'Movie 1',
      overview: 'Overview 1',
      poster_path: '',
      popularity: 0,
      release_date: '',
    };
    MovieStore.movies = [movie];

    MovieStore.editMovie(1, { title: 'Updated Title' });

    expect(MovieStore.movies[0].title).toBe('Updated Title');
  });

  it('deletes a movie', () => {
    const movie = {
      id: 1,
      title: 'Movie 1',
      overview: 'Overview 1',
      poster_path: '',
      popularity: 0,
      release_date: '',
    };
    MovieStore.movies = [movie];

    MovieStore.deleteMovie(1);

    expect(MovieStore.movies.length).toBe(0);
  });
});
