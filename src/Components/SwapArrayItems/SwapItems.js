import React, { useState } from "react";
import singletonCounter from "../../PATTERN_MODULES/SingletonPatternExample";
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
    const data = stateOne.map((item) => (item.id === event.id ? { ...item, isChecked: !item.isChecked } : item));
    setStateOne(data);
  };

  const handleSwap = () => {
    singletonCounter.increment(); // It for testing singleton pattern.
    const isSwaped = stateOne.some((item) => item.isChecked);
    if (!isSwaped) return;

    const stateItemOne = [...stateOne];
    const stateItemTwo = [...stateTwo];

    const lengthOfItem = stateItemOne.length;

    for (let x = 0; x < lengthOfItem; x++) {
      if (stateItemOne[x].isChecked && stateItemOne[x].id === stateItemTwo[x].id) {
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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <h1>List 1</h1>

          {stateOne.map((items, index) => {
            return (
              <div key={items.id}>
                <input value={items.id} type="checkbox" checked={items.isChecked} onChange={() => handleChange(items, index)} />
                {items.name}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <h1>List 2</h1>
          {stateTwo.map((items, index) => {
            return <div key={items.id}>{items.name}</div>;
          })}
        </div>
      </div>
      <div
        style={{
          display: "block",
          textAlign: "center",
          position: "relative",
          top: "100px",
        }}
      >
        <button
          onClick={handleSwap}
          style={{
            width: "150px",
            height: "40px",
            fontSize: "20px",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
          }}
        >
          {" "}
          SWAP
        </button><br />
        Singleton Example :{"  "}
        {singletonCounter.getCount()}
      </div>
    </>
  );
};

export default SwapArrayOfItems;
