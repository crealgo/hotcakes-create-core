const fs = require('fs');
const _ = require('lodash');
const baseConfig = require('eslint-config-xo');
const reactConfig = require('eslint-config-xo-react');
const tsConfig = require('eslint-config-xo-typescript');

const handleArrays = (value1, value2, key) => {
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
		'new-cap': 'off',
		'react/react-in-jsx-scope': 'off',
		"react/no-unknown-property": ["error", { ignore: ["class"] }]
	}
}

const tsOverrides = {
	rules: {
		'@typescript-eslint/no-unsafe-return': 'off',
	}
}

const baseConfigJSON = _.mergeWith(baseConfig, overrides, handleArrays);
const reactConfigJSON = _.mergeWith(baseConfig, reactConfig, overrides, handleArrays);
const tsConfigJSON = _.mergeWith(baseConfig, tsConfig, overrides, tsOverrides, handleArrays);

fs.writeFileSync('lib/eslint-js.json', JSON.stringify(baseConfigJSON, null, 2));
fs.writeFileSync('lib/eslint-jsx.json', JSON.stringify(reactConfigJSON, null, 2));
fs.writeFileSync('lib/eslint-ts.json', JSON.stringify(tsConfigJSON, null, 2));
