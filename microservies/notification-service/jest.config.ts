import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  //Specifies where Jest should store code coverage reports.
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules'],
  //Tells Jest how to transform files before testing. Here, TypeScript files (.ts or .tsx) are transformed using ts-jest.
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/src/**/test/*.ts'],
  //Specifies files to include/exclude in the coverage report
  collectCoverageFrom: ['src/**/*.ts', '!src/**/test/*.ts?(x)', '!**/node_modules/**'],
  //Sets the minimum percentage of coverage required for branches, functions, lines, and statements globally. In this configuration, they are all set to 1% as a placeholder or to avoid failing the build during early stages.
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  },
  //Specifies the formats for coverage reports:text-summary: Displays a summary of the coverage results in the terminal.lcov: Generates a detailed HTML report.
  coverageReporters: ['text-summary', 'lcov'],
  //Maps module paths for cleaner imports. For example, @notifications/someModule would resolve to <rootDir>/src/someModule.
  moduleNameMapper: {
    '@notifications/(.*)': ['<rootDir>/src/$1']
  }
};

export default config;
