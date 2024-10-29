/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/App.tsx',
    'src/main.tsx',
    'config.ts',
    'src/vite-env.d.ts',
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^config.ts$': '<rootDir>/src/__mocks__/config.ts',
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.css$': 'identity-obj-proxy',
  },
};

export default config;
