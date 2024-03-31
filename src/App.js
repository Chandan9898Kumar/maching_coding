import React, { Suspense } from "react";
import "./App.css";
import NavLinks from "./NavLink/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SwapArrayOfItems from './Components/SwapArrayItems/SwapItems'
function App() {
  return (
    <div className="App">
      <Suspense fallback="Loading...">
        <BrowserRouter>
          <NavLinks />
          <Routes>
            <Route exact path="/" element={<SwapArrayOfItems />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
