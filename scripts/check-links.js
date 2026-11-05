import fs from 'fs';
import path from 'path';

const appContent = fs.readFileSync('src/App.jsx', 'utf8');
const routeMatches = [...appContent.matchAll(/<Route\s+path=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Routes enregistrées dans App.jsx (' + routeMatches.length + ') :', routeMatches);

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) files = files.concat(walk(full));
    else if (/\.(jsx?|tsx?)$/.test(f)) files.push(full);
  }
  return files;
}

const files = walk('src');
let deadLinks = [];
let totalLinks = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const links = [...content.matchAll(/<Link[^>]+to=["']([^"'#?]+)["']/g)].map(m => m[1]);
  for (const l of links) {
    if (l.startsWith('http') || l.startsWith('mailto:') || l.startsWith('tel:') || l.includes('${')) continue;
    totalLinks++;
    const matched = routeMatches.some(r => {
      if (r === l) return true;
      if (r === '*') return true;
      if (r.includes(':')) {
        const regex = new RegExp('^' + r.replace(/:[^\/]+/g, '[^\\/]+') + '$');
        return regex.test(l);
      }
      return false;
    });
    if (!matched) {
      deadLinks.push({ file: f, link: l });
    }
  }
}

console.log('Total liens analysés :', totalLinks);
if (deadLinks.length === 0) {
  console.log('SUCCESS: Aucun lien mort ! 100% des liens internes correspondent à une route valide.');
} else {
  console.log('WARNING: Liens sans route correspondante :', deadLinks);
}
