import * as React from "react";
import Todolist from "../Todolist/Todolist";
import Share from "../Share/Share";
import Timetable from "../Timetable/Timetable";
import Fade from "@mui/material/Fade";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { Account } from "@toolpad/core/Account";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "To-Do list",
    title: "Todolist",
    icon: <DashboardIcon />,
  },
  {
    segment: "Share",
    title: "Share",
    icon: <CloudCircleIcon />,
  },
  {
    segment: "Timetable",
    title: "Timetable",
    icon: <CalendarMonthIcon />,
  },
  {
    segment: "Resources",
    title: "Resources",
    icon: <MenuBookIcon />,
  },
];

function getSystemDark() {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
}

function getDashboardTheme(darkMode) {
  return createTheme({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme",
    },
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });
}

function DemoPageContent({ pathname }) {
  // Map navigation segment to component
  let content = null;
  if (pathname.includes("To-Do") || pathname.includes("Todolist")) {
    content = <Todolist />;
  } else if (pathname.includes("Share")) {
    content = <Share />;
  } else if (pathname.includes("Timetable")) {
    content = <Timetable />;
  } else {
    content = (
      <Box
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography>Dashboard content for {pathname}</Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        py: 0,
        px: 0,
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch",
      }}
    >
      <Fade in key={pathname} timeout={500}>
        <Box sx={{ flex: 1, width: "100%", height: "100%" }}>{content}</Box>
      </Fade>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
      />
      <ThemeSwitcher />
      <Account />
    </Stack>
  );
}

function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {mini ? "© MUI" : `© ${new Date().getFullYear()} Made with love by MUI`}
    </Typography>
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <CloudCircleIcon fontSize="large" color="primary" />
      <Typography variant="h6">Aura</Typography>
      <Chip size="small" label="BETA" color="info" />
      <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}

function DashboardLayoutSlots(props) {
  const { window: windowProp } = props;
  const router = useDemoRouter("/dashboard/To-Do list");
  const demoWindow = windowProp !== undefined ? windowProp() : undefined;

  // System theme sync (force re-render on theme change)
  const [, setColorScheme] = React.useState(getSystemDark());
  const dashboardTheme = React.useMemo(
    () => getDashboardTheme(getSystemDark()),
    []
  );

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        setColorScheme((prev) => !prev); // force re-render
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Always get the latest theme on render
  const currentTheme = getDashboardTheme(getSystemDark());

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={currentTheme}
        window={demoWindow}
      >
        {/* preview-start */}
        <DashboardLayout
          slots={{
            appTitle: CustomAppTitle,
            // Remove toolbarActions to hide the theme button
            sidebarFooter: SidebarFooter,
          }}
        >
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
        {/* preview-end */}
      </AppProvider>
    </DemoProvider>
  );
}

DashboardLayoutSlots.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutSlots;
