/** @format */

// package imports
import React, { useContext } from "react";

// local imports
import HeaderComponent from "../../components/layout/HeaderComponent";
import SpinnerComponent from "../../components/common/SpinnerComponent";
import AuthContext from "../../context/AuthContext";
import { useGetNightOutList } from "../../hooks/api/nightOutAPI";
import NightOutListComponent from "../../components/features/NightOutListComponent";

const NightOutListPage = () => {
  // get userData, token and nightOutlist
  const { token, userData } = useContext(AuthContext);
  const { nightOutList, loading } = useGetNightOutList(token);

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
          <h1 className="subtitle is-1 has-text-centered squarepeg" style={{color: 'white'}}>Your Nightouts:</h1>
            <div className="p-4 columns is-centered is-flex-wrap-wrap has-text-centered">
              {nightOutList.map((nightOut, index) => (
                <div id={1} key={index}>
                  <NightOutListComponent nightOut={nightOut} key={index} />
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
