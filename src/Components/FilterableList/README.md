# URL-Based State Management (Deep Linking) in React

This component demonstrates how to implement URL-based state management for filters and sorting in a React application.

## Key Features

1. **Filter and Sort State in URL**: All filter and sort parameters are reflected in the URL, enabling deep linking and bookmarking.
2. **Browser History Integration**: Users can use browser back/forward buttons to navigate between different filter/sort states.
3. **Shareable URLs**: Users can share URLs that preserve their exact view of the data.
4. **Initial State from URL**: When loading the page with URL parameters, the component initializes with those parameters.

## Implementation Details

### URL Parameter Management

The component uses React Router's `useSearchParams` hook to:
- Read initial state from URL parameters
- Update URL parameters when state changes
- Maintain browser history

### Code Structure

1. **State Initialization from URL**:
```jsx
const [searchParams, setSearchParams] = useSearchParams();

// Initialize state from URL parameters or default values
const [filters, setFilters] = useState({
  category: searchParams.get('category') || '',
  search: searchParams.get('search') || '',
});

const [sortConfig, setSortConfig] = useState({
  key: searchParams.get('sortKey') || 'name',
  direction: searchParams.get('sortDir') || 'asc',
});
```

2. **Updating URL when State Changes**:
```jsx
useEffect(() => {
  const params = new URLSearchParams();
  
  // Only add parameters that have values
  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);
  if (sortConfig.key) params.set('sortKey', sortConfig.key);
  if (sortConfig.direction) params.set('sortDir', sortConfig.direction);
  
  // Update the URL without causing a navigation/reload
  setSearchParams(params);
}, [filters, sortConfig, setSearchParams]);
```

## Best Practices

1. **Only Include Meaningful Parameters**: Don't add empty or default values to the URL.
2. **Use Descriptive Parameter Names**: Make URL parameters self-explanatory.
3. **Handle URL Parameter Changes**: Listen for URL changes to update the component state.
4. **Debounce Frequent Updates**: For search inputs, consider debouncing to avoid excessive URL updates.
5. **Preserve User Privacy**: Don't include sensitive information in URL parameters.

## Alternative Approaches

1. **Using React Router's `useNavigate`**:
```jsx
const navigate = useNavigate();
// ...
navigate({ search: params.toString() });
```

2. **Using Query String Libraries**:
For more complex URL parameter handling, consider libraries like `query-string` or `qs`.

3. **Custom Hooks**:
For reusable URL state management, consider creating a custom hook:
```jsx
function useUrlState(paramName, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(paramName) || defaultValue;
  
  const setParamValue = (newValue) => {
    const params = new URLSearchParams(searchParams);
    if (newValue === defaultValue || newValue === '') {
      params.delete(paramName);
    } else {
      params.set(paramName, newValue);
    }
    setSearchParams(params);
  };
  
  return [paramValue, setParamValue];
}
```