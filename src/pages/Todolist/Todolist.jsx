import React, { useEffect, useState } from "react";
import DataTable from "./Components/DataTable";
import AddNewTask from "./Components/AddNewTask";
import { backendURL } from "../../backEndURL";
import axios from "axios";
//This is the to do list page

const apiLink = backendURL + "/api/v1";

export default function Todolist() {
  //fetching raw data from backend
  const [rows, setRows] = useState([]);

  const getLink = apiLink + "/gettasks";

  const fetchTasksRows = () => {
    axios
      .get(getLink)
      .then((fetched_data) => setRows(fetched_data.data))
      .catch((error) => {
        console.error("Failed fetching row data");
        console.log(getLink);
      });
  };

  useEffect(() => {
    fetchTasksRows();
    // setRows(rows_dummy);
  }, []);

  const postDatatoTheBackend = (obj) => {
    const apiSendUrl = apiLink + "/savetask";
    axios.post(apiSendUrl, obj).then(() => {
      fetchTasksRows();
    });
    console.log("posted!");
  };

  return (
    <div
      style={{ minHeight:"100vh",
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      }}
    >
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
        <DataTable rows={rows} setRows={setRows} />
      </div>
      <div style={{ padding: "35px 35px 35px 35px" ,display:"flex" }}>
        <AddNewTask postFunc={postDatatoTheBackend} />
      </div>
    </div>
  );
}
