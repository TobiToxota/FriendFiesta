/** @format */

import React from "react";

const NotificatonComponent = ({ msg, onExit, backgroundColor, color }) => {

  return (
      <div
        className="notification is-warning mt-3 fade-in mx-auto is-rounded has-text-centered"
        style={{ width: "60%", borderRadius: "12px", backgroundColor: backgroundColor, color: color }}>
        <button className="delete" onClick={onExit} />
        {msg}
      </div>
  );
};

export default NotificatonComponent;
