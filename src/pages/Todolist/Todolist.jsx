import React, { useEffect, useState } from "react";
import DataTable from "./Components/DataTable";
import AddNewTask from "./Components/AddNewTask";
import { backendURL } from "../../backEndURL";
import axios from "axios";

const apiLink = backendURL + "/api/v1";

export default function Todolist() {
  const [rows, setRows] = useState([]);
  // Set initial darkMode based on system preference
  const getSystemDark = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(getSystemDark());

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
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Theme is now controlled by system, no manual toggle

  const postDatatoTheBackend = (obj) => {
    const apiSendUrl = apiLink + "/savetask";
    axios.post(apiSendUrl, obj).then(() => {
      fetchTasksRows();
    });
    console.log("posted!");
  };

  const lightTheme = {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    containerBg: "rgba(255, 255, 255, 0.95)",
    cardBg: "rgba(255, 255, 255, 0.8)",
    textPrimary: "#2D3748",
    textSecondary: "#4A5568",
    accent: "#667eea",
    shadow: "0 20px 40px rgba(102, 126, 234, 0.15)",
    border: "rgba(255, 255, 255, 0.3)",
  };

  const darkTheme = {
    background:
      "linear-gradient(135deg, #0f2027 0%, #2c5364 50%, #232526 100%)",
    containerBg: "rgba(26, 32, 44, 0.95)",
    cardBg: "rgba(45, 55, 72, 0.8)",
    textPrimary: "#F7FAFC",
    textSecondary: "#E2E8F0",
    accent: "#63B3ED",
    shadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    border: "rgba(255, 255, 255, 0.1)",
  };

  const theme = darkMode ? darkTheme : lightTheme;

  const containerStyle = {
    minHeight: "100vh",
    background: theme.background,
    padding: "20px",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  };

  const decorativeElementsStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 0,
  };

  const mainContentStyle = {
    position: "relative",
    zIndex: 1,
    maxWidth: "1600px", // widened from 1200px
    margin: "0 auto",
    backgroundColor: theme.containerBg,
    borderRadius: "24px",
    boxShadow: theme.shadow,
    backdropFilter: "blur(20px)",
    border: `1px solid ${theme.border}`,
    overflow: "hidden",
  };

  const headerStyle = {
    background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}CC 100%)`,
    padding: "40px 20px",
    textAlign: "center",
    position: "relative",
  };

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "700",
    color: "white",
    margin: "0",
    textShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    letterSpacing: "-0.02em",
  };

  const subtitleStyle = {
    fontSize: "1.1rem",
    color: "rgba(255, 255, 255, 0.9)",
    margin: "8px 0 0 0",
    fontWeight: "400",
  };

  const themeToggleStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(255, 255, 255, 0.2)",
    border: "none",
    borderRadius: "50px",
    padding: "12px 16px",
    cursor: "pointer",
    color: "white",
    fontSize: "1.2rem",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  // Reduce padding to allow more content width
  const contentWrapperStyle = {
    padding: "24px", // reduced from 40px
  };

  const sectionStyle = {
    marginBottom: "32px",
    padding: "32px",
    backgroundColor: theme.cardBg,
    borderRadius: "16px",
    border: `1px solid ${theme.border}`,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      {/* Decorative Background Elements */}
      <div style={decorativeElementsStyle}>
        {/* Stylish animated shapes for both light and dark modes */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: darkMode
              ? "rgba(44,83,100,0.18)"
              : "rgba(168,237,234,0.18)",
            boxShadow: darkMode
              ? "0 8px 32px #0f2027cc"
              : "0 8px 32px #fed6e3cc",
            filter: "blur(2px)",
            animation: "float 7s ease-in-out infinite alternate",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "8%",
            width: 90,
            height: 90,
            borderRadius: "20% 80% 60% 40% / 40% 30% 70% 60%",
            background: darkMode
              ? "rgba(15,32,39,0.22)"
              : "rgba(254,214,227,0.22)",
            boxShadow: darkMode
              ? "0 8px 32px #232526cc"
              : "0 8px 32px #a8edeacc",
            filter: "blur(1.5px)",
            animation: "float2 9s ease-in-out infinite alternate-reverse",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "20%",
            width: 60,
            height: 60,
            borderRadius: "12px",
            background: darkMode
              ? "rgba(99,179,237,0.13)"
              : "rgba(102,126,234,0.13)",
            boxShadow: darkMode
              ? "0 4px 16px #63B3ED55"
              : "0 4px 16px #667eea55",
            filter: "blur(1.5px)",
            animation: "float3 6s ease-in-out infinite alternate",
            zIndex: 0,
          }}
        />
      </div>

      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          {/* <button 
            style={themeToggleStyle}
            onClick={toggleDarkMode}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "scale(1)";
            }}
          >
            {darkMode ? "🌙" : "☀️"}
            <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              {darkMode ? "Dark" : "Light"}
            </span>
          </button> */}

          <h1 style={titleStyle}>✨ Weekly To-Do List</h1>
          <p style={subtitleStyle}>Stay organized and productive</p>

          {/* Header decoration */}
          <div
            style={{
              position: "absolute",
              bottom: "-1px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100px",
              height: "4px",
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: "2px",
            }}
          ></div>
        </div>

        {/* Content */}
        <div style={contentWrapperStyle}>
          {/* Tasks Section */}
          <div
            style={{
              ...sectionStyle,
              color: theme.textPrimary,
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                margin: "0 0 24px 0",
                color: theme.accent,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              📋 Your Tasks
              <span
                style={{
                  fontSize: "0.8rem",
                  background: theme.accent + "20",
                  color: theme.accent,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontWeight: "500",
                }}
              >
                {rows.length} tasks
              </span>
            </h2>
            <DataTable rows={rows} setRows={setRows} theme={theme} />
          </div>

          {/* Add Task Section */}
          <div
            style={{
              ...sectionStyle,
              color: theme.textPrimary,
              background: `linear-gradient(135deg, ${theme.cardBg} 0%, ${theme.cardBg}80 100%)`,
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                margin: "0 0 24px 0",
                color: theme.accent,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              ➕ Add New Task
            </h2>
            <AddNewTask postFunc={postDatatoTheBackend} theme={theme} />
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float2 {
          0% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(25px) scale(0.95);
          }
        }
        @keyframes float3 {
          0% {
            transform: translateX(0) scale(1);
          }
          100% {
            transform: translateX(30px) scale(1.12);
          }
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${theme.background};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: ${theme.accent};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.accent}CC;
        }

        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
      `}</style>
    </div>
  );
}
