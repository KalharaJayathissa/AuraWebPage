import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AddNewTask({ postFunc, theme }) {
  const [inputData, setInputData] = useState({
    module: "",
    task: "",
    resources: "",
    priority: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }

    setInputData((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputData.module.trim()) newErrors.module = true;
    if (!inputData.task.trim()) newErrors.task = true;
    if (
      inputData.priority &&
      (isNaN(inputData.priority) ||
        inputData.priority < 0 ||
        inputData.priority > 5)
    ) {
      newErrors.priority = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const taskData = {
        ...inputData,
        priority: inputData.priority ? parseFloat(inputData.priority) : 2.5,
      };

      postFunc(taskData);
      setInputData({
        module: "",
        task: "",
        resources: "",
        priority: "",
      });
      setShowSuccess(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  // Create MUI theme based on our theme
  const muiTheme = createTheme({
    palette: {
      mode: theme.textPrimary === "#F7FAFC" ? "dark" : "light",
      background: {
        paper: theme.cardBg,
        default: theme.containerBg,
      },
      text: {
        primary: theme.textPrimary,
        secondary: theme.textSecondary,
      },
      primary: {
        main: theme.accent,
      },
      success: {
        main: "#10b981",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiFilledInput-root": {
              backgroundColor: theme.cardBg,
              borderRadius: "12px",
              border: `1px solid ${theme.border}`,
              "&:hover": {
                backgroundColor: theme.cardBg,
                borderColor: theme.accent + "60",
                transform: "translateY(-1px)",
                boxShadow: `0 4px 12px ${theme.accent}20`,
              },
              "&.Mui-focused": {
                backgroundColor: theme.cardBg,
                borderColor: theme.accent,
                transform: "translateY(-1px)",
                boxShadow: `0 4px 12px ${theme.accent}30`,
              },
              "&.Mui-error": {
                borderColor: "#ef4444",
                "&:hover": {
                  borderColor: "#dc2626",
                },
              },
            },
            "& .MuiInputLabel-root": {
              color: theme.textSecondary,
              fontWeight: "500",
              "&.Mui-focused": {
                color: theme.accent,
              },
              "&.Mui-error": {
                color: "#ef4444",
              },
            },
            "& .MuiFilledInput-input": {
              color: theme.textPrimary,
              padding: "16px 12px 8px 12px",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "600",
            fontSize: "1rem",
            padding: "12px 32px",
            minHeight: "48px",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        component="form"
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${theme.cardBg} 0%, ${theme.cardBg}90 100%)`,
          border: `1px solid ${theme.border}`,
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
        }}
        noValidate
        autoComplete="off"
        onKeyPress={handleKeyPress}
      >
        {/* Decorative background element */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `linear-gradient(45deg, ${theme.accent}10, ${theme.accent}05)`,
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="module"
                label="📚 Module"
                variant="filled"
                fullWidth
                value={inputData.module}
                onChange={handleInputChange}
                error={errors.module}
                helperText={errors.module ? "Module is required" : ""}
                placeholder="e.g., CS101"
                InputProps={{
                  sx: { height: 64, minHeight: 64 },
                }}
                sx={{
                  "& .MuiFilledInput-root": {
                    transition: "all 0.3s ease",
                    height: 64,
                    minHeight: 64,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="task"
                label="📝 Task Description"
                variant="filled"
                fullWidth
                multiline
                maxRows={3}
                value={inputData.task}
                onChange={handleInputChange}
                error={errors.task}
                helperText={errors.task ? "Task description is required" : ""}
                placeholder="Describe your task..."
                InputProps={{
                  sx: { height: 64, minHeight: 64 },
                }}
                sx={{
                  "& .MuiFilledInput-root": {
                    transition: "all 0.3s ease",
                    height: 64,
                    minHeight: 64,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="resources"
                label="🔗 Resources"
                variant="filled"
                fullWidth
                value={inputData.resources}
                onChange={handleInputChange}
                placeholder="https://..."
                InputProps={{
                  sx: { height: 64, minHeight: 64 },
                }}
                sx={{
                  "& .MuiFilledInput-root": {
                    transition: "all 0.3s ease",
                    height: 64,
                    minHeight: 64,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                name="priority"
                label="⭐ Priority"
                variant="filled"
                fullWidth
                // Use text type for consistent height
                type="text"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9.]*",
                  min: 0,
                  max: 5,
                  step: 0.1,
                }}
                value={inputData.priority}
                onChange={handleInputChange}
                error={errors.priority}
                helperText={errors.priority ? "0-5 only" : "0-5 scale"}
                placeholder="3.0"
                InputProps={{
                  sx: { height: 64, minHeight: 64 },
                }}
                sx={{
                  "& .MuiFilledInput-root": {
                    transition: "all 0.3s ease",
                    height: 64,
                    minHeight: 64,
                  },
                }}
              />
            </Grid>

            {/* Button remains unchanged */}
            <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                fullWidth
                sx={{
                  background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}CC 100%)`,
                  color: "white",
                  fontWeight: "600",
                  fontSize: "1rem",
                  minHeight: "56px",
                  boxShadow: `0 4px 15px ${theme.accent}30`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}DD 100%)`,
                    boxShadow: `0 8px 25px ${theme.accent}40`,
                    transform: "translateY(-2px)",
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                  },
                }}
              >
                ✨ Add Task
              </Button>
            </Grid>
          </Grid>

          {/* Tips section */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: theme.accent + "08",
              borderRadius: "12px",
              border: `1px solid ${theme.accent}20`,
            }}
          >
            <div
              style={{
                fontSize: "0.85rem",
                color: theme.textSecondary,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              💡 <strong>Tips:</strong> Use Ctrl+Enter to quick submit •
              Priority: 0-2 (Low), 2-4 (Medium), 4-5 (High)
            </div>
          </Box>
        </div>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            borderRadius: "12px",
            fontWeight: "500",
          }}
        >
          ✅ Task added successfully!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
