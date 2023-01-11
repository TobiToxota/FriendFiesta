/** @format */

import React, { useContext, useState } from "react";

import Header from "../../components/layout/HeaderComponent";
import WelcomeComponent from "../../components/features/createNightout/WelcomeComponent";
import CreateNightOutComponent from "../../components/features/createNightout/CreateNightOutComponent";
import AuthContext from "../../context/AuthContext";
import SpinnerComponent from "../../components/common/SpinnerComponent";

const CreateNightOutPage = () => {
  const { userData, token } = useContext(AuthContext);
  const [creation, setCreation] = useState(false);

  if (userData) {
    return (
      <>
        <Header></Header>
        {!creation ? (
          <WelcomeComponent
            userData={userData}
            setCreation={setCreation}></WelcomeComponent>
        ) : (
          <CreateNightOutComponent
            userData={userData}
            setCreation={setCreation}
            token={token}></CreateNightOutComponent>
        )}
      </>
    );
  } else {
    return <SpinnerComponent />;
  }
};

export default CreateNightOutPage;
