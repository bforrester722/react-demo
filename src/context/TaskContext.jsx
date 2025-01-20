import React, { createContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null); // Add currentTask state

  // Request Notification Permissions
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };

  // Show Notifications
  const showNotification = (task) => {
    const timeToNotify = new Date(task.dueDate).getTime() - 30 * 60 * 1000; // 30 minutes before
    const now = Date.now();

    if (timeToNotify > now) {
      setTimeout(() => {
        new Notification("Task Reminder", {
          body: `Reminder: "${task.title}" is due in 30 minutes!`,
          icon: "/icon.png", // Add your custom icon
        });
      }, timeToNotify - now);
    }
  };

  // Real-time synchronization of tasks
  useEffect(() => {
    const fetchData = async () => {
      requestNotificationPermission(); // Request notification permissions on load

      const db = getFirestore();
      const tasksCollection = collection(db, "tasks");

      // Listen to real-time updates from Firestore
      const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(tasksData);
        console.log("task", tasksData);
        // Schedule notifications for new or updated tasks
        tasksData.forEach((task) => {
          if (task.dueDate) showNotification(task);
        });
      });

      return () => unsubscribe(); // Clean up listener on unmount
    };

    fetchData();
  }, []);

  const addTask = async (newTask) => {
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      setTasks((prev) => [...prev, { id: docRef.id, ...newTask }]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "tasks", id);
      await updateDoc(docRef, updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "tasks", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        currentTask,
        setCurrentTask, // Provide the setCurrentTask function
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
