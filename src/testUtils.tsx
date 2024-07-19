import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

export const renderComponentFactory = (component: ReactNode) => {
  return render(
    <MemoryRouter initialEntries={["/"]}>{component}</MemoryRouter>
  );
};
