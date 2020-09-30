import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import {get, wait} from '../helpers/utils';
import vaderAnimation from '../animations/vader.json';
import chatAnimation from '../animations/chat.json';
import reactAnimation from '../animations/data.json';
import { ReactComponent as Sun } from './sun.svg';
import { messaging } from "../firebase/firebase";
import { functions } from "../firebase/firebase";
export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;

  }

  state = {
    vaderAnimation: vaderAnimation,
    chatAnimation:  chatAnimation,
    reactAnimation:  reactAnimation,
    dimensions:     '150px',
    isPaused:       true,
    reactDimensions: {
      height: '166',
      width: '300'
    }
  }





  async componentDidMount() {
    // this.setupMessaging();
    this._isMounted = true;
    
    this.checkWidth = () => {
      const match = window.matchMedia(`(min-width: 768px)`);
      if (match.matches) {
        this.setState({
          bigScreen:  true,
          dimensions: '250px',
          reactDimensions: {
            height: 520,
            width: 1200
          }
        })
      }
      else {
        this.setState({
          bigScreen:  false,
          dimensions: '150px',
          reactDimensions: {
            height: 350,
            width: 500
          }
        })
      }
    };


    this.checkWidth();
    this.getBackgroudImg();

    window.addEventListener("resize", this.checkWidth);
 
  }



  async setupMessaging() {

  messaging.requestPermission()
    .then(async function() {
      const token = await messaging.getToken();
      console.log(token)
        var messages = {
          message: {
            notification: {
              title: "You have a ass service request",
              body: "this is the main body"
            },
            data: {
              score: '850',
              time: '2:45'
            }
          },
          
          token: token
        }
        console.log(messages)
        var sendNotification = functions.httpsCallable('sendNotification');
        await sendNotification({data: messages});

       
            // .then(function (response) {
            //     console.log("Successfully sent message:", response);
            // })
            // .catch(function (error) {
            //     console.log("Error sending message:", error);
//             });
    })
    .catch(function(err) {
      console.log("Unable to get permission to notify.", err);
    });
  navigator.serviceWorker.addEventListener("message", (message) => alert(message.data.notification.title));
}

  // get image and text from firebase
  async getBackgroudImg() {
    if (!this._isMounted) { return }
    const {backgroundImg, backgroundImgBig, wording, palms, sun} = await get({coll: 'pages', doc: 'home'});
    const selectImg = (small, big) => {
      if (this.state.bigScreen) {
        return big
      }
      return small
    }
    this._isMounted && this.setState({
      backgroundImg: selectImg(backgroundImg, backgroundImgBig),
      wording: wording,
      sun: sun,
      palms: palms
    })
  }

  // Pause video for 500ms then plays
  async setPause() {
    await wait(1500);
    this._isMounted && this.setState({
      isPaused: false
    })
  }


  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.checkWidth);
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.pageClass) {
      return false;
    }
    return true;
  }


  lottieOptions(animation)  {
    if (animation === 'reactAnimation') {
      return {
        loop: false,
        autoplay: true,
        animationData: this.state[animation],
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        },
      }
    }
    return {
      loop: true,
      autoplay: true,
      animationData: this.state[animation],
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
  };

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
   
  }

  getImg(img) {
    if (img) {
      this.setPause();
      return <img className={`home-page-img ${this.state.imageStatus}` } 
               src={this.state.backgroundImg} 
               onLoad={this.handleImageLoaded.bind(this)}
               alt="Forr Resume home page img"/>
    }
    else {
      return <h3 style={{marginTop: '-64px'}}>...Loading</h3>
    }
  }

  setReactDimensions() {
    const {width} = screen ;
    return width;
  }

  render() {

  // On complete of react animation raise everything
  const eventListeners = [
    {
      eventName: 'complete',
      callback: () => (
        
        this.setState({
          pageClass: 'home-translate'
        })
      )
    }
  ];


    // const {reactDimensions} = this.state;
    const width = this.setReactDimensions();

    const speed = .6;


    return (
      <div className={`home-page`} >
        {/* <div className="home-grid"> */}
          <div className="img-animation-wrapper">
            <div className="img-wrapper">{this.getImg(this.state.backgroundImg)}</div>
            <div id="lottie-wrapper" className={` ${this.state.pageClass}`}>
              <Lottie isPaused={this.state.isPaused}
                      eventListeners={eventListeners}
                      className="react-aniamtion"
              
                      speed={1.2}
                      options={this.lottieOptions('reactAnimation')}
                      height={width}
                      width={width}/>
            </div>
          </div>
          <div className="home-main-txt-wrapper">
          <p className="home-main-txt" >
            Since a lot of employers are looking for developers with React experience, I thought it best to start and learn it. 
            That is where this project comes in, made with React and Firebase. This is very much a work in progress I started at around 8-1-2020. 
            I will remedy issues as I continue to learn best practices. All known issues I put on the README at <a rel="noreferrer"  className="link"target="_blank" href="https://github.com/bforrester722/react-demo">my github</a>. 
          </p>
    
       
        </div> 

         <div className="home-grid">
          <div className="section-wrapper"> 
            <Lottie options={this.lottieOptions('vaderAnimation')}
                    height={this.state.dimensions}
                    speed= {speed}
                    width={this.state.dimensions}/>
            <Link to="/lego" className="link"><h2>Lego</h2></Link>
            <ul>
              <li>Fetches a random Star Wars character from https://swapi.dev/ </li>
              <li>Uses data to edit minifigure</li>
              <li>Handles receiving 404 from API</li>
              <li>Showcases working with API, Data, CSS, and Adobe Illustrator</li>
            </ul>
          </div>
          
          <div className="section-wrapper">
            
            <Lottie options={this.lottieOptions('chatAnimation')}
                    height={this.state.dimensions}
                    speed= {speed}
                    width={this.state.dimensions}/>
            <h2><Link to="/chat" className="link">Chat</Link></h2>         
            <ul>
              <li>Allows users to sign up and login with email, Google account, or Facebook</li>
              <li>Showcases working Firebase Login and Firebase Realtime Database</li>
            </ul>
          </div>

        </div>
      </div>
    )
  }
}