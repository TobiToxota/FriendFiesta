/** @format */

// package imports
import React, { useState } from 'react'
import DatePicker from 'react-date-picker'

// local imports
import { useAddDateSuggestionToNightOut } from '../../../hooks/api/participantAPI'
import { useAddParticipantDateToNightOut } from '../../../hooks/api/participantAPI'
import { usePostNotification } from '../../../hooks/api/notifiactionAPI'
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

    // get the hooks for addDate, addParticipantDate and postNotification
    const { addDateSuggestion, dateError, setDateError, success, setSuccess } =
        useAddDateSuggestionToNightOut(token, nightOut.uuid, refreshNightOut)
    const { addParticipantDateToNightOut, working } =
        useAddParticipantDateToNightOut(token, nightOut.uuid, refreshNightOut)
    const {
        postNotification,
        notificationError,
        notificationSuccess,
        fetching,
        setNotificationError,
    } = usePostNotification(token, nightOut.uuid)

    return (
        <>
            <h3 className="label is-size-4 is-size-5-touch mb-2 mt-4">
                Find a date for your Nightout:
            </h3>
            {nightOut.creator.id !== userData.id && (
                <button className="button is-danger is-rounded ml-1">
                    <span className="icon is-small">
                        <i className="fa-solid fa-person-through-window"></i>
                    </span>
                    <span className="is-size-7">Leave this Nightout</span>
                </button>
            )}
            <button
                className="button is-success is-rounded ml-1 margin-top-mobile"
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
                        <tr className='is-vcentered'>
                            <th
                                className="label is-size-5 is-size-6-touch is-vcentered mt-2"
                            >
                                Participants
                            </th>
                            {nightOut.suggestedDates.map((date) => (
                                <th
                                    className="is-vcentered has-text-centered fade-in"
                                    id="date-head"
                                    key={date.id}
                                >
                                    <p
                                        className="label is-size-5 mb-0"
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        {date.weekday}
                                    </p>
                                    <p
                                        className="label mb-1"
                                        style={{
                                            fontSize: '14px',
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
                    {!fetching ? (
                        <button
                            className="button is-link is-rounded mt-2"
                            onClick={() => postNotification('ask_next_phase')}
                        >
                            <span className="icon is-small">
                                <i className="fa-solid fa-bell"></i>
                            </span>
                            <span className="is-size-7">Send a reminder</span>
                        </button>
                    ) : (
                        <>
                            <button className="button is-link is-rounded mt-2 is-loading">
                                <span className="icon is-small">
                                    <i className="fa-solid fa-bell"></i>
                                </span>
                                <span className="is-size-7">
                                    Send a reminder
                                </span>
                            </button>
                        </>
                    )}
                    {notificationSuccess && (
                        <NotificatonComponent
                            msg={notificationSuccess}
                            animated={true}
                            backgroundColor={'#48c78e'}
                            color={'white'}
                            onExit={() => setNotificationError(null)}
                        />
                    )}
                </div>
            ) : (
                <form>
                    <div className="has-text-centered mt-4">
                        <p className="label is-size-5 mb-0">
                            You are the creator of this Nightout.
                        </p>
                        <p className="ml-2 has-text-centered">
                            You can decide which of the suggested dates should
                            be the final date for this Nightout.<br></br>
                            If you submit a date this Nightout will be taken to
                            the next phase.
                        </p>
                        <div className="container mt-2">
                            <div className="select is-size-7-touch is-rounded is-link mr-1">
                                <select name="dateselecter">
                                    {nightOut.suggestedDates.map((date) => (
                                        <option key={date.id}>
                                            {date.weekday} / {date.date}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className="button is-link is-rounded is-size-6 is-size-7-touch">
                                <span className="icon is-small">
                                    <i className="fa-regular fa-calendar-check"></i>
                                </span>
                                <span className="is-size-6 is-is-size-7-touch">
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
