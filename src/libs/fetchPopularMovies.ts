import { API_KEY, BASE_URL } from '../config';

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
  }
  return [];
};
