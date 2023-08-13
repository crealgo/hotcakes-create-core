require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
	extends: [
		'xo',
	],
	overrides: [
		{
			files: ['*.tsx', '*.ts'],
			extends: 'xo-typescript',
		},
	],
};
