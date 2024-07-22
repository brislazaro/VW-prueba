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

  describe("When isLoading is true", () => {
    test("Then should print a skeleton component", () => {
      usePostDetailsMock.mockReturnValue({
        isLoading: true,
        isError: false,
        data: postMock,
      });
      renderComponentFactory(<PostDetails />);

      expect(screen.getByTestId("drawerSkeleton")).toBeInTheDocument();
    });
  });

  describe("When isError is true", () => {
    test("Then should print a error message", () => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: true,
        data: postMock,
      });
      renderComponentFactory(<PostDetails />);

      expect(screen.getByText("Error loading posts")).toBeInTheDocument();
    });
  });

  describe("When the post does not exist", () => {
    beforeEach(() => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: undefined,
      });

      renderComponentFactory(<PostDetails />);
    });

    test("Then should print no data message", () => {
      expect(
        screen.getByText("There is no post with this id")
      ).toBeInTheDocument();
    });

    test("Then should disable all action buttons", () => {
      const deleteButton = screen.getByText("Delete").closest("button");
      const editButton = screen.getByText("Edit").closest("button");
      const saveButton = screen.getByText("Save").closest("button");

      expect(deleteButton).toBeDisabled();
      expect(editButton).toBeDisabled();
      expect(saveButton).toBeDisabled();
    });
  });

  describe("When isLoading and isError are false and data is an object", () => {
    beforeEach(() => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: postMock,
      });

      renderComponentFactory(<PostDetails />);
    });

    test("Then should print a title and body detail", () => {
      expect(screen.getByDisplayValue("Post title")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Hello my name is brisa")
      ).toBeInTheDocument();
    });

    describe("When the drawer is opened", () => {
      test("Then should print edit button", () => {
        expect(screen.getByText("Edit")).toBeInTheDocument();
      });

      test("Then should dissable inputs", () => {
        const titleInput = screen.getByDisplayValue("Post title");
        const bodyInput = screen.getByDisplayValue("Hello my name is brisa");
        expect(titleInput).toBeDisabled();
        expect(bodyInput).toBeDisabled();
      });
    });

    describe("When clicking the edit button", () => {
      test("Then should print cancel button", () => {
        const button = screen.getByText("Edit");
        fireEvent.click(button);

        expect(screen.getByText("Cancel")).toBeInTheDocument();
      });

      test("Then should enable inputs", () => {
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
        const button = screen.getByText("Edit");
        fireEvent.click(button);

        const titleInput = screen.getByDisplayValue("Post title");

        fireEvent.change(titleInput, { target: { value: "New Title" } });

        expect(screen.getByDisplayValue("New Title")).toBeInTheDocument();
      });

      describe("And clicking cancel button", () => {
        test("Then should print the initial value", () => {
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

  describe("When the title input is empty", () => {
    test("Then should disable save button", () => {
      usePostDetailsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: {
          body: "",
          id: 1,
          title: "",
          userId: 1,
        },
      });

      renderComponentFactory(<PostDetails />);

      const button = screen.getByText("Edit");
      fireEvent.click(button);

      const saveButton = screen.getByText("Save").closest("button");

      expect(saveButton).toBeDisabled();
    });
  });
});
