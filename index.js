#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const getFromTo = () => {
	const from = path.resolve(process.cwd(), 'node_modules', '@hotcakes', 'core');
	const to = path.resolve(process.cwd());

	return {from, to};
};

const hello = () => {
	console.log('Hello, 🌎 World!');
};

const setup = async () => {
	const {checkbox} = await import('@inquirer/prompts');
	const {from, to} = getFromTo();

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

	const child_process = await import('child_process');

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

/**
 * Adds a subcommand to the project.
 *
 * @param {string | undefined} subcommand - The subcommand to add.
 * @throws {Error} If no subcommand is provided.
 * @returns {Promise<void>} A promise that resolves when the subcommand is added.
 */
const add = async subcommand => {
	if (!subcommand) {
		throw new Error('No subcommand provided');
	}

	if (subcommand === 'devcontainer') {
		const fs = await import('fs/promises');
		const path = await import('path');
		const {from, to} = getFromTo();

		const {select} = await import('@inquirer/prompts');
		const options = await fs.readdir(path.resolve(from, 'devcontainers'));

		const choice = await select({
			choices: options.map(o => ({name: o, value: o})),
			message: 'Pick a devcontainer to add to your project.',
			default: 'node',
		});

		await fs.cp(path.resolve(from, 'devcontainers', choice), to, {recursive: true});
	}

	throw new Error(`Unknown subcommand: ${subcommand}`);
};

const main = async () => {
	const [command, subcommand] = process.argv.slice(2);

	switch (command) {
		case 'hello':
			hello();
			break;
		case 'setup':
			await setup();
			break;
		case 'add':
			await add(subcommand);
			break;
		default:
			throw new Error(`Unknown command: ${command ?? 'undefined'}`);
	}
};

void main();
