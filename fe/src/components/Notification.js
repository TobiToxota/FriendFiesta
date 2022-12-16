/** @format */

import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Notificaton = ({ msg, onExit }) => {
  let { loginstatus, setloginstatus } = useContext(AuthContext);
  let { registerstatus, setregisterstatus } = useContext(AuthContext);

  const handleClose = () => {
    setloginstatus(false);
    setregisterstatus(false);
  };

  return (
    <>
      {loginstatus ? (
        <div className="notification is-light mt-3 fade-in">
          <button className="delete" onClick={handleClose} />
          {msg}
        </div>
      ) : registerstatus ? (
        <div className="notification is-light mt-3 fade-in">
          <button className="delete" onClick={handleClose} />
          {msg}
        </div>
      ) : error ? (
        <div
          className="notification is-warning mt-3 fade-in mx-auto is-rounded"
          style={{ width: "60%", borderRadius: "12px" }}>
          <button className="delete" onClick={handleClose} />
          {msg}
        </div>
      ) : (
        <div
          className="notification is-warning mt-3 fade-in mx-auto is-rounded has-text-centered"
          style={{ width: "60%", borderRadius: "12px" }}>
          <button className="delete" onClick={onExit} />
          {msg}
        </div>
      )}
    </>
  );
};

export default Notificaton;
