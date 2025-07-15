import React from "react";
import DataTable from "./Components/DataTable";
import AddNewTask from "./Components/AddNewTask";
//This is the to do list page

export default function Todolist() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          //fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
          color: "#4B0082",
          marginBottom: "24px",
        }}
      >
        <h1>Weekly To-Do List</h1>
      </div>
      <div style={{ padding: "35px" }}>
        <DataTable />
      </div>
      <div style={{ padding: "35px" }}>
        <AddNewTask />
      </div>
    </div>
  );
}
