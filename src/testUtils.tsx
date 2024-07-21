import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "./redux/store";

export const renderComponentFactory = (component: ReactNode) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>{component}</MemoryRouter>
    </Provider>
  );
};
