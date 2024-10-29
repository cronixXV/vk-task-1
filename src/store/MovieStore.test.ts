import movieStore from './MovieStore';
import { fetchPopularMovies } from '../libs/fetchPopularMovies';

jest.mock('../libs/fetchPopularMovies', () => ({
  fetchPopularMovies: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        title: 'Mocked Movie 1',
        overview: '',
        poster_path: '',
        popularity: 10,
        release_date: '2023-01-01',
      },
      {
        id: 2,
        title: 'Mocked Movie 2',
        overview: '',
        poster_path: '',
        popularity: 20,
        release_date: '2022-01-01',
      },
    ])
  ),
}));

describe('MovieStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    movieStore.movies = [];
    movieStore.loading = false;
    movieStore.error = null;
    movieStore.sortBy = 'popularity';
  });

  it('должен загружать популярные фильмы и сортировать их', async () => {
    await movieStore.loadPopularMovies(1);

    expect(fetchPopularMovies).toHaveBeenCalledWith(1);
    expect(movieStore.movies).toHaveLength(2);
    expect(movieStore.movies[0].title).toBe('Mocked Movie 2'); // Проверка сортировки по популярности
    expect(movieStore.loading).toBe(false);
    expect(movieStore.error).toBeNull();
  });

  it('должен устанавливать ошибку при неудачной загрузке популярных фильмов', async () => {
    (fetchPopularMovies as jest.Mock).mockRejectedValue(
      new Error('Ошибка загрузки')
    );

    await movieStore.loadPopularMovies(1);

    expect(movieStore.movies).toEqual([]);
    expect(movieStore.loading).toBe(false);
    expect(movieStore.error).toBe('Ошибка загрузки');
  });

  it('должен редактировать существующий фильм', () => {
    movieStore.movies = [
      {
        id: 1,
        title: 'Original Movie',
        overview: '',
        poster_path: '',
        popularity: 10,
        release_date: '2023-01-01',
      },
    ];

    movieStore.editMovie(1, { title: 'Updated Movie' });
    expect(movieStore.movies[0].title).toBe('Updated Movie');
  });

  it('должен удалять фильм по идентификатору', () => {
    movieStore.movies = [
      {
        id: 1,
        title: 'Mocked Movie 1',
        overview: '',
        poster_path: '',
        popularity: 10,
        release_date: '2023-01-01',
      },
      {
        id: 2,
        title: 'Mocked Movie 2',
        overview: '',
        poster_path: '',
        popularity: 20,
        release_date: '2022-01-01',
      },
    ];

    movieStore.deleteMovie(1);
    expect(movieStore.movies).toHaveLength(1);
    expect(movieStore.movies[0].id).toBe(2);
  });

  it('должен устанавливать критерий сортировки и сортировать фильмы', () => {
    movieStore.movies = [
      {
        id: 1,
        title: 'Mocked Movie 1',
        overview: '',
        poster_path: '',
        popularity: 10,
        release_date: '2023-01-01',
      },
      {
        id: 2,
        title: 'Mocked Movie 2',
        overview: '',
        poster_path: '',
        popularity: 20,
        release_date: '2022-01-01',
      },
    ];

    movieStore.setSortBy('release_date');
    expect(movieStore.sortBy).toBe('release_date');
    expect(movieStore.movies[0].release_date).toBe('2023-01-01');
  });

  it('должен сортировать фильмы по популярности и дате выхода', () => {
    movieStore.movies = [
      {
        id: 1,
        title: 'Mocked Movie 1',
        overview: '',
        poster_path: '',
        popularity: 10,
        release_date: '2023-01-01',
      },
      {
        id: 2,
        title: 'Mocked Movie 2',
        overview: '',
        poster_path: '',
        popularity: 20,
        release_date: '2022-01-01',
      },
    ];

    movieStore.setSortBy('popularity');
    expect(movieStore.movies[0].popularity).toBe(20);

    movieStore.setSortBy('release_date');
    expect(movieStore.movies[0].release_date).toBe('2023-01-01');
  });

  it('должен вернуть 0 при неизвестном значении sortBy', () => {
    // Устанавливаем нестандартное значение sortBy
    (movieStore as any).sortBy = 'unknown';

    const movieA = {
      id: 1,
      title: 'Movie A',
      popularity: 10,
      overview: '',
      poster_path: '',
      release_date: '2023-01-01',
    };
    const movieB = {
      id: 2,
      title: 'Movie B',
      popularity: 15,
      overview: '',
      poster_path: '',
      release_date: '2022-01-01',
    };

    // Добавляем фильмы для сортировки
    movieStore.movies = [movieA, movieB];

    // Выполняем сортировку
    movieStore.sortMovies();

    // Проверяем, что порядок остался неизменным, т.е. сортировка вернула 0
    expect(movieStore.movies).toEqual([movieA, movieB]);
  });
});
