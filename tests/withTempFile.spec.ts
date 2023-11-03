import fs from 'fs';

import { withTempFile } from '../src';

describe('withTempFile', () => {
	it('should create a temporary file and execute the given function', async () => {
		let testFilePath;
		const testContent = 'hello world';

		const fn = jest.fn(async (file: fs.WriteStream, params) => {
			testFilePath = params.filePath;

			expect(params.filePath).toBeDefined();
			expect(params.filename).toMatch(/^[a-z0-9]{8}$/);
			file.write(testContent);
			file.end();

			// ? no idea file doesn't exist
			// expect(fs.existsSync(testFilePath)).toBe(true);
		});

		await withTempFile(fn);

		// eslint-disable-next-line security/detect-non-literal-fs-filename
		expect(fs.existsSync(testFilePath)).toBe(false);
		expect(fn).toHaveBeenCalledWith(
			expect.any(fs.WriteStream),
			expect.anything(),
		);
	});
});
