import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const TaskEditModal = ({ open, onClose, task, onChange, onSave }) => {
  if (!task) return null; // Don't render if no task is selected

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 2,
        boxShadow: 24,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Edit Task
      </Typography>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={task.title || ""}
        onChange={onChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={task.description || ""}
        onChange={onChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="datetime-local"
        label="Start Date"
        name="startDate"
        InputLabelProps={{ shrink: true }}
        value={task.startDate || ""}
        onChange={onChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="datetime-local"
        label="Due Date"
        name="dueDate"
        InputLabelProps={{ shrink: true }}
        value={task.dueDate || ""}
        onChange={onChange}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Importance</InputLabel>
        <Select
          name="importance"
          value={task.importance || "Medium"}
          onChange={onChange}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onSave}
        sx={{ mb: 2 }}
      >
        Save Changes
      </Button>
      <Button variant="outlined" color="secondary" fullWidth onClick={onClose}>
        Cancel
      </Button>
    </Box>
  );
};

export default TaskEditModal;
