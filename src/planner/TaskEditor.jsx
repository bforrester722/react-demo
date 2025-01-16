import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const TaskEditor = ({ onClose, currentTask }) => {
  const { addTask, updateTask } = useContext(TaskContext);

  const [task, setTask] = useState(
    currentTask || {
      title: "",
      description: "",
      assignedTo: "",
      importance: "Low",
      startDate: "",
      dueDate: "",
      recurrence: "none",
    }
  );

  const [addToCalendar, setAddToCalendar] = useState(
    !!(
      currentTask?.startDate ||
      currentTask?.dueDate ||
      currentTask?.recurrence
    )
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleAddToCalendar = () => {
    setAddToCalendar((prev) => !prev);
    if (!addToCalendar) {
      // Clear the calendar-related fields if toggling off
      setTask((prev) => ({
        ...prev,
        startDate: "",
        dueDate: "",
        recurrence: "none",
      }));
    }
  };

  const handleSubmit = () => {
    if (currentTask) {
      updateTask(currentTask.id, task);
    } else {
      addTask(task);
    }
    onClose();
  };

  return (
    <Box sx={{ p: 2, maxWidth: 400 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={task.title}
        onChange={handleChange}
        sx={{
          mb: 2,
        }}
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={task.description}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Assigned To</InputLabel>
        <Select
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
        >
          <MenuItem value="Mom">Mom</MenuItem>
          <MenuItem value="Gwenny">Gwenny</MenuItem>
          <MenuItem value="Maddie">Maddie</MenuItem>
          <MenuItem value="Dad">Dad</MenuItem>
        </Select>
      </FormControl>

      {/* Importance Selector */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Importance</InputLabel>
        <Select
          name="importance"
          value={task.importance}
          onChange={handleChange}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>

      {/* Checkbox to toggle calendar-related fields */}
      <FormControlLabel
        control={
          <Checkbox
            checked={addToCalendar}
            onChange={handleToggleAddToCalendar}
            color="primary"
          />
        }
        label="Add to Calendar"
        sx={{ mb: 2 }}
      />

      {addToCalendar && (
        <>
          <TextField
            fullWidth
            type="datetime-local"
            label="Start Date"
            name="startDate"
            InputLabelProps={{ shrink: true }}
            value={task.startDate}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="datetime-local"
            label="Due Date"
            name="dueDate"
            InputLabelProps={{ shrink: true }}
            value={task.dueDate}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Recurrence</InputLabel>
            <Select
              name="recurrence"
              value={task.recurrence}
              onChange={handleChange}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        {currentTask ? "Update Task" : "Add Task"}
      </Button>
    </Box>
  );
};

export default TaskEditor;
