/** @format */

import { Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

// a private route is a route that only allows access to the user if they are logged in
const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return(
        <Route {...rest}>{!user ? <Navigate to="/login" /> :   children}</Route>
    )
}

export default PrivateRoute;
