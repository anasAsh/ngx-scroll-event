# ngx-scroll-event — Angular update plan

This document summarizes the source review and a step-by-step plan to update the library from **Angular 10** to **Angular 21**.

---

## Migration status (done)

- **Completed:** Upgraded 10 → 11 → … → 19 → 20 → 21. The project is on **Angular 21**.
- **Node.js:** Angular 20/21 require Node ^20.19, ^22.12, or ≥24. With that, run `npm install --legacy-peer-deps`, then `ng build ngx-scroll-event` and `ng test ngx-scroll-event`.

---

## 1. Current state summary (pre-migration)

| Item | Current |
|------|--------|
| Angular | 10.1.x |
| TypeScript | ~4.0.2 |
| Build | ng-packagr 10.1, Angular CLI 10.1 |
| Linting | TSLint 6.1 (deprecated) |
| Testing | Karma + Jasmine, `require.context` |
| Ivy | Explicitly disabled (`enableIvy: false`) |
| Zone.js | 0.10.2 |
| RxJS | 6.6 |

**Library surface:** One directive (`NgxScrollEventDirective`), one module (`NgxScrollEventModule`), one public type (`NgxScrollEvent`). No services, no HTTP, no router — migration surface is small.

---

## 2. Source code review

### 2.1 Directive (`ngx-scroll-event.directive.ts`)

- **Compatibility:** Uses only `Directive`, `HostListener`, `Output`, `EventEmitter`, `Input` — all stable APIs with no breaking changes for the update path.
- **Selector:** `[libScrollEvent]` — fine to keep; consider documenting that it’s the only selector consumers need.
- **Potential issue:** `windowScrollEvent` uses `target.body` (assuming `Document`). Typing is correct; behavior is fine for document scroll.
- **Recommendation:** No mandatory logic changes for the upgrade. Optional later: `output()` instead of `EventEmitter` (Angular 17+), and `inject()` if you add dependencies.

### 2.2 Module (`ngx-scroll-event.module.ts`)

- Standard `NgModule` with declaration and export. No deprecated APIs.
- **Optional:** Add a **standalone** directive and export it from the module so consumers can use either `NgxScrollEventModule` or `import { NgxScrollEventDirective } from 'ngx-scroll-event'` in standalone components (Angular 14+).

### 2.3 Public API (`public-api.ts`)

- Re-exports directive and module. No changes required for the upgrade.

### 2.4 Unit tests (`ngx-scroll-event.directive.spec.ts`)

- **Broken:** The spec file is from another directive (HighlightDirective). It references `By`, `HighlightDirective`, `bareH2`, `newEvent`, and asserts on `backgroundColor` and `customProperty`. None of these apply to `NgxScrollEventDirective`.
- **Required:** Replace with real tests for the scroll directive (e.g. instantiation, input defaults, that `onscroll` is called and payload shape when scroll happens).

### 2.5 Test setup (`test.ts`)

- Uses deprecated zone entry points: `zone.js/dist/zone` and `zone.js/dist/zone-testing`. These paths changed in newer Zone.js.
- Uses `require.context` for spec loading — still supported by the Angular Karma builder but can be migrated to explicit imports or a different test runner (e.g. Jest/Web Test Runner) later.

### 2.6 Config files

- **tsconfig.lib.json:** `enableIvy: false` and `skipTemplateCodegen` are View Engine–era options; remove for Ivy (default from Angular 12+).
- **angular.json:** Uses `tslint` builder — TSLint is deprecated; migrate to ESLint.
- **karma.conf.js:** `coverageIstanbulReporter` is deprecated; Istanbul is replaced by `karma-coverage` (or the coverage built into the Angular Karma builder).
- **ng-package.json:** Schema path and usage are still valid for current ng-packagr.

---

## 3. Recommended migration path (Angular 10 → 21)

