import React, { useState } from "react";
import { styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import "./components.css";
import { wait } from "../helpers/utils";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "black",
  height: "64px",
}));

const StyledToolbar = styled(Toolbar)({
  backgroundColor: "black",
  justifyContent: "flex-end",
  minHeight: "64px",
});

const DrawerList = styled(List)({
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  height: "calc(100vh - 100px)",
});

const DrawerLabel = styled(ListItemText)(({ open }) => ({
  textAlign: "center",
  opacity: open ? "1" : "0",
  transition: "opacity .1s .1s, transform 1s cubic-bezier(0.49, 0.01, 0, 1)",
  transform: open ? "translateY(0px)" : "translateY(-200px)",
}));

const Ripples = styled("div")(({ open }) => ({
  position: "fixed",
  top: 0,
  width: "100vw",
  height: "80px",
  transformOrigin: "50% 0%",
  overflow: "hidden",
  zIndex: "10",
  backgroundImage:
    "linear-gradient(black 80%, #e442fc 80%, #61dafb 84%, transparent 95%)",
  opacity: "1",
  transition: "transform 1s cubic-bezier(0.49, 0.01, 0, 1)",
  ...(open && { transform: "scale(1, 20)" }),
}));

const AppToolbar = ({ pages, onDrawerLinkClicked }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };
  const ToolbarIcon = styled("svg")(({ theme }) => ({
    height: "40px",
    position: "absolute",
    top: "10px",
    left: "16px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    "&:hover": {
      transform: "scale(1.1)", // Slight zoom effect on hover
    },
  }));

  const handleDrawerLinkClicked = async (label) => {
    const link = `/${label}`;
    await wait(200);
    handleDrawer();
    onDrawerLinkClicked(link);
  };

  return (
    <header>
      <StyledAppBar>
        <StyledToolbar>
          <ToolbarIcon
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 145.3 124.39"
          >
            <defs>
              <style>
                {`.iconcls-1{fill:#fff;}.iconcls-2,.iconcls-3,.iconcls-4{fill:none;stroke-miterlimit:10;stroke-width:5px;}.iconcls-2{stroke:#e442fc;}.iconcls-3{stroke:#7a61fb;}.iconcls-4{stroke:#61dafb;}`}
              </style>
            </defs>
            <path
              className="iconcls-1"
              d="M277,265.33c2-3.53-.46-9.45-6.05-15.45,5.57-6,8.05-11.93,6-15.47a5.47,5.47,0,0,0-2.09-2l-1.4,2.42a2.93,2.93,0,0,1,1.08,1c1,1.71-.24,5.31-3.14,9.18-.71,1-1.53,1.92-2.4,2.88a61.77,61.77,0,0,0-6.23-5.18,60.12,60.12,0,0,0-1.39-8c5.46-1.25,9.83-1.14,12.1.17l1.4-2.43h0c-3-1.73-8.15-1.86-14.25-.44-1.84-6-4.54-10.35-7.53-12.07l-1.4,2.42c2.25,1.3,4.56,5,6.22,10.36a60.41,60.41,0,0,0-7.64,2.83,60.29,60.29,0,0,0-7.61-2.8c.37-1.23.8-2.39,1.25-3.48,1.89-4.45,4.39-7.32,6.36-7.34a3,3,0,0,1,1.41.44l1.4-2.42h0a5.54,5.54,0,0,0-2.81-.81c-4.08,0-7.94,5.1-10.34,12.91-8-1.82-14.32-1-16.36,2.5s.45,9.45,6,15.46c-5.57,6-8,11.93-6,15.46a5.48,5.48,0,0,0,2.1,2c3,1.73,8.14,1.86,14.24.44,1.84,6,4.54,10.35,7.54,12.07a5.66,5.66,0,0,0,2.81.82c4.08,0,7.94-5.1,10.34-12.92C268.65,269.67,275,268.86,277,265.33Zm-10-15.44c-1.21,1.17-2.55,2.33-3.95,3.45.06-1.13.09-2.27.08-3.44s0-2.31-.09-3.45C264.5,247.57,265.83,248.72,267.05,249.89Zm-11.68,8.71c-1.69,1-3.37,1.87-5,2.65-1.71-.8-3.39-1.67-5-2.63s-3.24-2-4.78-3c-.15-1.82-.24-3.71-.25-5.66s.09-3.79.24-5.64c1.52-1.07,3.12-2.09,4.76-3s3.38-1.87,5-2.65c1.7.8,3.39,1.67,5,2.63s3.24,2,4.78,3c.15,1.82.24,3.71.24,5.66s-.08,3.79-.24,5.64C258.61,256.62,257,257.65,255.37,258.6Zm4.34.62c-.26,1.8-.6,3.55-1,5.2-1.63-.48-3.3-1.05-5-1.72,1-.53,2.05-1.08,3.06-1.67S258.76,259.83,259.71,259.22ZM242,264.46a52.72,52.72,0,0,1-1-5.23c1,.61,1.94,1.22,2.95,1.81s2.05,1.15,3.08,1.67A52.86,52.86,0,0,1,242,264.46Zm-4.4-11.09c-1.41-1.12-2.74-2.26-4-3.44,1.22-1.17,2.55-2.33,4-3.45-.06,1.13-.09,2.27-.09,3.44S237.51,252.24,237.56,253.37Zm21.13-18a50,50,0,0,1,1,5.23c-.95-.61-1.93-1.22-2.95-1.8s-2-1.16-3.07-1.67A49.48,49.48,0,0,1,258.69,235.36Zm-11.76,1.76c-1,.53-2.05,1.08-3.06,1.68s-2,1.18-2.92,1.79a50.94,50.94,0,0,1,1-5.2C243.57,235.88,245.24,236.45,246.93,237.12Zm-17.72,7.94c-2.91-3.87-4.16-7.46-3.17-9.17s4.73-2.44,9.53-1.84a34.19,34.19,0,0,1,3.65.64,60.28,60.28,0,0,0-1.38,8,60.56,60.56,0,0,0-6.23,5.2C230.73,247,229.92,246,229.21,245.06ZM226.08,264c-1-1.7.23-5.3,3.14-9.17.71-1,1.53-1.92,2.4-2.88a60.42,60.42,0,0,0,6.23,5.17,60,60,0,0,0,1.39,8.06c-5.46,1.25-9.83,1.14-12.1-.17A3,3,0,0,1,226.08,264Zm30.62,6.62c-1.89,4.45-4.39,7.32-6.36,7.33a2.74,2.74,0,0,1-1.41-.44c-2.26-1.3-4.56-5-6.22-10.35a58.89,58.89,0,0,0,7.63-2.84,58.89,58.89,0,0,0,7.62,2.8C257.57,268.37,257.16,269.54,256.7,270.62Zm8.38-4.84a37,37,0,0,1-3.65-.65,60.28,60.28,0,0,0,1.38-8,59.35,59.35,0,0,0,6.22-5.2c.89,1,1.7,1.92,2.42,2.87,2.91,3.87,4.16,7.47,3.17,9.18S269.88,266.37,265.08,265.78Z"
              transform="translate(-187.85 -188.37)"
            />
            <path
              className="iconcls-1"
              d="M253.13,219.87Z"
              transform="translate(-187.85 -188.37)"
            />
            <circle className="iconcls-1" cx="62.47" cy="61.53" r="5.75" />
            <path
              className="iconcls-1"
              d="M274.89,232.39Z"
              transform="translate(-187.85 -188.37)"
            />
            <polygon
              className="iconcls-2"
              points="139.66 59.13 21.66 4.13 32.94 114.91 139.66 59.13"
            />
            <polygon
              className="iconcls-3"
              points="137.66 51.13 12.65 8.13 40.02 118.15 137.66 51.13"
            />
            <polygon
              className="iconcls-4"
              points="133.08 42.22 4.08 13.22 46.66 120.13 133.08 42.22"
            />
          </ToolbarIcon>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            sx={{
              display: open ? "none" : "inline-flex", // Dynamically hide/show
            }}
          >
            <MenuIcon />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>

      <Drawer
        variant="persistent"
        anchor="top"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            backgroundColor: "transparent",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0, 1),
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            style={{ color: "#61dafb", margin: "12px" }}
            onClick={handleDrawer}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </div>
        <DrawerList>
          {pages.map((page) => (
            <ListItem
              key={page.label}
              onClick={() => handleDrawerLinkClicked(page.label)}
            >
              <DrawerLabel open={open} primary={page.label} />
            </ListItem>
          ))}
        </DrawerList>
      </Drawer>
      <Ripples open={open} />
    </header>
  );
};

export default AppToolbar;
