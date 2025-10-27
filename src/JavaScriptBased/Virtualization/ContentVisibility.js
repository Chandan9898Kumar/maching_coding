import React, { useState, useEffect } from "react";
import { useContentVisibility } from "./useContentVisibility";
import "./style.css";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true);

      // Generate sample data (in real app, this would be an API call)
      const generatedItems = Array(500)
        .fill()
        .map((_, index) => ({
          id: index,
          title: `Item ${index}`,
          description: `This is a detailed description for item ${index}. It contains enough text to make the item have some height.`,
        }));

      // Simulate network delay
      setTimeout(() => {
        setItems(generatedItems);
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Content-Visibility Demo</h1>
        <p>Rendering 500 items with content-visibility: auto</p>
      </header>

      {loading ? <div className="loading">Loading items...</div> : <ContentVisibilityList items={items} />}

      <footer className="app-footer">
        <p>Note: This optimization works in Chrome 85+ and Edge 85+</p>
      </footer>
    </div>
  );
}

export default App;

const ContentVisibilityList = ({ items }) => {
  const isContentVisibilitySupported = useContentVisibility();

  return (
    <div className="list-container">
      <h2>Content-Visibility List Example</h2>

      {!isContentVisibilitySupported && <div className="browser-warning">Your browser doesn't support content-visibility. Performance optimizations won't be applied.</div>}

      {items.map((item, index) => (
        <div key={item.id || index} className={`list-item ${isContentVisibilitySupported ? "with-content-visibility" : ""}`}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};
