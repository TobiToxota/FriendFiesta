/** @format */

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// create the context
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [token, setToken] = useState(() =>
    localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null
  );
  let [message, setMessage] = useState(null);
  let [userData, setUserData] = useState(null);
  let [loading, setLoading] = useState(true);

  // get a Navigator to send the user to the right page
  const navigate = useNavigate();

  // get the user Data from the user api
  let getUserData = async () => {
    let response = await fetch(process.env.REACT_APP_API_URL + "user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      // put the user data into the state
      setUserData(data);
      if (loading) {
        setLoading(false)
      }
    } else {
      // if there is a problem, log out the user
      setMessage(data['message'])
      LogoutUser();
      if (loading) {
        setLoading(false)
      }
    }
  };

  // With every change of token and loading and a given token the usedata should be fetched and put in context
  useEffect(() => {
      getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, token])


  const getTokenFromBackend = async (e) => {
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

    // if the response is ok return the token otherweise return null
    if (response.status === 200) {
      return data['token']
    } else {
      setMessage(Object.values(data)[0])
      return null
    }
  }

  // define the loginUser function
  let LoginUser = async (e) => {
    e.preventDefault();
    const token = await getTokenFromBackend(e)
    setToken(token)
    localStorage.setItem('token', token);
  };

  // define the registerUser function
  let Register = async (e) => {
    e.preventDefault();
    const token = await RegisterUser(e)
    setToken(token)
    localStorage.removeItem('token');
  };

  // register the user on the api
  let RegisterUser = async (e) => {
    e.preventDefault();

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
      return data['token']
    } else {
      setMessage(Object.values(data)[0])
      return null
    }
  };

  // define the logoutUser function
  let LogoutUser = async () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate("/login/");
  };

  // put in the contextData
  let contextData = {
    userData: userData,
    token: token,
    loginUser: LoginUser,
    logoutUser: LogoutUser,
    Register: Register,
    message: message,
    setMessage: setMessage,
    getUserData: getUserData,
  };

  // return the Authcontext with the contextData and the children
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
