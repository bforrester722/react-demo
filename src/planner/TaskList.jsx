import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  Modal,
} from "@mui/material";
import moment from "moment";
import TaskEditModal from "./TaskEditModal";

const TaskList = () => {
  const { tasks, updateTask } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [personFilter, setPersonFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("day");
  const [editingTask, setEditingTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const now = moment();

    // Filter tasks based on the selected time range
    const filteredByTime = tasks.filter((task) => {
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
      } else if (timeFilter === "") {
        return task;
      }

      return false;
    });

    // Apply personFilter on top of timeFilter
    if (personFilter === "all") {
      setFilteredTasks(filteredByTime);
    } else {
      setFilteredTasks(
        filteredByTime.filter((task) => task.assignedTo === personFilter)
      );
    }
  }, [tasks, personFilter, timeFilter]);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingTask) {
      updateTask(editingTask.id, editingTask);
      handleModalClose();
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Filter By Person */}
      <FormControl fullWidth sx={{ mb: 2 }}>
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

      {/* Filter By Time */}
      <FormControl fullWidth sx={{ mb: 2 }}>
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

      {/* Task List */}
      <List>
        {filteredTasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ListItemText
              primary={task.title}
              secondary={
                <>
                  {task.assignedTo && (
                    <p>
                      <strong>Assigned to:</strong> {task.assignedTo}
                    </p>
                  )}
                  {task.importance && (
                    <p>
                      <strong>Importance:</strong> {task.importance}
                    </p>
                  )}
                  {task.startDate && (
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {moment(task.startDate).format("YYYY-MM-DD HH:mm")}
                    </p>
                  )}
                  {task.dueDate && (
                    <p>
                      <strong>Due Date:</strong>{" "}
                      {moment(task.dueDate).format("YYYY-MM-DD HH:mm")}
                    </p>
                  )}
                  {task.description && (
                    <p>
                      <strong>Description:</strong> {task.description}
                    </p>
                  )}
                </>
              }
            />
            <Button variant="outlined" onClick={() => handleEditClick(task)}>
              Edit
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Edit Modal */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <TaskEditModal
          open={modalOpen}
          onClose={handleModalClose}
          task={editingTask}
          onChange={handleEditChange}
          onSave={handleSave}
        />
      </Modal>
    </Box>
  );
};

export default TaskList;
