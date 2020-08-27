import React, { Component } from "react";
import { auth }   from "../firebase/firebase";
import { db }     from "../firebase/firebase";
import { logout } from "../helpers/auth";
import './chat.css';
export default class Chat extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.myRef = React.createRef();
  }

  

  // When ready get "chats" for firebase realtime data
  // TODO isMounted might by wrong find right way to handle memory error
  // changing toolbar title should be done outside of pages anyways
  async componentDidMount() {
    
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    // this._isMounted = true;
    // if (this._isMounted) {
    //   this.props.onHeaderTitle('Chat'); 
    // }
    try {
      db.ref('chats').on('value', snapshot => {
        const chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp });
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
 
  }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  // storing new chat text
  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  // Saves sent chat to realtime database
  async handleSend(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref('chats').push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }


  formatTime(timestamp) {
    const d = new Date(timestamp);
    const min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    const time = `${(d.getMonth()+1)}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${min}`;
    return time;
  }

  // Logs out when btn pushed
  async handelLogout() {
    try {
      await logout();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }



  render() {

    return (
      <div className="chat-content">
        <div className="chat-area" ref={this.myRef}>
          {/* loading indicator */}
          {this.state.loadingChats ? <div role="status">Loading...</div> : ''}
          {/* chat area */}
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
              {chat.content}
              <br />
              <span className="chat-time">{this.formatTime(chat.timestamp)}</span>
            </p>
          })}
        </div>
        <div className="send-btn-wrapper">
          <form onSubmit={this.handleSend} className="text-and-send">
            <textarea  name="content" onChange={this.handleChange} value={this.state.content}></textarea>
            {this.state.error ? <p className="error-txt">{this.state.error}</p> : null}
            <button type="submit" className="send-btn">Send</button>
          </form>
        </div>
        <div>
          Logged in as: <strong>{this.state.user.email}</strong>
          <button className="btn" type="button" onClick={this.handelLogout}>Logout</button>
        </div>
      </div>
    );
  }
}