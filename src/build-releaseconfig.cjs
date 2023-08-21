const fs = require('fs');

const config = {
	branches: ['main'],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/npm',
		'@semantic-release/git',
		'@semantic-release/github',
	],
};

fs.writeFileSync('lib/.releaserc.json', JSON.stringify(config, null, 2));
