import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const indexFile = path.join(distDir, 'index.html');
const constantsFile = path.join(rootDir, 'constants.ts');

if (!existsSync(indexFile)) {
  throw new Error('dist/index.html does not exist. Run vite build before creating route shells.');
}

const routes = new Set(['projects', 'research', 'blogs', 'blog', 'contact']);

if (existsSync(constantsFile)) {
  const constantsSource = readFileSync(constantsFile, 'utf8');
  const slugPattern = /slug:\s*['"`]([^'"`]+)['"`]/g;

  for (const match of constantsSource.matchAll(slugPattern)) {
    routes.add(`blogs/${match[1]}`);
    routes.add(`blog/${match[1]}`);
  }
}

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexFile, path.join(routeDir, 'index.html'));
}

console.log(`Created ${routes.size} static route shells for GitHub Pages.`);
