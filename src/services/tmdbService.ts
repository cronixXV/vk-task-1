const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchPopularMovies = async (page: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Не удалось получить популярные фильмы.');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Ошибка при загрузке популярных фильмов', error);
    return [];
  }
};

export const searchMovies = async (query: string, page: number = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru-RU&query=${query}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Ошибка при поиске фильмов.');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Ошибка при поиске фильмов', error);
    return [];
  }
};
