const _ = require('lodash');
const baseConfig = require('eslint-config-xo');
const tsConfig = require('eslint-config-xo-typescript');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = _.merge(baseConfig, {
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			...tsConfig,
		},
	],
});
