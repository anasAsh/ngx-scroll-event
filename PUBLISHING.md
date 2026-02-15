# Publishing to npm

Checklist before publishing a new version:

1. **Version and changelog**
   - Bump `version` in root `package.json` (e.g. 3.0.0).
   - Update `CHANGELOG.md` with the new version and changes.

2. **Tests**
   - `npm run build:lib` — must succeed.
   - `ng test ngx-scroll-event --watch=false` — unit tests must pass.
   - `npm run e2e` — optional; e2e tests must pass.

3. **Commit and tag (recommended)**
   - `git add -A && git commit -m "chore: release v3.0.0"`
   - `git tag v3.0.0`

4. **Publish**
   - From the **repository root** (not from `dist/`): `npm run build:lib`. This regenerates `dist/ngx-scroll-event` with the current version and peerDependencies from the root `package.json`.
   - `cd dist/ngx-scroll-event`
   - `npm publish --dry-run` — check that the version is correct (e.g. 3.0.0) and what will be published.
   - `npm publish` (or `npm publish --access public` for scoped packages).

5. **Push**
   - `git push && git push --tags`

---

The package that gets published is **only** the contents of `dist/ngx-scroll-event` (built by `ng build ngx-scroll-event`). The root `package.json` is used as the source for the built package’s metadata (name, version, etc.); ng-packagr generates the final `package.json` in `dist/ngx-scroll-event` with the correct `peerDependencies` for Angular.
