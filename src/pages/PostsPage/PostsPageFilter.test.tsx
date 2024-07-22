import PostsPage from "./PostsPage";
import { renderComponentFactoryWithReduxPosts } from "../../testUtils";
import { fireEvent, screen } from "@testing-library/react";

describe("Given a PostPage component with 2 posts in the store", () => {
  const postsMock = [
    {
      key: 1,
      body: "body text",
      id: 2,
      title: "do homework",
      userId: 2,
    },
    {
      key: 2,
      body: "body text",
      id: 3,
      title: "shop shoes",
      userId: 3,
    },
  ];

  describe('When the user types "shop" in the input', () => {
    test("Then should only display 1 matching post", () => {
      renderComponentFactoryWithReduxPosts(<PostsPage />, postsMock);

      const searchInput = screen.getByPlaceholderText("Search");

      fireEvent.change(searchInput, { target: { value: "shop" } });

      expect(screen.queryByText("do homework")).not.toBeInTheDocument();
      expect(screen.queryByText("shop shoes")).toBeInTheDocument();
    });
  });

  describe("When the user types something with no coincidences (big screen computer)", () => {
    test("Then should display a no coincidences message", () => {
      renderComponentFactoryWithReduxPosts(<PostsPage />, postsMock);

      const searchInput = screen.getByPlaceholderText("Search");

      fireEvent.change(searchInput, {
        target: { value: "big screen computer" },
      });

      expect(
        screen.getByText(
          "There are no coincidences with the text big screen computer"
        )
      ).toBeInTheDocument();
    });
  });
});
