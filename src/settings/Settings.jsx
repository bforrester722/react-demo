import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { auth } from "../firebase/firebase";
const SettingsPage = () => {
  const [currentUser, setCurrentUser] = useState();
  const [notificationStatus, setNotificationStatus] = useState(
    Notification.permission
  );

  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, []);

  // Request notification permissions
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);

    if (permission === "granted") {
      alert("Notification permissions granted!");
    } else {
      alert("Notification permissions denied.");
    }
  };

  // Trigger a sample notification
  const triggerNotification = async () => {
    if (!("serviceWorker" in navigator)) {
      alert("Service workers are not supported in this browser.");
      return;
    }

    if (notificationStatus !== "granted") {
      alert("Please allow notifications first.");
      return;
    }

    const task = {
      title: "Sample Task",
    };
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(
        `Reminder: "${task.title}" is due in 30 minutes!`,
        {
          body: `Don't forget to complete your task: "${task.title}"`,
          icon: "./logo192.png", // Add the path to your icon here
        }
      );
    });
  };

  // Reset the service worker
  const resetServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) {
      alert("Service workers are not supported in this browser.");
      return;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
    alert("Service workers have been reset. Refresh the page to reload.");
  };

  return (
    <div
      className="settings-page"
      style={{ padding: "20px", marginTop: "32px" }}
    >
      <h1>Settings</h1>

      <div style={{ marginBottom: "20px" }}>
        <div>Name: {currentUser?.displayName}</div>
        <div>Email: {currentUser?.email}</div>

        <div
          style={{ fontSize: "20px", fontWeight: "bold", marginTop: "16px" }}
        >
          Notification Settings
        </div>
        <div>
          Current Notification Permission: <strong>{notificationStatus}</strong>
        </div>
        <Button variant="outlined" onClick={requestNotificationPermission}>
          Request Notification Permission
        </Button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div>Test Notifications</div>
        <Button variant="outlined" onClick={triggerNotification}>
          Trigger Sample Notification
        </Button>
      </div>

      <div>
        <div>Service Worker Settings</div>
        <Button variant="outlined" onClick={resetServiceWorker}>
          Reset Service Worker
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
