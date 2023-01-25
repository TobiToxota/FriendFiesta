// package imports
import React from 'react'

// local imports
import ProgressComponent from '../../common/ProgressComponent'
import DropDownContentComponent from '../../common/DropDownContentComponent'
import { nightOutDateToDate } from '../../../utils/nightOutDateToDate'

const NightOutTopComponent = ({
    nightOut,
    userData,
    children,
    progressPercentage,
    finalDate,
}) => {
    return (
        <div className="container">
            <div className="container">
                <h3 className="mb-2 is-size-2-touch squarepeg-title has-text-centered is-unselectable">
                    Your Nightout: {nightOut.title}
                </h3>
                <ProgressComponent percentage={progressPercentage} />
                {nightOut.creator.username !== userData.username ? (
                    <div
                        id="creator"
                        className="mt-2 is-inline-block is-vcentered is-flex"
                    >
                        <button className="button is-info is-rounded p-2">
                            <img
                                src={`https://avatars.dicebear.com/api/${nightOut.creator.avatarStyle}/${nightOut.creator.username}+${nightOut.creator.avatarIteration}.svg`}
                                alt=""
                                width={30}
                            />
                            <p className="roboto-plain"></p>
                        </button>
                        <p
                            className="label is-inline-flex ml-2 pb-2 is-size-6-touch"
                            style={{ verticalAlign: 'bottom' }}
                        >
                            {nightOut.creator.username} has created this
                            Nightout
                        </p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {finalDate && (
                <p className="label is-pulled-right is-size-5 is-size-7-touch margin-top-mobile">
                    Final Date: {nightOutDateToDate(finalDate)}
                </p>
            )}

            <div className="container is-inline-flex mt-1">
                {nightOut.phase !== "datePhase" && 
                <>
                {nightOut.participants.map((participant) => (
                <>
                  <DropDownContentComponent
                    title={
                      <img
                        src={`https://avatars.dicebear.com/api/${participant.user.avatarStyle}/${participant.user.username}+${participant.user.avatarIteration}.svg`}
                        alt=""
                        width={30}
                      />
                    }
                    content={participant.user.username}
                    thisStyle="avatar">
                    </DropDownContentComponent>
                </>
              ))}
                </>}
                {children}
            </div>
        </div>
    )
}

export default NightOutTopComponent
