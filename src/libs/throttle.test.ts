import { throttle } from './throttle';

jest.useFakeTimers();

describe('throttle', () => {
  it('вызывает функцию один раз в заданный интервал', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn();
    throttledFn();
    throttledFn();

    // Перемотка времени на 500 мс - недостаточно для повторного вызова
    jest.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Перемотка времени еще на 500 мс (всего 1000 мс)
    jest.advanceTimersByTime(500);
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('передает корректные аргументы функции', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn('arg1', 'arg2');
    jest.advanceTimersByTime(1000);
    throttledFn('arg3', 'arg4');

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    expect(mockFn).toHaveBeenCalledWith('arg3', 'arg4');
  });

  it('игнорирует вызовы в пределах интервала ожидания', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn();
    jest.advanceTimersByTime(500);
    throttledFn();
    throttledFn();

    // До окончания интервала ожидания, mockFn должна быть вызвана только один раз
    expect(mockFn).toHaveBeenCalledTimes(1);

    // После истечения 1000 мс интервала, функция может быть вызвана снова
    jest.advanceTimersByTime(500);
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
