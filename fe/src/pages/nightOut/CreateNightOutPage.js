import React, {useContext, useState} from "react";
import Header from "../../components/layout/HeaderComponent";

import AuthContext from "../../context/AuthContext";
import CreateNightOutComponent from "../../components/features/CreateNightOutComponent";

function CreateNightOutPage() {
    let {userData} = useContext(AuthContext)

    return (
        <>
        <Header></Header>
        <CreateNightOutComponent></CreateNightOutComponent>

        </>
    )
}

export default CreateNightOutPage;