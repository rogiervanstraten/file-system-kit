import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	preset: 'ts-jest',
	clearMocks: true,
	coverageReporters: ['json-summary', 'text', 'lcov'],
	testMatch: ['**/?(*.)+(spec|integration).ts'],
	testPathIgnorePatterns: ['/node_modules/'],
	watchPathIgnorePatterns: ['/node_modules/'],
};

export default config;
