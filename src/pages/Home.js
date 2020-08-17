import React, { Component } from 'react';

import { Link } from 'react-router-dom';


export default class HomePage extends Component {


  render() {

    return (
      <div className="home-page" style={{paddingTop: '64px', margin: 'auto'}}>
        <h1 style={{textAlign: 'center', padding: '24px'}}>Hello Welcome to my React Demo</h1>
        <p>
          Since a lot of employers are looking for developers with React experience, I thought it best to start and learn it. 
          That is where this project comes in, made with React and Firebase. This is very much a work in progress I started a little over two weeks ago. 
          I will remedy issues as I continue to learn best practices. I also realize page is not very exciting to look at and will work on that too. 
          All known issues I put on the README at <a target="_blank" href="https://github.com/bforrester722/react-demo">my github</a>. 
        </p>

        <p>Right now, there are two main sections Lego and Chat.</p>  

        <div style={{padding: '16px'}}> 
          <div style={{padding: '16px 0px'}}> 
            <Link to="/lego"><h2>Lego</h2></Link>
            
            <ul>
              <li>Fetches a random Star Wars character from https://swapi.dev/ </li>
              <li>Uses data to edit minifigure</li>
              <li>Handles receiving 404 from API</li>
              <li>Showcases working with API, Data, CSS, and Adobe Illustrator</li>
            </ul>
           </div>
          <div>
            <h2> <Link to="/chat">Chat</Link> (very basic right now)</h2>  
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