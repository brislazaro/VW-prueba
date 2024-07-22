import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "./redux/store";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { PostWithKey } from "./components/Types/Types";

export const renderComponentFactory = (component: ReactNode) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>{component}</MemoryRouter>
    </Provider>
  );
};

export const renderComponentFactoryWithReduxPosts = (
  component: ReactNode,
  postMock: PostWithKey[]
) => {
  const initialStateMock = {
    isLoading: false,
    isError: false,
    data: postMock,
  };

  const sliceMock = createSlice({
    name: "posts",
    initialState: initialStateMock,
    reducers: {},
  });

  const store = configureStore({
    reducer: {
      posts: sliceMock.reducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>{component}</MemoryRouter>
    </Provider>
  );
};
