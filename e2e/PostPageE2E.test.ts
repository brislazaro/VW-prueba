import { test, expect } from "@playwright/test";

test("Given a PostPage THEN should load and render the first 10 posts", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  const items = await page.locator('[data-testid="post-item"]');

  await expect(items).toHaveCount(10);
});

test("When creating a new post, THEN should add it to the list", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  await page.locator('[data-testid="post-item"]');

  await page.locator('.ant-table-column-title:text("Id")').click();
  await page.locator('.ant-table-column-title:text("Id")').click();

  await page.locator("text=Add post").click();

  const titleInputLocator = await page.locator(
    'input[placeholder="Introduce the post title..."]'
  );
  await titleInputLocator.fill("My post title");

  const bodyInputLocator = await page.locator(
    'textarea[placeholder="Introduce the post body..."]'
  );
  await bodyInputLocator.fill("My post body with more text than the other one");

  await page.locator("text=Save").click();

  await page.waitForSelector("text=101");
  await page.waitForSelector("text=My post title");

  expect(await page.locator("text=101")).toBeDefined();
  expect(await page.locator("text=My post title")).toBeDefined();
});

test("When deleting an existing post, THEN should remove it from the list", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/detail/1");

  await page.waitForSelector('[data-testid="drawerSkeleton"]', {
    state: "hidden",
  });

  await page.locator("text=Delete").click();

  const postText = "sunt aut facere repellat provident";
  await page.waitForSelector(`text=${postText}`, { state: "detached" });

  const deletedPostText = await page.locator(`text=${postText}`).count();

  expect(deletedPostText).toBe(0);
});

test("When editing an existing post, THEN should modify it's title from the list", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/detail/1");

  await page.waitForSelector('[data-testid="drawerSkeleton"]', {
    state: "hidden",
  });

  await page.locator('span:text("Edit")').click();

  const newTitle = "New post title";
  const titleInput = await page.locator(
    'input[placeholder="Enter post title..."]'
  );

  await titleInput.fill(newTitle);

  await page.locator("text=Save").click();

  const postText = "sunt aut facere repellat provident";
  await page.waitForSelector(`text=${postText}`, { state: "detached" });

  const deletedPostText = await page.locator(`text=${postText}`).count();

  expect(deletedPostText).toBe(0);

  const newPostTitle = await page.locator(`text=${newTitle}`);
  expect(newPostTitle).toBeDefined();
});
