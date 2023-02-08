// package imports
import React from 'react'

// local imports
import ProgressComponent from '../../common/ProgressComponent'
import { nightOutDateToDate } from '../../../utils/nightOutDateToDate'

const NightOutTopComponent = ({ nightOut, userData, children, progressPercentage, finalDate }) => {
    return (
        <div>
            <div>
                <h3 className="mb-2 is-size-2-touch squarepeg-title has-text-centered is-unselectable">
                    Your Nightout: {nightOut.title}
                </h3>
                <ProgressComponent percentage={progressPercentage} />
                {nightOut.creator.username !== userData.username ? (
                    <div id="creator" className="mt-2 is-inline-block is-vcentered is-flex mb-3">
                        <button className="button is-info is-rounded p-2">
                            <img
                                src={`https://avatars.dicebear.com/api/${nightOut.creator.avatarStyle}/${nightOut.creator.username}+${nightOut.creator.avatarIteration}.svg`}
                                alt=""
                                width={30}
                            />
                            <p className="roboto-plain"></p>
                        </button>
                        <p
                            className="label is-inline-flex ml-2 pb-2 is-size-7-touch"
                            style={{ verticalAlign: 'bottom' }}
                        >
                            {nightOut.creator.username} has created this Nightout
                        </p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {finalDate && (
                <p className="label is-size-5 is-size-7-touch mb-0" style={{ textAlign: 'right' }}>
                    Final Date: {nightOutDateToDate(finalDate)}
                </p>
            )}
            <div className="container is-inline-flex" style={{ transform: 'translateY(-8px)' }}>
                {nightOut.phase !== 'datePhase' && (
                    <div className="columns is-centered is-flex-wrap-wrap has-text-centered is-hidden-mobile">
                        <div className="column has-text-centered mr-1 p-1 is-flex is-unselectable">
                        <div className="container">
                                    <img
                                        src={`https://avatars.dicebear.com/api/${nightOut.creator.avatarStyle}/${nightOut.creator.username}+${nightOut.creator.avatarIteration}.svg`}
                                        alt=""
                                        width={30}
                                    />
                                    <p className="label is-size-7" style={{whiteSpace: 'nowrap'}}>{'👑' + nightOut.creator.username}</p>
                                </div>

                            </div>
                        {nightOut.participants.map((participant, index) => (
                            nightOut.creator.id !== participant.user.id && 
                            <div className="column has-text-centered mr-1 p-1 is-flex is-unselectable" key={index}>
                                <div className="container">
                                    <img
                                        src={`https://avatars.dicebear.com/api/${participant.user.avatarStyle}/${participant.user.username}+${participant.user.avatarIteration}.svg`}
                                        alt=""
                                        width={30}
                                    />
                                    <p className="label is-size-7" style={{whiteSpace: 'nowrap'}}>{participant.user.id === nightOut.creator.id && ('👑 ')}{participant.user.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {children}
        </div>
    )
}

export default NightOutTopComponent
