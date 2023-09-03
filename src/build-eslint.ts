import fs from 'fs';
import _ from 'lodash';
import baseConfig from 'eslint-config-xo';
import reactConfig from 'eslint-config-xo-react';
import xoTsConfig from 'eslint-config-xo-typescript';

const {overrides: tsOverrides, ...tsConfig} = xoTsConfig;

const handleExceptions = (value1: any, value2: any, key: string) => {
	if (key === 'rules') {
		return _.merge(value1, value2);
	}

	if (key === 'comma-dangle') {
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
