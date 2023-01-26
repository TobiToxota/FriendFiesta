import React from 'react'

// local imports
import CheckBoxComponent from './CheckBoxComponent'
import { useAddParticipantDateToNightOut } from '../../../hooks/api/participantAPI'

const DateTableComponent = ({ nightOut, refreshNightOut, token, userData }) => {
    // get the hook for adding a participant
    const { addParticipantDateToNightOut, working } =
        useAddParticipantDateToNightOut(token, nightOut.uuid, refreshNightOut)

    return (
        <div className="table-container mt-0 mb-0" id="datetable">
            <table className="table is-narrow datefinder-table mt-2" style={{}}>
                <thead>
                    <tr className="is-vcentered">
                        <th className="label is-size-5 is-size-6-touch is-vcentered mt-4">
                            Participants
                        </th>
                        {nightOut.suggestedDates.map((date) => (
                            <th
                                className="is-vcentered has-text-centered fade-in"
                                id="date-head"
                                key={date.id}
                            >
                                <p
                                    className="label is-size-5 mb-0 is-size-6-touch"
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
                                <span className="icon is-small">
                                    <i className="fa-solid fa-people-group mr-1"></i>
                                    {date.numberofCommits}
                                </span>
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
                                            participantDate={participantDate}
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
    )
}

export default DateTableComponent
