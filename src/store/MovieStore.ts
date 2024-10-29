import { makeAutoObservable, runInAction } from 'mobx';
import { fetchPopularMovies } from '../libs/fetchPopularMovies';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  popularity: number;
  release_date: string;
}

class MovieStore {
  movies: Movie[] = [];
  loading = false;
  error: string | null = null;
  page = 1;
  query = '';
  sortBy: 'popularity' | 'release_date' = 'popularity';

  constructor() {
    makeAutoObservable(this);
  }

  editMovie = (id: number, updatedMovie: Partial<Movie>) => {
    this.movies = this.movies.map((movie) =>
      movie.id === id ? { ...movie, ...updatedMovie } : movie
    );
  };

  deleteMovie = (id: number) => {
    this.movies = this.movies.filter((movie) => movie.id !== id);
  };

  loadPopularMovies = async (page: number) => {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });
    try {
      const data = await fetchPopularMovies(page);
      runInAction(() => {
        this.movies = page === 1 ? data : [...this.movies, ...data];
        this.sortMovies();
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error
            ? error.message
            : 'Ошибка при загрузке популярных фильмов';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  setSortBy = (sortBy: 'popularity' | 'release_date') => {
    this.sortBy = sortBy;
    this.sortMovies();
  };

  sortMovies = () => {
    this.movies.sort((a, b) => {
      if (this.sortBy === 'popularity') {
        return b.popularity - a.popularity;
      } else if (this.sortBy === 'release_date') {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      }
      return 0;
    });
  };
}

export default new MovieStore();
