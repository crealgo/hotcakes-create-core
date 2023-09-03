const fs = require('fs');
const _ = require('lodash');
const baseConfig = require('eslint-config-xo');
const reactConfig = require('eslint-config-xo-react');
const {overrides: tsOverrides, ...tsConfig} = require('eslint-config-xo-typescript');

const handleExceptions = (value1, value2, key) => {
	if (key === 'rules') {
		return _.merge(value1, value2);
	}

	if (key === 'comman-dangle') {
		return console.log('hello')
	}

	if (_.isArray(value1)) {
			return _.uniq(value1.concat(value2));
		}
}

const overrides = {
	rules: {
		'capitalized-comments': 'off',
		'new-cap': 'off',
		'react/react-in-jsx-scope': 'off',
		"react/require-default-props": "off",
		"react/no-unknown-property": ["error", { ignore: ["class"] }],
		"react/function-component-definition": [
			"error",
			{
				namedComponents: "arrow-function",
				unnamedComponents: "arrow-function"
			}
		],
	}
}

const baseConfigJSON = _.mergeWith(baseConfig, overrides, handleExceptions);
const reactConfigJSON = _.mergeWith(baseConfig, reactConfig, overrides, handleExceptions);

const tsParserPath = './node_modules/@typescript-eslint/parser/dist/index.js';
const tsConfigJSON = _.mergeWith(reactConfigJSON, {
	overrides: [
		_.mergeWith(tsConfig, {
			files: ['*.ts', '*.tsx'],
			parser: tsParserPath,
			rules: {
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/consistent-type-definitions': 'off',
			},
		}, handleExceptions),
		...tsOverrides
	]
}, overrides, handleExceptions);

tsConfigJSON.overrides[0].settings["import/parsers"] = {
	[tsParserPath]: ['.ts', '.tsx']
}

fs.writeFileSync('lib/eslint-js.json', JSON.stringify(baseConfigJSON, null, 2));
fs.writeFileSync('lib/eslint-jsx.json', JSON.stringify(reactConfigJSON, null, 2));
fs.writeFileSync('lib/eslint-ts.json', JSON.stringify(tsConfigJSON, null, 2));
