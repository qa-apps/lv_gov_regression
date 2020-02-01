from typing import Optional

from playwright.sync_api import expect

from .base_page import BasePage


class LoginPage(BasePage):
    """
    Authentication page object with helpers for positive and negative flows.
    """

    def open(self) -> None:
        """
        Navigate to the login route.
        """
        self.goto("/login")

    def fill_username(self, value: str) -> None:
        """
        Type into the username field using common selectors.
        """
        self.page.locator("input[name='username'], input#username, input[name*=user i]").first.fill(value)

    def fill_password(self, value: str) -> None:
        """
        Type into the password field using common selectors.
        """
        self.page.locator("input[type='password'], input[name='password']").first.fill(value)

    def submit(self) -> None:
        """
        Click the primary submit button in the form.
        """
        self.page.get_by_role("button", name="Sign in", exact=False).or_(self.page.locator(\"button[type=submit]\")).first.click()

    def expect_error(self, text: str) -> None:
        """
        Validate a visible error message contains text.
        """
        box = self.page.get_by_role("alert").or_(self.page.locator(".error, [data-test=error]")).first
        expect(box).to_contain_text(text)

    def expect_logged_in(self) -> None:
        """
        Assert the UI indicates user is logged in (generic heuristics).
        """
        avatar = self.page.get_by_role(\"img\", name=\"avatar\").or_(self.page.locator(\"[data-test=avatar], .avatar\")).first\n+        expect(avatar).to_be_visible()\n+        expect(self.page.get_by_role(\"link\", name=\"Sign out\", exact=False).or_(self.page.locator(\"a[href*='logout']\"))).to_be_visible()\n*** End Patch  }*/

