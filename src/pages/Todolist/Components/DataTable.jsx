import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import axios from "axios";

const backend_link = "http://localhost:8080/api/v1/gettasks";

const columns = [
  { field: "id", headerName: "Task No#", width: 70 },
  { field: "module", headerName: "Module", width: 80 },
  {
    field: "task",
    headerName: "Task",
    width: 1000,
    renderCell: (params) => (
      <div
        style={{
          whiteSpace: "normal",
          wordBreak: "break-word",
          lineHeight: 1.5,
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "priority",
    headerName: "priority",
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
  {
    field: "task",
    headerName: "Task",
    width: 100,
    renderCell: (params) => (
      <div
        style={{
          whiteSpace: "normal",
          wordBreak: "break-word",
          lineHeight: 1.3,
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "priority",
    headerName: "priority",
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

const rows_dummy = [
  { id: 1, module: "OS", task: "Lec", priority: 3.5 },
  {
    id: 3,
    module: "DB",
    task: "Develop the front end of the website",
    priority: 4.5,
  },
  { id: 2, module: "MA", task: "Do the tutorial", priority: 3.8 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const isMobile = useMediaQuery("(max-width:600px)");

  //fetching raw data from backend
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(backend_link)
      .then((fetched_data) => setRows(fetched_data.data))
      .catch((error) => console.error("Failed fetching row data"));
    // setRows(rows_dummy);
  }, []);

  return (
    <Paper sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={isMobile ? columnsMobile : columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 7 } },
        }}
        pageSizeOptions={[7, 15]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
