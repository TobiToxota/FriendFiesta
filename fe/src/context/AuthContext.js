/** @format */

import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// create the context
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // create the state
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  let [userData, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  let [loading, setLoading] = useState(true);
  let [loginstatus, setloginstatus] = useState(false);
  let [registerstatus, setregisterstatus] = useState(false);


  // get a Navigator to send the user to the right page
  const navigate = useNavigate();

  // define the loginUser function
  let loginUser = async (e) => {
    e.preventDefault();

    // get the token from the api
    let response = await fetch(process.env.REACT_APP_API_URL + "login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();

    // if the response is ok, save the token in the local storage
    if (response.status === 200) {
      setAuthTokens(data);
      getUserData(data.token)
      localStorage.setItem("token", JSON.stringify(data));
      navigate("/");
    } else {
      // if the response is not ok, show the error
      setloginstatus("Wrong username or password");
    }
  };

  // define the registerUser function
  let registerUser = async (e) => {
    e.preventDefault();

    // check if the password has 8 characters
    if (e.target.password.value.length < 8) {
      setregisterstatus("Password must be at least 8 characters");
      return;
    }

    // check if the password and the confirm password are the same
    if (e.target.password.value !== e.target.confirmation.value) {
      setregisterstatus("Passwords do not match");
      return;
    }

    // check if the username is not empty
    if (e.target.username.value === "") {
      setregisterstatus("Please enter a username");
      return;
    }

    // check if the password is not empty
    if (e.target.password.value === "") {
      setregisterstatus("Please enter a password");
      return;
    }

    // check if the email is not empty
    if (e.target.email.value === "") {
      setregisterstatus("Please enter an email");
      return;
    }

    // check if the email is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.email.value)) {
      setregisterstatus("Please enter a valid email");
      return;
    }

    // register the user on the api
    let response = await fetch(process.env.REACT_APP_API_URL + "register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();

    // response is ok
    if (response.status === 201) {
      setregisterstatus("Registration successful");

      // put the tokens in the local storage
      setAuthTokens(data);
      setUser(getUserData(data.token))
      localStorage.setItem("token", JSON.stringify(data));
      navigate("/");
    } else {
      // if the response is not ok, show the error
      setregisterstatus("Something went wrong");
    }
  };

  // define the logoutUser function
  let logoutUser = async () => {
    await fetch(process.env.REACT_APP_API_URL + "logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authTokens?.token}`,
      }
    });
    setAuthTokens(null);
    localStorage.removeItem("token");
    navigate("/login/");
  };

  let updateToken = async () => {
    let response = await fetch(process.env.REACT_APP_API_URL + "token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ""
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
      // if everything went well, log the user in again
      setAuthTokens(data);
      setUserFromToken(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      // if there is a problem, log out the user
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  // get the user Data from the user api
  let getUserData = async () => {
    let response = await fetch(process.env.REACT_APP_API_URL + "user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authTokens?.token}`,
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      // put the user data into the state
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      // if there is a problem, log out the user
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  // put in the contextData
  let contextData = {
    user: userFromToken,
    userData: userData,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    loginstatus: loginstatus,
    setloginstatus: setloginstatus,
    registerstatus: registerstatus,
    setregisterstatus: setregisterstatus,
    registerUser: registerUser,
    updateToken: updateToken,
    getUserData: getUserData,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
      getUserData();
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
        getUserData();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokens, loading]);

  // return the Authcontext with the contextData and the children
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
