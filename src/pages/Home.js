import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import {wait} from '../helpers/utils';
import {firestore} from '../firebase/firebase';

import vaderAnimation from '../animations/vader.json';
import chatAnimation from '../animations/chat.json';
import reactAnimation from '../animations/data.json';

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
    this._isMounted = true;
    this.getBackgroudImg();
    this.checkWidth = () => {
      const match = window.matchMedia(`(min-width: 768px)`);
      if (match.matches) {
        this.setState({
          dimensions: '250px',
          reactDimensions: {
            height: 520,
            width: 900
          }
        })
   
      }
      else {
        this.setState({
          dimensions: '150px',
          reactDimensions: {
            height: 350,
            width: 350
          }
        })
      }
    };


    this.checkWidth();
    window.addEventListener("resize", this.checkWidth);
  }

  async getBackgroudImg() {
    if (!this._isMounted) { return }
      const get = async ({coll, doc}) => {
      const docData = await firestore.collection(coll).doc(doc).get();
      if (docData.exists) {
        return docData.data();
      }
      throw new Error(`No such document! ${coll}/${doc}`);
    };
    const {backgroundImg, wording} = await get({coll: 'pages', doc: 'home'});
    this._isMounted && this.setState({
      backgroundImg: backgroundImg,
      wording: wording
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


   getImg(img) {
    if (img) {
      this.setPause();
      return <img className="home-page-img" 
               src={this.state.backgroundImg} 
               alt="Forr Resume home page img"/>
                  
    }
    else {
      return <h3 style={{marginTop: '-64px'}}>...Loading</h3>
    }
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



    const {height, width} = this.state.reactDimensions
    const speed = .6;


    return (
      <div className={`home-page`} >
        <div className="home-grid">
          <div className="img-animation-wrapper">
            <div className="img-wrapper">{this.getImg(this.state.backgroundImg)}</div>
            <div id="lottie-wrapper" className={` ${this.state.pageClass}`}>
              <Lottie isPaused={this.state.isPaused}
                      eventListeners={eventListeners}
                      className="react-aniamtion"
                      style={{paddingTop: '32px'}}
                      options={this.lottieOptions('reactAnimation')}
                      height={height}
                      width={width}/>
            </div>
          </div>
          <p className="home-main-txt" >
            Since a lot of employers are looking for developers with React experience, I thought it best to start and learn it. 
            That is where this project comes in, made with React and Firebase. This is very much a work in progress I started at around 8-1-2020. 
            I will remedy issues as I continue to learn best practices. At the moment working on making large screen devices look better. Looks pretty good on phone.
            All known issues I put on the README at <a rel="noreferrer"  className="link"target="_blank" href="https://github.com/bforrester722/react-demo">my github</a>. 
          </p>

          <p style={{padding: '16px'}}>Right now, there are two main sections Lego and Chat.</p>  
        </div>

        <div style={{padding: '16px'}}> 
          <div style={{padding: '16px 0px'}}> 
            
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
          
          <div>
            
            <Lottie options={this.lottieOptions('chatAnimation')}
                    height={this.state.dimensions}
                    speed= {speed}
                    width={this.state.dimensions}/>
            <h2><Link to="/chat" className="link">Chat</Link> (very basic right now)</h2>         
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