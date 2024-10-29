import { API_KEY, BASE_URL } from '../config';
import { fetchPopularMovies } from './fetchPopularMovies';

// Мокаем глобальную функцию fetch
global.fetch = jest.fn();

describe('fetchPopularMovies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должна возвращать массив популярных фильмов при успешном ответе', async () => {
    const mockData = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const page = 1;
    const movies = await fetchPopularMovies(page);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page}`
    );
    expect(movies).toEqual(mockData.results);
  });

  it('должна выбрасывать ошибку и возвращать пустой массив при неудачном ответе', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const page = 1;
    const movies = await fetchPopularMovies(page);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page}`
    );
    expect(movies).toEqual([]);
  });

  it('должна возвращать пустой массив и логировать ошибку при исключении', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const page = 1;
    const movies = await fetchPopularMovies(page);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page}`
    );
    expect(movies).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Ошибка при загрузке популярных фильмов',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
