/** @format */

import { Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

// a private route is a route that only allows access to the user if they are logged in
const PrivateRoute = ({children, ...rest}) => {
    let {userData} = useContext(AuthContext)
    return(
        <Route {...rest}>{!userData ? <Navigate to="/login" /> :   children}</Route>
    )
}

export default PrivateRoute;
