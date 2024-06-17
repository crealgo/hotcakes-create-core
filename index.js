#!/usr/bin/env node

const hello = () => {
	console.log('Hello, 🌎 World!');
};

const setup = async () => {
	const {checkbox} = await import('@inquirer/prompts');

	const filesToCopy = await checkbox({
		instructions: true,
		message: 'What configs do you want to add to your project?',
		choices: [
			{
				name: 'Git Ignore',
				value: '.gitignore',
				checked: true,
			},
			{
				name: 'Typescript Config',
				value: 'tsconfig.json',
				checked: true,
			},
			{
				name: 'Semantic Release Config',
				value: '.releaserc.json',
				checked: false,
			},
			{
				name: 'Eslint Config',
				value: '.eslintrc.json',
				checked: true,
			},
			{
				name: 'Editor Config',
				value: '.editorconfig',
				checked: true,
			},
		],
	});

	/** @type {string[]} */
	const packagesToInstall = [];

	const fs = await import('fs/promises');
	const path = await import('path');
	const child_process = await import('child_process');

	const from = path.resolve(process.cwd(), 'node_modules', '@hotcakes', 'core');
	const to = path.resolve(process.cwd());

	for await (const file of filesToCopy) {
		await fs.copyFile(path.resolve(from, file), path.resolve(to, file));

		if (file === '.eslintrc.json') {
			packagesToInstall.concat([
				'@typescript-eslint/eslint-plugin',
				'@typescript-eslint/parser',
				'eslint-config-typescript',
				'eslint-config-xo',
				'eslint-config-xo-react',
				'eslint-config-xo-typescript',
			]);
		}

		if (file === 'tsconfig.json') {
			packagesToInstall.concat([
				'typescript',
			]);
		}

		if (file === '.releaserc.json') {
			packagesToInstall.concat([
				'semantic-release',
				'@semantic-release/changelog',
				'@semantic-release/git',
			]);
		}

		child_process.spawn(`npm install --save-dev ${packagesToInstall.join(' ')}`);
	}
};

const main = async () => {
	const [nodeExec, execPath, command] = process.argv;

	switch (command) {
		case 'hello':
			hello();
			break;
		case 'setup':
			await setup();
			break;
		default:
			throw new Error(`Unknown command: ${command ?? 'undefined'}`);
	}
};

void main();
