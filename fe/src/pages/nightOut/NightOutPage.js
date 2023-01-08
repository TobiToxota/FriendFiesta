import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import SpinnerComponent from "../../components/common/SpinnerComponent";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { useGetNightOut } from "../../hooks/api/nightOutAPI";
import nightOutPhaseReturner from "../../utils/nightOutPhaseReturner";

const NightOutPage = () => {

    // get userData, token, params and nightOutData
    const { userData, token } = useContext(AuthContext)
    const { uuid } = useParams()
    const { nightOut, error, loading } = useGetNightOut(token, uuid)

    return (

        <>
            {loading ?
                <>
                    <HeaderComponent />
                    <SpinnerComponent />
                </>
                :
                <>
                    <HeaderComponent />
                    {nightOutPhaseReturner(nightOut, userData)}
                </>
            }
        </>
    )
}

export default NightOutPage