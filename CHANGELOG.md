# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [2.4.1] - 2026-11-11

### Changed

- GitHub links, the repository badges and the CV and image paths name the `frederikberg` account.

## [2.4.0] - 2026-11-11

### Added

- German versions of the blood donation and the footprints and handprints posts, with German charts.

## [2.3.2] - 2026-11-10

### Changed

- The footer links the German explanation of the AI Influence Level on German pages.

## [2.3.1] - 2026-11-10

### Changed

- The AI Influence Level page explains how a level is picked without tying levels to kinds of post.

## [2.3.0] - 2026-11-10

### Added

- Every post shows its AI Influence Level as a badge under the title and names it in the note at the end; an explanation page of the scale exists in English and German and is linked from the footer.

### Changed

- Posts need an `ail` level; a level 0 post has no `disclaimer` and its note says it was written without AI.
- The four research posts are rewritten as shorter articles with a summary box, numbered chapters, numbered sources and their charts as images; the links to their former PDFs redirect to the posts.

### Removed

- The PDF field and embedded PDF reader for blog posts, and the pdf.js dependency.

## [2.2.1] - 2026-11-10

### Changed

- The Zugbindung post marks which of its cases are a reading of the wording rather than stated rules.

## [2.2.0] - 2026-11-10

### Added

- Posts can open with a highlighted TL;DR box.

### Changed

- The Zugbindung post explains both triggers, that the announcement counts, and for which part of the trip a ticket is then valid.

## [2.1.2] - 2026-11-08

### Changed

- The site is built with Node 26 and Astro 7.4.7.

## [2.1.1] - 2026-11-05

### Fixed

- The PDF reader also loads in browsers that cached the worker while it was served with the wrong type.

## [2.1.0] - 2026-11-05

### Added

- Project pages for the personal AI infrastructure, the homelab SOC and the Kubernetes homelab, linked first from their cards.

### Fixed

- The embedded PDF reader loads again: nginx serves `.mjs` files as JavaScript, which the pdf.js worker needs.
- Education dates match the CV.
- The Nextcloud Conference 2023 link points at the 2023 announcement instead of the current conference.

## [2.0.1] - 2026-11-04

### Changed

- `/cv.pdf` serves the updated CV.

## [2.0.0] - 2026-11-04

### Added

- Blog with research posts (summary plus an embedded PDF reader) and short updates, replacing the news section.
- Projects page with active projects, an archive and a list of smaller repositories.
- Full-text search with Pagefind.
- Experience and certifications as YAML data files, shared with the CV.
- `llms.txt`, sitemap and structured data.

### Changed

- Rebuilt with Astro and Tailwind CSS, replacing Hugo and the Wowchemy theme.
- New look in a forest palette with risograph illustrations.
- `www.frederikberg.com` redirects to the apex domain.
- Container images are built from version tags.

### Removed

- News section, GitLab links and the TryHackMe completion certificates.
