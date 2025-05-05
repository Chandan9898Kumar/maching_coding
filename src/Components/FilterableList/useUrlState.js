import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Custom hook for managing state in URL parameters
 * 
 * @param {string} paramName - The name of the URL parameter
 * @param {string|number} defaultValue - Default value if parameter is not in URL
 * @returns {[string|number, function]} - Current value and setter function
 */
function useUrlState(paramName, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get the current value from URL or use default
  const paramValue = searchParams.has(paramName) 
    ? searchParams.get(paramName) 
    : defaultValue;
  
  // Create a setter function that updates the URL
  const setParamValue = useCallback((newValue) => {
    const params = new URLSearchParams(searchParams);
    
    // If value is default or empty, remove it from URL
    if (newValue === defaultValue || newValue === '') {
      params.delete(paramName);
    } else {
      params.set(paramName, newValue);
    }
    
    setSearchParams(params);
  }, [paramName, defaultValue, searchParams, setSearchParams]);
  
  return [paramValue, setParamValue];
}

/**
 * Custom hook for managing multiple URL state parameters
 * 
 * @param {Object} initialState - Object with parameter names as keys and default values
 * @returns {[Object, function]} - Current values object and setter function
 */
export function useUrlStateObject(initialState) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Create an object with current values from URL or defaults
  const stateFromUrl = Object.keys(initialState).reduce((acc, key) => {
    acc[key] = searchParams.has(key) 
      ? searchParams.get(key) 
      : initialState[key];
    return acc;
  }, {});
  
  // Create a setter function that updates multiple URL parameters
  const setStateInUrl = useCallback((newState) => {
    const params = new URLSearchParams(searchParams);
    
    // Update each parameter in the URL
    Object.entries(newState).forEach(([key, value]) => {
      if (value === initialState[key] || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    
    setSearchParams(params);
  }, [initialState, searchParams, setSearchParams]);
  
  return [stateFromUrl, setStateInUrl];
}

export default useUrlState;