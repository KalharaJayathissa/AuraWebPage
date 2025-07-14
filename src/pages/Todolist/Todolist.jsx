import React from "react";
import DataTable from "./Components/DataTable";
import AddNewTask from "./Components/AddNewTask";
//This is the to do list page

export default function Todolist() {
  return (
    <div>
      <div>
        <h2>Weekly To-Do List</h2>
      </div>
      <div>
        <DataTable />
      </div>
      <AddNewTask />
    </div>
  );
}
