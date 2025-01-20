import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { TaskContext } from "../context/TaskContext";
import TaskList from "./TaskList";
import TaskEditor from "./TaskEditor";
import TaskCalendar from "./TaskCalendar";
import { Box, Fab } from "@mui/material";

import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import "./planner.css";
const Planner = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);
  const { currentTask } = useContext(TaskContext);

  useEffect(() => {
    setIsEditing(Boolean(currentTask));
  }, [currentTask]);

  const cleanUp = () => {
    setIsEditing(false);
  };

  if (!user || !user.planner) {
    return (
      <div className="home-page">
        <Box sx={{ textAlign: "center", mt: 4 }}>
          You do not have access to this page.
        </Box>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Box sx={{ maxWidth: "1400px", margin: "auto", position: "relative" }}>
        {isEditing && (
          <TaskEditor onClose={() => cleanUp()} currentTask={currentTask} />
        )}
        <TaskList />
        <TaskCalendar />
        <Fab
          sx={{
            zIndex: "5",
            position: "fixed",
            bottom: "32px",
            right: "32px",
            border: "2px solid #e442fc", // Add border for outline
            backgroundColor: "black",
            color: "#61dafb",
            "&:hover": {
              backgroundColor: "#9e1fd6", // Slight hover effect
            },
            boxShadow: "none",
          }}
          color="primary"
          aria-label="add"
          onClick={() => setIsEditing(true)}
        >
          <EditCalendarIcon
            sx={{
              fill: "none", // Remove the default fill
              stroke: "#61dafb", // Custom stroke color
              strokeWidth: 1.5, // Adjust stroke width
              filter: "drop-shadow(0px 4px 4px #e442fc)", // Add drop shadow
            }}
          />
        </Fab>
      </Box>
    </div>
  );
};

export default Planner;
