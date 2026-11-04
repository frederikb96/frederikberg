import { parse } from 'yaml';
import { z } from 'astro/zod';
import profileRaw from '../data/profile.yaml?raw';
import experienceRaw from '../data/experience.yaml?raw';
import accomplishmentsRaw from '../data/accomplishments.yaml?raw';
import moreProjectsRaw from '../data/more-projects.yaml?raw';

// YAML reads an unquoted 2024-05 as a string, but a full date would arrive as a Date;
// the month format keeps the two renderings (site and CV) on one precision.
const month = z.string().regex(/^\d{4}-\d{2}$/, 'expected YYYY-MM');

const profileSchema = z.object({
  name: z.string(),
  role: z.string(),
  organization: z.object({ name: z.string(), url: z.url() }),
  location: z.string(),
  description: z.string(),
  bio: z.array(z.string()).min(1),
  interests: z.array(z.string()),
  education: z.array(z.object({ course: z.string(), institution: z.string(), years: z.string() })),
  email: z.email(),
  links: z.object({ github: z.url(), scholar: z.url() }),
  contact: z.object({ text: z.string(), appointment_url: z.url() }),
});

const experienceSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    organization: z.string(),
    organization_url: z.url().optional(),
    location: z.string(),
    start: month,
    end: month.nullable(),
    site: z.boolean(),
    bullets: z.array(z.string()),
    cv: z.object({
      show: z.boolean(),
      title: z.string().optional(),
      organization: z.string().optional(),
      location: z.string().optional(),
      bullets: z.array(z.string()).optional(),
    }),
  }),
);

const accomplishmentsSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    issuer: z.string(),
    date: month,
    expires: month.nullable(),
    description: z.string().optional(),
    verify_url: z.url().optional(),
    pdf: z.string().startsWith('/').optional(),
    cv: z.object({
      show: z.boolean(),
      label: z.string().optional(),
      order: z.number().optional(),
    }),
  }),
);

const moreProjectsSchema = z.array(
  z.object({ name: z.string(), url: z.url(), description: z.string() }),
);

function load<T extends z.ZodType>(name: string, raw: string, schema: T): z.infer<T> {
  const result = schema.safeParse(parse(raw));
  if (!result.success) {
    throw new Error(`src/data/${name}.yaml is invalid:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const profile = load('profile', profileRaw, profileSchema);
export const experience = load('experience', experienceRaw, experienceSchema);
export const accomplishments = load('accomplishments', accomplishmentsRaw, accomplishmentsSchema);
export const moreProjects = load('more-projects', moreProjectsRaw, moreProjectsSchema);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2024-05" -> "May 2024" */
export function formatMonth(value: string): string {
  const [year, m] = value.split('-');
  return `${MONTHS[Number(m) - 1]} ${year}`;
}
