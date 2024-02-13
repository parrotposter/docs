import fs from 'fs';
import path from 'path';

const basePages = path.join(process.cwd(), 'pages');

export function pages(dir: string): string[] {
	const dirPath = path.join(basePages, dir);
	const files = fs.readdirSync(dirPath)
	return files
		.filter(f => f !== 'index.md')
		.filter(f => fs.statSync(path.join(dirPath, f)).isFile())
		.map(f => path.join(dir, f))
}

