import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithFacebook } from "../helpers/auth";


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.facebookSignIn = this.facebookSignIn.bind(this);
  }


  componentDidMount() {
    this.props.onHeaderTitle('Login');  
  }

  // for email and password inputs
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Handles firebase sign in with email and password
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  // Handles firebase sign in with Google
  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  
  // Handles firebase sign in with Facebook
  async facebookSignIn() {
    try {
      await signInWithFacebook();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      
      <div className="content">
        <form autoComplete="off"
              onSubmit={this.handleSubmit}>

          <p>
            Fill in the form below to login to your account.
          </p>
          <h4>Email: testingChat@asdf.com</h4>
          <h4>Password: password</h4>
         
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}/>
          </div>
     
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"/>
          </div>

          <div className="form-group">
            {this.state.error ? (<p className="error-txt">{this.state.error}</p>) : null}
            <button className="btn" type="submit">Login</button>
          </div>
          <p>You can also log in with any of these services</p>
          <div className="login-btn-wrapper">
            <button className="btn" type="button" onClick={this.googleSignIn}>
             Google
            </button>
            <button className="btn" type="button" onClick={this.facebookSignIn}>
              FaceBook
            </button>
          </div>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>

      </div>
    );
  }
}