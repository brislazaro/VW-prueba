# Usage of the Adapter Pattern

I used the `Adapter Pattern` in my components using a custom hook.

This hook responsability will be to get the required data for the component, adapt it as needed, and return it to the component.

The key point of this hook is to **always return the same structure and variable names**. 
This way, the component does not know where the data is comming from, and so, if that changes, the component and the test stays the same without breaking.
Making it easier to possible refactors and to test.

For a simple component without much logic like [PostsPage](../src/pages/PostsPage/PostsPage.tsx), the hook will always return the following structure:

```js
{
    isLoading:boolean,
    isError:boolean,
    data: Posts[]
}
```

And the component will use it like this:
```js
const {isLoading, isError, data} = usePostsPage()
```

# What is achieved using this pattern

- **Better maintainability**: If we change how we fetch the data, or where we store it (ex: from local state to Redux), the component and it's test don't need to change. As the hook will get the data and return it with the same structure.
  - See an example of how easy it was to refactor in [this commit](https://github.com/brislazaro/VW-prueba/commit/0a6a3f6d1d8947296c68f3a0cc61579871aeea4b)
  - After it, the component test and code didn't change at all. **Small, simple and safe**
- **Better testability**: As the component is agnostic to how we fetch and where we get the data from, we reduce the `mocks` we need to write. We just need to mock the return value of the hook and test all the possible states of the component
```js 
  usePostsMock.mockReturnValue({
        isLoading: true,
        isError: false,
        data: [],
      }); 
```
- **Standarized way of writting code for pages**: All the pages will use the same pattern, so the code is easier to understand and navigate.
- **Separation of concerns**: The components are responsible to handle all things UI related, while the hook fetches the data and adapts it to the component.
 
