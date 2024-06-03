#!/usr/bin/env node
import packageJson from '../package.json' assert { type: 'json' };
import fs from 'fs/promises';

async function main() {
	const [, , ...args] = process.argv;

	console.log(packageJson.name, args);
	// setup eslint with typescript with xo
	await fs.copyFile('../.eslintrc.json', '../lib/.');

	// setup release config
	// copy node devcontainer files
	// copy github workflows
}

void main();
