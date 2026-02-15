# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-02-15

### Added

- Support for Angular 21.
- Directive is now **standalone** (`standalone: true`). You can import `NgxScrollEventDirective` in standalone components or use `NgxScrollEventModule` as before.
- E2E tests (Playwright) and a minimal e2e app in the workspace.
- Expanded unit tests (default offsets, edge cases, original event passthrough).

### Changed

- **Breaking:** Minimum supported Angular version is now **Angular 21**. Angular 10–20 are no longer supported.
- **Breaking:** Minimum Node.js: ^20.19.0, ^22.12.0, or ≥24.0.0.
- `NgxScrollEventModule` now **imports** and **exports** the standalone directive (no longer declares it).
- Updated dependencies: zone.js ~0.16.0, TypeScript >=5.9.0 <6.0.0, Karma ^6.3.0.

### Fixed

- Unit tests now target the scroll directive (replaced incorrect HighlightDirective tests).
- Build and tests work with Angular 21 and current tooling.

---

## [2.0.2] - (previous)

- Angular 10+ support.
- Library built with View Engine / Ivy.

[3.0.0]: https://github.com/anasAsh/ngx-scroll-event/compare/v2.0.2...v3.0.0
[2.0.2]: https://github.com/anasAsh/ngx-scroll-event/releases/tag/v2.0.2
