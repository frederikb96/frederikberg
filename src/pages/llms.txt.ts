import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPosts, postUrl } from '../lib/blog';
import { profile } from '../lib/data';
import { site } from '../data/site';

// A plain-text map of the site for language models: who this is, then every post,
// project and publication with its own summary and URL.
export const GET: APIRoute = async () => {
  const abs = (path: string) => new URL(path, site.url).href;
  const posts = await getPosts();
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
  const publications = (await getCollection('publications')).sort((a, b) => a.data.order - b.data.order);

  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.role} at ${profile.organization.name}, ${profile.location}. ${profile.description}`,
    '',
    ...profile.bio,
    '',
    '## Blog',
    '',
    ...posts.map((post) => {
      const extras = [
        post.data.kind,
        post.data.lang === 'de' ? 'German' : 'English',
        `AIL ${post.data.ail}`,
        post.data.alt_url ? `[${post.data.alt_lang === 'de' ? 'German' : 'English'} version](${abs(post.data.alt_url)})` : undefined,
      ].filter(Boolean);
      return `- [${post.data.title}](${abs(postUrl(post))}) (${extras.join(', ')}): ${post.data.summary}`;
    }),
    '',
    '## Projects',
    '',
    ...projects.map((p) => {
      const url = p.data.repo ?? p.data.links[0]?.url ?? abs(`/projects/#${p.id}`);
      return `- [${p.data.title}](${url})${p.data.status === 'archive' ? ' (archived)' : ''}: ${p.data.pitch}`;
    }),
    '',
    '## Publications',
    '',
    ...publications.map((p) => `- [${p.data.title}](${p.data.doi}), ${p.data.venue_short}`),
    '',
    '## Contact',
    '',
    `- Mail: ${profile.email}`,
    `- GitHub: ${profile.links.github}`,
    `- Google Scholar: ${profile.links.scholar}`,
    `- CV: ${abs('/cv.pdf')}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
