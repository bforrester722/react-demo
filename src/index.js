import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskProvider from "./context/TaskContext";
import UserProvider from "./context/UserContext";
import { Workbox } from "workbox-window";

// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById("app"));
const theme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#e442fc", // Customize your primary color
    },
    secondary: {
      main: "#61dafb", // Customize your secondary color
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
      <UserProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>
);

// Register the service worker using Workbox
if ("serviceWorker" in navigator) {
  console.log("yay nav");
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");
    console.log("yay load");
    wb.addEventListener("waiting", () => {
      console.log("A new service worker is waiting to activate.");
    });

    wb.addEventListener("activated", (event) => {
      if (!event.isUpdate) {
        console.log("Service Worker activated for the first time.");
      }
    });

    wb.register()
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
