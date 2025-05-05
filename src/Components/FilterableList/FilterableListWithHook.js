import React, { useState, useEffect } from 'react';
import { useUrlStateObject } from './useUrlState';

// Sample data for demonstration
const initialItems = [
  { id: 1, name: 'Apple', category: 'Fruit', price: 1.99 },
  { id: 2, name: 'Banana', category: 'Fruit', price: 0.99 },
  { id: 3, name: 'Carrot', category: 'Vegetable', price: 0.50 },
  { id: 4, name: 'Broccoli', category: 'Vegetable', price: 1.50 },
  { id: 5, name: 'Orange', category: 'Fruit', price: 1.25 },
  { id: 6, name: 'Potato', category: 'Vegetable', price: 0.75 },
  { id: 7, name: 'Strawberry', category: 'Fruit', price: 2.50 },
  { id: 8, name: 'Tomato', category: 'Vegetable', price: 1.10 },
];

const FilterableListWithHook = () => {
  // Use our custom hook to manage URL state
  const [urlState, setUrlState] = useUrlStateObject({
    category: '',
    search: '',
    sortKey: 'name',
    sortDir: 'asc'
  });
  
  // Destructure the URL state for easier access
  const { category, search, sortKey, sortDir } = urlState;
  
  // Filter and sort the items based on current state
  const getFilteredAndSortedItems = () => {
    return initialItems
      .filter(item => {
        // Apply category filter if selected
        if (category && item.category !== category) {
          return false;
        }
        
        // Apply search filter if entered
        if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Apply sorting
        if (a[sortKey] < b[sortKey]) {
          return sortDir === 'asc' ? -1 : 1;
        }
        if (a[sortKey] > b[sortKey]) {
          return sortDir === 'asc' ? 1 : -1;
        }
        return 0;
      });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setUrlState({
      ...urlState,
      [name]: value
    });
  };

  // Handle sort changes
  const handleSortChange = (key) => {
    setUrlState({
      ...urlState,
      sortKey: key,
      sortDir: sortKey === key && sortDir === 'asc' ? 'desc' : 'asc'
    });
  };

  // Get the filtered and sorted items
  const filteredAndSortedItems = getFilteredAndSortedItems();

  return (
    <div className="filterable-list">
      <h2>Product List with URL State (Using Custom Hook)</h2>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select 
            id="category" 
            name="category" 
            value={category} 
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input 
            id="search" 
            name="search" 
            type="text" 
            value={search} 
            onChange={handleFilterChange} 
            placeholder="Search by name..."
          />
        </div>
      </div>
      
      <table className="items-table">
        <thead>
          <tr>
            <th onClick={() => handleSortChange('name')}>
              Name {sortKey === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSortChange('category')}>
              Category {sortKey === 'category' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSortChange('price')}>
              Price {sortKey === 'price' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedItems.length > 0 ? (
            filteredAndSortedItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No items found matching your criteria</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <div className="url-info">
        <h3>Current URL Parameters:</h3>
        <code>{window.location.search}</code>
        <p>You can share this URL to preserve your current filter and sort settings.</p>
      </div>
    </div>
  );
};

export default FilterableListWithHook;