from typing import Optional

from playwright.sync_api import Page, expect


class BasePage:
    """
    Base Page Object with common helpers.
    """

    def __init__(self, page: Page) -> None:
        self.page = page

    def goto(self, url: str) -> None:
        """
        Navigate to a URL relative to the base_url or an absolute URL.
        """
        self.page.goto(url, wait_until="domcontentloaded")

    def expect_title_contains(self, text: str) -> None:
        """
        Assert the document title contains a given substring.
        """
        expect(self.page).to_have_title(lambda t: text.lower() in t.lower())

    def click_link_by_text(self, text: str) -> None:
        """
        Click a link by its visible text.
        """
        self.page.get_by_role("link", name=text, exact=False).first.click()

    def click_button(self, name: str) -> None:
        """
        Click a button by accessible name.
        """
        self.page.get_by_role("button", name=name, exact=False).first.click()

    def open_dropdown(self, label: str) -> None:
        """
        Open a dropdown by clicking its labeled control.
        """
        self.page.get_by_role("button", name=label, exact=False).first.click()

    def select_dropdown_option(self, option_name: str) -> None:
        """
        Choose an option from an open dropdown using accessible name.
        """
        self.page.get_by_role("menuitem", name=option_name, exact=False).first.click()

    def expect_toast(self, text: str, timeout_ms: Optional[int] = 5000) -> None:
        """
        Wait for a status/toast message containing text.
        """
        locator = self.page.get_by_role("status")
        expect(locator).to_contain_text(text, timeout=timeout_ms)