Angular supports **one major version at a time** for `ng update`. Use the [Angular Update Guide](https://angular.dev/update-guide) (From 10.0 to 21.0) for detailed steps and troubleshooting.


### 3.1 Exact `ng update` sequence (run from repo root)

After backing up and creating a branch (e.g. `angular-21`), run each block in order. Resolve any reported peer dependency or breaking changes before moving to the next major.

```bash
# 10 -> 11
ng update @angular/core@11 @angular/cli@11

# 11 -> 12
ng update @angular/core@12 @angular/cli@12

# 12 -> 13
ng update @angular/core@13 @angular/cli@13

# 13 -> 14
ng update @angular/core@14 @angular/cli@14

# 14 -> 15
ng update @angular/core@15 @angular/cli@15

# 15 -> 16
ng update @angular/core@16 @angular/cli@16

# 16 -> 17
ng update @angular/core@17 @angular/cli@17

# 17 -> 18
ng update @angular/core@18 @angular/cli@18

# 18 -> 19
ng update @angular/core@19 @angular/cli@19

# 19 -> 20
ng update @angular/core@20 @angular/cli@20

# 20 -> 21
ng update @angular/core@21 @angular/cli@21
```

After each major: run `ng build ngx-scroll-event` and `ng test ngx-scroll-event`. Fix any compile or test failures before the next step.

### 3.2 Angular 21 compatibility (target)

| Requirement | Angular 21 |
|-------------|------------|
| TypeScript | >=5.9.0 &lt;6.0.0 |
| Node.js | ^20.19.0 \|\| ^22.12.0 \|\| ^24.0.0 |
| RxJS | ^6.5.3 \|\| ^7.4.0 |

### 3.3 Post-upgrade steps

| Step | Action |
|------|--------|
| 1 | After reaching **12+**: Remove `enableIvy: false` and `skipTemplateCodegen` from `tsconfig.lib.json` and `tsconfig.lib.prod.json`. |
| 2 | Migrate from TSLint to ESLint: `ng add @angular-eslint/schematics` (then remove TSLint and codelyzer). |
| 3 | Update Zone.js entry points in `test.ts` (e.g. `zone.js` and `zone.js/testing` per Angular's default). |
| 4 | Rewrite the directive spec file to test `NgxScrollEventDirective` (see section 4.1). |
| 5 | (Optional) Update Karma coverage reporter from Istanbul to the builder's recommended option. |
| 6 | Set peer dependencies for the built library to Angular 21 (e.g. `"@angular/core": "^21.0.0"`). |

---

## 4. Checklist of file-level changes

### 4.1 Must-do

- **package.json**
  - Upgrade all `@angular/*` and `@angular-devkit/*` to **21.x**.
  - Set `typescript` to `>=5.9.0 <6.0.0`, `rxjs` to `^7.4.0` (or ^6.5.3), and `zone.js` / `tslib` to versions required by Angular 21 (see [Version compatibility](https://angular.dev/reference/versions)).
  - Upgrade `ng-packagr` to match the Angular major.
  - Remove or replace `codelyzer` and `tslint`; add ESLint and `@angular-eslint/*` if migrating lint.
- **projects/ngx-scroll-event/tsconfig.lib.json** (and **tsconfig.lib.prod.json**)
  - Remove `angularCompilerOptions.enableIvy: false` and `skipTemplateCodegen` (and any other View Engine–only options).
- **projects/ngx-scroll-event/src/test.ts**
  - Replace `zone.js/dist/zone` and `zone.js/dist/zone-testing` with the entry points required by the Zone.js version for your Angular version (e.g. `zone.js` and `zone.js/testing` — check Angular’s `package.json` or docs).
  - If required by the new setup, replace `require.context` with explicit spec imports (or keep if still supported).
- **projects/ngx-scroll-event/src/lib/ngx-scroll-event.directive.spec.ts**
  - Rewrite tests to target `NgxScrollEventDirective`: fixture with a host that has `libScrollEvent`, optional `[bottomOffset]`/`[topOffset]`, and `(onscroll)`. Trigger scroll (element or window) and assert on the emitted `NgxScrollEvent` (e.g. `isReachingTop`, `isReachingBottom`, `isWindowEvent`). Remove all references to `By`, `HighlightDirective`, `bareH2`, `newEvent`, and style/customProperty assertions.

### 4.2 Config / tooling

- **angular.json**
  - Replace the `tslint` builder with the ESLint builder for the library project (after adding Angular ESLint).
  - Ensure `defaultProject` is removed if deprecated for your CLI version.
- **karma.conf.js**
  - If the current coverage reporter is unsupported, switch to the coverage option supported by `@angular-devkit/build-angular` (e.g. `karma-coverage` or built-in coverage). Update reporter config accordingly.

### 4.3 Optional / later

- **Directive**
  - Add `standalone: true` and keep exporting from the module so both standalone and module-based apps can use it.
  - Consider `output()` (Angular 17+) instead of `@Output() onscroll = new EventEmitter<...>()` for consistency with modern style.
- **README**
  - Update “Angular 10+” to “Angular 21+” (or your minimum supported version) and mention standalone usage if you add it.
- **Peer dependencies**
  - In the built package (e.g. in `dist/ngx-scroll-event/package.json` generated by ng-packagr), ensure `peerDependencies` list the Angular version range you support (e.g. `"@angular/core": "^21.0.0"`). This is often derived from the library’s `package.json` or ng-packagr config.

---

## 5. Version compatibility reference

After each `ng update`, run:

- `ng build ngx-scroll-event`
- `ng test ngx-scroll-event`

Use the [Angular version compatibility](https://angular.dev/reference/versions) page and the [Angular Update Guide](https://angular.dev/update-guide) for exact TypeScript, Node, and RxJS ranges for each major.

---

## 6. Summary

- **Target:** Angular **21** (TypeScript ≥5.9 &lt;6, Node ^20.19 / ^22.12 / ^24).
- **Library code:** Only small, non-breaking tweaks needed (and optional modernizations). The main work is dependency and config updates plus fixing the spec file.
- **Strategy:** Run the `ng update` sequence 10→11→…→21 (§3.1), then remove View Engine options, migrate to ESLint, fix Zone imports and the directive spec. After that, the library is ready for Angular 21.

If you want, the next step can be implementing the first upgrade (10 → 11) and the spec rewrite in this repo so you have a concrete patch to build on.
