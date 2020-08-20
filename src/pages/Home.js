import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import {wait} from '../helpers/utils';
import vaderAnimation from '../animations/vader.json';
import chatAnimation from '../animations/chat.json';
import reactAnimation from '../animations/react.json';

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

  componentDidMount() {
      this._isMounted = true;
     this.setPause();
    this.checkWidth = () => {
      const match = window.matchMedia(`(min-width: 768px)`);
      if (match.matches) {
        this.setState({
          dimensions: '250px',
          reactDimensions: {
            height: '320',
            width: '600'
          }
        })
   
      }
      else {
        this.setState({
          dimensions: '150px',
          reactDimensions: {
            height: '166',
            width: '300'
          }
        })
      }
    };

    this.checkWidth();
    window.addEventListener("resize", this.checkWidth);
  }

  // Pause video for 500ms then plays
  async setPause() {
    await wait(500);
    this._isMounted && this.setState({
          isPaused: false
        })

  }


  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.checkWidth);
  }



  render() {

  // Todo put them in one function
  const lottieOptions = (animation) => {
    if (animation === 'reactAnimation') {
      return {
        loop: false,
        autoplay: false,
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
  ]

    const {height, width} = this.state.reactDimensions

    return (
      <div className={`home-page ${this.state.pageClass}`} >
           <Lottie  isPaused={this.state.isPaused}
                    eventListeners={eventListeners}
                    style={{paddingRight: '16px'}}
                    options={lottieOptions('reactAnimation')}
                    height={height}
                    width={width}/>
        {/* <h1 style={{textAlign: 'center', padding: '24px'}}>Hello Welcome to my React Demo</h1> */}
        <p>
          Since a lot of employers are looking for developers with React experience, I thought it best to start and learn it. 
          That is where this project comes in, made with React and Firebase. This is very much a work in progress I started a little over two weeks ago. 
          I will remedy issues as I continue to learn best practices. I also realize page is not very exciting to look at and will work on that too. 
          All known issues I put on the README at <a rel="noreferrer" target="_blank" href="https://github.com/bforrester722/react-demo">my github</a>. 
        </p>

        <p>Right now, there are two main sections Lego and Chat.</p>  


        <div style={{padding: '16px'}}> 
          <div style={{padding: '16px 0px'}}> 
   
            <Link to="/lego"><h2>Lego</h2></Link>
            <Lottie options={lottieOptions('vaderAnimation')}
                    height={this.state.dimensions}
                    width={this.state.dimensions}/>
            <ul>
              <li>Fetches a random Star Wars character from https://swapi.dev/ </li>
              <li>Uses data to edit minifigure</li>
              <li>Handles receiving 404 from API</li>
              <li>Showcases working with API, Data, CSS, and Adobe Illustrator</li>
            </ul>
           </div>
          <div>
            <h2> <Link to="/chat">Chat</Link> (very basic right now)</h2>  
            
            <Lottie options={lottieOptions('chatAnimation')}
                    height={this.state.dimensions}
                    width={this.state.dimensions}/>
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