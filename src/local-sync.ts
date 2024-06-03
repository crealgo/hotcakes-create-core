import fs from 'fs';
import process from 'process';
import path from 'path';

const currentDirectory = path.dirname(process.argv[1]);
process.chdir(currentDirectory);

fs.copyFileSync('../.eslintrc.json', 'templates/.eslintrc.json');
fs.copyFileSync('../.releaserc.json', 'templates/.releaserc.json');
fs.copyFileSync('../package.json', 'templates/package.json');

fs.cpSync('../.github/workflows', 'templates/workflows', {recursive: true});
fs.cpSync('../.devcontainer', 'templates/.devcontainer', {recursive: true});
