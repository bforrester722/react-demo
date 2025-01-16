import React, { useState } from "react";
import TaskList from "./TaskList";
import TaskEditor from "./TaskEditor";
import TaskCalendar from "./TaskCalendar";
import { Button, Box } from "@mui/material";
import "./planner.css";
const Planner = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="home-page">
      <Box>
        <Button
          onClick={() => setIsEditing(true)}
          variant="contained"
          sx={{ mb: 2 }}
        >
          Add Task
        </Button>
        {isEditing && (
          <TaskEditor onClose={() => setIsEditing(false)} currentTask={null} />
        )}
        <TaskList />
        <TaskCalendar />
      </Box>
    </div>
  );
};

export default Planner;
