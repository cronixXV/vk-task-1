import '@testing-library/jest-dom';

process.env.VITE_BASE_URL =
  process.env.VITE_BASE_URL || 'https://api.themoviedb.org/3';
process.env.VITE_API_KEY =
  process.env.VITE_API_KEY || 'e38dbeba0f4e60084fd4d9faf556c69a';
