import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieList from './MovieList';
import MovieStore, { Movie } from '../store/MovieStore';

// // Mock данных для тестирования
const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Movie 1',
    overview: 'Overview 1',
    poster_path: '',
    popularity: 0,
    release_date: '',
  },
  {
    id: 2,
    title: 'Movie 2',
    overview: 'Overview 2',
    poster_path: '',
    popularity: 0,
    release_date: '',
  },
];

// Мокаем функцию загрузки фильмов
jest.spyOn(MovieStore, 'loadPopularMovies').mockImplementation(async () => {
  MovieStore.movies = mockMovies;
});

describe('MovieList Component', () => {
  beforeEach(async () => {
    await act(async () => {
      MovieStore.movies = mockMovies;
      MovieStore.loading = false;
    });
  });
});

// Проверяем, что список фильмов рендерится с правильными данными.
it('renders movie list', () => {
  render(<MovieList />);
  mockMovies.forEach((movie) => {
    expect(screen.getByText(movie.title)).toBeInTheDocument();
  });
});

// Проверяем, что индикатор загрузки отображается при установке флага loading.
it('shows loading indicator when loading', async () => {
  await act(async () => {
    MovieStore.loading = true;
  });
  render(<MovieList />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

// Проверяем, что функция deleteMovie вызывается при клике по кнопке "Удалить".
it('calls deleteMovie when Delete button is clicked', async () => {
  jest.spyOn(MovieStore, 'deleteMovie');
  render(<MovieList />);

  const deleteButton = screen.getAllByText('Удалить')[0];
  fireEvent.click(deleteButton);

  expect(MovieStore.deleteMovie).toHaveBeenCalledWith(mockMovies[0].id);
});

// Проверяем, что редактирование фильма обновляет его данные в сторе.
it('allows editing a movie title and overview', async () => {
  render(<MovieList />);
  const editButton = screen.getAllByText('Редактировать')[0];
  fireEvent.click(editButton);

  const titleInput = screen.getByLabelText('Название');
  const overviewInput = screen.getByLabelText('Описание');

  fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
  fireEvent.change(overviewInput, { target: { value: 'Updated Overview' } });

  const saveButton = screen.getByText('Сохранить');
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(MovieStore.movies[0].title).toBe('Updated Title');
    expect(MovieStore.movies[0].overview).toBe('Updated Overview');
  });
});
