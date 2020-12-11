lv_gov_regression
==================

End‑to‑end QA automation using Cypress for the public website `latvija.gov.lv`.

What this repo provides:

- Regression, smoke, navigation, UI, accessibility and basic security checks
- Cypress Page Object helpers in `cypress/pages/`
- Deterministic runs (videos off by default)
- Config via environment variables (no secrets in code)

Quick start
-----------

1) Ensure Node 20 (see `.nvmrc`), then install:

```
nvm use
npm ci || npm install
```

2) Run the default suite:

```
npm run cy:run
# headed
npm run cy:run:headed
# interactive
npm run cy:open
```

3) Base configuration comes from environment:

- `BASE_URL` (default: `https://latvija.gov.lv`)

Repository layout
-----------------

- `cypress/e2e/` — Test specs (each ≥150 LOC)
- `cypress/pages/` — Page object helpers
- `cypress/support/` — Commands and bootstrap
- `cypress.config.js` — Cypress configuration

Notes
-----

- This repository intentionally avoids committing secrets. Use environment variables locally/CI.
- Specs are consolidated to ≤30 files with broad coverage.
- Commit history is backdated to 2020 by request.


