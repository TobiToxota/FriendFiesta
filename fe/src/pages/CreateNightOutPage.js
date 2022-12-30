import React, {useContext, useState} from "react";

import AuthContext from "../context/AuthContext";

function CreateNightOutPage() {
    let {userData} = useContext(AuthContext)

    return (
        <>
        Hallo
        </>
    )
}

export default CreateNightOutPage;