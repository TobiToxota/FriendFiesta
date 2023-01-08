/** @format */

// package imports
import React, { useContext, useState } from "react";

// local imports
import HeaderComponent from "../../components/layout/HeaderComponent";
import SpinnerComponent from "../../components/common/SpinnerComponent";
import AuthContext from "../../context/AuthContext";
import { useGetNightOutList } from "../../hooks/api/nightOutAPI";

const NightOutListPage = () => {
  // get userData, token and nightOutlist
  const { userData, token } = useContext(AuthContext);
  const { nightOutList, error, loading } = useGetNightOutList(token);

  return (
    <>
      {loading ? (
        <>
          <HeaderComponent />
          <SpinnerComponent/>
        </>
      ) : (
        <>
        <HeaderComponent/>
        
        </>
      )}
    </>
  );
};

export default NightOutListPage;
