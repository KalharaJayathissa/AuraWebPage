import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Todolist from "./pages/Todolist/Todolist";
// import Dashboard from "./pages/Dashboard/Dashboard";

export default function App() {
  return (
    <div>
      <nav>
        
        temporary nav bar :<Link to="/">Login</Link> |{" "}
        <Link to="/Todolist">To do list</Link> |
        <Link to="/Dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Todolist" element={<Todolist />}></Route>
        <Route path="/Dashboard" element={<Todolist />}></Route>
      </Routes>
    </div>
  );
}
