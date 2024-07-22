import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostsPage from "./pages/PostsPage/PostsPage.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import PostDetails from "./pages/PostDetails/PostDetails.tsx";
import { Toaster } from "react-hot-toast";
import CreatePost from "./pages/CreatePost/CreatePost.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PostsPage />,
        children: [
          { path: "/detail/:id", element: <PostDetails /> },
          { path: "/create", element: <CreatePost /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
