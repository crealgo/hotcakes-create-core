#!/usr/bin/env node

async function main() {
	const [nodeExec, execPath, command, ...flags] = process.argv;

	if (command === 'hello') {
		console.log('Hello, 🌎 World!');
	}

	if (command === 'setup') {
		const {checkbox} = await import('@inquirer/prompts');

		const response = await checkbox({
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
					checked: true,
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

		const fs = await import('fs/promises');
		const path = await import('path');
		const url = await import('url');

		const from = path.resolve('.', process.cwd());

		console.log('from', url.fileURLToPath(import.meta.resolve('@hotcakes/core')));
	}
}

void main();
