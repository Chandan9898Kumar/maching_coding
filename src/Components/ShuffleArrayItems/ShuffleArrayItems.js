import React from "react";
import "./shuffle.css";
const ShuffleItems = () => {
  const arrayOfItems = [
    "Appless",
    "Ball",
    "Bat",
    "Call",
    "Doll",
    "Tally",
    "John",
  ];

  const handleShuffle = () => {
    const random = Math.floor(Math.random() * 6);
  };

  return (
    <div>
      <h2>Shuffle Items of an array</h2>
      <table id="customers">
        <tr>
          <th>Index</th>
          <th>Items</th>
        </tr>

        {arrayOfItems.map((item, index) => (
          <tr key={item}>
            <td>{index}</td>
            <td>{item}</td>
          </tr>
        ))}
      </table>

      <div style={{ top: "40px", position: "relative", width: "100%" }}>
        <button className="shuffle-btn" onClick={handleShuffle}>
          Shuffle
        </button>
      </div>
    </div>
  );
};
export default ShuffleItems;
