// package imports
import React from 'react'

// local imports
import { usePostNotification } from '../../../hooks/api/notifiactionAPI'
import { useAddFinalDate } from '../../../hooks/api/nightOutAPI'
import { getAllFinishedDatePhaseParticipantsCounts } from '../../../utils/nightOutDateFinderUtils'

const AddFinalDateButtonComponent = ({
    token,
    nightOut,
    refreshNightOut,
    userData,
    setAddFinalDateLoading,
}) => {
    // get the hooks for addFinalDate and postNotification
    const { postNotification, fetching } = usePostNotification(token, nightOut.uuid)
    const { addFinalDate, finalDateFetching } = useAddFinalDate(
        token,
        nightOut,
        refreshNightOut,
        setAddFinalDateLoading
    )

    return (
        <>
            {nightOut.creator.id !== userData.id ? (
                <div className="has-text-centered">
                    <p className="label is-size-5 mb-1">
                        {getAllFinishedDatePhaseParticipantsCounts(nightOut)} /{' '}
                        {nightOut.participants.length} participants are finished. <br></br>
                        You want this Nightout to be in the next phase?
                    </p>
                    <p className="ml-2 has-text-centered">
                        Only the Creator of the Nightout can submit a date and bring the Nightout to
                        the planning phase.<br></br>
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
                                <span className="is-size-7">Send a reminder</span>
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <div className="has-text-centered mt-4">
                    <p className="label is-size-5 mb-0 mt-0">
                        {getAllFinishedDatePhaseParticipantsCounts(nightOut)} /{' '}
                        {nightOut.participants.length} participants are finished. <br></br> You are
                        the creator of this Nightout.
                    </p>
                    <p className="ml-2 has-text-centered">
                        You can decide which of the suggested dates should be the final date for
                        this Nightout.
                        <br />
                        Please check if enough participants have either declared that they are
                        finished or atleast have registered some of their dates
                        <br />
                        If you submit a date this Nightout will be taken to the next phase.
                    </p>
                    <form onSubmit={(e) => addFinalDate(e)}>
                        <div className="container mt-2">
                            <div className="field has-addons has-addons-centered">
                                <span className="control " >
                                    <div className="select is-size-7-touch is-rounded is-link" >
                                        <select name="dateselecter">
                                            {nightOut.suggestedDates.length === 0 &&
                                        <option value="">Please add a date first</option>}
                                            {nightOut.suggestedDates.map((date) => (
                                                <option key={date.id} value={date.date}>
                                                    {date.weekday} / {date.date}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </span>
                                {!finalDateFetching ? (
                                    <span className="control">
                                    <button className="button is-link is-rounded is-size-6 is-size-7-touch">
                                        <span className="icon is-small">
                                            <i className="fa-regular fa-calendar-check"></i>
                                        </span>
                                        <span className="is-size-6 is-size-7-touch">
                                            Submit this date
                                        </span>
                                    </button>
                                    </span>
                                ) : (
                                    <span className='control'>
                                    <button className="button is-link is-rounded is-size-6 is-size-7-touch is-loading">
                                        <span className="icon is-small">
                                            <i className="fa-regular fa-calendar-check"></i>
                                        </span>
                                        <span className="is-size-6 is-is-size-7-touch">
                                            Submit this date
                                        </span>
                                    </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default AddFinalDateButtonComponent
