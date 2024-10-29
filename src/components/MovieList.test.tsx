import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from './MovieList';
import MovieStore from '../store/MovieStore';
import { Movie } from '../store/MovieStore';
import '@testing-library/jest-dom';

jest.mock('../store/MovieStore', () => ({
  movies: [],
  loading: false,
  error: null,
  loadPopularMovies: jest.fn(),
  deleteMovie: jest.fn(),
  editMovie: jest.fn(),
}));

describe('MovieList', () => {
  beforeEach(() => {
    MovieStore.movies = [
      { id: 1, title: 'Movie 1', overview: 'Overview 1' } as Movie,
      { id: 2, title: 'Movie 2', overview: 'Overview 2' } as Movie,
    ];
    MovieStore.loading = false;
    MovieStore.error = null;
  });

  test('загружает фильмы при монтировании компонента', () => {
    render(<MovieList />);
    expect(MovieStore.loadPopularMovies).toHaveBeenCalledWith(1);
  });

  test('отображает индикатор загрузки при загрузке фильмов', () => {
    MovieStore.loading = true;
    render(<MovieList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('отображает сообщение об ошибке при наличии ошибки', () => {
    MovieStore.error = 'Failed to load movies';
    render(<MovieList />);
    expect(screen.getByText('Failed to load movies')).toBeInTheDocument();
  });

  test('отображает фильмы из MovieStore', () => {
    render(<MovieList />);
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Overview 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Overview 2')).toBeInTheDocument();
  });

  test('начинает редактирование фильма при клике на кнопку "Редактировать"', () => {
    render(<MovieList />);
    fireEvent.click(screen.getAllByText('Редактировать')[0]);
    expect(screen.getByDisplayValue('Movie 1')).toBeInTheDocument();
  });

  test('вызывает MovieStore.editMovie и закрывает редактор при сохранении изменений', () => {
    const updatedMovie = {
      title: 'Updated Title',
      overview: 'Updated Overview',
    };
    render(<MovieList />);
    fireEvent.click(screen.getAllByText('Редактировать')[0]);

    fireEvent.change(screen.getByLabelText('Название'), {
      target: { value: updatedMovie.title },
    });
    fireEvent.change(screen.getByLabelText('Описание'), {
      target: { value: updatedMovie.overview },
    });

    fireEvent.click(screen.getByText('Сохранить'));
    expect(MovieStore.editMovie).toHaveBeenCalledWith(1, updatedMovie);
  });

  test('вызывает MovieStore.deleteMovie при клике на кнопку "Удалить"', () => {
    render(<MovieList />);
    fireEvent.click(screen.getAllByText('Удалить')[0]);
    expect(MovieStore.deleteMovie).toHaveBeenCalledWith(1);
  });

  test('загружает следующую страницу фильмов при прокрутке', () => {
    render(<MovieList />);
    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    expect(MovieStore.loadPopularMovies).toHaveBeenCalledWith(2);
  });
});

describe('MovieList', () => {
  it('сбрасывает editingMovieId при нажатии на "Отмена" в MovieEditor', () => {
    render(<MovieList />);

    // Находим кнопку редактирования и кликаем по ней для открытия редактора
    const editButton = screen.getAllByText('Редактировать')[0];
    fireEvent.click(editButton);

    // Проверяем, что MovieEditor открыт
    expect(screen.getByText('Сохранить')).toBeInTheDocument();

    // Находим кнопку отмены и кликаем по ней
    const cancelButton = screen.getByText('Отмена');
    fireEvent.click(cancelButton);

    // Проверяем, что MovieEditor больше не отображается
    expect(screen.queryByText('Сохранить')).not.toBeInTheDocument();
  });
});
