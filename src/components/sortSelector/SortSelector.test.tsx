import { render, screen, fireEvent } from '@testing-library/react';
import SortSelector from './SortSelector';

describe('SortSelector', () => {
  const mockHandleSortChange = jest.fn();

  const renderComponent = (sortBy: 'popularity' | 'release_date') => {
    render(
      <SortSelector sortBy={sortBy} onSortChange={mockHandleSortChange} />
    );
  };

  it('отображает выбранный вариант сортировки корректно', () => {
    renderComponent('release_date');
    const selectElement = screen.getByLabelText('Сортировать по');

    // Открываем Select, чтобы сделать опции видимыми
    fireEvent.mouseDown(selectElement);

    // Ищем опцию по роли
    const releaseDateOption = screen.getByRole('option', {
      name: 'Дата выхода',
    });
    expect(releaseDateOption).toBeInTheDocument();
  });

  it('вызывает обработчик onSortChange при выборе нового варианта', () => {
    renderComponent('popularity');
    const selectElement = screen.getByLabelText('Сортировать по');

    // Открываем Select
    fireEvent.mouseDown(selectElement);

    const releaseDateOption = screen.getByRole('option', {
      name: 'Дата выхода',
    });
    fireEvent.click(releaseDateOption);

    // Проверка вызова обработчика с конкретным значением
    expect(mockHandleSortChange).toHaveBeenCalledWith('release_date');
    expect(mockHandleSortChange).toHaveBeenCalledTimes(1);
  });
});
