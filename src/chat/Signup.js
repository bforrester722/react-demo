import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup, signInWithGoogle, signInWithFacebook } from "../helpers/login";
import "./chat.css";

const SignUp = ({ onHeaderTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Set the page title when the component mounts
  useEffect(() => {
    if (onHeaderTitle) {
      onHeaderTitle("Sign Up");
    }
  }, [onHeaderTitle]);

  // Handle changes to the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Handle sign-up with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google sign-up
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Facebook sign-up
  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="content">
      <form className="signup-form" onSubmit={handleSubmit}>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            className="form-control"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div>
          <input
            className="form-control"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div>
          {error && <p className="error-txt">{error}</p>}
          <button className="btn" type="submit">
            Sign up
          </button>
        </div>
        <p>You can also sign up with any of these services</p>
        <div className="btn-wrapper">
          <button className="btn" type="button" onClick={handleGoogleSignIn}>
            Sign up with Google
          </button>
          <button className="btn" type="button" onClick={handleFacebookSignIn}>
            Sign up with Facebook
          </button>
        </div>
        <hr />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
