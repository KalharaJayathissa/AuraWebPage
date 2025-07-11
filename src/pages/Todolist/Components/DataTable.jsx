import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";

const columns = [
  { field: "id", headerName: "Task No#", width: 70 },
  { field: "module", headerName: "Module", width: 80 },
  { field: "task", headerName: "Task", width: 1000 ,
    renderCell: (params) => (<div style={{whiteSpace:"normal", wordBreak:"break-word", lineHeight:1.5}}>
      {params.value}
    </div>)
  },
  {
    field: "weight",
    headerName: "Weight",
    type: "number",
    width: 70,
  },
  {
    field: "resources",
    headerName: "Resources",
    description: "Resource links",
    sortable: false,
    width: 160,
    
  },
];

const columnsMobile = [
  { field: "id", headerName: "Task No#", width: 35 },
  { field: "module", headerName: "Module", width: 80 },
  { field: "task", headerName: "Task", width: 100 ,
    renderCell: (params) => (<div style={{whiteSpace:"normal", wordBreak:"break-word", lineHeight:1.3}}>
      {params.value}
    </div>)
  },
  {
    field: "weight",
    headerName: "Weight",
    type: "number",
    width: 70,
  },
  {
    field: "resources",
    headerName: "Resources",
    description: "Resource links",
    sortable: false,
    width: 160,
    
  },
];

//this dummy list to be replaced by fetched data late

const rows = [
  { id: 1, module: "OS", task: "Lec", weight: 3.5 },
  { id: 3, module: "DB", task: "Develop the front end of the website", weight: 4.5 },
  { id: 2, module: "MA", task: "Do the tutorial", weight: 3.8 },

];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={isMobile ? columnsMobile : columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
