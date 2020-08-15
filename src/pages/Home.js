import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Lego from '../lego/Lego';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';

export default class HomePage extends Component {
    constructor(props) {
    super(props);

    this.state = {
      authenticated: props.authenticated
    }
    console.log('ass', this.state)
  }


  // state = {
  //   authenticated: false,
  //   loading: false
  // };

  _isMounted = false;

  // componentDidMount() {
  //   this._isMounted = true;
  //   console.log(this.props)
  //   auth().onAuthStateChanged(user => {
  //     if (this._isMounted) {
  //       if (user) {
  //         this.setState({
  //           authenticated: true,
  //           class: 'hide'
  //         });
  //       } else {
  //         this.setState({
  //           authenticated: false,
  //           class: 'show'
  //         });
  //       }
  //     }
  //   });
  // }


  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {authenticated} = this.state;
    return (
      <div className="home">
          <section> 
        
          <h1 className="display-4">Welcome to My Resume</h1>
          <p className="lead">Go to login in to your account and login</p>
            <div className="btn-wrapper">
            <Link className={'btn ' + this.state.class} to="/signup">Create New Account</Link>
       
            <Link className={'btn-white ' + this.state.class } to="/login">Login to Your Account</Link>
            <Link className="btn" to="/signup" hidden={!authenticated}>Go to Chat</Link>
          </div>
       
       </section>
        <Footer></Footer>
        {/* <Lego /> */}
      </div>
    )
  }
}