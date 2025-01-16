import React, { createContext, useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
// import { db } from "../firebase/firebase"; // Ensure this is the correct path to your firebase.js file
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc, // Import `doc` for document reference
} from "firebase/firestore";
import { set } from "firebase/database";
import { getApps } from "firebase/app";
export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const db = getFirestore();
        const tasksCollection = collection(db, "tasks");

        const snapshot = await getDocs(tasksCollection);
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID in the task object
          ...doc.data(),
          status: "pending",
        }));
        setTasks(tasksData);
        // setTasks(snapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    setTimeout(() => {
      fetchTasks();
    }, 500);
  }, []);

  const addTask = async (newTask) => {
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "tasks"), newTask); // Correct usage
      setTasks((prev) => [...prev, { id: docRef.id, ...newTask }]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const db = getFirestore();
      // Find the task in the current state
      const foundTask = tasks.find((task) => task.id === id);

      if (!foundTask) {
        console.error(`Task with ID ${id} not found.`);
        return;
      }

      // Merge existing task data with updatedTask
      const mergedTask = { ...foundTask, ...updatedTask };

      // Reference the Firestore document
      const docRef = doc(db, "tasks", id);

      // Update Firestore with the merged data
      await updateDoc(docRef, mergedTask);

      // Update the local state
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...mergedTask } : task))
      );

      console.log(`Task with ID ${id} updated successfully.`);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  //   const deleteTask = async (id) => {
  //     try {
  //       const db = getFirestore();
  //       const docRef = doc(db, "tasks", id); // Use `doc` to reference the document
  //       await deleteDoc(docRef);
  //       setTasks((prev) => prev.filter((task) => task.id !== id));
  //     } catch (error) {
  //       console.error("Error deleting task:", error);
  //     }
  //   };

  const deleteTask = async (id) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "tasks", id); // Reference the document by ID
      await deleteDoc(docRef); // Delete the document in Firestore

      setTasks((prev) => {
        if (!Array.isArray(prev)) {
          console.error("Tasks state is not an array:", prev);
          return []; // Fallback to an empty array if tasks state is invalid
        }
        return prev.filter((task) => task.id !== id); // Filter out the deleted task
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
