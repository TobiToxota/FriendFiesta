import React, { useContext } from "react";
import Header from "../../components/layout/HeaderComponent";

import CreateNightOutComponent from "../../components/features/CreateNightOutComponent";
import AuthContext from "../../context/AuthContext";
import SpinnerComponent from "../../components/common/SpinnerComponent";

function CreateNightOutPage() {
    let { userData } = useContext(AuthContext)

    if (userData) {
        return (
            <>
                <Header></Header>
                <CreateNightOutComponent userData={userData}></CreateNightOutComponent>
            </>
        )
    } else {
        return (
            <SpinnerComponent></SpinnerComponent>
        )
    }
}

export default CreateNightOutPage;