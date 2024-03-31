import React, { useState } from "react";

const SwapArrayOfItems = () => {
  const [stateOne, setStateOne] = useState([
    { id: 1, name: "item 1", isChecked: false },
    { id: 2, name: "item 2", isChecked: false },
    { id: 3, name: "item 3", isChecked: false },
  ]);
  const [stateTwo, setStateTwo] = useState([
    { id: 1, name: "item A", isChecked: false },
    { id: 2, name: "item B", isChecked: false },
    { id: 3, name: "item C", isChecked: false },
  ]);

  const handleChange = (event, index) => {
    const data = stateOne.map((item) =>
      item.id === event.id ? { ...item, isChecked: !item.isChecked } : item
    );
    setStateOne(data);
  };

  const handleSwap = () => {
    const isSwaped = stateOne.some((item) => item.isChecked);
    if (!isSwaped) return;

    const stateItemOne = [...stateOne];
    const stateItemTwo = [...stateTwo];

    const lengthOfItem = stateItemOne.length;

    for (let x = 0; x < lengthOfItem; x++) {
      if (
        stateItemOne[x].isChecked &&
        stateItemOne[x].id === stateItemTwo[x].id
      ) {
        let tempVariable = stateItemOne[x];
        stateItemOne[x] = stateItemTwo[x];
        stateItemTwo[x] = tempVariable;
      } else {
        continue;
      }
    }

    setStateOne(stateItemOne.map((item) => ({ ...item, isChecked: false })));
    setStateTwo(stateItemTwo.map((item) => ({ ...item, isChecked: false })));
  };

  return (
    <div style={{ display: "block" }}>
      <h1>List 1</h1>

      {stateOne.map((items, index) => {
        return (
          <div key={items.id}>
            <input
              value={items.id}
              type="checkbox"
              checked={items.isChecked}
              onChange={() => handleChange(items, index)}
            />
            {items.name}
          </div>
        );
      })}

      <br />
      <h1>List 2</h1>
      {stateTwo.map((items, index) => {
        return <div key={items.id}>{items.name}</div>;
      })}
      <div style={{ display: "block", textAlign: "center" }}>
        <button onClick={handleSwap}> SWAP</button>
      </div>
    </div>
  );
};

export default SwapArrayOfItems;
