import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskProvider from "./context/TaskContext";
import { Workbox } from "workbox-window";

// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById("app"));
const theme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#90caf9", // Customize your primary color
    },
    secondary: {
      main: "#f48fb1", // Customize your secondary color
    },
    text: {
      primary: "#ffffff", // Default text color for dark mode
      secondary: "#bdbdbd", // Secondary text color
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Set the default color of icons to white
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "transparent",
        },
      },
    },
  },
  customStyles: {
    hide: {
      display: "none",
    },
  },
});
// Render the app with BrowserRouter
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ThemeProvider>
    ,
  </BrowserRouter>
);

// Register the service worker using Workbox
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");
    wb.addEventListener("waiting", () => {
      console.log("A new service worker is waiting to activate.");
    });
    wb.register().then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    });
  });
}
