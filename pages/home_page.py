from typing import List

from playwright.sync_api import expect

from .base_page import BasePage


class HomePage(BasePage):
    """
    Landing page object with top navigation helpers.
    """

    def open(self) -> None:
        """
        Navigate to the site root.
        """
        self.goto("/")

    def top_nav_links(self) -> List[str]:
        """
        Return the visible top-level navigation link texts.
        """
        links = self.page.get_by_role("navigation").get_by_role("link")
        return [l.inner_text().strip() for l in links.all() if l.is_visible()]

    def click_top_nav(self, name: str) -> None:
        """
        Click a top-level navigation link by name.
        """
        self.page.get_by_role("navigation").get_by_role("link", name=name, exact=False).first.click()

    def open_menu(self, name: str) -> None:
        """
        Open a menu/dropdown by accessible name.
        """
        self.open_dropdown(name)

    def click_menu_item(self, name: str) -> None:
        """
        Click a menu item inside an open dropdown.
        """
        self.select_dropdown_option(name)

    def expect_hero_visible(self) -> None:
        """
        Validate the hero/banner is visible.
        """
        hero = self.page.locator("header, .hero, [data-test=hero]").first
        expect(hero).to_be_visible()


