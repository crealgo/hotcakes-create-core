#!/usr/bin/env node

import childProcess from 'child_process';
import fs from 'fs/promises';
import prompts from '@inquirer/prompts';

type Task = 'gitignore' | 'eslint' | 'typescript' | 'semrel';

const gitignoreConfig = /* yaml */`
name: Release Package

on:
  push:
    branches: [main, next]

permissions:
  contents: write

jobs:
  semantic-release:
    uses: crealgo/hotcakes-release-config/.github/workflows/semantic-release.yaml@main
    secrets: inherit
`;

const tsconfig = {
	extends: '@hotcakes/tsconfig',
};

const run = (command = '') => childProcess.execSync(command, {
	stdio: 'inherit',
});

const getTasksFromUser = async () => prompts.checkbox<Task>({
	required: true,
	message: 'Select the items to setup',
	choices: [
		{value: 'gitignore'},
		{value: 'eslint'},
		{value: 'typescript'},
		{name: 'semantic-release', value: 'semrel'},
	],
});

async function main() {
	if (!(await fs.stat('package.json')).isFile()) {
		throw new Error('Please initialize you\'re repository with "npm init" before using @hotcakes!');
	}

	const taskMap = {
		async gitignore() {
			const response = await fetch('https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore');

			await fs.writeFile('.gitignore', await response.text());
		},
		async eslint() {
			run('npm init @eslint/config -- --config @hotcakes/eslint-config');
		},
		async typescript() {
			run('npm install --save-dev typescript @hotcakes/tsconfig');

			await fs.writeFile('tsconfig.json', JSON.stringify(tsconfig, null, 2), {encoding: 'utf-8'});
		},
		async semrel() {
			run('npm pkg set publishConfig.access=public');
			run('npm pkg set release.extends=@hotcakes/release-config');
			run('npm pkg set license=MIT');
			run('npm install --save-dev @hotcakes/release-config');

			await fs.mkdir('.github/workflows', {recursive: true});
			await fs.writeFile('.github/workflows/release-package.yaml', gitignoreConfig);
		},
	};

	const tasks = await getTasksFromUser();

	for await (const task of tasks) {
		await taskMap[task]();
	}
}

void main();
