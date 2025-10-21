import React from "react";
import { FixedSizeList } from "react-window";

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <VirtualizedList />
    </div>
  );
}

// Sample data - imagine this is a large dataset
const items = Array(10000)
  .fill()
  .map((_, index) => ({
    id: index,
    name: `Item ${index}`,
    description: `Description for item ${index}`,
  }));

// Component to render each item
const Row = ({ index, style }) => {
  const item = items[index];

  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #eee",
        backgroundColor: index % 2 ? "#f9f9f9" : "white",
      }}
    >
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

const VirtualizedList = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h2>Virtualized List Example (10,000 items)</h2>

      <FixedSizeList
        height={600}
        width="100%"
        itemCount={items.length}
        itemSize={80} // Height of each item in pixels
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};
