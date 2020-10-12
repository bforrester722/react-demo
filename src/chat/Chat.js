import React, { Component } from "react";
import {auth}       from "../firebase/auth";
import {db}         from "../firebase/db";
import {logout}     from "../helpers/login";
import {get}        from "../helpers/utils";
import {firestore}  from '../firebase/firestore';
import ChevronRight from '@material-ui/icons/ChevronRight';
import './chat.css';

export default class Chat extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      pulloutClass: '',
      chatWrapperClass: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange   = this.handleChange.bind(this);
    this.handleSend     = this.handleSend.bind(this);
    this.handelLogout   = this.handelLogout.bind(this);
    this.handelPullout  = this.handelPullout.bind(this);
    this.myRef = React.createRef();

  }



  // When ready get "chats" for firebase realtime data
  // TODO isMounted might by wrong find right way to handle memory error
  // changing toolbar title should be done outside of pages anyways
  async componentDidMount() {

    this._isMounted = true;
    this.setState({ readError: null, loadingChats: true });
    this.getBackgroudImg();
    const chatArea = this.myRef.current;

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
    } 
    catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

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

  // fetches sun and palms from firebase
  async getBackgroudImg() {
    if (!this._isMounted) { return }
      const get = async ({coll, doc}) => {
      const docData = await firestore.collection(coll).doc(doc).get();
      if (docData.exists) {
        return docData.data();
      }
      throw new Error(`No such document! ${coll}/${doc}`);
    };
    const {palms, sun} = await get({coll: 'pages', doc: 'home'});
    this._isMounted && this.setState({
      palms: palms,
      sun:   sun
    })
  }

  // handles pullout animation
  handelPullout() {
    this.setState( prevState => { 
      if (prevState.pulloutClass) {
        return {
          pulloutClass: '', 
          chatWrapperClass: '', 
          logoutBtnClass: ''
        }
      }
      return {
        pulloutClass: 'pullout-animate', 
        chatWrapperClass: 'chat-wrapper-animate', 
        logoutBtnClass: 'logout-animate',
      }
    });
  }

  // Logs out when btn pushed
  async handelLogout() {
    try {
      await logout();
    } 
    catch (error) {
      this.setState({ error: error.message });
    }
  }



  render() {

    return (
      <div className="chat-content">

        <div className={`${this.state.chatWrapperClass} chat-wrapper`}>
          
          <div className="chat-area" ref={this.myRef}>
            <img className="sun" src={this.state.sun}/>
            <div className="palm-trees" style={{ backgroundImage:`url(${this.state.palms})` }}>
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
          </div>
          
          <div className="send-btn-wrapper">
            <form onSubmit={this.handleSend} className="text-and-send">
              <textarea className="chat-txt" name="content" onChange={this.handleChange} value={this.state.content}></textarea>
              {this.state.error ? <p className="error-txt">{this.state.error}</p> : null}
              <button type="submit" className="send-btn">Send</button>
            </form>
          </div>
        </div>
  
        <div className={`${this.state.pulloutClass} pullout pullout-blue`}></div>
        <div className={`${this.state.pulloutClass} pullout`} 
             onClick={this.handelPullout}>
          <ChevronRight className={`${this.state.chevronClass} chat-chevron`} />
        </div>

        <div className={`${this.state.logoutBtnClass} logout-btn`}
             onClick={this.handelLogout}>
             Logout
        </div> 
      
      </div>
    );
  }
}