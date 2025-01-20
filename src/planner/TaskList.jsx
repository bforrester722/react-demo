import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import moment from "moment";

const TaskList = () => {
  const { tasks, setCurrentTask } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [personFilter, setPersonFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("day");
  const [showNoDueDate, setShowNoDueDate] = useState(false);

  useEffect(() => {
    const now = moment();
    // Show tasks with no due dates if toggle is active
    if (showNoDueDate) {
      const filtered = tasks.filter((task) => !task.dueDate);
      // Sort by importance (high to low)
      filtered.sort((a, b) => {
        const importanceOrder = { High: 3, Medium: 2, Low: 1 };
        return (
          (importanceOrder[b.importance] || 0) -
          (importanceOrder[a.importance] || 0)
        );
      });
      setFilteredTasks(filtered);
      return;
    }

    // Filter tasks based on time range
    let filteredByTime = tasks.filter((task) => {
      const startDate = moment(task.startDate || task.dueDate);
      const dueDate = moment(task.dueDate);

      if (timeFilter === "day") {
        return (
          startDate.isSameOrBefore(now, "day") &&
          dueDate.isSameOrAfter(now, "day")
        );
      } else if (timeFilter === "week") {
        return (
          startDate.isSameOrBefore(now, "week") &&
          dueDate.isSameOrAfter(now, "week")
        );
      } else if (timeFilter === "month") {
        return (
          startDate.isSameOrBefore(now, "month") &&
          dueDate.isSameOrAfter(now, "month")
        );
      } else {
        return true;
      }
    });

    // Apply person filter
    if (personFilter !== "all") {
      filteredByTime = filteredByTime.filter(
        (task) => task.assignedTo === personFilter
      );
    }

    setFilteredTasks(filteredByTime);
  }, [tasks, personFilter, timeFilter, showNoDueDate]);

  const handleEditClick = (task) => {
    setCurrentTask(task);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Filters */}
      <FormControl sx={{ mt: 2, mr: 2, minWidth: "140px" }}>
        <InputLabel>Filter By Person</InputLabel>
        <Select
          value={personFilter}
          onChange={(e) => setPersonFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Mom">Mom</MenuItem>
          <MenuItem value="Gwenny">Gwenny</MenuItem>
          <MenuItem value="Maddie">Maddie</MenuItem>
          <MenuItem value="Dad">Dad</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ mt: 2, mr: 2, minWidth: "140px" }}>
        <InputLabel>Filter By Time</InputLabel>
        <Select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="day">Today</MenuItem>
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={showNoDueDate}
            onChange={(e) => setShowNoDueDate(e.target.checked)}
          />
        }
        sx={{ mt: 2, mr: 2 }}
        label="Show Tasks Without Due Dates"
      />

      {/* Task List as Grid */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
            <Card
              sx={{
                border: "1px solid #e442fc",
                boxShadow: "4px 4px 8px #61dafb",
                minHeight: "150px",
                "&:hover": { cursor: "pointer" },
              }}
              onClick={() => handleEditClick(task)}
            >
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {task.title}
                </Typography>
                {task.assignedTo && (
                  <Typography variant="body2">{task.assignedTo}</Typography>
                )}
                {task.description && (
                  <Typography variant="body2">{task.description}</Typography>
                )}
                {task.startDate && (
                  <Typography variant="body2">
                    <strong>Start Date:</strong>{" "}
                    {moment(task.startDate).format("MM-DD-YYYY h:mm A")}
                  </Typography>
                )}
                {task.dueDate && (
                  <Typography variant="body2">
                    <strong>Due Date:</strong>{" "}
                    {moment(task.dueDate).format("MM-DD-YYYY h:mm A")}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskList;
