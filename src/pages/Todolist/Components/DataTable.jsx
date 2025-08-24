import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { backendURL } from "../../../backEndURL";
import Button from "@mui/material/Button";

const apiLink = backendURL + "/api/v1";

const columns = (deleteTask, theme) => [
  { 
    field: "id", 
    headerName: "Task #", 
    width: 80,
    headerClassName: 'themed-header'
  },
  { 
    field: "module", 
    headerName: "Module", 
    width: 120,
    headerClassName: 'themed-header',
    renderCell: (params) => (
      <div style={{
        padding: "4px 8px",
        borderRadius: "12px",
        backgroundColor: theme.accent + "20",
        color: theme.accent,
        fontSize: "0.85rem",
        fontWeight: "600",
        textAlign: "center",
        minWidth: "60px"
      }}>
        {params.value}
      </div>
    )
  },
  {
    field: "task",
    headerName: "Task Description",
    flex: 3,
    headerClassName: 'themed-header',
    renderCell: (params) => (
      <div style={{
        whiteSpace: "normal",
        wordBreak: "break-word",
        lineHeight: 1.4,
        padding: "8px 0",
        color: theme.textPrimary
      }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    type: "number",
    width: 90,
    headerClassName: 'themed-header',
    renderCell: (params) => {
      const priority = parseFloat(params.value) || 0;
      let color = theme.accent;
      let bgColor = theme.accent + "20";
      
      if (priority >= 4) {
        color = "#ef4444";
        bgColor = "#ef444420";
      } else if (priority >= 3) {
        color = "#f59e0b";
        bgColor = "#f59e0b20";
      } else {
        color = "#10b981";
        bgColor = "#10b98120";
      }
      
      return (
        <div style={{
          padding: "4px 8px",
          borderRadius: "8px",
          backgroundColor: bgColor,
          color: color,
          fontSize: "0.85rem",
          fontWeight: "600",
          textAlign: "center",
          minWidth: "40px"
        }}>
          {priority.toFixed(1)}
        </div>
      );
    },
  },
  {
    field: "resources",
    headerName: "Resources",
    description: "Resource links",
    sortable: false,
    width: 120,
    headerClassName: 'themed-header',
    renderCell: (params) => {
      if (params.value && params.value !== "") {
        return (
          <a 
            href={params.value} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: theme.accent,
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "8px",
              backgroundColor: theme.accent + "15",
              fontSize: "0.85rem",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.accent + "25";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme.accent + "15";
              e.target.style.transform = "translateY(0)";
            }}
          >
            🔗 Link
          </a>
        );
      }
      return (
        <span style={{ 
          color: theme.textSecondary, 
          fontSize: "0.85rem",
          fontStyle: "italic" 
        }}>
          No link
        </span>
      );
    },
  },
  {
    field: "Actions",
    headerName: "Actions",
    description: "Delete and Update buttons",
    sortable: false,
    width: 140,
    headerClassName: 'themed-header',
    renderCell: (params) => (
      <Button
        variant="outlined"
        size="small"
        startIcon={<GridDeleteIcon />}
        onClick={() => {
          deleteTask(params.id);
          console.log("Delete button clicked");
        }}
        sx={{
          color: "#ef4444",
          borderColor: "#ef4444",
          borderRadius: "8px",
          fontSize: "0.75rem",
          textTransform: "none",
          fontWeight: "500",
          "&:hover": {
            backgroundColor: "#ef444415",
            borderColor: "#dc2626",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 8px rgba(239, 68, 68, 0.2)"
          },
          transition: "all 0.2s ease"
        }}
      >
        Delete
      </Button>
    ),
  },
];

