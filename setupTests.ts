import '@testing-library/jest-dom';

//Мокаем консоль для теста на ошибку
global.console = {
  ...console,
  error: jest.fn(),
};
