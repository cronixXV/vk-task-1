const BASE_URL = 'https://api.themoviedb.org/3';
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
