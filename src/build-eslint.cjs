const fs = require('fs');
const _ = require('lodash');
const baseConfig = require('eslint-config-xo');
const reactConfig = require('eslint-config-xo-react');
const tsConfig = require('eslint-config-xo-typescript');

const handleArrays = (a, b) => {
  if (_.isArray(a)) {
    return _.uniq(a.concat(b));
  }
}

// const baseConfigJSON = _.merge

const baseConfigString = JSON.stringify(baseConfig, null, 2);

const reactConfigJSON = _.mergeWith(baseConfig, reactConfig, handleArrays);
const reactConfigString = JSON.stringify(reactConfigJSON, null, 2);

const tsConfigJSON = _.mergeWith(baseConfig, tsConfig, handleArrays);
const tsConfigString = JSON.stringify(tsConfigJSON, null, 2);

const tsxConfigJSON = _.mergeWith(baseConfig, reactConfig, tsConfig, handleArrays);
const tsxConfigString = JSON.stringify(tsxConfigJSON, null, 2);

fs.writeFileSync('lib/eslint-js.json', baseConfigString);
fs.writeFileSync('lib/eslint-jsx.json', reactConfigString);
fs.writeFileSync('lib/eslint-ts.json', tsConfigString);
fs.writeFileSync('lib/eslint-tsx.json', tsxConfigString);
