import os
from typing import Generator, Optional

import pytest
from dotenv import load_dotenv
from playwright.sync_api import Browser, Page, Playwright, sync_playwright


def _to_bool(value: Optional[str], default: bool = True) -> bool:
    if value is None:
        return default
    value = value.strip().lower()
    return value in {"1", "true", "yes", "y"}


@pytest.fixture(scope="session")
def base_url() -> str:
    load_dotenv()
    return os.getenv("BASE_URL", "https://latvian.gov.lv")


@pytest.fixture(scope="session")
def headless() -> bool:
    load_dotenv()
    return _to_bool(os.getenv("HEADLESS", "1"), True)


@pytest.fixture(scope="session")
def slowmo_ms() -> int:
    load_dotenv()
    raw = os.getenv("SLOWMO_MS", "0")
    try:
        return int(raw)
    except ValueError:
        return 0


@pytest.fixture(scope="session")
def browser(headless: bool, slowmo_ms: int) -> Generator[Browser, None, None]:
    """
    Create a Playwright browser for the test session.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=headless, slow_mo=slowmo_ms)
        try:
            yield browser
        finally:
            browser.close()


@pytest.fixture()
def page(browser: Browser, base_url: str) -> Generator[Page, None, None]:
    """
    Provide a new page per test with the base URL set.
    """
    context = browser.new_context(base_url=base_url, ignore_https_errors=True)
    page = context.new_page()
    try:
        yield page
    finally:
        context.close()


