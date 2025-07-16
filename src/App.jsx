import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Todolist from "./pages/Todolist/Todolist";
import Dashboard from "./pages/Dashboard/Dashboard";
import Resources from "./pages/Resources/Resources";
import InClassNotes from "./pages/InClassNotes/InClassNotes";
import Timetable from "./pages/Timetable/Timetable";

export default function App() {
  return (
    <div>
      <nav>
        temporary nav bar :<Link to="/">Login</Link> |{" "}
        <Link to="/Todolist">To do list</Link> |
        <Link to="/Dashboard">Dashboard</Link> |
        <Link to="/Resources">Resources</Link> |
        <Link to="/InclassNotes">InClassNotes</Link> |
        <Link to="/timetablefc">Time-table</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Todolist" element={<Todolist />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Resources" element={<Resources />}></Route>
        <Route path="/InClassNotes" element={<InClassNotes />}></Route>
        <Route path="/timetablefc" element={<Timetable />}></Route>
      </Routes>

      <footer
        style={{
          background: "linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)",
          letterSpacing: "3px",
          fontWeight: "bold",
          // marginTop: "40px",
          textAlign: "center",
          borderTop:"2px solid #4b0082"
        }}
      >
        &copy;Aura study help .inc{" "}
      </footer>
    </div>
  );
}
