import fs from 'fs';
import cp from 'child_process';

const srcFolder = 'src';
const templatesFolder = `${srcFolder}/__templates__`;

if (!fs.existsSync(templatesFolder)) {
	fs.mkdirSync(templatesFolder);
}

[
	'.editorconfig',
	'.eslintrc.json',
	'.releaserc.json',
	'package.json',
].forEach(fileName => {
	fs.copyFileSync(fileName, `${templatesFolder}/${fileName}`);
});

[
	'.github/workflows',
	'.devcontainer',
].forEach(folderName => {
	fs.cpSync(folderName, `${templatesFolder}/${folderName}`, {recursive: true});
});
