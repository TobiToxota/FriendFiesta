/** @format */

// packages import
import React, { useState } from "react";

// local imports
import ProgressComponent from "../common/ProgressComponent";
import DropDownContentComponent from "../common/DropDownContentComponent";
import NotificatonComponent from "../common/NotificationComponent";
import { useAddParticipantToNightOut } from "../../hooks/api/nightOutAPI";

const NightOutDateComponent = ({ nightOut, getNightOut, userData, token }) => {
  const [addParticipantHandler, setAddParticipant] = useState(false);
  const { addParticipantToNightOut, error, success, setSuccess, setError } =
    useAddParticipantToNightOut(token, nightOut.uuid, getNightOut);

  return (
    <>
      <div className="container is-fluid active is-rounded" id="main-container">
        <div
          className="notification is-light is-rounded main-nightout-container fade-in"
          style={{ marginTop: "8vh", borderRadius: 15, minHeight: "150px" }}>
          <h3 className="subtitle is-3 mb-2 is-size-4-touch">
            Title: {nightOut.title}
          </h3>
          <ProgressComponent percentage={25}></ProgressComponent>
          <div
            id="creator"
            className="mt-2 is-inline-block is-vcentered is-flex">
            <button className="button is-info is-rounded p-2">
              <img
                src={`https://avatars.dicebear.com/api/${nightOut.creator.avatarStyle}/${userData.username}+${nightOut.creator.avatarIteration}.svg`}
                alt=""
                width={30}
              />
              <p className="roboto-plain"></p>
            </button>
            <p
              className="roboto is-inline-flex ml-2 pb-2 is-size-6-touch"
              style={{ verticalAlign: "bottom" }}>
              {nightOut.creator.username !== userData.username
                ? nightOut.creator.username + " has created this NightOut"
                : "You created this NightOut"}
            </p>
          </div>
          <div className="mt-2">
            <DropDownContentComponent
              content={
                <ul style={{ listStyle: "none" }}>
                  {nightOut.participants.map((participant) => (
                    <li key={participant.id}>{participant.user.username}</li>
                  ))}
                </ul>
              }
              title="Participants"
              icon={"fa-solid fa-user-astronaut"}></DropDownContentComponent>
            <button
              className="button is-success is-rounded ml-1 is-size-7-touch"
              onClick={() => setAddParticipant(true)}>
              <span className="icon is-small">
                <i className="fa-solid fa-plus" />
              </span>
              <p>Add Participant</p>
            </button>
            {addParticipantHandler ? (
              <form
                className="is-inline ml-1 fade-in"
                id="addParticipantForm"
                onSubmit={(e) => addParticipantToNightOut(e)}>
                <div className="field is-inline">
                  <div className="control is-inline">
                    <input
                      className="input is-inline is-rounded is-size-7-touch margin-top-mobile"
                      type="email"
                      placeholder="Enter email"
                      style={{ width: "161px" }}
                      name="email"
                    />
                  </div>
                  <div className="control is-inline ml-1">
                    <button
                      className="button is-info is-rounded is-small mt-1"
                      type="submit">
                      add
                    </button>
                  </div>
                  <button
                    className="button is-danger is-rounded is-small mt-1 ml-1"
                    onClick={() => setAddParticipant(false)}>
                    cancel
                  </button>
                </div>
                {error && (
                  <NotificatonComponent
                    msg={error}
                    animated={true}
                    onExit={() => setError(null)}></NotificatonComponent>
                )}
                {success && (
                  <NotificatonComponent
                    msg={success}
                    backgroundColor={"#48c78e"}
                    color={"white"}
                    animated={true}
                    onExit={() => setSuccess(null)}></NotificatonComponent>
                )}
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default NightOutDateComponent;
