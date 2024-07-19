import { describe, Mock } from "vitest";
import useToDos from "./useToDos";
import ToDosPage from "./ToDosPage";
import { renderComponentFactory } from "../../testUtils";
import { screen } from "@testing-library/react";

vi.mock("./useToDos.ts");

const useProductsListMock = useToDos as Mock;

describe("Given a ToDosPage component", () => {
  describe("When isLoading is true", () => {
    test("Then should render a loding icon", () => {
      useProductsListMock.mockReturnValue({
        isLoading: true,
        isError: false,
        data: [],
      });

      const { container } = renderComponentFactory(<ToDosPage />);

      expect(
        container.getElementsByClassName("ant-spin")[0]
      ).toBeInTheDocument();
    });
  });

  describe("When isError is true", () => {
    test("Then should render an error message", () => {
      useProductsListMock.mockReturnValue({
        isLoading: false,
        isError: true,
        data: [],
      });

      renderComponentFactory(<ToDosPage />);

      expect(screen.getByText("Error al cargar datos")).toBeInTheDocument();
    });
  });

  describe("When isError and isLoading are false and data is an empty array", () => {
    test("Then should render a no data icon", () => {
      useProductsListMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: [],
      });

      renderComponentFactory(<ToDosPage />);

      expect(screen.getByText("No data")).toBeInTheDocument();
    });
  });

  describe("When isLoading and isError are false and data is an array of 2 to do´s", () => {
    test("Then should render 2 items", () => {
      useProductsListMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: [
          {
            completed: true,
            id: 2,
            title: "do homework",
            userId: 2,
          },
          {
            completed: false,
            id: 3,
            title: "shop shoes",
            userId: 3,
          },
        ],
      });

      renderComponentFactory(<ToDosPage />);

      expect(screen.getAllByTestId("todo-item").length).toBe(2);
    });
  });

  describe("When isLoading and isError are false and data is an array of 50 to do´s", () => {
    test("Then should render only 10 to do items due to pagination", () => {
      const todosArray = [];
      for (let i = 0; i < 50; i++) {
        todosArray.push({
          completed: true,
          id: i,
          title: "Clean house",
          userId: 1,
        });
      }

      useProductsListMock.mockReturnValue({
        isLoading: false,
        isError: false,
        data: todosArray,
      });

      renderComponentFactory(<ToDosPage />);

      expect(screen.getAllByTestId("todo-item").length).toBe(10);
    });
  });
});
