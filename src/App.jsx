import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Todolist from "./pages/Todolist/Todolist";
import Dashboard from "./pages/Dashboard/Dashboard";
import Resources from "./pages/Resources/Resources";

import Timetable from "./pages/Timetable/Timetable";
import Share from "./pages/Share/Share";

export default function App() {
  return (
    <div>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Todolist" element={<Todolist />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Resources" element={<Resources />}></Route>
        <Route path="/Share" element={<Share />}></Route>
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
