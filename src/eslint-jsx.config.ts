import _ from 'lodash';
import baseConfig from './eslint-js.config';
import reactConfig from 'eslint-config-xo-react';
import { ESLint } from 'eslint';

export default _.merge(baseConfig, reactConfig) as ESLint.ConfigData;
