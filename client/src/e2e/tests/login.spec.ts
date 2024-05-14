import { testIds } from "@/views/helpers/testIds";
import { test, expect, Page } from "@playwright/test";
import { getSampleAccount } from "../src/infra/getSampleAccount";

const { describe } = test;

describe("When logging in", () => {
  type SetupParams = {
    page: Page;
    email: string;
    password: string;
  };
  const setup = async ({ page, email, password }: SetupParams) => {
    await page.goto("http://localhost:3000/");

    const emailInputLocator = page.getByTestId(testIds.loginEmailInput);
    const passwordInputLocator = page.getByTestId(testIds.loginPasswordInput);

    await expect(emailInputLocator).toBeEmpty();
    await expect(passwordInputLocator).toBeEmpty();

    await emailInputLocator.fill(email);
    await passwordInputLocator.fill(password);

    await page.getByTestId(testIds.loginButton).click();
  };

  describe("And user enters invalid credentials", () => {
    type SecondSetupParams = {
      page: Page;
    };
    const secondSetup = ({ page }: SecondSetupParams) =>
      setup({ page, email: "some@example.com", password: "password" });

    test("It shows an error", async ({ page }) => {
      await secondSetup({ page });

      // DO NOT ASSERT AGAINST A SPECIFIC TEXT UNLESS ABSOLUTELY NECESSARY!
      // And if that's the case, extract the text to a constant
      await expect(page.getByTestId(testIds.loginNotice)).not.toBeEmpty();
    });
  });

  describe("And user enters VALID credentials", () => {
    type SecondSetupParams = {
      page: Page;
    };
    const secondSetup = async ({ page }: SecondSetupParams) => {
      const sampleAccount = await getSampleAccount();

      await setup({
        page,
        email: sampleAccount.email,
        password: sampleAccount.password,
      });
    };

    test("It renders the initial page", async ({ page }) => {
      await secondSetup({ page });

      await expect(page.getByTestId(testIds.headerTitle)).toBeVisible();
    });
  });
});
