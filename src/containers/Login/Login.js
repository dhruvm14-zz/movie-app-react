import React, { useState, useContext } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { AuthContext } from "../../Auth";
import { auth } from "../../firebase";

function AdminLogin({ history }) {
  const [user, setuser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email.trim(), password);
      history.push("/");
    } catch (error) {
      console.log(email);
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    console.log(currentUser);
    return <Redirect to="/" />;
  }

  return (
    <div className="SignUp">
      <div className="formGroup">
        <LockOpenIcon style={{ fontSize: "3rem", paddingBottom: "10px" }} />
        <h1 style={{ letterSpacing: "5px", fontSize: "3rem" }}>SIGN IN</h1>
        <form onSubmit={handleLogin} id="signup">
          <div class="group">
            <input
              required
              id="email"
              autoComplete="email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Email</label>
          </div>

          <div class="group">
            <input
              type="text"
              required
              id="password"
              autoComplete="current-password"
              type="Password"
              name="name"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Password</label>
          </div>

          <button
            className="signupButton"
            style={{ left: "60px" }}
            type="submit"
          >
            Submit
          </button>
        </form>
        <Link to="/signup" className="signup__link">
          Don't have an account ? SIGN UP
        </Link>
      </div>
    </div>
  );
}

export default withRouter(AdminLogin);
