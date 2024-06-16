#!/usr/bin/env node

async function main() {
	const [nodeExec, execPath, command, ...flags] = process.argv;

	console.log(nodeExec, execPath, command, flags);

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

		console.log(response, execPath && path.dirname(execPath));
	}
}

void main();
