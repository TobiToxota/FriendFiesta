import React, { useContext, useState } from "react";
import Header from "../../components/layout/HeaderComponent";

import WelcomeComponent from "../../components/features/WelcomeComponent";
import CreateNightOutComponent from "../../components/features/CreateNightOutComponent";
import AuthContext from "../../context/AuthContext";
import SpinnerComponent from "../../components/common/SpinnerComponent";

function CreateNightOutPage() {
    let { userData } = useContext(AuthContext)
    let [creation, setCreation] = useState(false)

    if (userData) {
        return (
            <>
                <Header></Header>
                {!creation ?
                    <WelcomeComponent userData={userData} setCreation={setCreation}></WelcomeComponent>
                    :
                    <CreateNightOutComponent userData={userData} setCreation={setCreation}></CreateNightOutComponent>
                }
            </>
        )
    } else {
        return (
            <SpinnerComponent></SpinnerComponent>
        )
    }
}

export default CreateNightOutPage;