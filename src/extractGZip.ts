import fs, { ReadStream } from 'fs';
import { Readable } from 'stream';
import zlib from 'zlib';

interface ExtractGZipOptions {
	// BufferEncoding | ReadStreamOptions | undefined;
	readStreamOptions?: any | undefined;
	unzipOptions?: zlib.ZlibOptions | undefined;
}

function isNotReadable(
	file: Readable | string | Buffer,
): file is string | Buffer {
	return typeof file === 'string' || Buffer.isBuffer(file);
}

export function extractGZip(
	file: Readable | string | Buffer,
	options?: ExtractGZipOptions,
) {
	let readableStream: Readable | ReadStream;

	if (isNotReadable(file)) {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		readableStream = fs.createReadStream(file, options?.readStreamOptions);
	} else {
		readableStream = file;
	}

	return readableStream.pipe(zlib.createGunzip(options?.unzipOptions));
}
