// local imports
import { useSwipeInFromBottomTwo } from '../../../hooks/animations/animations'

const ProfileComponent = ({ userData, token }) => {
    // animation
    useSwipeInFromBottomTwo(ProfileComponent, '#main-container')

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
                <div className="ml-5 columns is-vcentered pb-0 mb-0">
                    <div className="column pr-1 pb-0">
                        <h2 className="label is-size-3 is-size-4-touch mb-0 is-pulled-right">
                            Hi {userData.username}!
                        </h2>
                    </div>
                    <div className="column pl-1 pb-0">
                        <img
                            className="image mb-2 mx-auto is-pulled-left"
                            src={`https://avatars.dicebear.com/api/${userData.avatarStyle}/${userData.username}+${userData.avatarIteration}.svg`}
                            alt=""
                            width={'50px'}
                        />
                    </div>
                </div>
                <h3 className="is-size-4 is-size-5-touch has-text-centered mb-2">
                    Here you can edit your user profile.
                </h3>
            </div>
        </div>
    )
}

export default ProfileComponent
