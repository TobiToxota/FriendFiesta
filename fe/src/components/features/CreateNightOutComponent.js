import React, {useContext, useEffect, useState } from "react"

import AuthContext from "../../context/AuthContext"

const CreateNightOutComponent = () => {
    let {userData} = useContext(AuthContext)

    if (userData) {
        return (
            <>
            </>
        )
    } else ()
}

export default CreateNightOutComponent