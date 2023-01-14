/** @format */

// package imports
import React, { useState } from 'react'
import DatePicker from 'react-date-picker'

// local imports
import { useAddDateSuggestionToNightOut } from '../../../hooks/api/participantAPI'
import { useAddParticipantDateToNightOut } from '../../../hooks/api/participantAPI'
import { createDateFromDatePicker } from '../../../utils/nightOutDateFinderUtils'
import NotificatonComponent from '../../common/NotificationComponent'
import CheckBoxComponent from './CheckBoxComponent'

const DateFinderComponent = ({
    nightOut,
    refreshNightOut,
    token,
    userData,
}) => {
    // states for the datePicker
    const [datePicker, setDatePicker] = useState(false)
    const [value, onChange] = useState(new Date())

    // get the hooks for addDate and addParticipantDate
    const { addDateSuggestion, dateError, setDateError, success, setSuccess } =
        useAddDateSuggestionToNightOut(token, nightOut.uuid, refreshNightOut)
    const { addParticipantDateToNightOut, working } =
        useAddParticipantDateToNightOut(token, nightOut.uuid, refreshNightOut)

    return (
        <>
            <h3 className="subtitle is-4 is-size-5-touch mb-2 mt-4">
                Find a date for your Nightout:
            </h3>
            {nightOut.creator.id !== userData.id && (
            <button
                className="button is-danger is-rounded ml-1"
            >
                <span className="icon is-small">
                    <i className="fa-solid fa-person-through-window"></i>
                </span>
                <span className="is-size-7">Leave this Nightout</span>
            </button>
            )}
            <button
                className="button is-success is-rounded ml-1"
                onClick={() => setDatePicker(true)}
            >
                <span className="icon is-small">
                    <i className="fa-solid fa-calendar-plus"></i>
                </span>
                <span className="is-size-7">Add a new date suggestion</span>
            </button>
            {datePicker && (
                <>
                    <span
                        className="button is-warning is-rounded ml-1 margin-top-mobile"
                        id="date-buttons"
                        children={
                            <DatePicker
                                onChange={onChange}
                                value={value}
                                style={{ border: 'none !important' }}
                            />
                        }
                    ></span>
                    <div className="fade-in is-inline" id="addDateForm">
                        <div className="control is-inline ml-1">
                            <button
                                className="button is-info is-rounded is-small mt-1 margin-top-mobile"
                                type="submit"
                                id="date-buttons-two"
                                onClick={() =>
                                    addDateSuggestion(
                                        createDateFromDatePicker(value)
                                    )
                                }
                            >
                                add
                            </button>
                        </div>
                        <button
                            className="button is-danger is-rounded is-small mt-1 ml-1 margin-top-mobile"
                            onClick={() => {
                                setDatePicker(false)
                            }}
                            id="date-buttons-two"
                        >
                            cancel
                        </button>
                    </div>
                    {/* TODO:{errormsg ? <Notificaton msg={errormsg} onExit={onExit} /> : null} */}
                    {success && (
                        <>
                            <NotificatonComponent
                                msg={success}
                                animated={true}
                                backgroundColor={'#48c78e'}
                                color={'white'}
                                onExit={() => setSuccess()}
                            ></NotificatonComponent>
                        </>
                    )}
                    {dateError && (
                        <NotificatonComponent
                            msg={dateError}
                            onExit={() => setDateError()}
                            animated={true}
                        />
                    )}
                </>
            )}
            <div className="table-container mt-2 mb-2" id="datetable">
                <table
                    className="table is-narrow datefinder-table mt-2"
                    style={{}}
                >
                    <thead>
                        <tr>
                            <th
                                className="is-size-5 is-size-6-touch is-vcentered has-text-cet"
                                style={{ fontWeight: 200 }}
                            >
                                Participants
                            </th>
                            {nightOut.suggestedDates.map((date) => (
                                <th
                                    className="roboto is-vcentered has-text-centered fade-in"
                                    id="date-head"
                                    key={date.id}
                                >
                                    <p
                                        className="is-size-5"
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 200,
                                        }}
                                    >
                                        {date.weekday}
                                    </p>
                                    <p
                                        className=""
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 200,
                                        }}
                                    >
                                        {date.date.slice(-2) +
                                            '.' +
                                            date.date.slice(5, 7) +
                                            '.' +
                                            date.date.slice(0, 4)}{' '}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {nightOut.participants.map((participant) => (
                            <tr key={participant.id}>
                                <td>
                                    <button className="button is-info is-rounded p-4 is-small">
                                        <img
                                            src={`https://avatars.dicebear.com/api/${participant.user.avatarStyle}/${participant.user.username}+${participant.user.avatarIteration}.svg`}
                                            alt=""
                                            width={30}
                                        />
                                        <p className="mr-1 ml-1">
                                            {participant.user.username}
                                        </p>
                                    </button>
                                </td>
                                {nightOut.participantDates.map(
                                    (participantDate) =>
                                        participantDate.participant.id ===
                                            participant.id && (
                                            <CheckBoxComponent
                                                addParticipantDateToNightOut={
                                                    addParticipantDateToNightOut
                                                }
                                                participantDate={
                                                    participantDate
                                                }
                                                userData={userData}
                                                working={working}
                                                key={participantDate.id}
                                            />
                                        )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {nightOut.creator.id !== userData.id ? (
                <div className="has-text-centered">
                    <p className="subtitle mb-1">
                        You want this Nightout to be in the next phase?
                    </p>
                    <p className="ml-2 has-text-centered">
                        Only the Creator of the Nightout can submit a date and
                        bring the Nightout to the planning phase.<br></br>
                        But you can remind the creator:
                    </p>
                    <button className="button is-link is-rounded mt-2">
                        <span className="icon is-small">
                            <i className="fa-solid fa-bell"></i>
                        </span>
                        <span className="is-size-7">Send a reminder</span>
                    </button>
                </div>
            ) : (
                <form>
                    <div className="has-text-centered mt-4">
                        <p className="subtitle mb-3">
                            Decide which date is the final date for this
                            Nightout:
                        </p>
                        <div className="container">
                            <div className="select is-size-7-touch is-rounded is-link mr-1">
                                <select name="dateselecter">
                                    {nightOut.suggestedDates.map((date) => (
                                        <option key={date.id}>
                                            {date.weekday} / {date.date}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className="button is-link is-rounded is-size-7-touch">
                                <span className="icon is-small">
                                    <i className="fa-regular fa-calendar-check"></i>
                                </span>
                                <span className="is-size-7">
                                    Submit this date
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}

export default DateFinderComponent
