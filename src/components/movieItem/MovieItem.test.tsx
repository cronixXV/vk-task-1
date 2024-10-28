import { render, screen, fireEvent } from '@testing-library/react';
import MovieItem from './MovieItem';
import type { Movie } from '../../store/MovieStore';

describe('MovieItem', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Тестовый фильм',
    overview: 'Это тестовое описание фильма.',
    poster_path: '',
    popularity: 0,
    release_date: '',
  };

  const mockOnEditClick = jest.fn();
  const mockOnDeleteClick = jest.fn();

  beforeEach(() => {
    render(
      <MovieItem
        movie={mockMovie}
        onEditClick={mockOnEditClick}
        onDeleteClick={mockOnDeleteClick}
      />
    );
  });

  it('рендерит заголовок и описание фильма', () => {
    expect(screen.getByText('Тестовый фильм')).toBeInTheDocument();
    expect(
      screen.getByText('Это тестовое описание фильма.')
    ).toBeInTheDocument();
  });

  it('вызывает onEditClick при нажатии на кнопку "Редактировать"', () => {
    const editButton = screen.getByRole('button', { name: /редактировать/i });
    fireEvent.click(editButton);
    expect(mockOnEditClick).toHaveBeenCalledTimes(1);
  });

  it('вызывает onDeleteClick при нажатии на кнопку "Удалить"', () => {
    const deleteButton = screen.getByRole('button', { name: /удалить/i });
    fireEvent.click(deleteButton);
    expect(mockOnDeleteClick).toHaveBeenCalledTimes(1);
  });
});
