import React, { useState } from "react";
import "./count.css";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

const FindTotalAmount = () => {
  const [total, setTotal] = useState(0);

  const handleChange = (event, item, index) => {
    if (event.target.checked) {
      setTotal((prev) => prev + item.price);
    } else {
      setTotal((prev) => prev - item.price);
    }
  };

  return (
    <div className="count-app">
      <h3>Select Items And Get Total Amount</h3>
      <ul className="toppings-list">
        {topItems.map((item, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="">
                  <input
                    type="checkbox"
                    name={item.name}
                    onChange={(event) => handleChange(event, item, index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>
                    {item.name}
                  </label>
                </div>
                <div className="">{getFormattedPrice(item.price)}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="toppings-list-item">
            <div className="">Total:</div>
            <div className="">{getFormattedPrice(total)}</div>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default FindTotalAmount;

export const topItems = [
  {
    name: "Capsicum",
    price: 1.2,
  },
  {
    name: "Paneer",
    price: 2.0,
  },
  {
    name: "Red Paprika",
    price: 2.5,
  },
  {
    name: "Onions",
    price: 3.0,
  },
  {
    name: "Extra Cheese",
    price: 3.5,
  },
  {
    name: "Baby Corns",
    price: 3.0,
  },
  {
    name: "Mushroom",
    price: 2.0,
  },
];
