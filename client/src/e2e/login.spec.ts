import { testIds } from "@/views/helpers/testIds";
import { test, expect } from "@playwright/test";

const { describe } = test;

describe("When logging in", () => {
  describe("And user enters invalid credentials", () => {
    test("It shows an error", async ({ page }) => {
      await page.goto("http://localhost:3000/");

      const emailInputLocator = page.getByTestId(testIds.loginEmailInput);
      const passwordInputLocator = page.getByTestId(testIds.loginPasswordInput);

      await expect(emailInputLocator).toBeEmpty();
      await expect(passwordInputLocator).toBeEmpty();

      await emailInputLocator.fill("some@example.com");
      await passwordInputLocator.fill("password");

      await page.getByTestId(testIds.loginButton).click();

      // DO NOT ASSERT AGAINST A SPECIFIC TEXT UNLESS ABSOLUTELY NECESSARY!
      // And if that's the case, extract the text to a constant
      await expect(page.getByTestId(testIds.loginNotice)).not.toBeEmpty();
    });
  });
});
