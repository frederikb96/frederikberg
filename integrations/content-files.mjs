// Publishes the non-Markdown files that sit beside a content entry (PDFs, BibTeX)
// under the entry's URL, e.g. src/content/blog/<slug>/paper.pdf -> /blog/<slug>/paper.pdf.
// Images are left out: Markdown references them and Astro optimises them itself.
import { cp, readdir, stat } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import path from 'node:path';

const SKIP = new Set(['.md', '.mdx', '.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);
const TYPES = { '.pdf': 'application/pdf', '.bib': 'text/plain; charset=utf-8' };

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** @param {{ from: string, to: string }[]} mounts */
export default function contentFiles(mounts) {
  return {
    name: 'content-files',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const url = decodeURIComponent((req.url ?? '').split('?')[0]);
          for (const { from, to } of mounts) {
            if (!url.startsWith(`/${to}/`)) continue;
            const file = path.resolve(from, url.slice(to.length + 2));
            const ext = path.extname(file).toLowerCase();
            if (SKIP.has(ext) || !file.startsWith(path.resolve(from)) || !existsSync(file)) continue;
            if (!(await stat(file)).isFile()) continue;
            res.setHeader('Content-Type', TYPES[ext] ?? 'application/octet-stream');
            createReadStream(file).pipe(res);
            return;
          }
          next();
        });
      },
      'astro:build:done': async ({ dir, logger }) => {
        const outRoot = new URL(dir).pathname;
        let count = 0;
        for (const { from, to } of mounts) {
          if (!existsSync(from)) continue;
          for await (const file of walk(from)) {
            if (SKIP.has(path.extname(file).toLowerCase())) continue;
            await cp(file, path.join(outRoot, to, path.relative(from, file)));
            count += 1;
          }
        }
        logger.info(`copied ${count} content files`);
      },
    },
  };
}
