import fs from 'fs';
import os from 'os';
import path from 'path';
import util from 'util';

// eslint-disable-next-line security/detect-non-literal-fs-filename
const realpath = util.promisify(fs.realpath);
const mkdtemp = util.promisify(fs.mkdtemp);
const rm = util.promisify(fs.rm);

export type Callback<T> = (dir: string) => Promise<T>;
export type TempDirOptions = {
	/** Remove the temporary directory after promise */
	remove: boolean;
};

export async function withTempDir<T>(
	callback: Callback<T>,
	options?: TempDirOptions,
) {
	const { remove = true } = options ?? {};

	// eslint-disable-next-line security/detect-non-literal-fs-filename
	const dir = await mkdtemp((await realpath(os.tmpdir())) + path.sep);

	try {
		return await callback(dir);
	} finally {
		// Remove directory after promise succeeded
		if (remove) {
			await rm(dir, { recursive: true });
		}
	}
}
