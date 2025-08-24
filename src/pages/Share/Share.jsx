import React, { useEffect, useState } from "react";
import { backendURL } from "../../backEndURL";
import axios from "axios";

export default function Share() {
  // Theme logic (copied from Todolist)
  const getSystemDark = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(getSystemDark());

  const lightTheme = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
      "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
    containerBg: "rgba(26, 32, 44, 0.95)",
    cardBg: "rgba(45, 55, 72, 0.8)",
    textPrimary: "#F7FAFC",
    textSecondary: "#E2E8F0",
    accent: "#63B3ED",
    shadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    border: "rgba(255, 255, 255, 0.1)",
  };
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Share logic
  const [input, setInput] = useState("");
  const [shares, setShares] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);

  const apiLink = backendURL + "/api/v1/share";

  // Fetch shares
  const fetchShares = () => {
    setLoading(true);
    axios
      .get(apiLink)
      .then((res) => {
        setShares(res.data.reverse()); // newest first
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };
  useEffect(() => {
    fetchShares();
  }, []);

  // Add new share
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    axios.post(apiLink, { text: input }).then(() => {
      setInput("");
      fetchShares();
    });
  };

  // Delete share
  const handleDelete = (id) => {
    axios.delete(`${apiLink}/${id}`).then(fetchShares);
  };

  // Start editing
  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  // Save edit
  const handleUpdate = (id) => {
    if (!editValue.trim()) return;
    axios.put(`${apiLink}/${id}`, { text: editValue }).then(() => {
      setEditingId(null);
      setEditValue("");
      fetchShares();
    });
  };

  // UI styles
  const containerStyle = {
    minHeight: "100vh",
    background: theme.background,
    padding: "20px",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
  };
  const mainContentStyle = {
    maxWidth: "700px",
    margin: "40px auto",
    backgroundColor: theme.containerBg,
    borderRadius: "24px",
    boxShadow: theme.shadow,
    backdropFilter: "blur(20px)",
    border: `1px solid ${theme.border}`,
    padding: "32px 24px 40px 24px",
    position: "relative",
  };
  const inputBoxStyle = {
    width: "100%",
    minHeight: "80px",
    maxWidth: "100%",
    boxSizing: "border-box",
    borderRadius: "12px",
    border: `1px solid ${theme.border}`,
    padding: "16px",
    fontSize: "1.1rem",
    background: theme.cardBg,
    color: theme.textPrimary,
    marginBottom: "12px",
    resize: "vertical",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "border 0.2s",
    overflow: "auto",
    display: "block",
  };
  const buttonStyle = {
    background: theme.accent,
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: `0 2px 8px ${theme.accent}30`,
    marginLeft: "8px",
    marginBottom: "8px",
    transition: "background 0.2s, transform 0.2s",
    outline: "none",
  };
  const shareBoxStyle = {
    background: `linear-gradient(135deg, ${theme.cardBg} 0%, ${theme.cardBg}90 100%)`,
    border: `1px solid ${theme.border}`,
    borderRadius: "16px",
    boxShadow: `0 4px 12px ${theme.accent}20`,
    padding: "20px 18px 16px 18px",
    marginBottom: "18px",
    color: theme.textPrimary,
    position: "relative",
    backdropFilter: "blur(8px)",
    transition: "box-shadow 0.2s",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };
  const actionBtnStyle = {
    ...buttonStyle,
    padding: "6px 16px",
    fontSize: "0.95rem",
    marginLeft: 0,
    marginRight: "8px",
    background: theme.accent + "CC",
  };
  const editInputStyle = {
    ...inputBoxStyle,
    minHeight: "60px",
    marginBottom: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        <h2 style={{ color: theme.accent, fontWeight: 700, marginBottom: 16 }}>
          Share a Note
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            style={inputBoxStyle}
            placeholder="Type your paragraph here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1000}
          />
          <div style={{ textAlign: "right" }}>
            <button
              type="submit"
              style={buttonStyle}
              disabled={loading || !input.trim()}
              onMouseEnter={(e) => {
                e.target.style.background = theme.accent + "CC";
                e.target.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = theme.accent;
                e.target.style.transform = "scale(1)";
              }}
            >
              {loading ? "Sending..." : "Share"}
            </button>
          </div>
        </form>
        <h3 style={{ color: theme.textSecondary, margin: "32px 0 16px 0" }}>
          Previous Shares
        </h3>
        {shares.length === 0 && (
          <div style={{ color: theme.textSecondary, fontStyle: "italic" }}>
            {loading ? "Loading..." : "No shares yet."}
          </div>
        )}
        {shares.map((share) => (
          <div key={share.id} style={shareBoxStyle}>
            {editingId === share.id ? (
              <>
                <textarea
                  style={editInputStyle}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  maxLength={1000}
                />
                <div style={{ textAlign: "right" }}>
                  <button
                    style={actionBtnStyle}
                    onClick={() => handleUpdate(share.id)}
                  >
                    Save
                  </button>
                  <button
                    style={{
                      ...actionBtnStyle,
                      background: theme.border,
                      color: theme.textPrimary,
                    }}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ whiteSpace: "pre-line", fontSize: "1.08rem" }}>
                  {share.text}
                </div>
                <div style={{ textAlign: "right" }}>
                  <button
                    style={actionBtnStyle}
                    onClick={() => handleEdit(share.id, share.text)}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      ...actionBtnStyle,
                      background: "#e53e3e",
                      color: "white",
                    }}
                    onClick={() => handleDelete(share.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
