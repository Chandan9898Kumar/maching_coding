import React, { Suspense } from "react";
import "./App.css";
import NavLinks from "./NavLink/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SwapArrayOfItems from "./Components/SwapArrayItems/SwapItems";
import ShuffleItems from "./Components/ShuffleArrayItems/ShuffleArrayItems";
import FindTotalAmount from "./Components/FindCount/FindTotalAmount";
function App() {
  return (
    <div className="App">
      <Suspense fallback="Loading...">
        <BrowserRouter>
          <NavLinks />
          <Routes>
            <Route exact path="/" element={<SwapArrayOfItems />} />
            <Route exact path="/shuffle" element={<ShuffleItems />} />
            <Route exact path="/amount" element={<FindTotalAmount />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
