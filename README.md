lv_gov_regression
==================

End‑to‑end QA automation in Python using Playwright + pytest for the public website `latvian.gov.lv`.

What this repo provides:

- Regression, smoke, navigation, UI, accessibility and basic security checks
- Page Object Model with typed, documented methods
- Deterministic fixtures, retries, xdist parallelism, HTML report
- Config via environment variables (no secrets in code)

Quick start
-----------

1) Create a virtualenv and install dependencies:

```
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
playwright install
```

2) Run the default suite:

```
pytest -n auto --maxfail=1 --dist=loadscope --html=reports/report.html
```

3) Base configuration comes from environment:

- `BASE_URL` (default: `https://latvian.gov.lv`)
- `HEADLESS` (`1` by default)
- `SLOWMO_MS` (default: `0`)

Repository layout
-----------------

- `pages/` — Page Objects
- `tests/` — Test modules (each ≥150 LOC)
- `helpers/` — Utilities (env, a11y, network/security helpers)
- `conftest.py` — Shared pytest fixtures
- `pytest.ini` — Pytest defaults

Notes
-----

- This repository intentionally avoids committing secrets. Use a local `.env` file if needed.
- Large test modules are grouped to stay within a capped number of files while covering many paths.
- Commit history may be backdated for migration/testing purposes only.


