import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithFacebook } from "../helpers/login";
import "./chat.css";

const Login = ({ onHeaderTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Set page title when component mounts
  useEffect(() => {
    if (onHeaderTitle) {
      onHeaderTitle("Login");
    }
  }, [onHeaderTitle]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Handle email/password sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e);
    setError(null);
    try {
      await signin(email, password);
      console.log("email", email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Facebook sign-in
  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="content">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <p>Fill in the form below to login to your account.</p>
        <div style={{ fontWeight: "bold" }}>*Explainer Text*</div>
        <div>
          You can absolutely sign up with email, Google, or Facebook by using
          the sign-up link at the bottom of the page. I figured you wouldn't
          want to, though, so I provide this to login with.
        </div>
        <div>
          If you want to chat with someone, they can use testingChat2@asdf.com
          and the password below.
        </div>
        <h4>Email: testingChat@asdf.com</h4>
        <h4>Password: password</h4>
        <label>
          Enter Email:
          <input
            className="form-control"
            placeholder="testingChat@asdf.com"
            name="email"
            type="email"
            onChange={handleChange}
            value={email}
          />
        </label>
        <label>
          Enter Password:
          <input
            className="form-control"
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={password}
          />
        </label>
        {error && <p className="error-txt">{error}</p>}
        <button className="btn" type="submit">
          Login
        </button>

        <p>You can also log in with any of these services</p>
        <div className="login-btn-wrapper">
          <button className="btn" type="button" onClick={handleGoogleSignIn}>
            Google
          </button>
          <button className="btn" type="button" onClick={handleFacebookSignIn}>
            Facebook
          </button>
        </div>
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
