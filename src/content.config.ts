import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One folder per post: <slug>/index.md, plus the files it links (PDF, images).
// A translation can sit beside it as index.<lang>.md and is published under /blog/<slug>/<lang>/.
function folderId({ entry }: { entry: string }): string {
  const match = entry.match(/^(.*)\/index(?:\.([a-z]{2}))?\.md$/);
  if (!match) throw new Error(`${entry}: content entries live in <slug>/index.md`);
  return match[2] ? `${match[1]}/${match[2]}` : match[1];
}

const blog = defineCollection({
  loader: glob({ pattern: '**/index*.md', base: './src/content/blog', generateId: folderId }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        // Meta description; the summary is used when absent.
        description: z.string().optional(),
        date: z.coerce.date(),
        lang: z.enum(['en', 'de']),
        kind: z.enum(['update', 'research']),
        // Listing text and search snippet, in the post's own words.
        summary: z.string(),
        image: image().optional(),
        image_alt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        // AI Influence Level (0-6, see src/lib/ail.ts): shown as a badge under the title and
        // named in the note at the post's end.
        ail: z.literal([0, 1, 2, 3, 4, 5, 6]),
        // Which assistance text the note carries; core+legal adds "this is not legal advice", and
        // disclaimer_extra appends one post-specific sentence. Required above level 0; a level 0
        // post says it was written without AI and has none.
        disclaimer: z.enum(['core', 'core+legal']).optional(),
        disclaimer_extra: z.string().optional(),
        // The post's translation: its language and site path.
        alt_lang: z.enum(['en', 'de']).optional(),
        alt_url: z.string().startsWith('/').optional(),
        draft: z.boolean().default(false),
      })
      .superRefine((post, ctx) => {
        if (post.ail > 0 && !post.disclaimer) {
          ctx.addIssue({ code: 'custom', path: ['disclaimer'], message: 'required when ail is above 0' });
        }
        if (post.ail === 0 && post.disclaimer) {
          ctx.addIssue({ code: 'custom', path: ['disclaimer'], message: 'an ail 0 post has no assistance text' });
        }
      }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      status: z.enum(['active', 'archive']),
      pitch: z.string(),
      repo: z.url().optional(),
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      image: image(),
      image_alt: z.string(),
      // Logos and diagrams are shown whole on a paper ground; illustrations fill the card.
      image_fit: z.enum(['cover', 'contain']).default('cover'),
      // How a Markdown body renders on the project's own page: as prose, or its images as a grid.
      layout: z.enum(['article', 'gallery']).default('article'),
      order: z.number(),
      date: z.coerce.date(),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/publications', generateId: folderId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      authors: z.array(z.string()),
      date: z.coerce.date(),
      venue: z.string(),
      venue_short: z.string(),
      doi: z.url(),
      // File names in the publication's folder.
      pdf: z.string(),
      bib: z.string(),
      image: image(),
      image_caption: z.string(),
      order: z.number(),
    }),
});

export const collections = { blog, projects, publications };
