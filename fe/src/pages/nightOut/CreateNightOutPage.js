import React, {useContext, useState} from "react";
import Header from "../../components/layout/HeaderComponent";

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