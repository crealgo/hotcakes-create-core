import fs from 'fs';

// clean
if (fs.existsSync('lib')) {
	fs.rmSync('lib', { recursive: true });
}

fs.mkdirSync('lib');

await import('./build-eslint');
await import('./build-editorconfig');
await import('./build-releaseconfig');
await import('./build-tsconfig');

fs.writeFileSync('lib/index.cjs', 'console.log(\'Hello World\')');
