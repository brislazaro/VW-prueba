import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostsPage from "./pages/PostsPage/PostsPage.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import PostDetails from "./pages/PostDetails/PostDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PostsPage />,
        children: [{ path: "/detail/:id", element: <PostDetails /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
