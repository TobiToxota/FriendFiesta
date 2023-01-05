import React from "react";

import ProgressComponent from "../common/ProgressComponent";
import DropDownContentComponent from "../common/DropDownContentComponent";

const NightOutTopComponent = ({nightOut, userData}) => {

    return (
        <>
          <h3 className="subtitle is-3 mb-2">Title: {nightOut.title}</h3>
          <ProgressComponent percentage={25}></ProgressComponent>
          <div id="creator" className="mt-2 is-inline-block is-vcentered is-flex">
            <button className="button is-info is-rounded p-2">
              <img
                src={`https://avatars.dicebear.com/api/${nightOut.creator.avatarStyle}/${userData.username}+${nightOut.creator.avatarIteration}.svg`}
                alt=""
                width={30}
              />
              <p className="roboto-plain"></p>
            </button>
            <p
              className="roboto is-inline-flex ml-2 pb-2"
              style={{ verticalAlign: "bottom" }}>
              {nightOut.creator.username != userData.username
                ? nightOut.creator.username + " has created this NightOut"
                : "You created this NightOut"}
            </p>
          </div>
          <div className="mt-2">
            <DropDownContentComponent
              content={
                <ul style={{ listStyle: "none" }}>
                  {nightOut.participants.map((participant) => (
                    <li>{participant.user.username}</li>
                  ))}
                </ul>
              }
              title="Participants"
              icon={"fa-solid fa-user-astronaut"}></DropDownContentComponent>
            <button
              className="button is-success is-rounded ml-1"
              onClick={() => setAddParticipant(true)}>
              <span className="icon is-small">
                <i className="fa-solid fa-plus" />
              </span>
            </button>
            {addParticipantHandler ? (
              <form
                onSubmit={addParticipant}
                className="is-inline ml-1 fade-in"
                id="addParticipantForm">
                <div className="field is-inline">
                  <div className="control is-inline">
                    <input
                      className="input is-inline is-rounded"
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
                    onClick={() => {
                      setAddParticipant(false, setErrormsg(false));
                    }}>
                    cancel
                  </button>
                </div>
              </form>
            ) : null}
            <div>
              {errormsg ? <Notificaton msg={errormsg} onExit={onExit} /> : null}
            </div>
          </div>
        </>
      );
}

export default NightOutTopComponent;