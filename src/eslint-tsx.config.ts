import _ from 'lodash';
import reactConfig from './eslint-jsx.config';
import tsConfig from 'eslint-config-xo-typescript';
import { ESLint } from 'eslint';

export default _.merge(reactConfig, {
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			...tsConfig,
		},
	],
}) as ESLint.ConfigData;
