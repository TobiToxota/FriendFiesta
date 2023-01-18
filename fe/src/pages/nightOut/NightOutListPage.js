/** @format */

// package imports
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// local imports
import HeaderComponent from "../../components/layout/HeaderComponent";
import SpinnerComponent from "../../components/common/SpinnerComponent";
import AuthContext from "../../context/AuthContext";
import { useGetNightOutList } from "../../hooks/api/nightOutAPI";
import NightOutListComponent from "../../components/features/nightoutlist/NightOutListComponent";

const NightOutListPage = () => {
  // get userData, token and nightOutlist
  const { token } = useContext(AuthContext);
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
            <h1
              className="has-text-centered squarepeg is-size-2-touch fade-in"
              style={{ color: "white" }}>
              Your Nightouts:
            </h1>
            {nightOutList.length === 0 ? (
              <div className="has-text-centered fade-in">
                <h2
                  class="has-text-centered squarepeg-onlyfont mt-4 is-size-2 is-size-3-touch"
                  style={{ color: "white" }}>
                  You are not participating in a Nightout. Create one or ask
                  your friends to invite you.
                </h2>
                <Link to={"/"}>
                  <button class="mt-5 button is-primary is-rounded is-large">
                    Create a Nightout
                  </button>
                </Link>
              </div>
            ) : (
              <div className="p-4 columns is-centered is-flex-wrap-wrap has-text-centered">
                {nightOutList.map((nightOut, index) => (
                  <div id={1} key={index}>
                    <NightOutListComponent nightOut={nightOut} key={index} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default NightOutListPage;
