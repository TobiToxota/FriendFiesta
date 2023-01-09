/** @format */

// package imports
import React, { useContext, useEffect } from "react";
import anime from "animejs";

// local imports
import HeaderComponent from "../../components/layout/HeaderComponent";
import SpinnerComponent from "../../components/common/SpinnerComponent";
import AuthContext from "../../context/AuthContext";
import { useGetNightOutList } from "../../hooks/api/nightOutAPI";
import NightOutListComponent from "../../components/features/NightOutListComponent";
import { useFading } from "../../hooks/animations/animations";

const NightOutListPage = () => {
  // get userData, token and nightOutlist
  const { token } = useContext(AuthContext);
  const { nightOutList, loading } = useGetNightOutList(token);

  useFading('#' + 1)

  return (
    <>
      {loading ? (
        <>
          <HeaderComponent />
          <SpinnerComponent />
        </>
      ) : (
        <>
          <HeaderComponent />
          <div className="container mt-6" id="wholeList">
            <div className="p-4 columns is-centered is-flex-wrap-wrap has-text-centered">
              {nightOutList.map((nightOut, index) => (
                <div id={1} key={index}>
                <NightOutListComponent nightOut={nightOut} key={index}/>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NightOutListPage;
