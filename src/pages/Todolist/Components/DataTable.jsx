import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";

import axios from "axios";
import { backendURL } from "../../../backEndURL";
import Button from "@mui/material/Button";

const apiLink = backendURL + "/api/v1";

const columns = (deleteTask) => [
  { field: "id", headerName: "Task No#", width: 70 },
  { field: "module", headerName: "Module", width: 100 },
  {
    field: "task",
    headerName: "Task",
    width: 1000,
    renderCell: (params) => (
      <div
      // style={{
      //   whiteSpace: "normal",
      //   wordBreak: "break-word",
      //   lineHeight: 1,
      // }}
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
    renderCell: (params) => {
      //console.log(params.value);
      if (params.value != "") {
        return (
          <a href={params.value} target="_blank">
            Link
          </a>
        );
      }
    },
  },
  {
    field: "Actions",
    headerName: "Actions",
    description: "Delete and Update buttons",
    sortable: false,
    width: "120",
    renderCell: (params) => (
      <Button
        variant="outlined"
        color="red"
        size="small"
        startIcon={<GridDeleteIcon />}
        onClick={() => {
          deleteTask(params.id);
          console.log("Delete button clicked");
        }}
      >
        Delete
      </Button>
    ),
  },
];

const columnsMobile = (deleteTask) => [
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
    renderCell: (params) => {
      //console.log(params.value);
      return (
        <a href={params.value} target="_blank">
          Link
        </a>
      );
    },
  },
  {
    field: "Actions",
    headerName: "Actions",
    description: "Delete and Update buttons",
    sortable: false,
    width: "120",
    renderCell: (params) => (
      <Button
        variant="outlined"
        color="red"
        size="small"
        startIcon={<GridDeleteIcon />}
        onClick={() => {
          deleteTask(params.id);
          console.log("Delete button clicked");
        }}
      >
        Delete
      </Button>
    ),
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

export default function DataTable({ rows, setRows }) {
  const deleteTask = (id) => {
    axios
      .delete(apiLink + "/deletetask/" + id)
      .then(() => {
        console.log("deleted!!!");
        setRows((prevRows) => prevRows.filter((row) => row.id != id));
      })
      .catch((error) => console.error("failed to dlete !", error));
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Paper sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={isMobile ? columnsMobile(deleteTask) : columns(deleteTask)}
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
