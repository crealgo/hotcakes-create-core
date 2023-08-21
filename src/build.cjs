const childProcess = require('child_process');

childProcess.execSync('node src/build-editorconfig.cjs');
childProcess.execSync('node src/build-eslint.cjs');
childProcess.execSync('node src/build-releaseconfig.cjs');
childProcess.execSync('node src/build-tsconfig.cjs');
