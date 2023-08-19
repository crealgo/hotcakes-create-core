const _ = require('lodash');
const baseConfig = require('eslint-config-xo');
const reactConfig = require('eslint-config-xo-react');
const tsConfig = require('eslint-config-xo-typescript');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = _.merge(baseConfig, reactConfig, {
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			...tsConfig,
		},
	],
});
