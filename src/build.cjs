const childProcess = require('child_process');
const fs = require('fs');

// clean
if (fs.existsSync('lib')) {
	fs.rmSync('lib', { recursive: true });
}

fs.mkdirSync('lib');

childProcess.execSync('node src/build-editorconfig.cjs');
childProcess.execSync('node src/build-eslint.cjs');
childProcess.execSync('node src/build-releaseconfig.cjs');
childProcess.execSync('node src/build-tsconfig.cjs');

fs.writeFileSync('lib/index.cjs', 'console.log(\'Hello World\')');
