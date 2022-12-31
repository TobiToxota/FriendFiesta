/** @format */

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, registerUser, getTokenFromBackend } from "../api/userAPI";

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

  // With every change of token and loading and a given token the usedata should be fetched and put in context
  useEffect(() => {
    if (token) {
      getUserData(token).then(data => {
        if (Object.keys(data.length > 1)) {
          setUserData(data)
          if (loading) {
            setLoading(false)
          }
        } else {
          setMessage(data['message'])
          LogoutUser();
          if (loading) {
            setLoading(false)
          }
        }
      })
    } else {
      if (loading) {
        setLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, token])

  // Log a user in
  let LoginUser = async (e) => {
    e.preventDefault();
    getTokenFromBackend(e).then(data => {
      if (Object.keys(data)[1] === "token") {
        setToken(data.token)
        localStorage.setItem('token', data.token);
      } else {
        setMessage(Object.values(data)[0])
        return null
      }
    })
  };

  // Register a user on the database
  let Register = async (e) => {
    e.preventDefault();
    registerUser(e).then(data => {
      if (Object.keys(data)[1] === "token") {
        setToken(data.token)
        setUserData(data.user)
        localStorage.setItem('token', data.token);
        return
      } else {
        console.log(data)
        setMessage(data.message)
        return null
      }
    })
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
