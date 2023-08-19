const _ = require('lodash');
const baseConfig = require('eslint-config-xo');
const reactConfig = require('eslint-config-xo-react');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = _.merge(baseConfig, reactConfig);
