import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

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

const FilterableList = () => {
  // Get search params and navigate function from react-router
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialize state from URL parameters or default values
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
  });
  
  const [sortConfig, setSortConfig] = useState({
    key: searchParams.get('sortKey') || 'name',
    direction: searchParams.get('sortDir') || 'asc',
  });

  // Update URL when filters or sort change
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Only add parameters that have values
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    if (sortConfig.key) params.set('sortKey', sortConfig.key);
    if (sortConfig.direction) params.set('sortDir', sortConfig.direction);
    
    // Update the URL without causing a navigation/reload
    setSearchParams(params);
    
    // You could also use navigate if you want to add this to browser history
    // navigate({ search: params.toString() });
  }, [filters, sortConfig, setSearchParams, navigate]);

  // Filter and sort the items based on current state
  const getFilteredAndSortedItems = () => {
    return initialItems
      .filter(item => {
        // Apply category filter if selected
        if (filters.category && item.category !== filters.category) {
          return false;
        }
        
        // Apply search filter if entered
        if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Apply sorting
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle sort changes
  const handleSortChange = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Get the filtered and sorted items
  const filteredAndSortedItems = getFilteredAndSortedItems();

  return (
    <div className="filterable-list">
      <h2>Product List with URL State</h2>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select 
            id="category" 
            name="category" 
            value={filters.category} 
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
            value={filters.search} 
            onChange={handleFilterChange} 
            placeholder="Search by name..."
          />
        </div>
      </div>
      
      <table className="items-table">
        <thead>
          <tr>
            <th onClick={() => handleSortChange('name')}>
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSortChange('category')}>
              Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSortChange('price')}>
              Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
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

export default FilterableList;