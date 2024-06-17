#!/usr/bin/env node

import {hello} from './scripts/hello.js';
import {setup} from './scripts/setup.js';

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
