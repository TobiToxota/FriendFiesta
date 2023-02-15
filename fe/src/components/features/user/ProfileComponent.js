// local imports
import ModalCardComponent from '../../common/ModalCardComponent'
import ChangeUserNameModal from './ChangeUserNameModal'
import { useSwipeInFromBottomTwo, shakingTwo } from '../../../hooks/animations/animations'
import { useChangeAvatarStyle, useAddAvatarIteration } from '../../../hooks/api/userAPI'

// package imports
import { useState } from 'react'

const ProfileComponent = ({ userData, token, refreshUserData }) => {
    // animation
    useSwipeInFromBottomTwo(ProfileComponent, '#main-container')

    // get the changeAvatarStyle hook
    const { changeAvatarStyle, avatarStyles, changeAvatarFetching } = useChangeAvatarStyle(
        token,
        userData,
        refreshUserData
    )
    // get the addAvatarIteration hook
    const { addAvatarIteration, addIterationFetching } = useAddAvatarIteration(
        token,
        userData,
        refreshUserData
    )
    
    // get a state for style
    const [style, setStyle] = useState(userData.avatarStyle)
    // get a state for modal
    const [showModal, setShowModal] = useState(false)
    // get a state for newUserName
    const [newUserName, setNewUserName] = useState(userData.userName)

    return (
        <div className="container is-fluid active is-rounded" id="main-container">
            <div
                className="notification is-light is-rounded fade-in shadow"
                style={{
                    marginTop: '6vh',
                    borderRadius: 15,
                    minHeight: '150px',
                }}
                id="nightout-container"
            >
                <div className="container has-text-centered">
                    <h2 className="label is-size-3 is-size-4-touch mb-0">
                        Hi {userData.username}!
                    </h2>
                    <img
                        className="image mb-2 mx-auto"
                        src={`https://avatars.dicebear.com/api/${userData.avatarStyle}/${userData.username}+${userData.avatarIteration}.svg`}
                        alt=""
                        width={'50px'}
                        id="avatar"
                    />
                </div>
                <h3 className="is-size-4 is-size-5-touch has-text-centered mb-4">
                    Here you can edit your user profile.
                </h3>
                <div className="field has-addons has-addons-centered mb-4">
                    <p className="control">
                        <span
                            className="is-not-clickable button is-size-7-touch is-light"
                            style={{
                                pointerEvents: 'none',
                                borderTopLeftRadius: '8px',
                                borderBottomLeftRadius: '8px',
                            }}
                        >
                            Change Username:
                        </span>
                    </p>
                    <p className="control">
                        <input
                            className="input is-size-7-touch has-text-centered"
                            type="text"
                            defaultValue={userData.username}
                            onChange={(e) => setNewUserName(e.target.value)}
                            style={{
                                borderTopLeftRadius: '8px',
                                borderBottomLeftRadius: '8px',
                            }}
                        />
                    </p>
                    <p className="control">
                        <button
                            className="button is-link is-rounded is-size-7-touch"
                            onClick={() => setShowModal(true)}
                        >
                            Change
                        </button>
                    </p>
                </div>
                <div className="field has-addons has-addons-centered mb-4">
                    <p className="control">
                        <span
                            className="is-not-clickable button is-size-7-touch"
                            style={{
                                pointerEvents: 'none',
                                borderTopLeftRadius: '8px',
                                borderBottomLeftRadius: '8px',
                            }}
                        >
                            Avatar style:
                        </span>
                    </p>
                    <p className="control">
                        <span className="select is-size-7-touch">
                            <select
                                name="formType"
                                defaultValue={userData.avatarStyle}
                                onChange={(e) => setStyle(e.target.value)}
                            >
                                {avatarStyles.map((style, index) => (
                                    <option key={index} value={style}>
                                        {style}
                                    </option>
                                ))}
                            </select>
                        </span>
                    </p>
                    <p className="control">
                        {!changeAvatarFetching ? (
                            <button
                                className="button is-link is-rounded is-size-7-touch"
                                onClick={() => {
                                    changeAvatarStyle(style)
                                    shakingTwo('#avatar')
                                }}
                            >
                                Change
                            </button>
                        ) : (
                            <button className="button is-link is-rounded is-size-7-touch is-loading">
                                Change
                            </button>
                        )}
                    </p>
                </div>
                <div className="field has-text-centered">
                    <p className="control is-inline">
                        <span
                            className="is-not-clickable button is-size-7-touch is-light pr-0 pl-0"
                            style={{
                                pointerEvents: 'none',
                                borderTopLeftRadius: '8px',
                                borderBottomLeftRadius: '8px',
                            }}
                        >
                            Get a new avatar based on current style:
                        </span>
                    </p>
                    <p className="control is-inline">
                        {!addIterationFetching ? (
                            <button
                                className="button is-link is-rounded is-size-7-touch ml-2"
                                onClick={() => {
                                    addAvatarIteration()
                                    shakingTwo('#avatar')
                                }}
                            >
                                Get
                            </button>
                        ) : (
                            <button className="button is-link is-rounded is-size-7-touch ml-2 is-loading">
                                Get
                            </button>
                        )}
                    </p>
                </div>
                <p className="has-text-centered is-size-7 is-family-code mb-0 mt-5 has-text-primary-dark">
                    Avatars provided by{' '}
                    <a href="https://dicebear.com/how-to-use/http-api">dicebear api</a>
                </p>
            </div>
            <ModalCardComponent
                showModal={showModal}
                setShowModal={setShowModal}
                title={'Edit your username'}
                children={
                    <ChangeUserNameModal
                        oldUserName={userData.username}
                        newUserName={newUserName}
                    />
                }
            />
        </div>
    )
}

export default ProfileComponent
