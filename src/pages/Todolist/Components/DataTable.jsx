import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "Task No#", width: 70 },
  { field: "module", headerName: "Module", width: 80 },
  { field: "task", headerName: "Task", width: 150 ,
    renderCell: (params) => (<div style={{whiteSpace:"normal", wordBreak:"break-word", lineHeight:1.4}}>
      {params.value}
    </div>)
  },
  {
    field: "wight",
    headerName: "Weight",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) =>
      `${row.firstNamee || ""} ${row.lastName || ""}`,
  },
];

//this dummy list to be replaced by fetched data late

const rows = [
  { id: 1, module: "OS", task: "Lec", age: 35 },
  { id: 3, module: "DB", task: "Develop the front end of the website", age: 45 },
  { id: 2, module: "MA", task: "Do the tutorial", age: 42 },

];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
