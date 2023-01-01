import React, {useContext, useState} from "react";
import Header from "../../components/layout/Header";

import AuthContext from "../../context/AuthContext";

function CreateNightOutPage() {
    let {userData} = useContext(AuthContext)

    return (
        <>
        <Header></Header>
        </>
    )
}

export default CreateNightOutPage;