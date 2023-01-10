/** @format */

import React, { useEffect, useState } from "react";

const NotificatonComponent = ({
  msg,
  onExit,
  backgroundColor,
  color,
  children,
  animated,
}) => {

  // animate the progress countdown
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        return oldProgress - 0.33;
      });
    }, 1);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="pb-1 notification is-warning mt-3 fade-in mx-auto is-rounded has-text-centered"
      style={{
        paddingBottom: "2px !important",
        width: "60%",
        borderRadius: "12px",
        backgroundColor: backgroundColor,
        color: color,
      }}>
      <button className="delete" onClick={onExit} />
      {msg}
      <br></br>
      {children}
      {animated && (
        <>
          {backgroundColor ? (
            <progress
              className="mt-4 progress is-link is-small is-relative "
              value={progress}
              max="100"
              style={{
                backgroundColor: backgroundColor,
                transform: "translate(-15px, 0px)",
                height: "4px",
              }}>
              20%
            </progress>
          ) : (
            <progress
              className="mt-4 progress is-link is-small mb-0 is-relative "
              value={progress}
              max="100"
              style={{
                backgroundColor: "#ffe08a",
                transform: "translate(-15px, 0px)",
                height: "4px",
              }}>
              20%
            </progress>
          )}
        </>
      )}
    </div>
  );
};

export default NotificatonComponent;
