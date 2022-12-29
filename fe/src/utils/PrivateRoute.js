/** @format */

import { Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

// a private route is a route that only allows access to the user if they are logged in
const PrivateRoute = ({ children }) => {

    // get the user from the context
    let {user} = useContext(AuthContext);
  
    // check if there is a user
    if (user != null) {
  
      // if there is a user, return the children aka the route
      return children;
    } else {
  
      // if there is no user, bring him back to login
      return <Navigate to="/login/" />;
    }
  };

export default PrivateRoute;
