import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithFacebook} from "../helpers/auth";
import './chat.css';

export default class SignUp extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    error: null,
    email: '',
    password: '',
  };


  componentDidMount() {
    this.props.onHeaderTitle('Sign Up');  
  }

  // handles changes to email and password inputs
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

   // Handles firebase sign up with email and password
  async handleSubmit(event){
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  // Handles firebase sign up with Google
  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  // Handles firebase sign up with Facebook
  async facebookSignIn() {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
  
      <div className="content">

        <div id="signup-content">
          <form className="signup-form" onSubmit={this.handleSubmit} >
            <p>Fill in the form below to create an account.</p>
            <div>
              <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
            </div>
            <div>
              <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
            </div>
            <div>
              {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
              <button className="btn" type="submit">Sign up</button>
            </div>
            <p>You can also sign up with any of these services</p>
            <div className="btn-wrapper">
              <button className="btn" type="button" onClick={this.googleSignIn}>
                Sign up with Google
              </button>
              <button className="btn" type="button" onClick={this.facebookSignIn}>
                Sign up with Facebook
              </button>
            </div>
            <hr></hr>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    )
  }
}