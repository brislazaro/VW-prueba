# Navigation for Create and Edit drawers

In this project, Create and Edit/Detail drawers are treated as individual pages rather than just being displayed as drawers. This approach improves user experience by allowing them to use navigation features.

# Benefits of Page-Based Navigation
1. **Direct URL Sharing**
   -  Users can share URLs that directly open specific pages, such as the detail view of a particular post. This facilitates easier sharing and bookmarking.
2. **Browser navigation** 
   - Users can utilize browser navigation arrows (back and forward) to move between pages, making navigation more intuitive and natural.
3. **Improved Accessibility**
   - Pages managed through navigation are more accessible to users who rely on assistive technologies.

# Implementation overview

Instead of having a `<Drawer/>` component in the main page, the `<Drawer />` is managed through navigation.

The main page will have children routes (the ones with the drawer) and use the `<Outlet/>` component from `react-router-dom` to display the drawer when needed.

```js
 {
    path: "/",
    element: <PostsPage />, // Main page that includes the <Outlet/>
    children: [
        { path: "/detail/:id", element: <PostDetails /> }, // This component will render the edit drawer
        { path: "/create", element: <CreatePost /> }, // This component will render the create drawer
    ],
},
```

As soon as the child component is rendered, the Drawer will open.

Also, to ensure a smooth user experience, the drawer is closed with a small delay before redirecting to the home route. This delay allows for the drawer's closing animation to complete.

```js
const onClose = () => {
    setOpen(false);

    setTimeout(() => {
        navigate("/");
    }, 250);
};
```

