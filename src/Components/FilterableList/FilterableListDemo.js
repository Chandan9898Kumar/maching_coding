import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FilterableList from './FilterableList';
import FilterableListWithHook from './FilterableListWithHook';
import FilterableListWithDebounce from './FilterableListWithDebounce';

const FilterableListDemo = () => {
  return (
    <BrowserRouter>
      <div className="demo-container">
        <h1>URL-Based State Management Demo</h1>
        <p>
          This demo shows different approaches to implementing filter/sort state in the URL (deep linking) in React.
        </p>
        
        <nav className="demo-nav">
          <ul>
            <li>
              <Link to="/basic">Basic Implementation</Link>
            </li>
            <li>
              <Link to="/custom-hook">Using Custom Hook</Link>
            </li>
            <li>
              <Link to="/debounced">With Debounced Search</Link>
            </li>
          </ul>
        </nav>
        
        <div className="demo-content">
          <Routes>
            <Route path="/" element={<div className="intro">
              <h2>Select an implementation approach above</h2>
              <p>Each example demonstrates URL-based state management for filters and sorting.</p>
              <p>Key features include:</p>
              <ul>
                <li>Filter and sort state reflected in the URL</li>
                <li>Browser history integration</li>
                <li>Shareable URLs with preserved state</li>
                <li>Initial state loaded from URL parameters</li>
              </ul>
            </div>} />
            <Route path="/basic" element={<FilterableList />} />
            <Route path="/custom-hook" element={<FilterableListWithHook />} />
            <Route path="/debounced" element={<FilterableListWithDebounce />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default FilterableListDemo;