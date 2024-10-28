import { render, screen, fireEvent } from '@testing-library/react';
import MovieEditor from './MovieEditor';
import type { Movie } from '../../store/MovieStore';

describe('MovieEditor', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Тестовый фильм',
    overview: 'Это тестовое описание фильма.',
    poster_path: '',
    popularity: 0,
    release_date: '',
  };

  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(
      <MovieEditor
        movie={mockMovie}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
  });

  it('рендерит заголовок и описание фильма', () => {
    expect(screen.getByLabelText('Название')).toHaveValue('Тестовый фильм');
    expect(screen.getByLabelText('Описание')).toHaveValue(
      'Это тестовое описание фильма.'
    );
  });

  it('обновляет заголовок при вводе', () => {
    const titleInput = screen.getByLabelText('Название');
    fireEvent.change(titleInput, { target: { value: 'Новое название' } });
    expect(titleInput).toHaveValue('Новое название');
  });

  it('обновляет описание при вводе', () => {
    const overviewInput = screen.getByLabelText('Описание');
    fireEvent.change(overviewInput, { target: { value: 'Новое описание' } });
    expect(overviewInput).toHaveValue('Новое описание');
  });

  it('вызывает onSave при нажатии на кнопку "Сохранить"', () => {
    const saveButton = screen.getByRole('button', { name: /сохранить/i });
    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenCalledWith({
      title: 'Тестовый фильм',
      overview: 'Это тестовое описание фильма.',
    });
  });

  it('вызывает onCancel при нажатии на кнопку "Отмена"', () => {
    const cancelButton = screen.getByRole('button', { name: /отмена/i });
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
