import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  Box,
  Button,
  TextField,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TaskEditor = ({ onClose }) => {
  const { addTask, deleteTask, updateTask, currentTask, setCurrentTask } =
    useContext(TaskContext);

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

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    currentTask && setTask(currentTask);
  }, [currentTask]);

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

  const handleModalClose = () => {
    setCurrentTask(null);
    onClose();
  };
  const handleSubmit = () => {
    if (currentTask) {
      updateTask(currentTask.id, task);
    } else {
      addTask(task);
    }
    setCurrentTask(null);
    onClose();
  };

  const handleDelete = (task) => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTask(task.id);
    handleModalClose();

    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Modal open={true} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 6,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: "16px", right: "16px" }}
            onClick={handleModalClose}
          >
            <CloseIcon />
          </IconButton>

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
          <Box justifyContent={"space-between"} display={"flex"}>
            {currentTask && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleDelete}
              >
                Delete Task
              </Button>
            )}
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              {currentTask ? "Update Task" : "Add Task"}
            </Button>
          </Box>
        </Box>

        {/* Delete Confirmation Dialog */}
      </Modal>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the task "{task?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TaskEditor;
