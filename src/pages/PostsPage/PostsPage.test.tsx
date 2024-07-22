import { describe, Mock } from "vitest";
import usePosts from "./usePosts";
import PostsPage from "./PostsPage";
import { renderComponentFactory } from "../../testUtils";
import { screen } from "@testing-library/react";

vi.mock("./usePosts.ts");

const usePostsMock = usePosts as Mock;

describe("Given a PostsPage component", () => {
  describe("When isLoading is true", () => {
    test("Then should render a loding icon", () => {
      usePostsMock.mockReturnValue({
        isLoading: true,
        isError: false,
        data: [],
      });

      const { container } = renderComponentFactory(<PostsPage />);

      expect(
        container.getElementsByClassName("ant-spin")[0]
      ).toBeInTheDocument();
    });
  });

  describe("When isError is true", () => {
    test("Then should render an error message", () => {
      usePostsMock.mockReturnValue({
        isLoading: false,
        isError: true,
        data: [],
      });

      renderComponentFactory(<PostsPage />);

      expect(screen.getByText("Error loading posts")).toBeInTheDocument();
    });
  });

  describe("When isError and isLoading are false and data is an empty array", () => {
    test("Then should render a no data icon", () => {
      usePostsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: [],
      });

      renderComponentFactory(<PostsPage />);

      expect(screen.getByText("No data")).toBeInTheDocument();
    });
  });

  describe("When isLoading and isError are false and data is an array of 2 posts", () => {
    test("Then should render 2 items", () => {
      usePostsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: [
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
        ],
      });

      renderComponentFactory(<PostsPage />);

      expect(screen.getAllByTestId("post-item").length).toBe(2);
    });
  });

  describe("When isLoading and isError are false and data is an array of 50 posts", () => {
    test("Then should render only 10 post items due to pagination", () => {
      const posts = [];
      for (let i = 0; i < 50; i++) {
        posts.push({
          key: i,
          body: "body text",
          id: i,
          title: "Clean house",
          userId: 1,
        });
      }

      usePostsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: posts,
      });

      renderComponentFactory(<PostsPage />);

      expect(screen.getAllByTestId("post-item").length).toBe(10);
    });
  });
});
