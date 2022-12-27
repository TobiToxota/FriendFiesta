/** @format */

import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Notificaton = ({ msg, onExit }) => {

  return (
    <>

      <div
        className="notification is-warning mt-3 fade-in mx-auto is-rounded has-text-centered"
        style={{ width: "60%", borderRadius: "12px" }}>
        <button className="delete" onClick={onExit} />
        {msg}
      </div>

    </>
  );
};

export default Notificaton;
