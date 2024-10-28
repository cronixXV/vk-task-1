import movieStore from './MovieStore';

describe('MovieStore', () => {
  beforeEach(() => {
    // Сбрасываем состояние перед каждым тестом
    movieStore.movies = [];
    movieStore.loading = false;
    movieStore.error = null;
    movieStore.page = 1;
    movieStore.query = '';
    movieStore.sortBy = 'popularity';
  });

  test('initial state is set correctly', () => {
    expect(movieStore.movies).toEqual([]);
    expect(movieStore.loading).toBe(false);
    expect(movieStore.error).toBeNull();
    expect(movieStore.page).toBe(1);
    expect(movieStore.query).toBe('');
    expect(movieStore.sortBy).toBe('popularity');
  });

  test('editMovie updates movie information correctly', () => {
    // Добавляем тестовые данные
    movieStore.movies = [
      {
        id: 1,
        title: 'Original Title',
        overview: '',
        poster_path: '',
        popularity: 10,
        release_date: '2023-01-01',
      },
    ];

    // Обновляем фильм
    movieStore.editMovie(1, { title: 'Updated Title' });

    // Проверяем, что данные обновились
    expect(movieStore.movies[0].title).toBe('Updated Title');
  });

  test('deleteMovie removes a movie correctly', () => {
    // Добавляем тестовые данные
    movieStore.movies = [
      {
        id: 1,
        title: 'Movie 1',
        overview: '',
        poster_path: '',
        popularity: 10,
        release_date: '2023-01-01',
      },
      {
        id: 2,
        title: 'Movie 2',
        overview: '',
        poster_path: '',
        popularity: 20,
        release_date: '2023-02-01',
      },
    ];

    // Удаляем фильм
    movieStore.deleteMovie(1);

    // Проверяем, что фильм удален
    expect(movieStore.movies.length).toBe(1);
    expect(movieStore.movies[0].id).toBe(2);
  });

  test('setSortBy updates sortBy and sorts movies correctly', () => {
    // Добавляем тестовые фильмы
    movieStore.movies = [
      {
        id: 1,
        title: 'Movie 1',
        overview: '',
        poster_path: '',
        popularity: 10,
        release_date: '2023-01-01',
      },
      {
        id: 2,
        title: 'Movie 2',
        overview: '',
        poster_path: '',
        popularity: 20,
        release_date: '2023-02-01',
      },
    ];

    // Изменяем критерий сортировки
    movieStore.setSortBy('release_date');

    // Проверяем, что критерий сортировки обновлен
    expect(movieStore.sortBy).toBe('release_date');
    // Проверяем, что фильмы отсортированы по дате релиза
    expect(movieStore.movies[0].id).toBe(2);
  });
});

jest.mock('../services/tmdbService', () => ({
  searchMovies: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        title: 'Mocked Movie',
        overview: '',
        poster_path: '',
        popularity: 10,
        release_date: '2023-01-01',
      },
    ])
  ),
}));

test('searchMovies updates movies and handles loading state', async () => {
  await movieStore.searchMovies('test query');

  // Проверяем, что загрузка завершена и фильмы обновлены
  expect(movieStore.loading).toBe(false);
  expect(movieStore.movies).toHaveLength(1);
  expect(movieStore.movies[0].title).toBe('Mocked Movie');
});
