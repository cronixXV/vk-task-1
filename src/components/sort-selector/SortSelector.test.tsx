import { render, screen, fireEvent } from '@testing-library/react';
import SortSelector from './SortSelector';
import movieStore from '../../store/MovieStore';

jest.mock('../../store/MovieStore', () => ({
  sortBy: 'popularity',
  setSortBy: jest.fn(),
}));

describe('SortSelector', () => {
  const mockSetSortBy = movieStore.setSortBy as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('отображает выбранный вариант сортировки корректно', () => {
    render(<SortSelector />);
    const selectElement = screen.getByLabelText('Сортировать по');

    // Открываем Select, чтобы сделать опции видимыми
    fireEvent.mouseDown(selectElement);

    // Ищем опцию по роли
    const releaseDateOption = screen.getByRole('option', {
      name: 'Дата выхода',
    });
    expect(releaseDateOption).toBeInTheDocument();
  });

  it('вызывает setSortBy при выборе нового варианта', () => {
    render(<SortSelector />);
    const selectElement = screen.getByLabelText('Сортировать по');

    // Открываем Select
    fireEvent.mouseDown(selectElement);

    const releaseDateOption = screen.getByRole('option', {
      name: 'Дата выхода',
    });
    fireEvent.click(releaseDateOption);

    // Проверка вызова setSortBy с конкретным значением
    expect(mockSetSortBy).toHaveBeenCalledWith('release_date');
    expect(mockSetSortBy).toHaveBeenCalledTimes(1);
  });
});
