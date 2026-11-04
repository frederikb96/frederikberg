# frederikberg.com

[![Checks](https://github.com/frederikb96/frederikberg/actions/workflows/checks.yml/badge.svg)](https://github.com/frederikb96/frederikberg/actions/workflows/checks.yml)
[![Release](https://img.shields.io/github/v/tag/frederikb96/frederikberg?label=release)](https://github.com/frederikb96/frederikberg/tags)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

My personal website: about me, experience and certifications, a blog, publications and projects.
A static [Astro](https://astro.build/) site with Tailwind CSS, served by nginx from a container.

## Run it locally

```bash
npm ci
npm run dev        # http://localhost:4321, live reload
npm run build      # type and content checks, static build into dist/, search index
npm run preview    # serves dist/
```

Search only works after `npm run build`, since the Pagefind index is generated from the built pages.
The CV at `/cv.pdf` comes from the [cv](https://github.com/frederikb96/cv) repository and is added
when the container image is built; locally it is missing unless you put a `cv.pdf` into `public/`.

## Editing content

Everything a visitor reads lives in data files and Markdown, not in the components. The build fails
with a message naming the file and field when an entry does not match its schema.

- `src/data/profile.yaml` – name, role, bio, interests, education, contact.
- `src/data/experience.yaml` – positions. Each entry also carries a `cv:` block with the shorter text
  the CV renders from the same file.
- `src/data/accomplishments.yaml` – certifications with a verification link or certificate PDF.
- `src/data/more-projects.yaml` – smaller repositories listed without a card.
- `src/content/blog/<slug>/index.md` – one folder per post, with its PDF and images beside it. A
  translation is a post of its own (its own folder, or `index.<lang>.md` beside the original,
  published under `/blog/<slug>/<lang>/`); `alt_lang` and `alt_url` link the two.
- `src/content/projects/<slug>.md` – project cards; a project with a Markdown body gets its own page.
- `src/content/publications/<slug>/` – paper, BibTeX and abstract.
- `src/data/site.ts` – navigation.

The front matter fields of each collection, with what they mean, are in `src/content.config.ts`.

### Blog posts

`kind: research` posts show their Markdown body as a readable summary and the PDF named in `pdf` in an
embedded reader below it. `kind: update` posts are a few sentences, optionally with an `image`. Every
post ends with a short note on how it was written, selected by `disclaimer` (`core`, or `core+legal`
for posts that touch on law) and shown in the post's `lang`. Set `draft: true` to keep
a post out of the build.

## Release

Pull requests run `astro check`, the build and a container build. A version tag on `main` builds the
image for amd64 and arm64 and pushes it to `ghcr.io/frederikb96/frederikberg:<tag>`:

```bash
git tag -a v2.0.1 -m "Release v2.0.1" && git push origin v2.0.1
```

The container serves the site on port 80, answers `/healthz`, and redirects `www.frederikberg.com`
to the apex domain.

## License

The code is under the [MIT license](LICENSE). Blog posts are under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) unless a post says otherwise; publications
remain under their publishers' terms.
