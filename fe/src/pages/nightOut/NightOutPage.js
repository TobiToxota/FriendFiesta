import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import SpinnerComponent from "../../components/common/SpinnerComponent";
import Header from "../../components/layout/HeaderComponent";
import { useGetNightOut } from "../../hooks/api/nightOutAPI";

const NightOutPage = () => {

    // get userData, token, params and nightOutData
    const { userData, token } = useContext(AuthContext)
    const { uuid } = useParams()
    const {data, success, error, setError } = useGetNightOut(token, uuid)

    return (
        <>
        <Header></Header>
        </>
    )
}   

export default NightOutPage