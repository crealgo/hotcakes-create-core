#!/usr/bin/env node

import childProcess from 'child_process';
import fs from 'fs/promises';
import selectFrom from '@inquirer/checkbox';

type Task = 'gitignore' | 'eslint' | 'typescript' | 'semrel';
type Template = '.releaserc.json' | '.gitignore' | 'release-package.yaml' | 'tsconfig.json';

const run = (command = '') => childProcess.execSync(command, {
	stdio: 'inherit',
});

const getTasksFromUser = async () => selectFrom<Task>({
	required: true,
	message: 'Select the items to setup',
	choices: [
		{value: 'gitignore'},
		{value: 'eslint'},
		{value: 'typescript'},
		{name: 'semantic-release', value: 'semrel'},
	],
});

const fetchGist = async (filename: Template) => {
	const response = await fetch(`https://gist.githubusercontent.com/manasc/e25aa5d86de233ba72bbb017d216ac8c/raw/7b19779002e9dc00ee66a6bffa02f3531daa488f/${filename}`);

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return response.text();
};

async function main() {
	if (!(await fs.stat('package.json')).isFile()) {
		throw new Error('Please initialize you\'re repository with "npm init" before using @hotcakes!');
	}

	const taskMap = {
		async gitignore() {
			await fs.writeFile('.gitignore', await fetchGist('.gitignore'));
		},
		async eslint() {
			run('npm init @eslint/config -- --config @hotcakes/eslint-config');
		},
		async typescript() {
			run('npm install --save-dev typescript @hotcakes/tsconfig');

			await fs.writeFile('tsconfig.json', await fetchGist('tsconfig.json'));
		},
		async semrel() {
			run('npm pkg set publishConfig.access=public');
			run('npm pkg set license=MIT');
			run('npm install --save-dev @hotcakes/release-config');

			await fs.mkdir('.github/workflows', {recursive: true});
			await fs.writeFile('.releaserc.json', await fetchGist('.releaserc.json'));
			await fs.writeFile('.github/workflows/release-package.yaml', await fetchGist('release-package.yaml'));
		},
	};

	const tasks = await getTasksFromUser();

	for await (const task of tasks) {
		await taskMap[task]();
	}
}

void main();
