import React from "react";
import countStyle from "./count.module.css";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;
const FindTotalAmount = () => {
  const styles = {
    header: {
      textAlign: "center",
      fontSize: "35px",
    },
  };

  const handleChange = (event, name, price, index) => {};

  return (
    <div>
      <h3 style={styles.header}>Find Total Amount</h3>
     
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
