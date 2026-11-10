import { getCollection, type CollectionEntry } from 'astro:content';

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
