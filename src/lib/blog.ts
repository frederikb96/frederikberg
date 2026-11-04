import { getCollection, type CollectionEntry } from 'astro:content';
import { existsSync } from 'node:fs';
import path from 'node:path';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (post) => !post.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Posts for the lists: a German post that has an English translation is listed once,
 * through the English version, which links back to it.
 */
export async function getListedPosts(): Promise<Post[]> {
  return (await getPosts()).filter((post) => !(post.data.lang === 'de' && post.data.alt_lang === 'en'));
}

export function postUrl(post: Post): string {
  return `/blog/${post.id}/`;
}

/** The post's folder, which is also where its files are published (see integrations/content-files.mjs). */
function postFolder(post: Post): string {
  return path.dirname(path.relative('src/content/blog', post.filePath ?? ''));
}

/** Site path of the post's PDF; fails the build when the file is missing. */
export function pdfUrl(post: Post): string | undefined {
  if (!post.data.pdf) return undefined;
  const folder = postFolder(post);
  if (!existsSync(path.join('src/content/blog', folder, post.data.pdf))) {
    throw new Error(`${post.filePath}: pdf "${post.data.pdf}" is not in the post's folder`);
  }
  return `/blog/${folder}/${post.data.pdf}`;
}

export function formatDate(date: Date, lang: 'en' | 'de'): string {
  return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export const kindLabel = {
  update: { en: 'Update', de: 'Update' },
  research: { en: 'Research', de: 'Recherche' },
} as const;
