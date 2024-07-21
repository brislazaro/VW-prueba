import { Mock } from "vitest";
import { Post } from "../../components/Types/Types";
import usePostDetails from "./usePostDetails";
import { renderComponentFactory } from "../../testUtils";
import PostDetails from "./PostDetails";
import { screen, fireEvent } from "@testing-library/react";

vi.mock("./usePostDetails.ts");
const usePostDetailsMock = usePostDetails as Mock;

describe("Given a Post Details component", () => {
  const postMock: Post = {
    body: "Hello my name is brisa",
    id: 1,
    title: "Post title",
    userId: 1,
  };

  describe("When isLoading and isError are false and data is an object", () => {
    test("Then should print a title and body detail", () => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: postMock,
      });

      renderComponentFactory(<PostDetails />);

      expect(screen.getByDisplayValue("Post title")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Hello my name is brisa")
      ).toBeInTheDocument();
    });
  });

  describe("When the drawer is opened", () => {
    test("Then should print edit button", () => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: postMock,
      });

      renderComponentFactory(<PostDetails />);

      expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    test("Then should dissable inputs", () => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: postMock,
      });

      renderComponentFactory(<PostDetails />);

      const titleInput = screen.getByDisplayValue("Post title");
      const bodyInput = screen.getByDisplayValue("Hello my name is brisa");
      expect(titleInput).toBeDisabled();
      expect(bodyInput).toBeDisabled();
    });
  });

  describe("When clicking the edit button", () => {
    test("Then should print cancel button", () => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: postMock,
      });

      renderComponentFactory(<PostDetails />);

      const button = screen.getByText("Edit");
      fireEvent.click(button);

      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    test("Then should enable inputs", () => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: postMock,
      });

      renderComponentFactory(<PostDetails />);

      const button = screen.getByText("Edit");
      fireEvent.click(button);

      const titleInput = screen.getByDisplayValue("Post title");
      const bodyInput = screen.getByDisplayValue("Hello my name is brisa");
      expect(titleInput).not.toBeDisabled();
      expect(bodyInput).not.toBeDisabled();
    });
  });

  describe("When modifying the inputs", () => {
    test("Then should reflect the changes", () => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: postMock,
      });

      renderComponentFactory(<PostDetails />);

      const button = screen.getByText("Edit");
      fireEvent.click(button);

      const titleInput = screen.getByDisplayValue("Post title");

      fireEvent.change(titleInput, { target: { value: "New Title" } });

      expect(screen.getByDisplayValue("New Title")).toBeInTheDocument();
    });

    describe("And clicking cancel button", () => {
      test("Then should print the initial value", () => {
        usePostDetailsMock.mockReturnValue({
          isLoading: false,
          isError: false,
          data: postMock,
        });

        renderComponentFactory(<PostDetails />);

        const button = screen.getByText("Edit");
        fireEvent.click(button);

        const titleInput = screen.getByDisplayValue("Post title");

        fireEvent.change(titleInput, { target: { value: "New Title" } });

        expect(screen.getByDisplayValue("New Title")).toBeInTheDocument();

        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);

        expect(screen.getByDisplayValue("Post title")).toBeInTheDocument();
      });
    });
  });
});
