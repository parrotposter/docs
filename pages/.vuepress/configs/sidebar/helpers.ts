import fs from 'fs';
import path from 'path';

const basePages = path.join(process.cwd(), 'pages');

export function pages(dir: string): string[] {
	const dirPath = path.join(basePages, dir);
	const files = fs.readdirSync(dirPath)
	return files.map(f => path.join(dir, f))
}

