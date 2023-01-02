import React, {useContext, useEffect, useState } from "react"

import AuthContext from "../../context/AuthContext"
import SpinnerComponent from "../common/SpinnerComponent"

const CreateNightOutComponent = () => {
    let {userData} = useContext(AuthContext)

    if (false) {
        return (
            <>
            </>
        )
    } else {
        return (
            <SpinnerComponent>
            </SpinnerComponent>
        )
    }
}

export default CreateNightOutComponent