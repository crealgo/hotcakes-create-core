#!/usr/bin/env node

import childProcess from 'child_process';
import fs from 'fs/promises';
import selectFrom from '@inquirer/checkbox';

const run = (command = '') => childProcess.execSync(command, {
	stdio: 'inherit',
});

const getTasksFromUser = async <T>(taskNames: T[]): Promise<T[]> => selectFrom({
	required: true,
	message: 'Select the items to setup',
	choices: taskNames.map(name => ({value: name})),
});

const fetchGist = async (filename: string) => {
	const response = await fetch(`https://gist.githubusercontent.com/manasc/e25aa5d86de233ba72bbb017d216ac8c/raw/${filename}`);

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
		async nvmrc() {
			await fs.writeFile('.gitignore', await fetchGist('.nvmrc'));
		},
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
	} as const;

	const tasks = await getTasksFromUser(Object.keys(taskMap) as Array<keyof typeof taskMap>);

	// save work
	run('git add .');
	run('git stash');

	for await (const task of tasks) {
		await taskMap[task]();
	}

	// apply changes
	run('git add .');
	run('git commit -m \'feat(🥞): run @hotcakes/create-core setup\'');

	// reload work
	run('git stash pop');
}

void main();
