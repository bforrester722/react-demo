import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase/firebase"; // Ensure `db` is the Realtime Database reference
import ChevronRight from "@mui/icons-material/ChevronRight";
import { ref, onValue, push } from "firebase/database";
import "./chat.css";

const Chat = () => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [pulloutClass, setPulloutClass] = useState("");
  const [chatWrapperClass, setChatWrapperClass] = useState("");
  const [logoutBtnClass, setLogoutBtnClass] = useState("");
  const [loadingChats, setLoadingChats] = useState(false);
  const [error, setError] = useState(null);
  const chatAreaRef = useRef();

  // Fetch user on mount
  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  // Fetch chats from Realtime Database
  useEffect(() => {
    setLoadingChats(true);
    const chatsRef = ref(db, "chats");
    const unsubscribe = onValue(
      chatsRef,
      (snapshot) => {
        const chatsData = [];
        snapshot.forEach((snap) => {
          chatsData.push(snap.val());
        });
        chatsData.sort((a, b) => a.timestamp - b.timestamp);
        setChats(chatsData);
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
        setLoadingChats(false);
      },
      (err) => {
        console.error("Error fetching chats:", err.message);
        setError(err.message);
        setLoadingChats(false);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleSend = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const chatsRef = ref(db, "chats");
      await push(chatsRef, {
        content,
        timestamp: Date.now(),
        uid: user?.uid || "anonymous",
      });
      setContent("");
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    } catch (err) {
      console.error("Error sending message:", err.message);
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Error logging out:", err.message);
      setError(err.message);
    }
  };

  const handlePullout = () => {
    setPulloutClass((prev) => (prev ? "" : "pullout-animate"));
    setChatWrapperClass((prev) => (prev ? "" : "chat-wrapper-animate"));
    setLogoutBtnClass((prev) => (prev ? "" : "logout-animate"));
  };

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const min = d.getMinutes().toString().padStart(2, "0");
    return `${
      d.getMonth() + 1
    }/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${min}`;
  };

  return (
    <div className="chat-content">
      <div className={`${chatWrapperClass} chat-wrapper`}>
        <div className="chat-area" ref={chatAreaRef}>
          {loadingChats && <div role="status">Loading...</div>}
          {chats.map((chat, index) => (
            <p
              key={index}
              className={`chat-bubble ${
                user?.uid === chat.uid ? "current-user" : ""
              }`}
            >
              {chat.content}
              <br />
              <span className="chat-time">{formatTime(chat.timestamp)}</span>
            </p>
          ))}
        </div>

        <div className="send-btn-wrapper">
          <form onSubmit={handleSend} className="text-and-send">
            <textarea
              className="chat-txt"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            {error && <p className="error-txt">{error}</p>}
            <button type="submit" className="send-btn">
              Send
            </button>
          </form>
        </div>
      </div>

      <div
        className={`${pulloutClass} pullout pullout-blue`}
        onClick={handlePullout}
      ></div>
      <div className={`${pulloutClass} pullout`} onClick={handlePullout}>
        <ChevronRight className="chat-chevron" />
      </div>

      <div className={`${logoutBtnClass} logout-btn`} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default Chat;
