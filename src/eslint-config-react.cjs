require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
	extends: [
		'./eslint-config.cjs',
		'xo-react',
	],
	rules: {
		'react/function-component-definition': [2, {
			namedComponents: 'arrow-function',
			unnamedComponents: 'arrow-function',
		}],
		'react/react-in-jsx-scope': 'off',
	},
};
