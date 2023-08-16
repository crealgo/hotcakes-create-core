import _ from 'lodash';
import { ESLint } from 'eslint';
import baseConfig from './eslint-js.config';
import tsConfig from 'eslint-config-xo-typescript';

export default _.merge(baseConfig, {
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			...tsConfig,
		},
	],
}) as ESLint.ConfigData;
