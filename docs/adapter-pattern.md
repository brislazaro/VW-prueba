# Usage of the Adapter Pattern

In this project, the `Adapter Pattern` is implemented using a custom hook. The primary responsibility of this hook is to fetch and adapt data as needed before providing it to the 
component.

## Consistency the Key concept of this pattern
The hook always returns the same structure and variable names. This design ensures that the component remains unaware of the data's origin. Consequently, changes in data sources or structures do not affect the component or its tests, simplifying refactoring and testing.

## Example implementation

For a simple component like [PostsPage](../src/pages/PostsPage/PostsPage.tsx), the hook provides the following structure:

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

# Benefits of Using the Adapter Pattern
1. **Better maintainability**
   - Changes in data fetching methods or storage (e.g., from local state to Redux) do not require modifications to the component or its tests.
   - Example: Refactoring demonstrated in [this commit](https://github.com/brislazaro/VW-prueba/commit/0a6a3f6d1d8947296c68f3a0cc61579871aeea4b) shows how the component and its tests remained unchanged after data source adjustments.
2. **Improved testability**
   - Components are decoupled from data fetching and adaptation, reducing the need for extensive mocks.
   - You only need to mock the hook's return value, which simplifies testing various component states.

```js 
  usePostsMock.mockReturnValue({
        isLoading: true,
        isError: false,
        data: [],
      }); 
```
3. **Standardized Code Structure**: 
   - Consistent use of the pattern across all pages enhances code readability and maintainability.
4. **Separation of concerns**: 
   - Components focus solely on UI responsibilities, while the hook handles data fetching and adaptation.
 
