
The module `x25-react16/Messages` has: 
- `<LoadingMessage ...props />`
- `<ErrorMessage ...props />` 
- `<LargeErrorMessage ...props />`

## `<LoadingMessage ...props />`

```jsx
type LoadingMessagePropTypes = {
  className? : string;
  message? : string;
  sm?: bool;
};
```

## `<LargeErrorMessage ...props />`, `<ErrorMessage ...props />`

```jsx
type ErrorMessageProps = {
  message: string;
  details?: string;
  itemNotFound?: boolean;

  onRetry?: () => void;
};
```