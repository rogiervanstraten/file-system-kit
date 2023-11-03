import fs from 'fs';
import path from 'path';

import { withTempDir } from './withTempDir';

type Callback<T> = (
	file: fs.WriteStream,
	options: {
		filePath: string;
		filename: string;
	},
) => Promise<T>;

export interface WithTempFileOptions {
	filename?: string;
	writeStreamOptions?: any;
}

export const withTempFile = <T>(
	callback: Callback<T>,
	options?: WithTempFileOptions,
) =>
	withTempDir(async tmpDir => {
		const { filename = Math.random().toString(36).substring(2, 10) } =
			options ?? {};

		const filePath: fs.PathLike = path.join(tmpDir, filename);

		// eslint-disable-next-line security/detect-non-literal-fs-filename
		const stream = fs.createWriteStream(filePath, options?.writeStreamOptions);

		try {
			return await callback(stream, {
				filePath,
				filename,
			});
		} finally {
			stream.end();
		}
	});
