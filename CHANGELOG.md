# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

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
