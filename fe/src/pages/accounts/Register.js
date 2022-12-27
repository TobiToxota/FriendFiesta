/** @format */

import React, { useContext } from "react";
import { Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext";
import Notification from "../../components/Notification";

function Register() {

  let { message, Register } = useContext(AuthContext);

  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="login-container">
          <p className="title">Register</p>
          <p className="subtitle">Welcome to ltshangout</p>
          <form onSubmit={Register}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-rounded"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Username"
                  name="username"
                />
                <span className="icon is-small is-left">
                  <i className="fa-solid fa-user-astronaut" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-rounded"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-rounded"
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmation"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button
                  className="button is-success is-rounded"
                  type="submit"
                  value="Register">
                  Register
                </button>
              </p>
            </div>
            <p className="is-family-code">You allready have an account?</p>
            <Link to="/login"><p className="is-family-code is-size-5">Login</p></Link>
          </form>
          {message && (
            <Notification msg={"Your password or email is incorrect"} />
          )}
        </div>
      </div>
      <style>
        {`

      @keyframes move {
        from {
            left: -50%;
        }
        to  {
            left: 0%;
        }
        }

        .login-container {
        position: relative;
        animation-name: move;
        animation-duration: 0.3s;
        animation-fill-mode: forwards;
        color: black;
        }
        `}
      </style>
    </section>
  );
}

export default Register;