const columnsMobile = (deleteTask, theme) => [
  { 
    field: "id", 
    headerName: "#", 
    width: 50,
    headerClassName: 'themed-header'
  },
  { 
    field: "module", 
    headerName: "Module", 
    width: 80,
    headerClassName: 'themed-header',
    renderCell: (params) => (
      <div style={{
        padding: "2px 6px",
        borderRadius: "8px",
        backgroundColor: theme.accent + "20",
        color: theme.accent,
        fontSize: "0.75rem",
        fontWeight: "600",
        textAlign: "center"
      }}>
        {params.value}
      </div>
    )
  },
  {
    field: "task",
    headerName: "Task",
    flex: 3,
    headerClassName: 'themed-header',
    renderCell: (params) => (
      <div style={{
        whiteSpace: "normal",
        wordBreak: "break-word",
        lineHeight: 1.3,
        fontSize: "0.85rem",
        color: theme.textPrimary
      }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    type: "number",
    width: 70,
    headerClassName: 'themed-header',
    renderCell: (params) => {
      const priority = parseFloat(params.value) || 0;
      let color = theme.accent;
      let bgColor = theme.accent + "20";
      
      if (priority >= 4) {
        color = "#ef4444";
        bgColor = "#ef444420";
      } else if (priority >= 3) {
        color = "#f59e0b";
        bgColor = "#f59e0b20";
      } else {
        color = "#10b981";
        bgColor = "#10b98120";
      }
      
      return (
        <div style={{
          padding: "2px 6px",
          borderRadius: "6px",
          backgroundColor: bgColor,
          color: color,
          fontSize: "0.75rem",
          fontWeight: "600",
          textAlign: "center"
        }}>
          {priority.toFixed(1)}
        </div>
      );
    },
  },
  {
    field: "Actions",
    headerName: "Actions",
    sortable: false,
    width: 90,
    headerClassName: 'themed-header',
    renderCell: (params) => (
      <Button
        variant="outlined"
        size="small"
        startIcon={<GridDeleteIcon />}
        onClick={() => {
          deleteTask(params.id);
          console.log("Delete button clicked");
        }}
        sx={{
          color: "#ef4444",
          borderColor: "#ef4444",
          borderRadius: "6px",
          fontSize: "0.7rem",
          minWidth: "70px",
          padding: "4px 8px",
          "&:hover": {
            backgroundColor: "#ef444415",
            borderColor: "#dc2626"
          }
        }}
      >
        Del
      </Button>
    ),
  },
];

export default function DataTable({ rows, setRows, theme }) {
  const deleteTask = (id) => {
    axios
      .delete(apiLink + "/deletetask/" + id)
      .then(() => {
        console.log("deleted!!!");
        setRows((prevRows) => prevRows.filter((row) => row.id != id));
      })
      .catch((error) => console.error("failed to delete !", error));
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  // Create MUI theme based on our theme
  const muiTheme = createTheme({
    palette: {
      mode: theme === theme ? (theme.textPrimary === "#F7FAFC" ? 'dark' : 'light') : 'light',
      background: {
        paper: theme.cardBg,
        default: theme.containerBg
      },
      text: {
        primary: theme.textPrimary,
        secondary: theme.textSecondary
      },
      primary: {
        main: theme.accent
      }
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: `1px solid ${theme.border}`,
            borderRadius: "16px",
            backgroundColor: theme.cardBg,
            color: theme.textPrimary,
            '& .MuiDataGrid-cell': {
              borderColor: theme.border,
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.accent + "10",
              borderBottom: `2px solid ${theme.accent}30`,
            },
            '& .themed-header': {
              backgroundColor: theme.accent + "10",
              color: theme.accent,
              fontWeight: "600",
              fontSize: "0.9rem"
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: theme.accent + "08",
                transform: "scale(1.001)",
                transition: "all 0.2s ease"
              },
              '&:nth-of-type(even)': {
                backgroundColor: theme.border + "30"
              }
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.accent + "05",
              borderTop: `1px solid ${theme.border}`
            },
            '& .MuiCheckbox-root': {
              color: theme.accent
            },
            '& .MuiDataGrid-columnSeparator': {
              color: theme.border
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: theme.cardBg,
            backdropFilter: "blur(10px)"
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <Paper 
        sx={{ 
          height: 500, 
          width: "100%", 
          borderRadius: "16px",
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden"
        }}
      >
        <DataGrid
          rows={rows}
          columns={isMobile ? columnsMobile(deleteTask, theme) : columns(deleteTask, theme)}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 7 } },
          }}
          pageSizeOptions={[7, 15]}
          checkboxSelection
          sx={{ 
            border: 0,
            borderRadius: "16px",
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: 'transparent'
            }
          }}
          getRowHeight={() => 'auto'}
          disableRowSelectionOnClick
        />
      </Paper>
    </ThemeProvider>
  );
}