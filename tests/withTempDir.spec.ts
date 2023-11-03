import fs from 'fs';

import { withTempDir } from '../src';

describe('withTempDir', () => {
	it('should create a temporary directory and delete after the function has finished', async () => {
		let testDir;

		await withTempDir(async dir => {
			// Set the test directory
			testDir = dir;

			// eslint-disable-next-line security/detect-non-literal-fs-filename
			expect(fs.existsSync(dir)).toBe(true);
		});

		// eslint-disable-next-line security/detect-non-literal-fs-filename
		expect(fs.existsSync(testDir)).toBe(false);
	});
});
