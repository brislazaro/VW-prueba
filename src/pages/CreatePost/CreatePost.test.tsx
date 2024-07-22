import { Mock } from "vitest";
import useCreatePost from "./useCreatePost";
import CreatePost from "./CreatePost";
import { fireEvent, screen } from "@testing-library/react";
import { renderComponentFactory } from "../../testUtils";

vi.mock("./useCreatePost");

const useCreatePostMock = useCreatePost as Mock;

useCreatePost;
describe("Given a CreatePost component", () => {
  describe("When isLoadingCreate is false", () => {
    beforeEach(() => {
      useCreatePostMock.mockReturnValue({
        isLoadingCreate: false,
        isErrorCreate: false,
      });

      renderComponentFactory(<CreatePost />);
    });

    describe("When opened", () => {
      test("Then should disable save button", () => {
        const saveButton = screen.getByText("Save").closest("button");
        expect(saveButton).toBeDisabled();
      });
    });

    describe("When touching the title field and leaving it with no value", () => {
      test("Then should disable save button", () => {
        const input = screen.getByPlaceholderText(
          "Introduce the post title..."
        );
        fireEvent.focus(input);
        fireEvent.blur(input);

        const saveButton = screen.getByText("Save").closest("button");
        expect(saveButton).toBeDisabled();
      });
    });

    describe("When introducing some value to the title field", () => {
      test("Then should enable save button", () => {
        const input = screen.getByPlaceholderText(
          "Introduce the post title..."
        );
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "post title" } });
        fireEvent.blur(input);

        const saveButton = screen.getByText("Save").closest("button");
        expect(saveButton).not.toBeDisabled();
      });
    });
  });

  describe("When isLoadingCreate is true", () => {
    test("Then should disable buttons and inputs", () => {
      useCreatePostMock.mockReturnValue({
        isLoadingCreate: true,
        isErrorCreate: false,
      });

      renderComponentFactory(<CreatePost />);

      const saveButton = screen.getByTestId("save-button");

      const cancelButton = screen.getByText("Cancel").closest("button");

      const titleInput = screen.getByPlaceholderText(
        "Introduce the post title..."
      );
      const bodyInput = screen.getByPlaceholderText(
        "Introduce the post body..."
      );

      expect(saveButton).toBeDisabled();
      expect(cancelButton).toBeDisabled();
      expect(titleInput).toBeDisabled();
      expect(bodyInput).toBeDisabled();
    });
  });
});
