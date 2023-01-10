/** @format */

// package imports
import React, { useState } from "react";
import DatePicker from "react-date-picker";

// local imports
import { getCheckBoxStatus } from "../../../utils/nightOutDateFinderUtils";


const DateFinderComponent = ({ nightOut, refreshNightOut, token, userData }) => {
  // states for the datePicker
  const [datePicker, setDatePicker] = useState(false);
  const [value, onChange] = useState(new Date());

  return (
    <>
      <h3 className="subtitle is-3 mb-2 mt-4">
        Find a date for your NightOut:
      </h3>
      <button
        className="button is-success is-rounded ml-1"
        onClick={() => setDatePicker(true)}>
        <span className="icon is-small">
          <i className="fa-solid fa-calendar-plus"></i>
        </span>
        <span className="is-size-7">Add a new date suggestion</span>
      </button>
      {datePicker && (
        <>
          <button
            className="button is-warning is-rounded ml-1"
            id="date-buttons">
            <DatePicker
              onChange={onChange}
              value={value}
              style={{ border: "none !important" }}
            />
          </button>
          <form className="fade-in is-inline" id="addDateForm">
            <div className="control is-inline ml-1">
              <button
                className="button is-info is-rounded is-small mt-1 "
                type="submit"
                id="date-buttons-two">
                add
              </button>
            </div>
            <button
              className="button is-danger is-rounded is-small mt-1 ml-1"
              onClick={() => {
                setDatePicker(false);
              }}
              id="date-buttons-two">
              cancel
            </button>
          </form>
          {/* TODO:{errormsg ? <Notificaton msg={errormsg} onExit={onExit} /> : null} */}
        </>
      )}
      <div className="table-container mt-2" id="datetable">
        <table
          className="table is-narrow is-fullwidth datefinder-table mt-2"
          style={{}}>
          <thead>
            <tr>
              <th className="roboto " style={{ fontWeight: 400 }}>
                Participants
              </th>
              {nightOut.suggestedDates.map((date) => (
                <th
                  className="roboto is-vcentered has-text-centered"
                  key={date.id}>
                  <p
                    className="roboto-plain"
                    style={{ fontSize: "14px", fontWeight: 200 }}>
                    {date.date.slice(-2) +
                      "." +
                      date.date.slice(5, 7) +
                      "." +
                      date.date.slice(0, 4)}{" "}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          {nightOut.creator.id === userData.id ? (
            <tfoot>
              <tr>
                <td className="is-vcentered" style={{ paddingRight: "0px" }}>
                  <p className="roboto-plain" style={{ fontSize: "15px" }}>
                    Submit a date
                  </p>
                </td>
                {nightOut.suggestedDates.map((date) => (
                  <td key={date.id} className="has-text-centered fade-in2">
                    <button
                      className="button is-info is-rounded is-small"
                      value={date.id}
                      onClick={() => {}}>
                      <span className="icon is-small" value={date.id}>
                        <i
                          className="fa-solid fa-check-to-slot"
                          value={date.id}></i>
                      </span>
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          ) : null}
          <tbody>
            {nightOut.participants.map((participant) => (
              <tr key={participant.id}>
                <td>
                  <button className="button is-info is-rounded p-2 is-small">
                    <img
                      src={`https://avatars.dicebear.com/api/${participant.user.avatarStyle}/${participant.user.username}+${participant.user.avatarIteration}.svg`}
                      alt=""
                      width={30}
                    />
                    <p className="roboto-plain">{participant.user.username}</p>
                  </button>
                </td>
                {nightOut.participantDates.map(
                  (participantDate) =>
                    participantDate.participant.id === participant.id &&
                    getCheckBoxStatus(participantDate, userData, addParticipantDate)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DateFinderComponent;
