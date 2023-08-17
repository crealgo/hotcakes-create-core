import { expect, it } from 'vitest'

it.each(['js', 'jsx', 'ts', 'tsx'])('should match %s config', async (configType) => {
	const jsConfig = await import(`../lib/eslint-${configType}.cjs`);
	expect(jsConfig).toMatchSnapshot('test');
})
