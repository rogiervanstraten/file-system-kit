# File System Kit

![test coverage of lines](./coverage/badge-lines.svg 'Coverage of lines')

The File System Kit is a TypeScript library designed to enhance file system operations. It provides practical functions, including:

- `withTempDir` Simplifies the creation of temporary directories, automatically cleaning up when the callback is completed.
- `withTempFile` Streamlines the process of generating temporary files and executing callback functions using the write stream.
- `extractGZip` Facilitates the extraction of files from GZip archives.

This plugin can be useful in scenarios where file system operations are required, such as when dealing with file uploads or when generating temporary files for processing.
