import { describe, Mock } from "vitest";
import useToDos from "./useToDos";
import ToDosPage from "./ToDosPage";
import { renderComponentFactory } from "../../testUtils";

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

      renderComponentFactory(<ToDosPage />);

      expect(screen);
    });
  });
});
