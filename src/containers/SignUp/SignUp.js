import React, { useState, useContext } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { AuthContext } from "../../Auth";
import { auth, db } from "../../firebase";
import "./Signup.css";

function AdminLogin({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await auth
        .createUserWithEmailAndPassword(email.trim(), password)
        .then((cred) => {
          return db.collection("users").doc(cred.user.uid).set({
            firstName: fname,
            lastName: lname,
            favourite: [],
            watchLater: [],
          });
        });
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
        <h1 style={{ letterSpacing: "5px", fontSize: "3rem" }}>SIGN UP</h1>
        <form onSubmit={handleLogin} id="signup">
          <div className="signup__name">
            <div class="group">
              <input
                required
                id="First Name"
                type="text"
                name="First Name"
                onChange={(e) => setfname(e.target.value)}
                value={fname}
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>First Name</label>
            </div>
            <div class="group">
              <input
                required
                id="Last Name"
                type="text"
                name="Last Name"
                onChange={(e) => setlname(e.target.value)}
                value={lname}
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Last Name</label>
            </div>
          </div>
          <div className="signup__name">
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
          </div>
          <button className="signupButton" type="submit">
            Submit
          </button>
        </form>
        <Link to="/" className="signup__link">
          Already have an account? SIGN IN
        </Link>
      </div>
    </div>
  );
}

export default withRouter(AdminLogin);
