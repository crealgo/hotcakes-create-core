#!/usr/bin/env node

import selectFrom from '@inquirer/checkbox';
import childProcess from 'child_process';
import fs from 'fs/promises';

const run = (command = '', stdout: 'inherit' | 'pipe' = 'inherit') => {
	console.log(command);

	const result = childProcess.execSync(command, {
		stdio: ['inherit', stdout, 'inherit'],
		encoding: 'utf-8',
	});

	console.log(result);

	return result;
};

const copyGist = async (filename: string, newPath?: string) => {
	const response = await fetch(`https://gist.githubusercontent.com/manasc/e25aa5d86de233ba72bbb017d216ac8c/raw/${filename}`);

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return fs.writeFile(newPath ?? filename, await response.text());
};

type TaskInfo = {
	checked: boolean;
	action: Function;
};

const getSelectedTasks = async <T extends Record<K, TaskInfo>, K extends keyof T>(taskMap: T) => {
	const taskNames = Object.keys(taskMap) as K[];

	return selectFrom({
		required: true,
		message: 'Select the items to setup',
		choices: taskNames.map(name => ({
			value: name,
			checked: taskMap[name].checked,
		})),
	});
};

const getTaskMap = () => ({
	editorconfig: {
		checked: false,
		async action() {
			await copyGist('.editorconfig');
		},
	},
	vitest: {
		checked: false,
		async action() {
			// TODO: improve testing setup
			run('npm install --save-dev vitest');
			await fs.mkdir('__tests__/unit', {recursive: true});
		},
	},
	nvmrc: {
		checked: true,
		async action() {
			await copyGist('.nvmrc');
		},
	},
	gitignore: {
		checked: true,
		async action() {
			await copyGist('.gitignore');
		},
	},
	eslint: {
		checked: true,
		async action() {
			run('npm init @eslint/config -- --config @hotcakes/eslint-config');
		},
	},
	typescript: {
		checked: false,
		async action() {
			run('npm install --save-dev typescript @hotcakes/tsconfig');
			await copyGist('tsconfig.json');
		},
	},
	semrel: {
		checked: false,
		async action() {
			run('npm pkg set publishConfig.access=public');
			run('npm pkg set license=MIT');
			run('npm install --save-dev @hotcakes/release-config');

			await copyGist('.releaserc.json');

			await fs.mkdir('.github/workflows', {recursive: true});
			await copyGist('release-package.yaml', '.github/workflows/release-package.yaml');
		},
	},
} as const);

async function main() {
	if (!(await fs.stat('package.json')).isFile()) {
		throw new Error('Please initialize you\'re repository with "npm init" before using @hotcakes!');
	}

	const gitStatus = run('git status --short', 'pipe');

	if (/[a-z]/ig.test(gitStatus)) {
		throw new Error('You still have changes in your working tree. Please stash them before moving forward');
	}

	const taskMap = getTaskMap();
	const tasks = await getSelectedTasks(taskMap);

	for await (const task of tasks) {
		await taskMap[task].action();
	}

	// apply changes
	run('git add .');
	run('git commit --author="🤖 Crealgo Bot <hello.crealgo@gmail.com>" -m "feat(🥞): run @hotcakes/create-core setup"');
}

void main();
