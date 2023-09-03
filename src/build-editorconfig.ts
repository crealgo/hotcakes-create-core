import fs from 'fs';

const yamlString = `
[*]
indent_size = 2
indent_style = tab

[*.{yaml,yml}]
indent_size = 2
indent_style = space

# Configs
[.{releaserc,npmrc,babelrc}]
indent_size = 2
indent_style = space

[*.{cjs,mjs,js,jsx,ts,tsx}]
indent_size = 4
indent_style = tab
`;

fs.writeFileSync('lib/.editorconfig', yamlString);
