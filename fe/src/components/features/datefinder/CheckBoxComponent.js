import React, { useState } from 'react'

/**
 * This Component checks if a user is the particpant and either returns a useable checkbox or an unusable checkbox
 *
 * @format
 */
const CheckBoxComponent = ({
    addParticipantDateToNightOut,
    participantDate,
    userData,
    working,
}) => {
    const [isClicked, setIsClicked] = useState(false)

    const click = () => {
        setIsClicked(true)
        setTimeout(() => {
            setIsClicked(false)
        }, 2500)
    }

    const checkBoxOrLoader = (
        participantDate,
        userData,
        addParticipantDateToNightOut,
        click,
        isClicked
    ) => {
        if (participantDate.participant.user.id === userData.id && !isClicked) {
            return (
                <label className="checkbox fade-in">
                    <input
                        type="checkbox"
                        value={participantDate.id}
                        checked={participantDate.commit}
                        onChange={(e) => addParticipantDateToNightOut(e)}
                        onClick={() => click()}
                    />
                </label>
            )
        } else if (
            participantDate.participant.user.id === userData.id &&
            isClicked
        ) {
            return (
                <span className="loader-small"></span>
            )
        } else if (participantDate.participant.user.id !== userData.id) {
            return (
                <label className="checkbox">
                    <input
                        type="checkbox"
                        value={participantDate.id}
                        checked={participantDate.commit}
                        disabled
                    />
                </label>
            )
        }
    }

    return (
        <td key={participantDate.id} className="has-text-centered">
            {checkBoxOrLoader(
                participantDate,
                userData,
                addParticipantDateToNightOut,
                click,
                isClicked
            )}
        </td>
    )
}

export default CheckBoxComponent
