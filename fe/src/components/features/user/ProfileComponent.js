// local imports
import { useSwipeInFromBottomTwo, shaking } from '../../../hooks/animations/animations'
import { useChangeAvatarStyle } from '../../../hooks/api/userAPI'

// package imports
import { useState } from 'react'

const ProfileComponent = ({ userData, token, getUserData }) => {
    // animation
    useSwipeInFromBottomTwo(ProfileComponent, '#main-container')

    // get the changeAvatarStyle hook
    const { changeAvatarStyle, avatarStyles } = useChangeAvatarStyle(token, userData, getUserData)
    // get a state for style
    const [style, setStyle] = useState(userData.avatarStyle)

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
                <div className="field has-addons has-addons-centered">
                    <p className="control">
                        <span className="is-not-clickable button is-rounded is-size-7-touch">
                            Avatar style:
                        </span>
                    </p>
                    <p className="control is-link">
                        <span className="select is-link is-size-7-touch">
                            <select name="formType" defaultValue={userData.avatarStyle} onChange={(e) => setStyle(e.target.value)}>
                                {avatarStyles.map((style, index) => (
                                    <option key={index} value={style}>
                                        {style}
                                    </option>))}
                            </select>
                        </span>
                    </p>
                    <p className="control">
                        <button className="button is-link is-rounded is-size-7-touch" onClick={() => changeAvatarStyle(style)}>
                            Change
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent
