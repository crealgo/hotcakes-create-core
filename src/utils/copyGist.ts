import fs from 'fs/promises';

export default async function copyGist(filename: string, newPath?: string) {
	const response = await fetch(`https://gist.githubusercontent.com/manasc/e25aa5d86de233ba72bbb017d216ac8c/raw/${filename}`);

	if (!response.ok) {
		throw new Error('Something went wrong!');
	}

	return fs.writeFile(newPath ?? filename, await response.text());
}
