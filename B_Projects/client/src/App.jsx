import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import NewFundraiser from "./NewFundraiser";
import Receipts from "./Receipts";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "20px" }}>Home</Link>
          <Link to="/new">New Fundraiser</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewFundraiser />} />
          <Route path="/receipts" element={<Receipts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
