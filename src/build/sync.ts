import fs from 'fs';

const dest = 'src/__templates__';

if (!fs.existsSync(dest)) {
	fs.mkdirSync(dest);
}

[
	'.editorconfig',
	'.eslintrc.json',
	'.releaserc.json',
	'package.json',
].forEach(fileName => {
	fs.copyFileSync(fileName, `${dest}/${fileName}`);
});

[
	'.github/workflows',
	'.devcontainer',
].forEach(folderName => {
	fs.cpSync(folderName, `${dest}/${folderName}`, {recursive: true});
});
