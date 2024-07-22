import { test, expect } from "@playwright/test";

test("Given a PostPage THEN should load and render the first 10 posts", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  const items = await page.locator('[data-testid="post-item"]');

  await expect(items).toHaveCount(10);
});
