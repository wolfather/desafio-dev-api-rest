const path = require('path');
const root = path.resolve(__dirname);

export default {
  rootDir: root,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/__mock__/',
    '<rootDir>/__tests__/prisma/',
    '<rootDir>/__tests__/implementation/',
    '<rootDir>/__tests__/utils/',
    '<rootDir>/dist/',
    '<rootDir>/prisma/',
    '<rootDir/src/middleware/'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/',
    '<rootDir>/__tests__/__mock__/',
    '<rootDir>/__tests__/implementation/',
    '<rootDir>/__tests__/utils/',
    '<rootDir>/prisma/',
    '<rootDir/src/middleware/',
  ],
};