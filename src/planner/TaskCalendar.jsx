import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Box, Button, Typography } from "@mui/material";

const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const { tasks, updateTask, deleteTask } = useContext(TaskContext); // Add update and delete context functions
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event for modal
  const [openModal, setOpenModal] = useState(false);
  const generateRecurringEvents = (task) => {
    if (task.recurrence === "none") {
      return [
        {
          ...task,
          start: task.startDate
            ? new Date(task.startDate)
            : new Date(task.dueDate), // Fallback to `dueDate` if `startDate` is empty
          end: new Date(task.dueDate),
        },
      ];
    }

    const recurrenceEvents = [];
    const recurrenceEnd = moment(task.dueDate).add(1, "months"); // Limit to 1 month of recurrences
    let currentStartDate = task.startDate
      ? moment(task.startDate)
      : moment(task.dueDate); // Default to `dueDate` if `startDate` is empty
    let currentEndDate = moment(task.dueDate);

    while (currentEndDate.isBefore(recurrenceEnd)) {
      recurrenceEvents.push({
        ...task,
        start: currentStartDate ? new Date(currentStartDate) : null, // Handle empty start dates
        end: new Date(currentEndDate),
      });

      // Update start and end dates based on recurrence type
      if (task.recurrence === "daily") {
        currentStartDate = currentStartDate.add(1, "days");
        currentEndDate = currentEndDate.add(1, "days");
      } else if (task.recurrence === "weekly") {
        currentStartDate = currentStartDate.add(1, "weeks");
        currentEndDate = currentEndDate.add(1, "weeks");
      } else if (task.recurrence === "monthly") {
        currentStartDate = currentStartDate.add(1, "months");
        currentEndDate = currentEndDate.add(1, "months");
      }
    }

    return recurrenceEvents;
  };

  // Map tasks to calendar events and handle recurring events
  useEffect(() => {
    const eventsData = tasks.flatMap((task) => generateRecurringEvents(task));

    const events = eventsData.map((task) => ({
      start: new Date(task.startDate),
      end: new Date(task.dueDate),
      status: "pending",
      isComplete: task.status,

      ...task,
    }));
    const filtered = events.filter((item) => item.title === "Tumbling Class");
    setEvents(events);

    console.log("Generated Events:", filtered);
  }, [tasks]);

  useEffect(() => {
    console.log("events", events);
  }, [events]);

  // Handle event click
  const handleSelectEvent = (event) => {
    console.log(event);
    setSelectedEvent(event); // Store the selected event
    setOpenModal(true); // Open the modal
  };

  // Change background color based on `assignedTo`
  const eventPropGetter = (event) => {
    const style = {
      border: "none",
      color: "white",
    };

    if (event.assignedTo === "Gwenny") {
      style.backgroundColor = "#00E676";
    } else if (event.assignedTo === "Maddie") {
      style.backgroundColor = "#00B0FF";
    } else if (event.assignedTo === "Mom") {
      style.backgroundColor = "#e442fc";
    } else {
      style.backgroundColor = "#F6019D"; // Default for "Self" or unknown
    }
    // console.log("event", event);
    if (event.status === "completed") {
      style.textDecoration = "line-through";
    }

    return { style };
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  // Cross off event (mark as completed)
  const handleCrossOff = () => {
    if (selectedEvent) {
      updateTask(selectedEvent.id, { status: "completed" });
      handleCloseModal();
    }
  };

  // Delete event
  const handleDelete = () => {
    if (selectedEvent) {
      console.log(selectedEvent);
      deleteTask(selectedEvent.id);
      handleCloseModal();
    }
  };

  return (
    <div style={{ height: "700px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventPropGetter}
        style={{ height: "100%", padding: "10px" }}
        onSelectEvent={handleSelectEvent}
      />

      {/* Event Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedEvent && (
            <>
              <Typography variant="h6">{selectedEvent.title}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Assigned To: {selectedEvent.assignedTo}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Description: {selectedEvent.description}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Time: {moment(selectedEvent.dueDate).format("hh:mm A")}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Status: {selectedEvent.status}
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleCrossOff}
                >
                  Cross Off
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  Remove
                </Button>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TaskCalendar;
